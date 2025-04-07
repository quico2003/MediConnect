<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    $input = validate($data, [
        'page' => 'required|numeric',
        'offset' => 'required|numeric',
        'search' => 'sometimes|string',
        'filter' => 'sometimes|string'
    ]);
    $search = isset($input->search) ? $input->search : '';
    $filter = $input->filter ? json_decode($input->filter) : [];

    $categories = Category::getAll($db, $input->page, $input->offset, $input->search, $filter);
    $categoriesCount = Category::getAllCount($db, $input->search, $filter);

    $categoriesFormat = CategoryResource::getCategoriesArray($categories);
    $totalPages = ceil($categoriesCount / $input->offset);

    $db->commit();
    Response::sendResponse([
        "categories" => $categoriesFormat,
        "totalPages" => $totalPages
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}