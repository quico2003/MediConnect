<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        "uniqid" => "required|string"
    ]);

    logAPI($input->uniqid);

    //check if user exist
    $copy = Copy::getByUniqId($db, $input->uniqid);

    $copyFormat = CopyResource::getCopyFormatWithAll($copy);


    $db->commit();
    Response::sendResponse([
        "data" => $copyFormat
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
