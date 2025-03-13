<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'page' => 'required|numeric',
        'offset' => 'required|numeric',
        'search' => 'sometimes|string'
    ]);

    $search = isset($input->search) ? $input->search : "";

    //check if user exist
    $students = Student::getAll($db, $input->page, $input->offset, $input->search);
    $studentsCount = Student::getAllCount($db, $input->search);

    $studentsFormat = StudentResource::getStudentsArray($students);

    $totalPages = ceil($studentsCount / $input->offset);

    $db->commit();
    Response::sendResponse([
        "students" => $studentsFormat,
        "totalPages" => $totalPages

    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
