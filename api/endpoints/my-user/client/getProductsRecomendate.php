<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();
    checkAuthUser();

    $input = validate($data, [
        "guid" => "required|string"
    ]);

    $client = Client::getByGuid($db, $input->guid);

    $productsAssign = Product::getAllAssign($db, $client->id);

    foreach ($productsAssign as $product) {
        $imagesDecode = json_decode($product->images);
        $product->urlimage = !empty($imagesDecode[0])
            ? FileStorage::FileURLProducts($imagesDecode[0])
            : null;
    }

    $db->commit();

    Response::sendResponse([
        "products" => $productsAssign
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(value: json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}