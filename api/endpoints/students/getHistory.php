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
        'search' => 'sometimes|string',
        'guid' => 'required|string'
    ]);


    $search = isset($input->search) ? $input->search : "";

    $student = Student::getByGuid($db, $input->guid);
    $AllCopies = History::getHistoryByUserId($db, $student->id, $input->page, $input->offset, $input->search);

    $AllCopiesCount = History::getHistoryByUserIdCount($db, $student->id,  $input->page, $input->offset, $input->search);

    $AllCopiesFormat = HistoryResource::getStudentHistoryArray($AllCopies);

    $totalPages = ceil($AllCopiesCount / $input->offset);

    $db->commit();
    Response::sendResponse([
        "student" => $AllCopiesFormat,
        "totalPages" => $totalPages
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
