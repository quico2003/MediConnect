<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();
    $userId = checkAuthUser();

    $user = User::get($db, $userId);
    $userProfile = UserProfile::getByUserId($db, $userId);

    $user->avatar = $userProfile->avatar;
    $user->firstName = $userProfile->first_name;
    $user->lastName = $userProfile->last_name;
    $resourceUser = UserLoginResource::getSimpleUserLogin($user);

    $db->commit();

    Response::sendResponse([
        "status" => true,
        "data" => $resourceUser
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
