<?php

include_once "../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    $adminId = checkAuthAdmin();

    $input = validate($data, [
        'email' => 'required|string',
        'firstName' => 'required|string',
        'lastName' => 'required|string',
        'password' => 'required|string',
        'specialty' => 'required|string',
    ]);

    $user_exist = User::getByEmail($db, $input->email);
    if (!$user_exist) {
        $user = new User($db);
        $user->email = $input->email;
        $user->password = password_hash($input->password, PASSWORD_DEFAULT);
        $user->created_by = $adminId;
        $user->store();

        $userProfile = new UserProfile($db);
        $userProfile->user_id = $user->id;
        $userProfile->first_name = $input->firstName;
        $userProfile->second_name = $input->lastName;
        $userProfile->specialty = $input->specialty;
        $userProfile->avatar = "https://www.gravatar.com/avatar/$user->email?d=identicon";
        $userProfile->store();

        $user->update();

    } else {
        createException("Email alredy exist", 409);
    }

    $db->commit();

    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
