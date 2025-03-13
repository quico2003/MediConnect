<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();


    $input = validate($data, [
        'currentEmail' => 'required|string',
        'newEmail' => 'required|string',
    ]);

    $user = User::get($db, $userid);
    if ($user->email === $input->currentEmail) {
        if ($user->email !== $input->newEmail) {
            $user->email = $input->newEmail;
            $user->update();
            $user->logout();
        } else createException("New email is same as the current");
    } else createException("Current email not valid");

    $db->commit();
    Response::sendResponse([]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
