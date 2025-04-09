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
        $newItem = self::getUser($user, ["email", "firstName", "lastName", "specialty", "avatar", "token", "expiredate"]);
        return $newItem;
    }

}