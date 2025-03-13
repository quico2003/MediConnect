<?php


class CustomException extends Exception
{
    public function setMessage($message, $code)
    {
        $this->message = $message;
        $this->code = $code;
   
    }
}
