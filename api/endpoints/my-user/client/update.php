<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database ->getConnection();

$data = postInput();

try {
    $db -> beginTransaction();
    checkAuthUser();

    $input = validate($data, [
        "guid" => "required|string",
        "first_name" => "required|string",
        "last_name" => "required|string",
        "email" => "required|string",
        "phone" => "required|string"
    ]);

    $client = Client::getByGuid($db, $input->guid);

    $client->first_name = $input->first_name;
    $client->last_name = $input->last_name;
    $client->email = $input->email;
    $client->phone = $input->phone;

    $client->update();

    $db->commit();

    Response::sendResponse();

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}