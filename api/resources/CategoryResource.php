<?php

class CategoryResource
{

    public static function getCategory(Category $category, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $category->{$key};
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