<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    $adminId = checkAuthAdmin();

    $input = validate($data, [
        "currentPassword" => "required|string",
        "newPassword" => "required|string",
        "newPasswordCopy" => "required|string",
    ]);

    $admin = Admin::get($db, $adminId);

    if ($admin && password_verify($input->currentPassword, $admin->password)) {
        $admin->password = password_hash($input->newPassword, PASSWORD_DEFAULT);
        $admin->update();
        $db->commit();
    } else {
        createException("The password email does not match", 500);
    }

    Response::sendResponse([]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}