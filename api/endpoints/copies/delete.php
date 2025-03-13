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
    ]);

    $copy = Copy::getByGuid($db, $input->guid);
    $asigned = History::asignedCopy($db, $copy->id);
    $book = $copy->book(false);


    if ($asigned === 0) {
        $copy->delete();
        $book->stock = $book->stock - 1;
        $book->update();
    } else {
        createException("This copy is assigned to a student");
    }

    $db->commit();
    Response::sendResponse([
        "data" => true
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
