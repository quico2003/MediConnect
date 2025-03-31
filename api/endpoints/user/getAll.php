<?php

include_once "../../config/config.php";

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

    $users = User::getAll($db, $input->page, $input->offset, $input->search, $filter);
    $usersCount = User::getAllCount($db, $input->search, $filter);


    foreach ($users as $user) {
        $userProfile = UserProfile::getById($db, $user->id);
        $admin = Admin::get($db, $user->created_by);

        $user->creator = $admin->name;
        $user->firstName = $userProfile->first_name;
        $user->secondName = $userProfile->second_name;
        $user->specialty = $userProfile->specialty;
        $user->avatar = $userProfile->avatar;

    }

    $usersResource = UserResource::getUsersArray($users);
    $totalPages = ceil($usersCount / $input->offset);

    $db->commit();
    Response::sendResponse([
        "users" => $usersResource,
        "totalPages" => $totalPages
    ]);

}  catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}