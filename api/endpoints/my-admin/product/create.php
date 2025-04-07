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

    $input = validate($_POST, [
        'name' => 'required|string',
        'category' => 'required|string',
        'price' => 'required|numeric',
        'brand' => 'required|string',
        'description' => 'required|string',
    ]);

    $category = Category::getByGuid($db, $input->category);

    $product = new Product($db);
    $product->name = $input->name;
    $product->price = $input->price;
    $product->brand = $input->brand;
    $product->description = $input->description;
    $product->created_by = $adminId;
    $product->category_id = $category->id;
    $product->uniqid = uniqid();

    $arrayImages = [];
    foreach ($files as $index => $file) {

        $allowedExtensions = ['png', 'gif', 'jpg', 'jpeg', 'webp'];
        $fileExtension = strtolower(pathinfo($file->fileName, PATHINFO_EXTENSION));

        if (!in_array($fileExtension, $allowedExtensions)) {
            createException('Only image files (png, gif, jpg, jpeg, webp) are allowed.', 415);
        }

        $extension = "." . pathinfo($file->fileName, PATHINFO_EXTENSION);

        $guid = createGUID();

        $filename = $guid . $extension;

        $filePath = FileStorage::FilePathProducts($filename);

        move_uploaded_file($file->tempPath, $filePath);

        $arrayImages[] = $filename;
    }

    $product->images = json_encode($arrayImages);

    $product->store();

    $db->commit();

    Response::sendResponse();

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}