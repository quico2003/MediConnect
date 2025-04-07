<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db ->beginTransaction();

    checkAuthAdmin();

    $input = validate($data, [
        'page' => 'required|numeric',
        'offset' => 'required|numeric',
        'search' => 'sometimes|string',
        'filter' => 'sometimes|string'
    ]);

    $search = isset($input->search) ? $input->search : '';
    $filter = $input->filter ? json_decode($input->filter) : [];

    $products = Product::getAll($db, $input->page, $input->offset, $input->search, $filter);
    $productsCount = Product::getAllCount($db, $input->search, $filter);


    foreach ($products as $product) {

        $category = Category::getById($db, $product->category_id);
        
        $product->categoryName = $category->name;
    }

    $productsFormat = ProductResource::getProductsArray($products);
    $totalPages = ceil($productsCount / $input->offset);

    $db->commit();
    Response::sendResponse([
        "products"=> $productsFormat,
        "totalPages" => $totalPages
    ]);


} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}