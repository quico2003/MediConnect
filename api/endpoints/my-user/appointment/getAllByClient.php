<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();
    checkAuthUser();

    $input = validate($data, [
        "guid" => "required|string",
        'page' => 'required|numeric',
        'offset' => 'required|numeric'
    ]);

    $client = Client::getByGuid($db, $input->guid);

    $appointmens = Appointment::getByClient($db, $input->page, $input->offset, $client->id);
    $appointmensCount = Appointment::getByClientCount($db, $client->id);

    foreach ($appointmens as $appointmen) {
        $user = User::getWithoutDeleted($db, $appointmen->created_by);
        $userProfile = UserProfile::getByUserId($db, $user->id);
        $appointmen->doctor = $userProfile->first_name;
        $appointmen->client = $client->first_name;
    }

    $totalPages = ceil($appointmensCount / $input->offset);

    $db->commit();

    Response::sendResponse([
        "appointments" => $appointmens,
        "totalPages" => $totalPages
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}