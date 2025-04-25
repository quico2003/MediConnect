<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthUser();

    $input = validate($data, [
        "id" => "required"
    ]);

    $appointment = Appointment::get($db, $input->id);

    $appointment->delete();

    $db->commit();

    Response::sendResponse();

} catch (\Exception $th) {
    $db->rollBack();
    print_r(value: json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}