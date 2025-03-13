<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'uniqid' => 'required|numeric',
        'subject' => 'required|string',
    ]);

    $copy = Copy::getByUniqId($db, $input->uniqid);
    $subject = Subject::getByGuid($db, $input->subject);
    $book = Book::getBySubject($db, $subject->id);

    if ($copy) {
        // History::checkIfStudentHaveABookOfACopy($db, $copy->id);
        $isAsigned = History::checkIfCopyIsAssigned($db, $copy->id);
        if (!$isAsigned) {
            createException("The Copy is already asigned", 409);
        } else {
            $isGoodCopy = Copy::checkIfCopyIsGoodCopy($db, $copy->uniqid, $book[0]->id);
            if (!$isGoodCopy) {
                createException("This copy is not available for this subject", 0);
            } else {
                $copies = Copy::getCopiesByBookGuid($db, $book[0]->guid);
                foreach ($copies as $copy) {
                    if (History::asignedCopy($db, $copy->id) > 0) {
                        createException("The student has already been assigned this subject.", 304);
                    }
                }
            }
        }
    } else {
        createException("Copy Not Exist", 404);
    }

    $db->commit();
    Response::sendResponse([
        "uniqIdOfCopy" => $input->subject
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
