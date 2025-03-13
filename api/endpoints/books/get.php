<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        "guid" => "required|string"
    ]);

    //check if user exist
    $book = Book::getByGuid($db, $input->guid);

    $db->commit();
    Response::sendResponse([
        "data" => $book
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
