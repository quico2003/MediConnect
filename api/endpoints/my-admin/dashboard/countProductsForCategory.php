<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    $categories = Category::getAllWithoutPagination($db);
    $products = Product::getAllWithoutPagination($db);

    foreach ($categories as $category) {
        $cont = 0;
        foreach ($products as $product) {
            if ($category->id === $product->category_id) {
                $cont++;
            }
        }
        $category->productsCount = $cont;
    }

    $categoriesFormat = CategoryResource::getCountProductsForCategoryArray($categories);

    $db->commit();

    Response::sendResponse([
        "categories" => $categoriesFormat
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}