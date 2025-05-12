<?php

class CategoryResource
{

    public static function getCategory(Category $category, array $params)
    {
        $newItem = new stdClass();

        $madridTimezone = new DateTimeZone('Europe/Madrid');
        $utcTimezone = new DateTimeZone('UTC');

        foreach ($params as $key) {
            $value = $category->{$key};

            if (in_array($key, ['created_at', 'updated_at']) && $value !== null) {
                $date = new DateTime($value, $utcTimezone);
                $value = $date->setTimezone($madridTimezone)->format('Y-m-d H:i:s');
            }

            $newItem->{$key} = $value;
        }

        return $newItem;
    }

    public static function getCategoriesArray(array $categories): array
    {
        $itemsArray = [];
        foreach ($categories as $category) {
            $newItem = self::getCategory($category, ["guid", "name"]);
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
    
    public static function getCountProductsForCategoryArray(array $categories): array
    {
        $itemsArray = [];
        foreach ($categories as $category) {
            $newItem = self::getCategory($category, ["name", "productsCount"]);
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }

    public static function getCategorySimpleResource(Category $category)
    {

        $newItem = self::getCategory($category, ["guid", "name", "description", "created_at", "updated_at"]);
        return $newItem;

    }
}