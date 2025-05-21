<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    $users = User::getAllByList($db);

    $db->commit();

    Response::sendResponse([
        "users" => $users
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}