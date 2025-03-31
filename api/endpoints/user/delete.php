<?php

include_once "../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    $input = validate($data, [
        'guid' => 'required|string',
    ]);

    $user = User::getByGuid($db, $input->guid);

    logAPI($user);

    $user->delete();

    $db->commit();

    Response::sendResponse();

} catch (\Exception $th) {
    $db->rollBack();
    print_r(value: json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}