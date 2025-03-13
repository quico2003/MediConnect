<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'abbr' => 'required|string',
        "name" => "required|string",
        "season" => "required|string"
    ]);

    $course = new Course($db);
    $course->abbr = Strtoupper($input->abbr);
    $course->name = $input->name;
    $course->season = $input->season;
    $course->store();

    $db->commit();

    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
