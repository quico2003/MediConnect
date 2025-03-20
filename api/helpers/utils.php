<?php
require_once $document_root . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;

const publicAPIKey = PUBLIC_API_KEY;


if (!function_exists('logAPI')) {
    function logAPI($content)
    {
        if (IS_DEV) {
            $content = json_encode($content);
            $date = new DateTime();
            $strDate = $date->format("y:m:d h:i:s");
            file_put_contents(LOG_FILE_PATH, $strDate . PHP_EOL . str_repeat('-', strlen($content)) . PHP_EOL . $content . PHP_EOL . str_repeat('-', strlen($content)) . PHP_EOL . PHP_EOL, FILE_APPEND | LOCK_EX);
        }
    }
}

if (!function_exists('logError')) {
    function logError($content)
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {

            if (IS_DEV) {
                $backfiles = debug_backtrace();

                $content = json_encode($content);
                $date = new DateTime();
                $strDate = $date->format("y:m:d h:i:s");
                file_put_contents(LOG_ERROR_FILE_PATH, $strDate . $backfiles[0]['file'] . PHP_EOL . str_repeat('-', strlen($content)) . PHP_EOL . $content . PHP_EOL . str_repeat('-', strlen($content)) . PHP_EOL . PHP_EOL, FILE_APPEND | LOCK_EX);
            }
        }
    }
}

if (!function_exists('postInput')) {
    function postInput()
    {
        $body = trim(file_get_contents('php://input'));
        $data = json_decode(html_entity_decode($body), true);
        return $data;
    }
}

if (!function_exists('getInput')) {
    function getInput()
    {
        $array_inputs = array();
        foreach ($_GET as $key => $value) {
            $array_inputs[$key] = $value;
        }
        return $array_inputs;
    }
}

if (!function_exists('createGUID')) {
    function createGUID()
    {
        return sprintf(
            '%04X%04X-%04X-%04X-%04X-%04X%04X%04X',
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(16384, 20479),
            mt_rand(32768, 49151),
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(0, 65535)
        );
    }
}

if (!function_exists('createRandomNumber')) {
    function createRandomNumber()
    {
        $number1 = mt_rand(0, 9);
        $number2 = str_pad(mt_rand(0, 999999), 6, "0", STR_PAD_LEFT);
        $number3 = str_pad(mt_rand(0, 999999), 6, "0", STR_PAD_LEFT);

        return "$number1$number2$number3";
    }
}

if (!function_exists('getFiles')) {
    function getFiles()
    {
        $arrayFiles = [];
        foreach (sanitizeFiles($_FILES['file']) as $files) {
            $newstd = new stdClass();
            $newstd->fileName = $files['name'];
            $newstd->tempPath = $files['tmp_name'];
            $newstd->fileSize = $files['size'];
            $newstd->type = $files['type'];
            // $newstd->type = $files['type'] === "application/octet-stream" ? "video/quicktime" : $files['type'];
            $arrayFiles[] = $newstd;
        }

        return $arrayFiles;
    }
}

if (!function_exists('sanitizeFiles')) {
    function sanitizeFiles(&$file_post)
    {
        $file_arr = array();
        $file_count = count($file_post['name']);
        $file_keys = array_keys($file_post);

        for ($i = 0; $i < $file_count; $i++) {
            foreach ($file_keys as $key) {
                $file_arr[$i][$key] = $file_post[$key][$i];
            }
        }

        return $file_arr;
    }
}

if (!function_exists('createToken')) {
    function createToken()
    {
        $token = openssl_random_pseudo_bytes(32);
        //Convert the binary data into hexadecimal representation.
        $token = bin2hex($token);
        return $token;
    }
}

if (!function_exists('createException')) {
    function createException($message, $code = 400)
    {
        $error = new CustomException();

        $msg = $message["message"] ?? $message;
        $error->setMessage(json_encode($msg), $code);
        throw $error;
    }
}

if (!function_exists('checkAPIKey')) {
    function checkAPIKey($apiKey)
    {

        if ($apiKey !== PUBLIC_API_KEY) {
            createException("Invalid API Key");
        }
        return true;
    }
}

if (!function_exists('newDate')) {
    function newDate(int $amount = null, string $type = null, string $format = 'Y-m-d H:i:s')
    {
        $today = new DateTime('now');
        if ($amount !== null && $type !== null)
            $today->modify("+$amount $type");
        return $today->format($format);
    }
}

if (!function_exists('validate')) {
    function validate($data, $rules = [], $apikey = true)
    {
        $newValidator = new Validator();
        $newValidator->validation_rules = $rules;

        $input = $newValidator->to_array($data);

        foreach ($rules as $key => $value) {
            if (!isset($input->$key)) {
                $input->$key = false;
            }
        }
        return $input;
    }
}


if (!function_exists('checkAuthAdmin')) {
    function checkAuthAdmin($checkToken = true)
    {
        $allheaders = getallheaders();

        $apikey = isset($allheaders['X-Api-Key']) ? $allheaders['X-Api-Key'] : false;

        if ($apikey !== PUBLIC_API_KEY)
            createException('Api Key not valid', 403);
        if ($checkToken) {
            $database = new Database();
            $db = $database->getConnection();
            $token = isset($allheaders['Authorization']) ? $allheaders['Authorization'] : false;
            $adminId = Admin::checkToken($db, $token);
            $database->conn = null;
            if ($adminId) {
                return $adminId;
            } else {
                createException("Token Expired", 401);
            }
        }
    }
}

if (!function_exists('sendEmail')) {
    function sendEmail($to, $subject, $body, $cc = [])
    {
        if (ALLOW_EMAIL_SENDING) {

            $mail = new PHPMailer(true);
            $mail->SMTPDebug = 3; // SMTP debug output
            $mail->isSMTP();
            $mail->Host = SMTP_HOST;
            $mail->SMTPAuth = true;
            $mail->Username = SMTP_USERNAME; // SMTP username
            $mail->Password = SMTP_PASSWORD; // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable implicit TLS encryption
            $mail->Port = 465;
            $mail->CharSet = 'UTF-8';
            $mail->setFrom('sender@ecobook.soulxvintage.es');
            $mail->addAddress($to); // Add a recipient
            foreach ($cc as $mailCC) {
                $mail->addCC($mailCC);
            }
            $mail->isHTML(true); // Set email format to HTML
            $mail->Subject = $subject;
            $mail->Body = $body;

            if ($mail->send()) {
                echo "<h2> Sent OK</h2>";
            } else {
                echo "<h2> ERROR</h2>";
            }
        }
    }
}

if (!function_exists('doPagination')) {
    function doPagination($valuesAmount, $page, &$query)
    {
        if (is_numeric($valuesAmount) && is_numeric($page) && ($valuesAmount >= 0) && ($page > 0)) {
            $startPosition = $valuesAmount * ($page - 1);
            $query .= " LIMIT " . $startPosition . ", " . $valuesAmount;
        }
    }
}

if (!function_exists('applySearchOnQuery')) {
    function applySearchOnQuery(string &$query): void
    {
        $query .= " AND LOWER(searchdata) LIKE LOWER(:search)";
    }
}

if (!function_exists('applySearchOnBindedValue')) {
    function applySearchOnBindedValue(string $search, PDOStatement &$stmt): void
    {
        $stmt->bindValue(":search", "%" . $search . "%");
    }
}

if (!function_exists('convertSearchValues')) {
    function convertSearchValues($values)
    {
        $string = '';
        foreach ($values as $value) {
            $type = gettype($value);
            if ($type === "array") {
                $from = $value['from'];
                $what = $value['what'];
                if ($from) {
                    foreach ($what as $key) {
                        if (str_contains($key, '.')) {
                            $split = explode('.', $key);
                            $function = $split[0];
                            $column = $split[1];
                            if ($function === 'book') {
                                // Proporcionar un valor booleano adecuado aquí
                                $string .= $from->{$function}(false)->{$column} . " ";
                            } elseif ($function === 'course') {
                                // Proporcionar un argumento adecuado aquí
                                $string .= $from->{$function}(false)->{$column} . " ";
                            } else {
                                $string .= $from->{$function}()->{$column} . " ";
                            }
                        } else {
                            $string .= $from->$key . " ";
                        }
                    }
                }
            } else
                $string .= "$value ";
        }
        logAPI("HOL");
        logAPI($string);
        return $string;
    }
}
