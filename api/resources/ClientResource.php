<?php

class ClientResource
{
    public static function getClient(Client $client, array $params)
    {
        $newItem = new stdClass();

        $madridTimezone = new DateTimeZone('Europe/Madrid');
        $utcTimezone = new DateTimeZone('UTC');

        foreach ($params as $key) {
            $value = $client->{$key};

            if (in_array($key, ['created_at', 'updated_at']) && $value !== null) {
                $date = new DateTime($value, $utcTimezone);
                $value = $date->setTimezone($madridTimezone)->format('Y-m-d H:i:s');
            }

            $newItem->{$key} = $value;
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

    public static function getClientsArraySection(array $clients): array
    {
        $itemsArray = [];
        foreach ($clients as $client) {
            $newItem = self::getClient($client, ["value", "label"]);
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
    
    public static function getClientResource(client $client)
    {
        $newItem = new stdClass();

        $newItem = self::getClient($client, ["guid", "first_name", "last_name", "email", "phone", "anotations", "creator_first_name", "creator_last_name"]);

        return $newItem;
    }
}