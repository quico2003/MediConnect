<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        "nia" => "required|numeric"
    ]);

    //check if user exist
    $student = Student::getByNia($db, $input->nia);

    $studentHistoryResource = [];
    if ($student) {

        $studentHistory = History::getCopiesByUserId($db, $student->id);

        $studentHistoryResource = HistoryResource::getHistoryArray($studentHistory);

    } else {
        createException("Nia not exist", 409);
    }

    $db->commit();
    Response::sendResponse([
        "data" => $studentHistoryResource
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
