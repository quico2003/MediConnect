<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {
    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'guid' => 'required|string'
    ]);

    $book = Book::getByGuid($db, $input->guid);

    $copies = Copy::getAllByBookId($db, $book->id);

    $codesFormat = CopyResource::getCopiesCodes($copies);


    $db->commit();
    Response::sendResponse([
        "codes" => $codesFormat,
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
