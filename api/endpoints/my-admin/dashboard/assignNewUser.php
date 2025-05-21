<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    $input = validate($data, [
        "clientGuid" => "required|string",
        "userGuid" => "required|string"
    ]);

    $client = Client::getByGuid($db, $input->clientGuid);
    $user = User::getByGuid($db, $input->userGuid);

    $client->created_by = $user->id;

    $client->update();

    $db->commit();

    Response::sendResponse();
    
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
