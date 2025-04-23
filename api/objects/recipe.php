<?php

class Recipe
{
    private PDO $conn;

    private static string $table_name = "client_products";

    public int $id;
    public int $client_id;
    public int $product_id;
    public int $appointment_id;
    public string $searchData;
    public string $created_at;
    public string $updated_at;
    public string|null $deleted_at;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }
    private function serchableValues(): array
    {
        return [

        ];
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` SET client_id=:client_id, product_id=:product_id,
         appointment_id=:appointment_id, searchData=:searchData";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":client_id", $this->client_id);
        $stmt->bindParam(":product_id", $this->product_id);
        $stmt->bindParam(":appointment_id", $this->appointment_id);
        $stmt->bindValue(":searchData", convertSearchValues($this->serchableValues()));

        try {
            $stmt->execute();
            return $this->id = $this->conn->lastInsertId();
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }

    }

    public static function getAllProductsByAppointment(PDO $db, int $id)
    {
        $query = "SELECT product_id FROM `" . self::$table_name . "` WHERE appointment_id=:id AND deleted_at IS NULL GROUP BY product_id";

        $stmt = $db->prepare($query);
        $stmt->bindParam(":id", $id);

        $productIds = [];

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $productIds[] = intval($row['product_id']);
            }
        }

        return $productIds;
    }


    private static function getMainObject(PDO $db, array $row): Recipe
    {
        $newObj = new Recipe($db);
        $newObj->id = intval($row['id']);
        $newObj->client_id = intval($row['client_id']);
        $newObj->product_id = intval($row['product_id']);
        $newObj->appointment_id = intval($row['appointment_id']);
        $newObj->searchData = $row['searchData'];
        $newObj->created_at = $row['created_at'];
        $newObj->updated_at = $row['updated_at'];
        $newObj->deleted_at = $row['deleted_at'];
        return $newObj;
    }
}