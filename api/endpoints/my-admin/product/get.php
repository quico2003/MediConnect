<?php

use Carbon\Carbon;

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

    $timeZoneCreated_at = Carbon::createFromFormat('Y-m-d H:i:s', $product->created_at, 'UTC')->timezone('Europe/Madrid');
    $timeZoneUpdated_at = Carbon::createFromFormat('Y-m-d H:i:s', $product->updated_at, 'UTC')->timezone('Europe/Madrid');

    $product->created_at = $timeZoneCreated_at;
    $product->updated_at = $timeZoneUpdated_at;

    //category of product
    $category = Category::getById($db, $product->category_id);

    $product->categoryName = $category->name;
    
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

    $productFormat = ProductResource::getProductResourceAdmin($product);


    $db->commit();

    Response::sendResponse([
        "data" => $productFormat
    ]);

} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}