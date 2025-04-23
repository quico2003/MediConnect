<?php

include_once "../../../config/config.php";

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
    $client = Client::get($db, $appointment->created_for);

    $appointment->client = $client->first_name;
    $appointment->client_phone = $client->phone;
    $appointment->client_email = $client->email;

    $appointmentResource = AppointmentResource::getAppointmentView($appointment);

    Response::sendResponse([
        "data" => $appointmentResource
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}