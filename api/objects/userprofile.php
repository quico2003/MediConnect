<?php

class UserProfile
{
    private PDO $conn;
    private static string $table_name = "userprofile";

    public int $id;
    public int $user_id;
    public string $first_name;
    public string $last_name;
    public string $specialty;
    public string|null $avatar;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            user_id=:user_id,
            first_name=:first_name,
            second_name=:second_name,
            specialty=:specialty,
            avatar=:avatar
            ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(":user_id", $this->user_id);
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":second_name", $this->last_name);
        $stmt->bindParam(":specialty", $this->specialty);
        $stmt->bindParam(":avatar", $this->avatar);

        try {
            $stmt->execute();
            return $this->id = $this->conn->lastInsertId();
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    function update(): bool
    {
        $query = "UPDATE `" . self::$table_name . "` SET first_name=:first_name, second_name=:second_name
        , specialty=:specialty, avatar=:avatar WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(":first_name", $this->first_name);
        $stmt->bindValue(":second_name", $this->last_name);
        $stmt->bindValue(":specialty", $this->specialty);
        $stmt->bindValue(":avatar", $this->avatar);
        $stmt->bindValue(":id", $this->id);

        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    public static function getByUserId(PDO $db, string $userId): UserProfile
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE user_id=:id";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $userId);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Profile User Not found");
    }



    private static function getMainObject(PDO $db, array $row): UserProfile
    {
        $newObj = new UserProfile($db);
        $newObj->id = intval($row['id']);
        $newObj->user_id = intval($row['user_id']);
        $newObj->first_name = $row['first_name'];
        $newObj->last_name = $row['last_name'];
        $newObj->specialty = $row['specialty'];
        $newObj->avatar = $row['avatar'];
        return $newObj;
    }
}
