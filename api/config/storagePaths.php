<?php

class FileStorage
{
    public static function FilePath(string $fileName = ""): string
    {
        return FILE_STORAGE_PATH . "/avatars/$fileName";
    }
    public static function FilePathProducts(string $fileName = ""): string
    {
        return FILE_STORAGE_PATH . "/products/$fileName";
    }

    public static function FileURL(string $fileName): string
    {
        return API_URL . "/endpoints/my-admin/media/getMedia.php?file=$fileName";
    }
    public static function FileURLProducts(string $fileName): string
    {
        return API_URL . "/endpoints/my-admin/media/getMediaProducts.php?file=$fileName";
    }
}
