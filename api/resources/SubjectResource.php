<?php

class SubjectResource
{
    public static function getSubject(Subject $subject, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $subject->{$key};
        }

        return $newItem;
    }

    public static function getSubjectsArray(array $subjects): array
    {
        $itemsArray = [];
        foreach ($subjects as $subject) {
            $course = $subject->course(false);

            $newItem = self::getSubject($subject, ['abbr', 'name', 'guid']);
            $newItem->{"course"} = CourseResource::getCourse($course, ['abbr']);

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }

    public static function getSubjectsNamesArray(array $subjects): array
    {
        $itemsArray = [];
        foreach ($subjects as $subject) {

            $newItem = self::getSubject($subject, ['guid', 'name']);

            $itemsArray[] = array(
                "value" => $newItem->guid,
                "label" => $newItem->name
            );
        }
        return $itemsArray;
    }
    public static function getSubjectsAbbrArray(array $subjects): array
    {
        $itemsArray = [];
        foreach ($subjects as $subject) {
            $course = $subject->course();
            if ($course) {
                $newItem = self::getSubject($subject, ['id', 'name']);

                $itemsArray[] = array(
                    "value" => $newItem->id,
                    "label" => $newItem->name . " (" . $course->abbr . ")"
                );
            }
        }
        return $itemsArray;
    }
}
