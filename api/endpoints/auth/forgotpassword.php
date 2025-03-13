<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuth(false);

    $input = validate($data, [
        'email' => 'required|email',
    ]);

    $user = User::getByEmail($db, $input->email);
    if ($user === false) {
        createException('El email introducido no existe!');
    }

    $user->recoverycode = uniqid("");
    $user->update();
    $forgot_password_content = API_URL . "/reset-password/$user->recoverycode";

    // sendEmail(
    //     $user->email,
    //     "forgot Password",
    //     $forgot_password_content
    // );

    $db->commit();
    Response::sendResponse([
        "status" => true
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    if ($th->getCode() !== 0)
        logError($th->getMessage());
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
