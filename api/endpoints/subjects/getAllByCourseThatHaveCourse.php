<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'course' => 'required|string',
    ]);

    $course = Course::getByGuid($db, $input->course);

    $subjects = Subject::getAllSubjectsByCourseThatHaveBooks($db, $course->id);

    logAPI($subjects);

    $subjectsFinal = SubjectResource::getSubjectsNamesArray($subjects);

    $db->commit();
    Response::sendResponse([
        "subjects" => $subjectsFinal,
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
