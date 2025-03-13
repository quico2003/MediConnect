<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    //check if user exist
    $subjects = Subject::getAllNames($db);
    $subjectsFormat = SubjectResource::getSubjectsNamesArray($subjects);

    $db->commit();
    Response::sendResponse([
        "subjects" => $subjectsFormat
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
