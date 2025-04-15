<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();
    $userId = checkAuthUser();

    $appointments = Appointment::getAllWithOutPaginationByUserID($db, $userId);

    foreach ($appointments as $appointment) {
        $client = Client::get($db, $appointment->created_for);
        $appointment->title = $client->first_name;
        $appointment->start = $appointment->date;
    }

    $appointmentsResource = AppointmentResource::getAppointmentsRenderSchedule($appointments);
    
    Response::sendResponse([
        "appointments" => $appointmentsResource
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}