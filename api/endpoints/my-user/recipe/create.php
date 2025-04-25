<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    $userId = checkAuthUser();

    $input = validate($data, [
        "products" => "array",
        "description" => "required|string",
        "id" => "required"
    ]);

    $appointment = Appointment::get($db, $input->id);
    $appointment->final_description = $input->description;
    
    foreach ($input->products as $product) {
        $product = Product::getByGuid($db, $product);
        $recipe = new Recipe($db);
        $recipe->appointment_id = $input->id;
        $recipe->product_id = $product->id;
        $recipe->client_id = $appointment->created_for;
        
        $recipe->store();
    }

    $appointment->update();

    $appointment->delete();
    
    $db->commit();
    (new GeneratePDF($db, $input->id))->createPDF();

    Response::sendResponse([]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}