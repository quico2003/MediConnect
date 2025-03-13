<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $session = User::get($db, $userid);
    $session->logout();

    $db->commit();

    Response::sendResponse([
        "status" => true
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
