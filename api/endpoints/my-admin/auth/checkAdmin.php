<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();
    $adminId = checkAuthAdmin();

    $admin = Admin::get($db, $adminId);
    $resourceAdmin = AdminResource::getLoginResource($admin);

    $db->commit();

    Response::sendResponse([
        "status" => true,
        "data" => $resourceAdmin
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
