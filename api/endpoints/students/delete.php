<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'guid' => 'required|string',
    ]);

    $student = Student::getByGuid($db, $input->guid);
    $copiesOfStudent = History::getCopiesByUserId($db, $student->id);
    if (count($copiesOfStudent) > 0) {
        createException("This student have copies assigned");
    } else {
        $student->delete();
    }
    $db->commit();

    Response::sendResponse([
        "data" => true
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
