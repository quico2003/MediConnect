<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        "guid" => "required|string",
        "state" => "required|numeric",
        "uniqid" => "required|string",
        "observations" => "sometimes|string"
    ]);

    $studentHistory = History::getByGuid($db, $input->guid);
    $studentHistory->finaldate = newDate();
    $studentHistory->finalstate = $input->state;
    $studentHistory->observations = $input->observations;
    $studentHistory->update();

    $copy = Copy::getByUniqId($db, $input->uniqid);
    $copy->state = $input->state;
    $copy->update();

    $db->commit();
    Response::sendResponse([]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
