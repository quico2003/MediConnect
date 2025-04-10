<?php

include_once "../../../config/config.php";

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();
    $userId = checkAuthUser();

    if (!$_FILES)
        createException("No files selected");
    $files = getFiles();

    $user = User::get($db, $userId);
    $userProfile = UserProfile::getByUserId($db, $user->id);

    foreach ($files as $index => $file) {

        $allowedExtensions = ['png', 'gif', 'jpg', 'jpeg', 'webp'];
        $fileExtension = strtolower(pathinfo($file->fileName, PATHINFO_EXTENSION));

        if (!in_array($fileExtension, $allowedExtensions)) {
            createException('Only image files (png, gif, jpg, jpeg, webp) are allowed.', 415);
        }

        $extension = "." . pathinfo($file->fileName, PATHINFO_EXTENSION);

        $filename = $user->guid . $extension;

        $filePath = FileStorage::FilePathUser($filename);

        move_uploaded_file($file->tempPath, $filePath);

        $userProfile->avatar = FileStorage::FileUserURL($filename);
        $userProfile->update();
    }

    $db->commit();
    Response::sendResponse([
        "file" => $userProfile->avatar
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
