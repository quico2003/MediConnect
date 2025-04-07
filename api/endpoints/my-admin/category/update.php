<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    $input = validate($data, [
        'guid' => 'required|string',
        'name' => 'required|string',
        'description' => 'required|string',
    ]);

    $category = Category::getByGuid($db, $input->guid);
    $category->name = $input->name;
    $category->description = $input->description;
    $category->update();

    $db->commit();

    Response::sendResponse();

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}