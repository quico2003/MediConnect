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
        'password' => 'required|min:6',
    ]);

    //check if user exist
    $user = User::getByEmail($db, $input->email);

    if ($user && password_verify($input->password, $user->password)) {
        $user->createSession();
    } else
        createException("Wrong email or password", 401);

    $db->commit();
    $data = UserResource::getLoginResource($user);
    Response::sendResponse([
        "data" => $data
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
