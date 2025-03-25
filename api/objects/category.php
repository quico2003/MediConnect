<?php

class Category
{

    private PDO $conn;

    private static string $table_name = "category";

    public int $id;

    public string $guid;

    public string $name;

    public string $description;

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
            $this->name,
        ];
    }


    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` SET 
         guid=:guid, name=:name, description=:description, searchdata=:searchdata";

        $stmt = $this->conn->prepare($query);
        $this->guid = createGUID();
        $stmt->bindParam(":guid", $this->guid);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindValue(":searchdata", convertSearchValues($this->serchableValues()));

        try {
            $stmt->execute();
            return $this->id = $this->conn->lastInsertId();
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }

    }


    public static function getAll(PDO $db, int $page, int $offset, string $search = "", array $filters = []): array
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE deleted_at IS NULL";

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
    public static function getList(PDO $db): array
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE deleted_at IS NULL";

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

    public static function getAllCount(PDO $db, string $search = "", array $filters = []): int
    {
        $query = "SELECT COUNT(id) as total FROM `" . self::$table_name . "` c WHERE deleted_at IS NULL";

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

    public static function getByGuid(PDO $db, string $guid): Category
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid AND deleted_at IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Category not found");
    }

    public static function getById(PDO $db, string $id): Category
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted_at IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Category not found");
    }

    function update(): bool
    {
        $query = "UPDATE `" . self::$table_name . "` 
        SET name=:name, description=:description, deleted_at=:deleted_at, searchdata=:searchdata WHERE guid=:guid";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindValue(":deleted_at", $this->deleted_at);
        $stmt->bindParam(":guid", $this->guid);
        $stmt->bindValue(":searchdata", convertSearchValues($this->serchableValues()));

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


    private static function getMainObject(PDO $db, array $row): Category
    {

        $newObj = new Category($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->name = $row['name'];
        $newObj->description = $row['description'];
        $newObj->created_at = $row['created_at'];
        $newObj->updated_at = $row['updated_at'];
        $newObj->deleted_at = $row['deleted_at'];
        return $newObj;

    }


}