<?php

class CourseResource
{
    public static function getCourse(Course $course, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $course->{$key};
        }

        return $newItem;
    }

    public static function getCoursesArray(array $courses): array
    {
        $itemsArray = [];
        foreach ($courses as $course) {

            $newItem = self::getCourse($course, ['abbr', 'name', 'guid', 'season']);

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }

    public static function getCoursesNamesArray(array $courses): array
    {
        $itemsArray = [];
        foreach ($courses as $course) {

            $newItem = self::getCourse($course, ['guid', 'abbr']);

            $itemsArray[] = array(
                "value" => $newItem->guid,
                "label" => $newItem->abbr
            );
        }
        return $itemsArray;
    }
    public static function getCoursesAbbrArray(array $courses): array
    {
        $itemsArray = [];
        foreach ($courses as $course) {

            $newItem = self::getCourse($course, ['id', 'abbr']);

            $itemsArray[] = array(
                "value" => $newItem->id,
                "label" => $newItem->abbr
            );
        }
        return $itemsArray;
    }
    public static function getCoursesSeasonArray(array $courses): array
    {
        $itemsArray = [];
        foreach ($courses as $course) {

            $newItem = self::getCourse($course, ['season']);


            $itemsArray[] = array(
                "value" => $newItem->season,
                "label" => $newItem->season
            );
        }
        return $itemsArray;
    }
}
