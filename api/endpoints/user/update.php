<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'id' => 'required|numeric',
        'name' => 'required|string',
        'surnames' => 'required|string',
        'phone' => 'required|string',
    ]);

    $userProfile = UserProfile::getByUserId($db, $input->id);
    $userProfile->name = $input->name;
    $userProfile->surnames = $input->surnames;
    $userProfile->phone = $input->phone;
    $userProfile->update();

    $db->commit();

    Response::sendResponse([]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
