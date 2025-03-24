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

    public int $created_by;

    public int $category_id;

    public string $created_at;

    public string $updated_at;

    public string|null $deleted_at;

    public string|null $uniqId;


    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    private function serchableValues(): array
    {
        return [
            $this->name,
        ];
    }


    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` SET
        guid=:guid, name=:name, price=:price, brand=:brand, description=:description,
        created_by=:created_by, category_id=:category_id, searchdata=:searchdata";

        $stmt = $this->conn->prepare($query);
        $this->guid = createGUID();
        $stmt->bindParam(":guid", $this->guid);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":brand", $this->brand);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":created_by", $this->created_by);
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindValue(":searchdata", convertSearchValues($this->serchableValues()));

        try {
            $stmt->execute();
            return $this->id = $this->conn->lastInsertId();
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }

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
        $newObj->created_by = intval($row['created_by']);
        $newObj->category_id = intval($row['category_id']);
        $newObj->created_at = $row['created_at'];
        $newObj->updated_at = $row['updated_at'];
        $newObj->deleted_at = $row['deleted_at'];
        $newObj->unicId = $row['uniqId'];
        return $newObj;

    }
}