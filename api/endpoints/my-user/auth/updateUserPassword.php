<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    $userId = checkAuthUser();

    $input = validate($data, [
        "currentPassword" => "required|string",
        "newPassword" => "required|string",
        "newPasswordCopy" => "required|string",
    ]);

    $user = User::get($db, $userId);

    if ($user && password_verify($input->currentPassword, $user->password)) {
        $user->password = password_hash($input->newPassword, PASSWORD_DEFAULT);
        $user->update();
        $db->commit();
    }else {
        createException("The password does not match", 500);
    }

    Response::sendResponse([]);

} catch (\Throwable $th) {
    //throw $th;
}