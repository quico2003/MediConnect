<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    
    $input = validate($data, [
        'guid' => 'required|string',
    ]);

    $category = Category::getByGuid($db, $input->guid);

    $productsOfTheCategory = Product::getAllWithoutPagination($db);

    foreach ($productsOfTheCategory as $product) {
        if ($product->category_id == $category->id) {
            //Actualizar el category_id a null en la base de datos
            $updateQuery = "UPDATE products SET category_id = NULL WHERE id = :product_id";
            $stmt = $db->prepare($updateQuery);
            $stmt->bindParam(':product_id', $product->id);
            $stmt->execute();
        }
    }

    $category->delete();

    $db->commit();

    Response::sendResponse();
    
} catch (\Exception $th) {
    $db->rollBack();
    print_r(value: json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}