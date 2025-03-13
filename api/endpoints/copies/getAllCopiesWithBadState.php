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

    $copies = Copy::getAllBadCopiesWithCourseFilter($db, $input->page, $input->offset, $input->search, $filter);
    $copiesCount = Copy::getAllBadCopiesCountWithCourseFilter($db, $input->search, $filter);

    $copiesFormat = CopyResource::getCopiesArrayListDashboard($copies);


    $totalPages = 0;
    if (count($copiesFormat) > 0)
        $totalPages = ceil($copiesCount / $input->offset);

    $db->commit();
    Response::sendResponse([
        "copies" => $copiesFormat,
        "totalPages" => $totalPages
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
