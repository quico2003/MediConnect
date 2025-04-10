<?php

class FileStorage
{
    public static function FilePathAdmin(string $fileName = ""): string
    {
        return FILE_STORAGE_PATH . "/avatars/admin/$fileName";
    }
    public static function FilePathUser(string $fileName = ""): string
    {
        return FILE_STORAGE_PATH . "/avatars/user/$fileName";
    }
    public static function FilePathProducts(string $fileName = ""): string
    {
        return FILE_STORAGE_PATH . "/products/$fileName";
    }

    public static function FileAdminURL(string $fileName): string
    {
        return API_URL . "/endpoints/my-admin/media/getMedia.php?file=$fileName";
    }
    
    public static function FileUserURL(string $fileName): string
    {
        return API_URL . "/endpoints/my-user/media/getMedia.php?file=$fileName";
    }
    public static function FileURLProducts(string $fileName): string
    {
        return API_URL . "/endpoints/my-admin/media/getMediaProducts.php?file=$fileName";
    }
}
