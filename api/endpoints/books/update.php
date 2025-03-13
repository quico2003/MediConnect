<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'guid' => 'required|string',
        'name' => 'required|string',
        'isbn' => 'required|string',
        'enabled' => 'required|bool',
    ]);

    $book = Book::getByGuid($db, $input->guid);
    $book->name = $input->name;
    $book->isbn = $input->isbn;
    $book->enabled = $input->enabled;
    $book->update();

    $db->commit();

    Response::sendResponse([
        "data" => true
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
