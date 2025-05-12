<?php

class ProductResource
{
    public static function getProduct(Product $product, array $params)
    {
        $newItem = new stdClass();

        $madridTimezone = new DateTimeZone('Europe/Madrid');
        $utcTimezone = new DateTimeZone('UTC');

        foreach ($params as $key) {
            $value = $product->{$key};

            if (in_array($key, ['created_at', 'updated_at']) && $value !== null) {
                $date = new DateTime($value, $utcTimezone);
                $value = $date->setTimezone($madridTimezone)->format('Y-m-d H:i:s');
            }

            $newItem->{$key} = $value;
        }

        return $newItem;;
    }

    public static function getProductsArray(array $products): array
    {
        $itemsArray = [];
        foreach ($products as $product) {
            $newItem = self::getProduct($product, ["guid", "name", "price", "brand", "categoryName", "uniqid"]);
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
        $newItem = self::getProduct($product, ["guid", "name", "price", "brand", "description", "created_at", "updated_at", "categoryName", "imagesURL", "uniqid"]);
        return $newItem;
    }

    public static function getProductResourceAdminForUpdate(Product $product)
    {
        $newItem = self::getProduct($product, ["guid", "name", "price", "brand", "description", "imagesExist", "updated_at", "category", "imagesURL"]);
        return $newItem;
    }
}