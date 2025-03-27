<?php

include_once "../../config/config.php";

$database = new Database();
$db = $database->getConnection();

try {
    $db->beginTransaction();
    checkAuthAdmin();

    $files = getFiles();

    logAPI($files);
}