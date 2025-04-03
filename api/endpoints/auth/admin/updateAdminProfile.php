<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    $adminId = checkAuthAdmin();

    $input = validate($data, [
        "name" => "required|string",
    ]);

    $admin = Admin::get($db, $adminId);

    $admin->name = $input->name;

    $admin->update();

    $db->commit();

    Response::sendResponse([]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}