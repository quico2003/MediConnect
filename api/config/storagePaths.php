<?php

class FileStorage
{
    public static function FilePath(string $fileName = ""): string
    {
        return FILE_STORAGE_PATH . "/files/$fileName";
    }

    public static function FileURL(string $fileName): string
    {
        return API_URL . "/endpoints/media/getMedia.php?file=$fileName";
    }
}
