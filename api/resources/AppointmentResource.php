<?php

class AppointmentResource
{
    public static function getAppointment(Appointment $appointment, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $appointment->{$key};
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