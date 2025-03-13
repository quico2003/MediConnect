<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'page' => 'required|numeric',
        'offset' => 'required|numeric',
        'search' => 'sometimes|string',
        'filter' => 'sometimes|string'
    ]);

    $search = isset($input->search) ? $input->search : "";
    $filter = isset($input->filter) ? json_decode($input->filter) : [];

    $subjects = Subject::getAll($db, $input->page, $input->offset, $input->search, $filter);

    $subjectsCount = Subject::getAllCount($db, $input->search, $filter);

    $subjectsFormat = SubjectResource::getSubjectsArray($subjects);

    $totalPages = ceil($subjectsCount / $input->offset);

    $db->commit();
    Response::sendResponse([
        "subjects" => $subjectsFormat,
        "totalPages" => $totalPages
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
