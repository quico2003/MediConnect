<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();

    $products = Product::getAllWithoutPagination($db);

    foreach ($products as $product) {
        $imagesDecode = json_decode($product->images);
        $product->urlimage = !empty($imagesDecode[0])
            ? FileStorage::FileURLProducts($imagesDecode[0])
            : null; 
    }

    $db->commit(); 

    Response::sendResponse([
        "products" => $products
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode([
        "status" => false,
        "message" => $th->getMessage(),
        "code" => $th->getCode()
    ]));
}
