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

    foreach ($input->products as $product) {
        logAPI($product);
        $recipe = new Recipe($db);
        $recipe->appointment_id = $input->id;

        $product = Product::getByGuid($db, $product);
        $recipe->product_id = $product->id;

        $appointment = Appointment::get($db, $input->id);
        $recipe->client_id = $appointment->created_for;
        $appointment->final_description = $input->description;
        
        $appointment->update();
        $recipe->store();
    }


    (new GeneratePDF($db, $input->id))->createPDF();
    $db->commit();
    Response::sendResponse([]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}