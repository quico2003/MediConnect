<?php

class UserProfile
{
    private PDO $conn;
    private static string $table_name = "userprofile";


    public int $id;
    public int $user_id;
    public string $first_name;
    public string $second_name;
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
            specialty=:specialty
            ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(":user_id", $this->user_id);
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":second_name", $this->second_name); 
        $stmt->bindParam(":specialty", $this->specialty); 

        try {
            $stmt->execute();
            return $this->id = $this->conn->lastInsertId();
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

   

    private static function getMainObject(PDO $db, array $row): UserProfile
    {
        $newObj = new UserProfile($db);
        $newObj->id = intval($row['id']);
        $newObj->user_id = intval($row['user_id']);
        $newObj->first_name = $row['first_name'];
        $newObj->second_name = $row['second_name'];
        $newObj->specialty = $row['specialty'];
        $newObj->avatar = $row['avatar'];
        return $newObj;
    }
}
