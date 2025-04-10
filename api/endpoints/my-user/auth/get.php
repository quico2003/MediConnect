<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();
    $userId = checkAuthUser();

    $user = User::get($db, $userId);
    $userProfile = UserProfile::getByUserId($db, $user->id);
    $user->firstName = $userProfile->first_name;
    $user->lastName = $userProfile->last_name;
    $user->specialty = $userProfile->specialty;
    $user->avatar = $userProfile->avatar;

    $resourceUser = UserResource::getUserProfile($user);

    $db->commit();
    Response::sendResponse([
        "data" => $resourceUser
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}