<?php

class UserProfile
{
    private PDO $conn;
    private static string $table_name = "userprofile";


    public int $id;
    public int $user_id;
    public string $name;
    public string $surnames;
    public string|null $phone;
    public string|null $avatar;
    public string|null $updated;


    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            user_id=:user_id,
            name=:name,
            surnames=:surnames
            ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(":user_id", $this->user_id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":surnames", $this->surnames);

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
            SET name=:name, surnames=:surnames, phone=:phone, updated=:updated, avatar=:avatar
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":surnames", $this->surnames);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":avatar", $this->avatar);
        $stmt->bindValue(":updated", newDate());
        $stmt->bindParam(":id", $this->id);

        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    function updateImage(): bool
    {
        $query = "
        UPDATE `" . self::$table_name . "` 
        SET avatar=:avatar
        WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":avatar", $this->avatar);
        $stmt->bindParam(":id", $this->id);

        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    public static function getByUserId(PDO $db, int $userid): UserProfile
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE user_id=:user_id";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":user_id", $userid);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException("Invalid credentials");
    }

    private static function getMainObject(PDO $db, array $row): UserProfile
    {
        $newObj = new UserProfile($db);
        $newObj->id = intval($row['id']);
        $newObj->user_id = intval($row['user_id']);
        $newObj->name = $row['name'];
        $newObj->surnames = $row['surnames'];
        $newObj->phone = $row['phone'];
        $newObj->avatar = $row['avatar'];
        $newObj->updated = $row['updated'];
        return $newObj;
    }
}
