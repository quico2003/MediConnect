<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'state' => 'required|numeric',
        "book_guid" => "required|string"
    ]);

    $book = Book::getByGuid($db, $input->book_guid);

    if ($book) {
        $copy = new Copy($db);
        $copy->state = $input->state;
        $copy->book_id = $book->id;
        $copy->store();
        $book->stock = $book->stock + 1;
        $book->update();
    }

    $db->commit();

    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
