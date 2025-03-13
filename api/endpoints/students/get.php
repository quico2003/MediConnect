<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        "guid" => "required|string"
    ]);

    //check if user exist
    $student = Student::getByGuid($db, $input->guid);
    $studentFormat = StudentResource::getStudentWithProfile($student);

    $db->commit();
    Response::sendResponse([
        "data" => $studentFormat
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
