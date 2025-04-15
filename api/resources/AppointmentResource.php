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
            $newItem = self::getAppointment($appointment, ["title", "start"]);
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
}