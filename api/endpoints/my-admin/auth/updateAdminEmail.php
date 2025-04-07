<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    $adminId = checkAuthAdmin();

    $input = validate($data, [
        "currentEmail" => "required|email",
        "newEmail" => "required|email",
        "newEmailCopy" => "required|email",
    ]);

    $admin = Admin::get($db, $adminId);
    $adminExist = Admin::getByEmail($db, $input->newEmail);

    if ($input->currentEmail === $admin->email) {
        if (!$adminExist) {
            $admin->email = $input->newEmail;
            $admin->update();
            $db->commit();
        } else {
            createException("The new email exist", 500);
        }
    } else {
        createException("The current email does not match", 500);
    }

    Response::sendResponse([]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}