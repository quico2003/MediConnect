<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuth(false);

    $input = validate($data, [
        'name' => 'required|string',
        'email' => 'required|email',
        'password' => 'required|min:6',
        
    ]);

    $newAdmin = new Admin($db);
    $newAdmin->name = $input->name;
    $newAdmin->email = $input->email;
    $newAdmin->password = password_hash($input->password, PASSWORD_DEFAULT);

    $newAdmin->store();


    $db->commit();

    Response::sendResponse();
}catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}