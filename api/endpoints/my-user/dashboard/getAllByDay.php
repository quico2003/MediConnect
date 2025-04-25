<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database ->getConnection();

$data = getInput();

try {
    $db->beginTransaction();
    $userId = checkAuthUser();

    $input = validate($data, [
        "date" => "required|string"
    ]);

    $appointments = Appointment::getAllAppointmentsByDay($db, $userId, $input->date);

    foreach ($appointments as $appointment) {
        $client = Client::get($db, $appointment->created_for);
        $appointment->title = $client->first_name;
        $appointment->start = $appointment->date;
    }

    $appointmentsResource = AppointmentResource::getAppointmentsRenderSchedule($appointments);

    Response::sendResponse([
        "data" => $appointmentsResource
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
