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

    $course = Course::getByGuid($db, $input->guid);
    $subjects = Subject::getAllSubjectsByCourse($db, $course->id);

    if ($subjects) {
        foreach ($subjects as $subject) {
            $books = Book::getBySubject($db, $subject->id);
            if ($books) {
                foreach ($books as $book) {
                    $asigneeCopies = Book::getCountOfCopiesByBookGuid($db, $book->guid);
                    if ($asigneeCopies != 0)
                        createException("There are " . $asigneeCopies . " students who have copies of this course");
                    else {
                        $copies = Copy::getAllByBookId($db, $book->id);
                        if ($copies) {
                            foreach ($copies as $copy) {
                                $copy->delete();
                            }
                            $course->delete();
                            Subject::deleteByCourse($db, $course->id);
                            $book->delete();
                        } else {
                            $course->delete();
                            Subject::deleteByCourse($db, $course->id);
                            $book->delete();
                        }
                    }
                }
            } else {
                $course->delete();
                Subject::deleteByCourse($db, $course->id);
            }
        }
    } else {
        $course->delete();
    }

    $db->commit();

    Response::sendResponse([
        "data" => true
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
