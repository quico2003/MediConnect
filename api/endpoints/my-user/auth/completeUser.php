<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();

    $input = validate($data, [
        "guid" => "required|string",
        "password" => "required|string",
        "passwordCopy" => "required|string",
    ]);

    if ($input->password == $input->passwordCopy) {
        $user = User::getByGuid($db, $input->guid);
        $user->password = password_hash($input->password, PASSWORD_DEFAULT);
        $user->first_login = 0;
    }

    $user->update();

    $db->commit();

    Response::sendResponse();

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}