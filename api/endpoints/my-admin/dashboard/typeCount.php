<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    $input = validate($data, [
        "type" => "string"
    ]);

    $count = 0;

    switch ($input->type) {
        case 'products':
            $count = Product::getAllCount($db);
            break;
        case 'categories':
            $count = Category::getAllCount($db);
            break;
        case 'users':
            $count = User::getAllCount($db);
            break;

    }

    $db->commit();

    Response::sendResponse([
        "count" => $count
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}