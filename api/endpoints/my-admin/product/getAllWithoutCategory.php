<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();

    checkAuthAdmin();

    $input = validate($data, [
        'page' => 'required|numeric',
        'offset' => 'required|numeric',
        'search' => 'sometimes|string',
        'filter' => 'sometimes|string'
    ]);

    $search = isset($input->search) ? $input->search : '';
    $filter = $input->filter ? json_decode($input->filter) : [];

    $products = Product::getAllWithoutCategory($db, $input->page, $input->offset, $input->search, $filter);
    $productsCount = Product::getAllCountWithoutCategory($db, $input->search, $filter);


    $productsFormat = ProductResource::getProductsArrayWithoutCategory($products);
    $totalPages = ceil($productsCount / $input->offset);

    $db->commit();
    Response::sendResponse([
        "products" => $productsFormat,
        "totalPages" => $totalPages
    ]);


} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}