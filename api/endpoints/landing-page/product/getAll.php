<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();

    $productsTop = Product::getProductsTop($db);
    $productTopIds = array_map(fn($p) => $p->id, $productsTop);

    if (count($productsTop) < 20) {
        $products = Product::getAll($db, 0, 0, "", []);

        foreach ($products as $product) {
            if (!in_array($product->id, $productTopIds)) {
                $productsTop[] = $product;
                $productTopIds[] = $product->id;

            }
        }
    }

    foreach ($productsTop as $product) {
        $imagesDecode = json_decode($product->images);
        $product->urlimage = !empty($imagesDecode[0])
            ? FileStorage::FileURLProducts($imagesDecode[0])
            : null;
    }

    $db->commit();

    Response::sendResponse([
        "productsTop" => $productsTop,
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode([
        "status" => false,
        "message" => $th->getMessage(),
        "code" => $th->getCode()
    ]));
}
