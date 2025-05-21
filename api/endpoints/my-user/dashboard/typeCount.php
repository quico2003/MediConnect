<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();

    $userId = checkAuthUser();

    $input = validate($data, [
        "type" => "string"
    ]);

    $count = 0;

    switch ($input->type) {
        case 'clients':
            $count = Client::getAllCountByUser($db, "", [], $userId);
            break;
        case 'appointments':
            $count = Appointment::getAllCount($db, $userId);
            break;

    }

    $db->commit();

    Response::sendResponse([
        "count" => $count
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}