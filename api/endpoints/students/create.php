<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'nia' => 'required|numeric',
        'name' => 'required|string',
        'surname' => 'required|string',
        'phone' => 'required|string',
        'email' => 'required|string',
    ]);


    $student_exist = Student::getByNia($db, $input->nia);
    if (!$student_exist) {
        $student = new Student($db);
        $student->nia = $input->nia;
        $student->createdBy = $userid;
        $student->store();

        $studentProfile = new StudentProfile($db);
        $studentProfile->student_id = $student->id;
        $studentProfile->name = $input->name;
        $studentProfile->surnames = $input->surname;
        $studentProfile->phone = $input->phone;
        $studentProfile->email = $input->email;
        $studentProfile->store();

        $student->update(); //Needed to add profile searchdata
    } else {
        createException("Nia already exist", 409);
    }

    $db->commit();

    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
