<?php

include_once "../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    $input = validate($data, [
        'guid' => 'required|string',
        'email' => 'required|string',
        'firstName' => 'required|string',
        'secondName' => 'required|string',
        'password' => 'required|string',
        'specialty' => 'required|string',
    ]);

    $user = User::getByGuid($db, $input->guid);
    $userProfile = UserProfile::getById($db, $user->id);

    $user->email = $input->email;
    $user->password = password_hash($input->password, PASSWORD_DEFAULT);
    $userProfile->first_name = $input->firstName;
    $userProfile->second_name = $input->secondName;
    $userProfile->specialty = $input->specialty;

    $user->update();
    $userProfile->update();

    $db->commit();

    Response::sendResponse();

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}