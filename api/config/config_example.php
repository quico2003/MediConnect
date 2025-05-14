<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, X-Api-Key, Authorization");
header("Content-Type: application/x-www-form-urlencoded");
?>
<?php

//MIDDLEWARE TO CHANGE
$middleware = ''; 
$document_root = $_SERVER['DOCUMENT_ROOT'] . $middleware;

//API Config
define("IS_DEV", FALSE); // si es production FALSE
define('LOG_FILE_PATH', "$document_root/logs/mediconnect.txt"); // used in helpers utils.php 
define('LOG_ERROR_FILE_PATH', "$document_root/logs/mediconnect_errors.txt"); // used in helpers utils.php 
define('PUBLIC_API_KEY', 'Another12345Code');
define('API_URL', 'https://api.blesadev.es' . $middleware); // si es production 'http://api.blesa...'

//Database Config
define('DB_HOST', "127.0.0.1");
define('DB_NAME', 'mediconnect_db'); // nombre de la base detos
define('DB_USERNAME', ''); 
define('DB_PASSWORD', ''); 



//Files Config
define('FILE_STORAGE_PATH', "$document_root/storage");
define("MAX_THUMB_WIDTH", 500);
define("MAX_THUMB_HEIGHT", 500);

include_once $document_root . '/config/imports.php';

?>