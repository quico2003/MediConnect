<?php
include_once $document_root . '/helpers/http_codes.php';
class Response
{

    public static function sendResponse(array $data = [])
    {
        $response = array(
            'status' => true,
        );

        if ($data) {
            $response = array_merge($response, $data);
        }
        get_http_code(200);
        return print_r(json_encode($response));
    }
    public static function sendError($message = '', $code = 404)
    {
        logError($message);
        $response = array(
            'status' => false,
            'message' => $message
        );
        get_http_code($code);
        return print_r(json_encode($response));
    }
}
