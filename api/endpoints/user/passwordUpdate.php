<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();


    $input = validate($data, [
        'currentPassword' => 'required|string',
        'newPassword' => 'required|string',
    ]);

    $user = User::get($db, $userid);
    if (password_verify($input->currentPassword, $user->password)) {
        if (!password_verify($input->newPassword, $user->password)) {
            $user->password = password_hash($input->newPassword, PASSWORD_DEFAULT);
            $user->update();
            $user->logout();
        } else createException("New password is same as the current");
    } else createException("Current password not valid");

    $db->commit();
    Response::sendResponse([]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
