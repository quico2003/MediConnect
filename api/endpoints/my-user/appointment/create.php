<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    $userId = checkAuthUser();

    $input = validate($data, [
        "created_for" => "required|string",
        "reason" => "required|string",
        "date" => "required|string",
    ]);

    $appointment = new Appointment($db);
    $client = Client::getByGuid($db, $input->created_for);
    $appointment->created_by = $userId;
    $appointment->created_for = $client->id;
    $appointment->date = $input->date;
    $appointment->reason = $input->reason;

    $appointment->store();
    $db->commit();

    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}