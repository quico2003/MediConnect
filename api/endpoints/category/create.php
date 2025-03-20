<?php

include_once "../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthAdmin();
    
    $input = validate($data, [
        'name' => 'required|string',
        'description' => 'required|string'
    ]);
    
    $category = new Category($db);
    $category->name = $input->name;
    $category->description = $input->description;
    $category->store();

    $db->commit();

    Response::sendResponse();

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}