<?php

include_once "../../config/config.php";

$database = new Database();
$db = $database->getConnection();

try {

    $db->beginTransaction();
    checkAuthAdmin();

    $input = validate($_POST, [
        'name' => 'required|string',
        'category' => 'required|string',
        'price' => 'required|numeric',
        'brand' => 'required|string',
        'description' => 'required|string',
    ]);

    logAPI($input);
    

    

}catch(\Exception $th){
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}