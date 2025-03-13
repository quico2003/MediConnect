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
        'abbr' => 'required|string',
        'name' => 'required|string',
    ]);

    $course = Course::getByGuid($db, $input->guid);
    $course->name = $input->name;
    $course->abbr = $input->abbr;
    $course->update();

    $db->commit();

    Response::sendResponse([
        "data" => true
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
