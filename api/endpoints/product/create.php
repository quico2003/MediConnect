<?php

include_once "../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    $adminId = checkAuthAdmin();

    $input = validate($data, [
        'name' => 'required|string',
        'category' => 'required|string',
        'price' => 'required|numeric',
        'brand' => 'required|string',
        'description' => 'required|string',
    ]);

    $category = Category::getByGuid($db, $input->category);

    $product = new Product($db);
    $product->name = $input->name;
    $product->price = $input->price;
    $product->brand = $input->brand;
    $product->description = $input->description;
    $product->created_by = $adminId;
    $product->category_id = $category->id;

    $product->store();

    $db->commit();

    Response::sendResponse();



} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}