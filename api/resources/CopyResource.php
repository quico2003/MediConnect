<?php

class CopyResource
{
    public static function getCopy(Copy $copy, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $copy->{$key};
        }

        return $newItem;
    }

    public static function getCopiesArray(array $copies): array
    {
        $itemsArray = [];
        foreach ($copies as $copy) {
            $newItem = self::getCopy($copy, ["guid", "uniqid", "state"]);

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
    public static function getCopiesCodes(array $copies): array
    {
        $itemsArray = [];
        foreach ($copies as $copy) {
            $newItem = self::getCopy($copy, ["uniqid"]);

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
    public static function getAssignCopiesArray(array $copies): array
    {
        $itemsArray = [];
        foreach ($copies as $copy) {
            $newItem = self::getCopy($copy, ["guid", "uniqid", "state", "book_name"]);

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }

    public static function getCopiesArrayListDashboard(array $copies): array
    {
        $itemsArray = [];
        foreach ($copies as $copy) {

            $newItem = self::getCopy($copy, ['guid', 'uniqid', 'state']);
            $book = $copy->Book(false);
            $subject = $book->subject(false);
            $course = $subject->course(false);
            $newItem->bookName = $book->name;
            $newItem->subjectName = $subject->abbr;
            $newItem->courseName = $course->abbr;
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }

    public static function getCopyFormatWithAll(Copy $copy): stdClass
    {
        $book = $copy->book(false);
        $subject = $book->subject();
        $course = $subject->course(false);
        $newItem = self::getCopy($copy, ['uniqid', 'state']);
        $newItem->{"book_name"} = $book->name;
        $newItem->{"subject_name"} = $subject->name;
        $newItem->{"course_name"} = $course->name;

        return $newItem;
    }
}
