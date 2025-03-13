<?php

class AccountResource
{
    public static function getUser(User $user, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $user->{$key};
        }

        return $newItem;
    }

    public static function getUserEmail(User $user): stdClass
    {
        $newItem = self::getUser($user, ['email']);

        return $newItem;
    }
}
