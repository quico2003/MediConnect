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

    //check if category exist
    $category = Category::getByGuid($db, $input->guid);

    $timeZoneCreated_at = Carbon::createFromFormat('Y-m-d H:i:s', $category->created_at, 'UTC')->timezone('Europe/Madrid');
    $timeZoneUpdated_at = Carbon::createFromFormat('Y-m-d H:i:s', $category->updated_at, 'UTC')->timezone('Europe/Madrid');

    $category->created_at = $timeZoneCreated_at;
    $category->updated_at = $timeZoneUpdated_at;

    $categoryFormat = CategoryResource::getCategorySimpleResource($category);

    $db->commit();
    Response::sendResponse([
        "data" => $categoryFormat
    ]);

} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}