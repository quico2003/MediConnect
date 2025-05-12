<?php

class AppointmentResource
{
    public static function getAppointment(Appointment $appointment, array $params)
    {
        $newItem = new stdClass();

        $madridTimezone = new DateTimeZone('Europe/Madrid');
        $utcTimezone = new DateTimeZone('UTC');

        foreach ($params as $key) {
            $value = $appointment->{$key};

            if (in_array($key, ['created_at', 'updated_at']) && $value !== null) {
                $date = new DateTime($value, $utcTimezone);
                $value = $date->setTimezone($madridTimezone)->format('Y-m-d H:i:s');
            }

            $newItem->{$key} = $value;
        }

        return $newItem;
    }

    public static function getAppointmentsRenderSchedule(array $appointments): array
    {
        $itemsArray = [];
        foreach ($appointments as $appointment) {
            $newItem = self::getAppointment($appointment, ["id", "title", "start"]);
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }

    public static function getAppointmentView(Appointment $appointment)
    {
        $newItem = new stdClass();
        $newItem = self::getAppointment($appointment, ["id", "reason", "client", "client_phone", "client_email"]);
        return $newItem;
    }

    public static function getAppointmentEdit(Appointment $appointment)
    {
        $newItem = new stdClass();
        $newItem = self::getAppointment($appointment, ["id", "reason", "date", "hour"]);
        return $newItem;
    }
}