<?php

class AdminResource{

    public static function getLoginResource(Admin $admin): array{
        
        return array(
            "name" => $admin->name,
            "email" => $admin->email,
            "token" => $admin->token,
            "expiredate" => $admin->expiredate
        );

    }
}