<?php

class Admin
{
    private PDO $conn;
    private static string $table_name = "admin";
    public int $id;
    public string $guid;
    public string $name;
    public string $email;
    public string $password;
    public string $create_at;
    public string|null $token;
    public string|null $avatar;
    public string|null $expiredate;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` SET guid=:guid, name=:name, email=:email, password=:password";

        $stmt = $this->conn->prepare($query);

        $this->guid = createGUID();
        $stmt->bindValue(":guid", $this->guid);
        $stmt->bindValue(":name", $this->name);
        $stmt->bindValue(":email", $this->email);
        $stmt->bindValue(":password", $this->password);

        try {
            $stmt->execute();
            return $this->id = $this->conn->lastInsertId();
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    public static function getByEmail(PDO $db, string $email): Admin|bool
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

    public static function get(PDO $db, int $id): Admin|bool
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }

            return false;
        }
        createException($stmt->errorInfo());
    }

    function createSession(): bool
    {
        $this->token = createToken();
        $this->expiredate = newDate(1, "day");
        return $this->update();
    }

    function logout()
    {
        $this->token = null;
        $this->expiredate = null;
        return $this->update();
    }

    function update(): bool
    {

        $query = "UPDATE `" . self::$table_name . "`
        SET name=:name, email=:email, password=:password,
        token=:token, expiredate=:expiredate, avatar=:avatar WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":token", $this->token);
        $stmt->bindParam(":expiredate", $this->expiredate);
        $stmt->bindParam(":avatar", $this->avatar);
        $stmt->bindParam(":id", $this->id);

        try {
            $stmt->execute();
            return true;

        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
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
    private static function getMainObject(PDO $db, array $row): Admin
    {
        $newObj = new Admin($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->name = $row['name'];
        $newObj->email = $row['email'];
        $newObj->password = $row['password'];
        $newObj->create_at = $row['created_at'];
        $newObj->token = $row['token'];
        $newObj->avatar = $row['avatar'];
        $newObj->expiredate = $row['expiredate'];
        return $newObj;
    }

}
