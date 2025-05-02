<?php

class Product
{
    private PDO $conn;
    private static string $table_name = "products";

    public int $id;
    public string $guid;
    public string $name;
    public float $price;
    public string $brand;
    public string $description;
    public string $searchData;
    public int $created_by;
    public int|null $category_id;
    public string $created_at;
    public string $updated_at;
    public string|null $deleted_at;
    public string|null $images;
    public string|null $uniqid;



    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    private function serchableValues(): array
    {
        if ($this->category_id == null) {
            return [
                $this->name,
                $this->brand,
                $this->uniqid
            ];
        } else {
            $category = Category::getById($this->conn, $this->category_id);
            return [
                $this->name,
                $this->uniqid,
                $this->brand,
                $category->name
            ];
        }
    }


    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` SET
        guid=:guid, name=:name, price=:price, brand=:brand, description=:description,
        created_by=:created_by, category_id=:category_id, images=:images, uniqid=:uniqid, searchData=:searchData";

        $stmt = $this->conn->prepare($query);
        $this->guid = createGUID();
        $stmt->bindParam(":guid", $this->guid);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":brand", $this->brand);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":created_by", $this->created_by);
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindParam(":images", $this->images);
        $stmt->bindParam(":uniqid", $this->uniqid);
        $stmt->bindValue(":searchData", convertSearchValues($this->serchableValues()));

        try {
            $stmt->execute();
            return $this->id = $this->conn->lastInsertId();
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }

    }

    function update(): bool
    {
        $query = "UPDATE `" . self::$table_name . "` SET name=:name, price=:price, brand=:brand,
        description=:description, deleted_at=:deleted_at, category_id=:category_id,
        images=:images, searchData=:searchData WHERE guid=:guid";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":brand", $this->brand);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindValue(":deleted_at", $this->deleted_at);
        $stmt->bindValue(":category_id", $this->category_id);
        $stmt->bindParam(":images", $this->images);
        $stmt->bindValue(":searchData", convertSearchValues($this->serchableValues()));
        $stmt->bindParam(":guid", $this->guid);

        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }

    }

    function delete(): bool
    {
        $this->deleted_at = newDate();
        return $this->update();
    }

    public static function getAll(PDO $db, int $page, int $offset, string $search = "", array $filters = []): array
    {

        $query = "SELECT * FROM `" . self::$table_name . "` WHERE deleted_at IS NULL AND category_id IS NOT NULL";

        foreach ($filters as $index => $object) {
            $query .= " AND $object->id = :val$index";
        }

        applySearchOnQuery($query);
        doPagination($offset, $page, $query);

        $stmt = $db->prepare($query);

        applySearchOnBindedValue($search, $stmt);

        foreach ($filters as $index => $object) {
            $value = $object->value;
            $stmt->bindValue(":val$index", $value, PDO::PARAM_INT);
        }

        if ($stmt->execute()) {
            $arrayToReturn = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }
    public static function getAllWithoutCategory(PDO $db, int $page, int $offset, string $search = "", array $filters = []): array
    {

        $query = "SELECT * FROM `" . self::$table_name . "` WHERE deleted_at IS NULL AND category_id IS NULL";

        foreach ($filters as $index => $object) {
            $query .= " AND $object->id = :val$index";
        }

        applySearchOnQuery($query);
        doPagination($offset, $page, $query);

        $stmt = $db->prepare($query);

        applySearchOnBindedValue($search, $stmt);

        foreach ($filters as $index => $object) {
            $value = $object->value;
            $stmt->bindValue(":val$index", $value, PDO::PARAM_INT);
        }

        if ($stmt->execute()) {
            $arrayToReturn = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }

    public static function getProductsTop(PDO $db)
    {
        $query = "SELECT p.*, COUNT(cp.id) AS value FROM client_products AS cp INNER JOIN products AS p ON cp.product_id = p.id 
        GROUP BY product_id ORDER BY value DESC LIMIT 6";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {
            $arrayToReturn = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());

    }

    public static function getAllWithoutPagination(PDO $db): array
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE deleted_at IS NULL";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {
            $arrayToReturn = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }

    public static function getAllCount(PDO $db, string $search = "", array $filters = []): int
    {
        $query = "SELECT COUNT(id) as total FROM `" . self::$table_name . "` c WHERE deleted_at IS NULL AND category_id IS NOT NULL";

        foreach ($filters as $index => $object) {
            $query .= " AND $object->id = :val$index";
        }

        applySearchOnQuery($query);

        $stmt = $db->prepare($query);

        applySearchOnBindedValue($search, $stmt);

        foreach ($filters as $index => $object) {
            $value = $object->value;
            $stmt->bindValue(":val$index", $value, PDO::PARAM_INT);
        }

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }

    public static function getAllCountWithoutCategory(PDO $db, string $search = "", array $filters = []): int
    {
        $query = "SELECT COUNT(id) as total FROM `" . self::$table_name . "` c WHERE deleted_at IS NULL AND category_id IS NULL";

        foreach ($filters as $index => $object) {
            $query .= " AND $object->id = :val$index";
        }

        applySearchOnQuery($query);

        $stmt = $db->prepare($query);

        applySearchOnBindedValue($search, $stmt);

        foreach ($filters as $index => $object) {
            $value = $object->value;
            $stmt->bindValue(":val$index", $value, PDO::PARAM_INT);
        }

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }
    public static function getAllBySelectRecipes(PDO $db): array
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE deleted_at IS NULL AND category_id IS NOT NULL";
    
        $stmt = $db->prepare($query);

        if ($stmt->execute()) {
            $arrayToReturn = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = ["value" => $row["guid"], "label" => $row["name"]];
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());

    }
    public static function getByGuid(PDO $db, string $guid): Product
    {

        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid AND deleted_at IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Product not found");
    }

    public static function get(PDO $db, string $id): Product
    {

        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted_at IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Product not found");
    }


    private static function getMainObject(PDO $db, array $row): Product
    {

        $newObj = new Product($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->name = $row['name'];
        $newObj->price = floatval($row['price']);
        $newObj->brand = $row['brand'];
        $newObj->description = $row['description'];
        $newObj->searchData = $row['searchData'];
        $newObj->created_by = intval($row['created_by']);
        $newObj->category_id = intval($row['category_id']);
        $newObj->images = $row['images'];
        $newObj->created_at = $row['created_at'];
        $newObj->updated_at = $row['updated_at'];
        $newObj->deleted_at = $row['deleted_at'];
        $newObj->uniqid = $row['uniqid'];
        return $newObj;

    }
}