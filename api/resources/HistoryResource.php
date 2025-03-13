<?php

class HistoryResource
{
    public static function getHistory(History $history, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $history->{$key};
        }

        return $newItem;
    }

    public static function getHistoryArray(array $history): array
    {
        $itemsArray = [];
        foreach ($history as $history) {
            $copy = $history->copy();
            $book = $copy->book(true);
            $newItem = self::getHistory($history, ["guid"]);
            $newItem->{"book_name"} = $book->name;
            $newItem->{"uniqid"} = $copy->uniqid;
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
    public static function getStudentHistoryArray(array $history): array
    {
        $itemsArray = [];
        foreach ($history as $history) {
            $copy = $history->copy();
            $subject = $history->subject(true);
            $course = $subject->course(true);
            $book = $copy->book(true);
            $newItem = self::getHistory($history, ["guid", "initialstate", "finalstate", "initialdate", "finaldate"]);
            $newItem->{"book_name"} = $book->name;
            $newItem->{"uniqid"} = $copy->uniqid;
            $newItem->{"season"} = $course->season;
            $newItem->{"course_abbr"} = $course->abbr;
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
    public static function getCopyHistoryArray(array $history): array
    {
        $itemsArray = [];
        logAPI($history);
        foreach ($history as $history) {
            $copy = $history->copy();
            $book = $copy->book(true);
            $subject = $history->subject(true);
            $course = $subject->course(true);

            $student = $history->student(true);
            $studentProfile = $student->profile();

            $newItem = self::getHistory($history, ["guid", "initialstate", "finalstate", "initialdate", "finaldate", "observations"]);
            $newItem->{"student_nia"} = $student->nia;
            $newItem->{"student_name"} = $studentProfile->name  . " " . $studentProfile->surnames;
            $newItem->{"student_email"} = $studentProfile->email;
            $newItem->{"student_phone"} = $studentProfile->phone;
            $newItem->{"book_name"} = $book->name;
            $newItem->{"book_isbn"} = $book->isbn;
            $newItem->{"uniqid"} = $copy->uniqid;
            $newItem->{"season"} = $course->season;
            $newItem->{"subject_name"} = $subject->name;
            $newItem->{"course_abbr"} = $course->abbr;
            $newItem->{"course_name"} = $course->name;
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
}
