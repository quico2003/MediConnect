<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'guid' => 'required|string'
    ]);

    $subject = Subject::getByGuid($db, $input->guid);
    $books = Book::getBySubject($db, $subject->id);

    if ($books) {
        foreach ($books as $book) {
            $asigneeCopies = Book::getCountOfCopiesByBookGuid($db, $book->guid);
            if ($asigneeCopies != 0)
                createException("There are " . $asigneeCopies . " students who have copies of any book of this subject");
            else {
                $copies = Copy::getAllByBookId($db, $book->id);
                foreach ($copies as $copy) {
                    $copy->delete();
                }
                $subject->delete();
                $book->delete();
            }
        }
    } else {
        $subject->delete();
    }

    $db->commit();

    Response::sendResponse([
        "data" => true
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
