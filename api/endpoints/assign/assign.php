<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'nia' => 'required|numeric',
        'subjects' => 'required|array',
        "repeater" => "required|bool",
        "course" => "required|string",
        "assignedSubjects" => "required|array"
    ]);

    logAPI($input->assignedSubjects);
    $student = Student::getByNia($db, $input->nia);
    if ($student) {
        $course = Course::getByGuid($db, $input->course);
        foreach ($input->assignedSubjects as $copyObj) {
            $copy = Copy::getByUniqId($db, $copyObj['copy_uniqid']);
            $subject = Subject::getByGuid($db, $copyObj['value']);
            logAPI($subject);
            if (History::checkIfStudentHaveSubjectAssigned($db, $subject->id, $student->id)) continue;
            $newHistory = new History($db);
            $newHistory->copy_id = $copy->id;
            $newHistory->subject_id = $subject->id;
            $newHistory->student_id = $student->id;
            $newHistory->initialstate = $copy->state;
            $newHistory->initialdate = newDate();
            $newHistory->store();
        }
    } else {
        createException("Nia not exist", 409);
    }

    $db->commit();
    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
