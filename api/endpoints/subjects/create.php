<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'name' => 'required|string',
        'abbr' => 'required|string',
        'course' => 'required|string',
    ]);

    $course = Course::getByGuid($db, $input->course);

    $subject = new Subject($db);
    $subject->name = $input->name;
    $subject->course_id = $course->id;
    $subject->abbr = Strtoupper($input->abbr);
    $subject->store();

    $db->commit();

    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
