<?php

use Carbon\Carbon;


include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthUser();

    $input = validate($data, [
        "dateFormat" => "required|string"
    ]);

    $appointments = Appointment::getDateByDay($db, $input->dateFormat);

    $hora = [];
    foreach ($appointments as $appointment) {
        $carbonDate = Carbon::createFromFormat("d-m-Y H:i", $appointment["date"]);
        $hora[] = $carbonDate->format("H");
    }

    $db->commit();

    Response::sendResponse([
        "data"=>$hora
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}