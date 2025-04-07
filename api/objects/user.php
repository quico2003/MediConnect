<?php

class User
{
    private PDO $conn;
    private static string $table_name = "user";

    public int $id;
    public string $guid;
    public string $email;
    public string $password;
    public string $searchData;
    public int $created_by;
    public string $created_at;
    public string $updated_at;
    public string|null $deleted_at;
    public string|null $token;
    public string|null $expiredate;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    private function serchableValues(): array
    {
        return [
            $this->email
        ];
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` SET guid=:guid, email=:email, password=:password,
        created_by=:created_by , searchData=:searchData";

        $stmt = $this->conn->prepare($query);

        $this->guid = createGUID();
        $stmt->bindParam(":guid", $this->guid);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":created_by", $this->created_by);
        $stmt->bindValue(":searchData", convertSearchValues($this->serchableValues()));

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

    public static function getByGuid(PDO $db, string $guid): User
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid AND deleted_at IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("User not foud");
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

    function update(): bool
    {
        $query = "
            UPDATE `" . self::$table_name . "` 
            SET email=:email, password=:password, searchdata=:searchData,
            token=:token, expiredate=:expiredate, deleted_at=:deleted_at
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindValue(":searchData", convertSearchValues($this->serchableValues()));
        $stmt->bindParam(":deleted_at", $this->deleted_at);
        $stmt->bindParam(":expiredate", $this->expiredate);
        $stmt->bindParam(":token", $this->token);
        $stmt->bindParam(":id", $this->id);

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

    public static function getByEmail(PDO $db, string $email): User|bool
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE email=:email";

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

    public static function checkToken($db, $token)
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE DATE(expiredate) > DATE(NOW()) AND token=:token";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":token", $token);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['id']);
            }
        }
        return null; //Return null if user with token not found
    }

    function createSession(): bool
    {
        $this->token = createToken();
        $this->expiredate = newDate(1, "day");
        return $this->update();
    }

    private static function getMainObject(PDO $db, array $row): User
    {
        $newObj = new User($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->email = $row['email'];
        $newObj->password = $row['password'];
        $newObj->searchData = $row['searchData'];
        $newObj->created_by = intval($row['created_by']);
        $newObj->created_at = $row['created_at'];
        $newObj->updated_at = $row['updated_at'];
        $newObj->deleted_at = $row['deleted_at'];
        $newObj->token = $row['token'];
        $newObj->expiredate = $row['expiredate'];
        return $newObj;
    }
}