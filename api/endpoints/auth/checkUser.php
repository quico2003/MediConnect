<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $user = User::get($db, $userid);
    $resourceUser = UserResource::getLoginResource($user);

    $db->commit();

    Response::sendResponse([
        "status" => true,
        "data" => $resourceUser
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
