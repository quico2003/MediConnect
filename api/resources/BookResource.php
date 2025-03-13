<?php

class BookResource
{
    public static function getBook(Book $book, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $book->{$key};
        }

        return $newItem;
    }

    public static function getBooksArray(array $books): array
    {
        $itemsArray = [];
        foreach ($books as $book) {

            $newItem = self::getBook($book, ['name', 'isbn', 'stock', 'guid', 'enabled']);

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
    public static function getBooksArrayList(array $books): array
    {
        $itemsArray = [];
        foreach ($books as $book) {

            $newItem = self::getBook($book, ['name', 'isbn', 'stock', 'guid']);
            $subject = $book->subject();
            $newItem->subjectName = $subject->name;
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
}
