<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();
    $adminId = checkAuthAdmin();

    if (!$_FILES)
        createException('No files selected');
    $files = getFiles();
    $admin = Admin::get($db, $adminId);

    foreach ($files as $index => $file) {

        $allowedExtensions = ['png', 'gif', 'jpg', 'jpeg', 'webp'];
        $fileExtension = strtolower(pathinfo($file->fileName, PATHINFO_EXTENSION));

        if (!in_array($fileExtension, $allowedExtensions)) {
            createException('Only image files (png, gif, jpg, jpeg, webp) are allowed.', 415);
        }

        $extension = "." . pathinfo($file->fileName, PATHINFO_EXTENSION);

        $filename = $admin->guid . $extension;

        $filePath = FileStorage::FilePath($filename);

        move_uploaded_file($file->tempPath, $filePath);

        $admin->avatar = FileStorage::FileURL($filename);
        $admin->update();
    }

    $db->commit();
    Response::sendResponse([
        "file" => $admin->avatar
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
