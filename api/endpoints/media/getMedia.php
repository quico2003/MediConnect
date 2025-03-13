<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();

try {
    $db->beginTransaction();

    $input = validate($data, [
        'file' => "required|string",
    ]);

    $path = FileStorage::FilePath($input->file);

    $file = fopen($path, 'r');

    $mime = mime_content_type($path);
    $size = filesize($path);

    header("Content-Type: $mime");
    header("Content-Length: $size");

    fpassthru($file);
    exit;
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
