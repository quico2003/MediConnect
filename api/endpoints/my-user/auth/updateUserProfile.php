<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthUser();

    $input = validate($data, [
        "guid" => "required|string",
        "firstName" => "required|string",
        "lastName" => "required|string",
        "specialty" => "required|string",
    ]);

    $user = User::getByGuid($db, $input->guid);
    $userProfile = UserProfile::getByUserId($db, $user->id);

    $userProfile->first_name = $input->firstName;
    $userProfile->last_name = $input->lastName;
    $userProfile->specialty = $input->specialty;

    $user->update();
    $userProfile->update();

    $db->commit();

    Response::sendResponse();
    
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}