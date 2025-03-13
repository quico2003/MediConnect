<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    //check if user exist
    $courses = Course::getAllNames($db);
    $coursesFormat = CourseResource::getCoursesNamesArray($courses);

    $db->commit();
    Response::sendResponse([
        "courses" => $coursesFormat
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
