<?php

class UserResource
{

    public static function getUser(User $user, array $params)
    {
        $newItem = new stdClass();
        foreach ($params as $key){
            $newItem->{$key} = $user->{$key};
        }
        return $newItem;
    }

    public static function getUsersArray(array $users): array
    {
        $itemsArray = [];
        foreach ($users as $user) {
            $newItem = self::getUser($user, ["guid", "email", "firstName", "secondName", "specialty"]);
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }

    public static function getSimpleUser(User $user)
    {
        $newItem = self::getUser($user, ["guid", "email", "firstName", "secondName", "specialty", "creator", "created_at", "updated_at", "avatar"]);
        return $newItem;
    }

    public static function getSimpleUserWithLogin(User $user)
    {
        $newItem = self::getUser($user, ["email", "firstName", "secondName", "specialty",  "avatar", "token", "expiredate"]);
        return $newItem;
    }

}