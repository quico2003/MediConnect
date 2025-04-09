<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {

    $db->beginTransaction();
    checkAuthUser(false);

    $input = validate($data, [
        'email' => 'required|email',
        'password' => 'required|min:6'
    ]);

    $user = User::getByEmail($db, $input->email);
    logAPI($user);
    $userProfile = UserProfile::getByUserId($db, $user->id);
    logAPI($userProfile);
    $user->firstName = $userProfile->first_name;
    $user->lastName = $userProfile->last_name;
    $user->specialty = $userProfile->specialty;
    $user->avatar = $userProfile->avatar;
    logAPI($user);

    if ($user && password_verify($input->password, $user->password)) {
        $user->createSession();
    } else {
        createException('Wrong password or email', 401);
    }


    $db->commit();
    $data = UserLoginResource::getSimpleUserLogin($user);

    Response::sendResponse(['data' => $data]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}