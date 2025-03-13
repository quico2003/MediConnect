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

    $subject = Subject::getByGuid($db, $input->guid);
    $subject->name = $input->name;
    $subject->abbr = $input->abbr;
    $subject->update();

    $db->commit();

    Response::sendResponse([
        "data" => true
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
