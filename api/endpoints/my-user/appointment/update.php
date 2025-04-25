<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthUser();
    
    $input = validate($data, [
        "reason" => "required|string",
        "date" => "required|string"
    ]);

    $appointment = Appointment::get($db, $input->id);

    $appointment->reason = $input->reason;
    $appointment->date = $input->date;

    $appointment->update();

    $db->commit();

    Response::sendResponse();

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}