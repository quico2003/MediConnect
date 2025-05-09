<?php

include_once '../../../config/config.php';

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
        'lastName' => 'required|string',
        'specialty' => 'required|string',
    ]);

    $user_exist = User::getByEmail($db, $input->email);
    if (!$user_exist) {
        $user = User::getByGuid($db, $input->guid);
        $userProfile = UserProfile::getByUserId($db, $user->id);

        $user->email = $input->email;
        $userProfile->first_name = $input->firstName;
        $userProfile->last_name = $input->lastName;
        $userProfile->specialty = $input->specialty;

        $user->update();
        $userProfile->update();
    } else {
        $user = User::getByGuid($db, $input->guid);
        $userProfile = UserProfile::getByUserId($db, $user->id);
        if ($input->email === $user->email) {
            $user = User::getByGuid($db, $input->guid);
            $userProfile = UserProfile::getByUserId($db, $user->id);

            $user->email = $input->email;
            $userProfile->first_name = $input->firstName;
            $userProfile->last_name = $input->lastName;
            $userProfile->specialty = $input->specialty;

            $userProfile->update();
            $user->update();
        } else {
            createException("Email alredy exist", 409);
        }
    }


    $db->commit();

    Response::sendResponse();

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}