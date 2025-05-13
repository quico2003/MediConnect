<?php

use Carbon\Carbon;

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();
    checkAuthUser();

    $input = validate($data, [
        "guid" => "required|string"
    ]);


    $client = Client::getByGuid($db, $input->guid);
    
    $timeZoneCreated_at = Carbon::createFromFormat('Y-m-d H:i:s', $client->created_at, 'UTC')->timezone('Europe/Madrid');
    $timeZoneUpdated_at = Carbon::createFromFormat('Y-m-d H:i:s', $client->updated_at, 'UTC')->timezone('Europe/Madrid');

    $client->created_at = $timeZoneCreated_at;
    $client->updated_at = $timeZoneUpdated_at;

    $user = User::get($db, $client->created_by);
    $userProfile = UserProfile::getByUserId($db, $user->id);

    $client->creator_first_name = $userProfile->first_name;
    $client->creator_last_name = $userProfile->last_name;

    $clientResource = ClientResource::getClientResource($client);

    Response::sendResponse([
        "data" => $clientResource
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}