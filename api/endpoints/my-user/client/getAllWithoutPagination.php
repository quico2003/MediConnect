<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();
    $userId = checkAuthUser();

    $input = validate($data, [
        'search' => 'sometimes|string',
        'filter' => 'sometimes|string'
    ]);

    $search = isset($input->search) ? $input->search : '';
    $filter = $input->filter ? json_decode($input->filter) : [];

    $clients = Client::getAllWithOutPaginationByUserID($db,$input->search, $filter, $userId);

    $db->commit();
    Response::sendResponse([
        "clients" => $clients
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}