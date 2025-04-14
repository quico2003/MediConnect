<?php

class ClientResource
{
    public static function getClient(Client $client, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $client->{$key};
        }

        return $newItem;
    }

    public static function getClientsArray(array $clients): array
    {
        $itemsArray = [];
        foreach ($clients as $client) {
            $newItem = self::getClient($client, ["guid", "email", "first_name", "last_name", "phone"]);
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
    
    public static function getClientResource(client $client)
    {
        $newItem = new stdClass();

        $newItem = self::getClient($client, ["guid", "first_name", "last_name", "email", "phone", "creator_first_name", "creator_last_name"]);

        return $newItem;
    }
}