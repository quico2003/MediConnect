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
            $this->email,
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

    function update(): bool
    {
        $query = "
            UPDATE `" . self::$table_name . "` 
            SET email=:email, password=:password, searchdata=:searchData
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindValue(":searchData", convertSearchValues($this->serchableValues()));
        $stmt->bindParam(":id", $this->id);

        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
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

    private static function getMainObject(PDO $db, array $row): User
    {
        $newObj = new User($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->email = $row['email'];
        $newObj->password = $row['password'];
        $newObj->searchData = $row['searchData'];
        $newObj->created_by = intval($row['created_by']) ;
        $newObj->create_at = $row['created_at'];
        $newObj->updated_at = $row['updated_at'];
        $newObj->deleted_at = $row['deleted_at'];
        $newObj->token = $row['token'];
        $newObj->expiredate = $row['expiredate'];
        return $newObj;
    }
}