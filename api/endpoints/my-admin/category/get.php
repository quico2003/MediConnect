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

    //check if category exist
    $category = Category::getByGuid($db, $input->guid);

    $categoryFormat = CategoryResource::getCategorySimpleResource($category);

    $db->commit();
    Response::sendResponse([
        "data" => $categoryFormat
    ]);

} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}