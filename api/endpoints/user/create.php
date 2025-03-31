<?php

include_once "../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    $adminId = checkAuthAdmin();

    logAPI($adminId);

    $input = validate($data, [
        'email' => 'required|string',
        'firstName' => 'required|string',
        'lastName' => 'required|string',
        'password' => 'required|string',
        'specialty' => 'required|string',
    ]);

    logAPI($input);

    $doctor_exist = User::getByEmail($db, $input->email);
    if (!$doctor_exist) {
        $doctor = new User($db);
        $doctor->email = $input->email;
        $doctor->password = $input->password;
        $doctor->created_by = $adminId;
        $doctor->store();

        $doctorProfile = new UserProfile($db);
        $doctorProfile->user_id = $doctor->id;
        $doctorProfile->first_name = $input->firstName;
        $doctorProfile->second_name = $input->lastName;
        $doctorProfile->specialty = $input->specialty;
        $doctorProfile->store();

        
        logAPI($doctor);
        logAPI($doctorProfile);

        $doctor->update();

    }else{
        createException("Email alredy exist", 409);
    }

    $db->commit();

    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
