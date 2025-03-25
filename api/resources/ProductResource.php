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
}