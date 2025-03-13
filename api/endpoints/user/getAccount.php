<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    $userId = checkAuth();


    //check if user exist
    $user = User::get($db, $userId);

    $userFormat = AccountResource::getUserEmail($user);


    $db->commit();
    Response::sendResponse([
        "data" => $userFormat
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
