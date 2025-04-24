<?php

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