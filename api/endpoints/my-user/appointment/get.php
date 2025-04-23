<?php

include_once "../../../config/config.php";

use Carbon\Carbon;

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();
    checkAuthUser();

    $input = validate($data, [
        "id" => "required"
    ]);

    $appointment = Appointment::get($db, $input->id);
    $carbonDate = Carbon::createFromFormat("d-m-Y H:i", $appointment->date);
    $date = $carbonDate->format("d-m-Y");
    $hour = $carbonDate->format("H");

    $appointment->date = $date;
    $appointment->hour = $hour;
    $appointmentResource = AppointmentResource::getAppointmentEdit($appointment);

    $db->commit();
    Response::sendResponse([
        "data"=>$appointmentResource
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}