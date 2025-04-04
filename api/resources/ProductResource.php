<?php

class ProductResource
{
    public static function getProduct(Product $product, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $product->{$key};
        }

        return $newItem;
    }

    public static function getProductsArray(array $products): array
    {
        $itemsArray = [];
        foreach ($products as $product) {
            $newItem = self::getProduct($product, ["guid", "name", "price", "brand", "categoryName"]);
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
    
    public static function getProductsArrayWithoutCategory(array $products): array
    {
        $itemsArray = [];
        foreach ($products as $product) {
            $newItem = self::getProduct($product, ["guid", "name", "price", "brand"]);
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }

    public static function getProductResourceAdmin(Product $product)
    {
        $newItem = self::getProduct($product, ["guid", "name", "price", "brand", "description", "created_at", "updated_at", "categoryName", "creator", "imagesURL", "uniqid"]);
        return $newItem;
    }

    public static function getProductResourceAdminForUpdate(Product $product)
    {
        $newItem = self::getProduct($product, ["guid", "name", "price", "brand", "description", "imagesExist", "updated_at", "category", "imagesURL"]);
        return $newItem;
    }
}