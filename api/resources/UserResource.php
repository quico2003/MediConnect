<?php

class UserResource
{
    private static function getUser(User $user, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $user->{$key};
        }

        return $newItem;
    }

    private static function getUsersArray(array $users, array $params)
    {
        $items = [];

        foreach ($users as $user) {
            $items[] = self::getUser($user, $params);
        }

        return $items;
    }

    public static function getLoginResource(User $user): array
    {
        $profile = $user->profile();
        return array(
            "token" => $user->token,
            "email" => $user->email,
            "fullName" => $profile->name . " " . $profile->surnames
        );
    }
}
