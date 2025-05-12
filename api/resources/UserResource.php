<?php

class UserResource
{

    public static function getUser(User $user, array $params)
    {
        $newItem = new stdClass();

        $madridTimezone = new DateTimeZone('Europe/Madrid');
        $utcTimezone = new DateTimeZone('UTC');

        foreach ($params as $key) {
            $value = $user->{$key};

            if (in_array($key, ['created_at', 'updated_at']) && $value !== null) {
                $date = new DateTime($value, $utcTimezone);
                $value = $date->setTimezone($madridTimezone)->format('Y-m-d H:i:s');
            }

            $newItem->{$key} = $value;
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
        $newItem = self::getUser($user, ["guid", "email", "firstName", "lastName", "specialty", "creator", "created_at", "updated_at", "avatar"]);
        return $newItem;
    }
    
    public static function getUserProfile(User $user)
    {
        $newItem = self::getUser($user, ["guid", "email", "firstName", "lastName", "specialty", "avatar"]);
        return $newItem;
    }

    public static function getSimpleUserWithLogin(User $user)
    {
        $newItem = self::getUser($user, ["email", "firstName", "secondName", "specialty",  "avatar", "token", "expiredate"]);
        return $newItem;
    }

}