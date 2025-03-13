<?php

include_once '../../config/config.php';


$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();

    checkAuth(false);

    $input = validate($data, [
        'password' => 'required|string',
        'recoverycode' => 'required|string'
    ]);

    $user = User::getByRecoveryCode($db, $input->recoverycode);
    $user->recoverycode = null;
    $user->password = password_hash($input->password, PASSWORD_DEFAULT);
    $user->update();

    $db->commit();
    Response::sendResponse([
        "status" => true,
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    if ($th->getCode() !== 0)
        logError($th->getMessage());
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
