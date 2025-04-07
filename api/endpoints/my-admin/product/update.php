<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

try {

    $db->beginTransaction();
    checkAuthAdmin();

    $input = validate($_POST, [
        'guid' => 'required|string',
        'name' => 'required|string',
        'category' => 'required|string',
        'price' => 'required|numeric',
        'brand' => 'required|string',
        'description' => 'required|string',
    ]);

    if ($_FILES) {
        $files = getFiles();
    }
    //     createException('No files selected');

    $product = Product::getByGuid($db, $input->guid);
    $category = Category::getByGuid($db, $input->category);

    $product->name = $input->name;
    $product->category_id = $category->id;
    $product->price = $input->price;
    $product->brand = $input->brand;
    $product->description = $input->description;

    if (isset($files)) {
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


        if (json_decode($product->images)) {
            $updatedImages = array_merge($arrayImages, json_decode($product->images));
        } else {
            $updatedImages = $arrayImages;
        }

        $product->images = json_encode($updatedImages);
    }

    if ($input->deleteImages) {
        $arrayProductsImages = json_decode($product->images);

        $guidsToDelete = json_decode($input->deleteImages);

        $arrayProductsImages = array_filter($arrayProductsImages, function ($imageGuid) use ($guidsToDelete) {
            return !in_array($imageGuid, $guidsToDelete);
        });

        $arrayProductsImages = array_values($arrayProductsImages);

        foreach ($guidsToDelete as $guidToDelete) {
            $ruta = FileStorage::FilePathProducts($guidToDelete);
            if (file_exists($ruta)) {
                unlink($ruta);
            }
        }

        $product->images = json_encode($arrayProductsImages);
    }



    $product->update();


    $db->commit();

    Response::sendResponse([]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}