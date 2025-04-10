<?php

class UserLoginResource
{

    public static function getUser(User $user, array $params)
    {
        $newItem = new stdClass();
        foreach ($params as $key) {
            $newItem->{$key} = $user->{$key};
        }
        return $newItem;
    }

    public static function getSimpleUserLogin(User $user)
    {
        $newItem = self::getUser($user, ["guid", "email", "firstName", "lastName", "avatar", "token", "expiredate", "first_login"]);
        return $newItem;
    }

}