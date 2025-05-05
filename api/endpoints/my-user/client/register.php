<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = postInput();

try {
    $db->beginTransaction();
    $userId = checkAuthUser();

    $input = validate($data, [
        "firstName" => "required|string",
        "lastName" => "required|string",
        "email" => "required|string",
        "phone" => "required|string",
        "anotations" => "required|string",
    ]);

    $client_exist = Client::getByEmail($db, $input->email);
    if (!$client_exist) {
        $client = new Client($db);
        $client->first_name = $input->firstName;
        $client->last_name = $input->lastName;
        $client->email = $input->email;
        $client->phone = $input->phone;
        $client->anotations = $input->anotations;
        $client->created_by = $userId;

        $client->store();

    }else {
        createException("Email alredy exist", 409);
    }

    $db->commit();
    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
