<?php

include_once '../../../config/config.php';


$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {

    $db->beginTransaction();
    checkAuthAdmin();

    $input = validate($data, [
        "guid" => "required|string"
    ]);

    //Product found by guid
    $product = Product::getByGuid($db, $input->guid);

    //category of product
    $category = Category::getById($db, $product->category_id);
    $product->category = $category->guid;

    //Realiza un array con la decodificacion del string de imagenes
    $imagesDecode = json_decode($product->images);

    //Crea un array con la ruta ya montada
    $imagesUrls = [];
    if ($imagesDecode) {
        foreach ($imagesDecode as $image) {
            $imagesUrls[] = FileStorage::FileURLProducts($image);
        }
    }


    //Incluye ya la ruta montada en la respuesta de la api
    $product->imagesURL = $imagesUrls;
    $product->imagesExist = $imagesDecode;

    $productFormat = ProductResource::getProductResourceAdminForUpdate($product);


    $db->commit();

    Response::sendResponse([
        "data" => $productFormat
    ]);

} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}