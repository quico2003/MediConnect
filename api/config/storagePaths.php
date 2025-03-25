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
        return API_URL . "/endpoints/media/getMedia.php?file=$fileName";
    }
    public static function FileURLProducts(string $guid): string
    {
        return API_URL . "/endpoints/media/getMediaProducts.php?file=$guid";
    }
}
