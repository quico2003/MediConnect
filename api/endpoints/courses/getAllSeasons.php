<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    $courses = Course::getAllWithoutPaginationToFilterSeasons($db);

    $seasons = CourseResource::getCoursesSeasonArray($courses);


    $db->commit();
    Response::sendResponse([
        "seasons" => $seasons,
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
