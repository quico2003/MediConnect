<?php

class StudentProfile
{
    private PDO $conn;
    private static string $table_name = "studentprofile";


    public int $id;
    public int $student_id;
    public string $name;
    public string $surnames;
    public string $phone;
    public string $email;
    public string|null $updated;


    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            student_id=:student_id,
            name=:name,
            surnames=:surnames,
            phone=:phone,
            email=:email
        ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":student_id", $this->student_id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":surnames", $this->surnames);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":email", $this->email);

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
            SET name=:name, surnames=:surnames, phone=:phone, email=:email, updated=:updated
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":surnames", $this->surnames);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindValue(":updated", newDate());
        $stmt->bindParam(":id", $this->id);

        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    public static function getByStudentId(PDO $db, int $student_id): StudentProfile
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE student_id=:student_id";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":student_id", $student_id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException("Invalid credentials");
    }

    private static function getMainObject(PDO $db, array $row): StudentProfile
    {
        $newObj = new StudentProfile($db);
        $newObj->id = intval($row['id']);
        $newObj->student_id = intval($row['student_id']);
        $newObj->name = $row['name'];
        $newObj->email = $row['email'];
        $newObj->surnames = $row['surnames'];
        $newObj->phone = $row['phone'];
        $newObj->updated = $row['updated'];
        return $newObj;
    }
}
