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

    $product = Product::getByGuid($db, $input->guid);

    $arrayImagesDecode = json_decode($product->images);

    if ($arrayImagesDecode) {
        foreach ($arrayImagesDecode as $image) {
            $ruta = FileStorage::FilePathProducts($image);
            if (file_exists($ruta)) {
                unlink($ruta);
            }
        }
    }

    $product->images = json_encode([]);

    if ($product->category_id == 0) {
        $product->category_id = null;
    }

    logAPI($product);

    $product->delete();

    $db->commit();

    Response::sendResponse();

} catch (\Exception $th) {
    $db->rollBack();
    print_r(value: json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}