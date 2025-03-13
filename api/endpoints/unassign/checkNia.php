<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        "nia" => "required|numeric"
    ]);

    //check if user exist
    $student = Student::getByNia($db, $input->nia);

    if (!$student) {
        createException("Nia not exist", 409);
    } else {
        $studentFormat = StudentResource::getStudentWithProfile($student);
    }

    $db->commit();
    Response::sendResponse([
        "data" => $studentFormat
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
