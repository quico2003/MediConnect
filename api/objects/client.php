<?php

class Client
{
    private PDO $conn;
    private static string $table_name = "clients";

    public int $id;
    public string $guid;
    public string $email;
    public string $first_name;
    public string $last_name;
    public string $phone;
    public string $anotations;
    public string $searchData;
    public int $created_by;
    public string $created_at;
    public string $updated_at;
    public string|null $deleted_at;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    public function serchableValues(): array
    {
        return [

            $this->email,
            $this->first_name,
            $this->last_name,
            $this->phone
        ];
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` SET guid=:guid, email=:email,
        first_name=:first_name, last_name=:last_name, phone=:phone, anotations=:anotations, searchData=:searchData,
        created_by=:created_by";

        $stmt = $this->conn->prepare($query);

        $this->guid = createGUID();
        $stmt->bindParam(":guid", $this->guid);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":anotations", $this->anotations);
        $stmt->bindValue(":searchData", convertSearchValues($this->serchableValues()));
        $stmt->bindValue(":created_by", $this->created_by);

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
        doPagination($offset, $page, $stmt);

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

    function update(): bool
    {
        $query = "UPDATE `" . self::$table_name . "` SET
        first_name=:first_name, last_name=:last_name, email=:email,
        phone=:phone, anotations=:anotations, searchData=:searchData, deleted_at=:deleted_at WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":anotations", $this->anotations);
        $stmt->bindValue(":searchData", convertSearchValues($this->serchableValues()));
        $stmt->bindValue(":deleted_at", $this->deleted_at);
        $stmt->bindValue(":id", $this->id);

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

    public static function getAllByUserID(PDO $db, int $page, int $offset, string $search = "", array $filters = [], int $user_id): array
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE deleted_at IS NULL AND created_by=:user_id";

        foreach ($filters as $index => $object) {
            $query .= " AND $object->id = :val$index";
        }

        applySearchOnQuery($query);
        doPagination($offset, $page, $query);


        $stmt = $db->prepare($query);

        $stmt->bindParam(":user_id", $user_id);

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
    
    public static function getAllWithOutPaginationByUserID(PDO $db, string $search = "", array $filters = [], int $user_id): array
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE deleted_at IS NULL AND created_by=:user_id";

        foreach ($filters as $index => $object) {
            $query .= " AND $object->id = :val$index";
        }

        applySearchOnQuery($query);

        $stmt = $db->prepare($query);
        $stmt->bindParam(":user_id", $user_id);

        applySearchOnBindedValue($search, $stmt);

        foreach ($filters as $index => $object) {
            $value = $object->value;
            $stmt->bindValue(":val$index", $value, PDO::PARAM_INT);
        }

        if ($stmt->execute()) {
            $arrayToReturn = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = ["value" => $row["guid"], "label" => $row["email"]];
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }

    public static function getByGuid(PDO $db, string $guid): Client
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid AND deleted_at IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Client not foud");
    }

    public static function getByEmail(PDO $db, string $email): Client|bool
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE email=:email AND deleted_at IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":email", $email);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }

            return false;
        }
        createException($stmt->errorInfo());
    }


    public static function get(PDO $db, int $id): Client
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted_at IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Client not foud");
    }


    public static function getAllCount(PDO $db, string $search = "", array $filters = [], int $user_id): int
    {
        $query = "SELECT COUNT(id) as total FROM `" . self::$table_name . "` c WHERE deleted_at IS NULL AND created_by=:user_id";

        foreach ($filters as $index => $object) {
            $query .= " AND $object->id = :val$index";
        }

        applySearchOnQuery($query);

        $stmt = $db->prepare($query);
        $stmt->bindParam(":user_id", $user_id);

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
    
    public static function getAllCountWithoutUser(PDO $db): int
    {
        $query = "SELECT COUNT(id) as total FROM `" . self::$table_name . "` c WHERE deleted_at IS NULL";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }

    private static function getMainObject(PDO $db, array $row): Client
    {
        $newObj = new Client($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->email = $row['email'];
        $newObj->first_name = $row['first_name'];
        $newObj->last_name = $row['last_name'];
        $newObj->phone = $row['phone'];
        $newObj->anotations = $row['anotations'];
        $newObj->searchData = $row['searchData'];
        $newObj->created_by = intval($row['created_by']);
        $newObj->created_at = $row['created_at'];
        $newObj->updated_at = $row['updated_at'];
        $newObj->deleted_at = $row['deleted_at'];
        return $newObj;
    }
}