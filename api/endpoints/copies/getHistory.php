<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'page' => 'required|numeric',
        'offset' => 'required|numeric',
        'search' => 'sometimes|string',
        'uniqid' => 'required|string'
    ]);


    $search = isset($input->search) ? $input->search : "";

    $copy = Copy::getByUniqId($db, $input->uniqid);

    $allCopies = History::getHistoryByCopyId($db, $copy->id, $input->page, $input->offset, $search);
    $allCopiesCount = History::getHistoryByCopyIdCount($db, $copy->id,  $input->page, $input->offset, $search);

    $allCopiesFormat = HistoryResource::getCopyHistoryArray($allCopies);

    $totalPages = ceil($allCopiesCount / $input->offset);


    $db->commit();
    Response::sendResponse([
        "copies" => $allCopiesFormat,
        "totalPages" => $totalPages
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
