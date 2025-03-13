<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'name' => 'required|string',
        'subject' => 'required|string',
        'isbn' => 'required|string',
        'stock' => 'required|numeric'
    ]);

    $existBook = Book::getByIsbn($db, $input->isbn);

    if (!$existBook) {
        $subject = Subject::getByGuid($db, $input->subject);

        $book = new Book($db);
        $book->name = $input->name;
        $book->subject_id = $subject->id;
        $book->isbn = $input->isbn;
        $book->stock = $input->stock;
        $book->store();

        for ($i = 0; $i < $book->stock; $i++) {
            $newCopy = new Copy($db);
            $newCopy->book_id = $book->id;
            $newCopy->store();
        }
    } else {
        createException("ISBN already exist", 409);
    }

    $db->commit();

    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
