<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();
    $userId = checkAuthUser();

    $input = validate($data, [
        'page' => 'required|numeric',
        'offset' => 'required|numeric',
        'search' => 'sometimes|string',
        'filter' => 'sometimes|string'
    ]);

    $search = isset($input->search) ? $input->search : '';
    $filter = $input->filter ? json_decode($input->filter) : [];
    
    $clients = Client::getAllByUserID($db, $input->page, $input->offset, $input->search, $filter, $userId);
    $clientsCount = Client::getAllCount($db, $input->search, $filter, $userId);

    $clientsResource = ClientResource::getClientsArray($clients);
    $totalPages = ceil($clientsCount / $input->offset);

    $db->commit();
    Response::sendResponse([
        "clients" => $clientsResource,
        "totalPages" => $totalPages
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}