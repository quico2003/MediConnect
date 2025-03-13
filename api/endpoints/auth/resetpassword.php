<?php

include_once '../../config/config.php';


$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();

    checkAuth(false);

    $input = validate($data, [
        'recoverycode' => 'required|string',
    ]);

    //check if admin exist
    $user = User::getByRecoveryCode($db, $input->recoverycode);

    $db->commit();
    Response::sendResponse([
        "status" => !!$user
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    if ($th->getCode() !== 0)
        logError($th->getMessage());
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
