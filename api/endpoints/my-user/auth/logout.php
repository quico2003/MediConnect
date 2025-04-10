<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();
    $uderId = checkAuthUser();

    $session = User::get($db, $uderId);
    $session->logout();

    $db->commit();

    Response::sendResponse([]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}