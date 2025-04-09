<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    $input = validate($data, [
        "guid" => "required|string"
    ]);

    $user = User::getByGuid($db, $input->guid);

    $userProfile = UserProfile::getByUserId($db, $user->id);

    $admin = Admin::get($db, $user->created_by);

    $user->creator = $admin->name;
    $user->firstName = $userProfile->first_name;
    $user->secondName = $userProfile->last_name;
    $user->specialty = $userProfile->specialty;
    $user->avatar = $userProfile->avatar;

    $usersResource = UserResource::getSimpleUser($user);

    $db->commit();
    Response::sendResponse(["data" => $usersResource]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}