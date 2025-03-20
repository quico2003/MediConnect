<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    
    $db->beginTransaction();
    checkAuthAdmin(false);

    $input = validate($data, [
        'email' => 'required|email',
        'password' => 'required|min:6'
    ]);

    //check user exist
    $admin = Admin::getByEmail($db, $input->email);

    if ($admin && password_verify($input->password, $admin->password)) {
        $admin->createSession();
    }else{
        createException('Wrong password or email', 401);
    }

    $db->commit();
    $data = AdminResource::getLoginResource($admin);
    
    Response::sendResponse(['data' => $data]);



} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}