<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();

    $input = validate($data, [
        "type" => "required|string"
    ]);

    switch ($input->type) {
        case 'users':
            $count = User::getAllCount($db, "", []);
            break;
        case 'products':
            $count = Product::getAllCount($db, "", []);
            break;
        case 'clients':
            $count = Client::getAllCountWithoutUser($db);
            break;
    }

    $db->commit();

    Response::sendResponse([
        "count" => $count
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
