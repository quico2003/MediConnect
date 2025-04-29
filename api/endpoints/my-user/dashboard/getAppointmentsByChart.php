<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();
    $userId = checkAuthUser();

    $complete = Appointment::getAllCountComplete($db, $userId);
    $deleted = Appointment::getAllCountDeleted($db, $userId);
    $pending = Appointment::getAllCountPeending($db, $userId);

    $appointments = [
        [
            "name" => "completed",
            "value" => $complete,
        ],
        [
            "name" => "deleted",
            "value" => $deleted,
        ],
        [
            "name" => "pending",
            "value" => $pending
        ]
    ];

    $db->commit();

    Response::sendResponse([
        "appointments" => $appointments
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}