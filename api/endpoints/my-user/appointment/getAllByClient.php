<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();
    $id = checkAuthUser();

    $input = validate($data, [
        "guid" => "required|string",
        'page' => 'required|numeric',
        'offset' => 'required|numeric',
        'filter' => 'sometimes|string'
    ]);

    $filter = $input->filter ? json_decode($input->filter) : [];

    $client = Client::getByGuid($db, $input->guid);
    $user = User::get($db, $id);

    $appointmens = Appointment::getByClient($db, $input->page, $input->offset, $filter, $client->id);
    $appointmensCount = Appointment::getByClientCount($db, $filter, $client->id);

    foreach ($appointmens as $appointmen) {
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