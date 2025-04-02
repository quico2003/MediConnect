<?php

include_once "../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    $input = validate($data, [
        'categoryGuid' => 'required|string',
        'productGuid' => 'required|string'
    ]);

    $product = Product::getByGuid($db, $input->productGuid);
    $category = Category::getByGuid($db, $input->categoryGuid);

    logAPI($product);
    logAPI($category);

    $product->category_id = $category->id;

    $product->update();

    $db->commit();

    Response::sendResponse();

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}