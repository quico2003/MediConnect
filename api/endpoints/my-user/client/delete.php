<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    checkAuthUser();

    $input = validate($data, [
        "guid" => "required|string"
    ]);

    $client = Client::getByGuid($db, $input->guid);
logAPI($client);

    $client->delete();

    logAPI($client);

    $db->commit();

    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}