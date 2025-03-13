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
        'book_guid' => 'required|string'
    ]);

    $search = isset($input->search) ? $input->search : "";


    $book = Book::getByGuid($db, $input->book_guid);

    //check if user exist
    $copies = Copy::getAllByBook($db, $book->id, $input->page, $input->offset, $input->search);

    $copiesFormat = CopyResource::getCopiesArray($copies);
    $copiesCount = Copy::getAllCount($db, $book->id, $input->search);

    $totalPages = ceil($copiesCount / $input->offset);


    $db->commit();
    Response::sendResponse([
        "copies" => $copiesFormat,
        "totalPages" => $totalPages
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
