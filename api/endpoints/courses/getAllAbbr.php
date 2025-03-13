<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    $courses = Course::getAllWithoutPaginationToFilter($db);

    $coursesFormat = CourseResource::getCoursesAbbrArray($courses);


    $db->commit();
    Response::sendResponse([
        "courses" => $coursesFormat,
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
