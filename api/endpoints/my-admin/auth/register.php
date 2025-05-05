<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthAdmin(false);

    $input = validate($data, [
        'name' => 'required|string',
        'email' => 'required|email',
        'password' => 'required|min:6',
        
    ]);

    $admin_exist = Admin::getByEmail($db, $input->email);

    if (!$admin_exist) {
        $newAdmin = new Admin($db);
        $newAdmin->name = $input->name;
        $newAdmin->email = $input->email;
        $newAdmin->password = password_hash($input->password, PASSWORD_DEFAULT);
    
        $newAdmin->store();
    } else {
        createException("Email alredy exist", 409);
    }

    $db->commit();
    Response::sendResponse();
}catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}