<?php

include_once '../../config/config.php';


$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    checkAuth(false);

    $input = validate($data, [
        'email' => 'required|email',
        'password' => 'required|min:6',
        'name' => 'required|string',
        'surnames' => 'required|string',
    ]);

    $newUser = new User($db);
    $newUser->email = $input->email;
    $newUser->password = password_hash($input->password, PASSWORD_DEFAULT);
    $newUser->store();
    $newProfile = new UserProfile($db);
    $newProfile->user_id = $newUser->id;
    $newProfile->name = $input->name;
    $newProfile->surnames = $input->surnames;
    $newProfile->store();
    //https://www.gravatar.com/avatar/$input->email?d=identicon

    $db->commit();

    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
