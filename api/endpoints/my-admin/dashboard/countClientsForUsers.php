<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    $clientsForUsers = Client::getClientsForUsers($db);

    $db->commit();

    Response::sendResponse([
        "users" => $clientsForUsers
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
