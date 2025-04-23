<?php

class Appointment
{
    private PDO $conn;
    private static string $table_name = "appointments";

    public int $id;
    public int $created_by;
    public int $created_for;
    public string $date;
    public string $reason;
    public string|null $final_description;
    public string $created_at;
    public string $updated_at;
    public string|null $deleted_at;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` SET created_by=:created_by, created_for=:created_for,
        date=:date, reason=:reason";

        $stmt = $this->conn->prepare($query);


        $stmt->bindParam(":created_by", $this->created_by);
        $stmt->bindParam(":created_for", $this->created_for);
        $stmt->bindParam(":date", $this->date);
        $stmt->bindParam(":reason", $this->reason);

        try {
            $stmt->execute();
            return $this->id = $this->conn->lastInsertId();
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    public static function getDateByDay(PDO $db, string $date): array
    {
        $query = "SELECT date FROM `" . self::$table_name . "` WHERE date LIKE :date AND deleted_at IS NULL";

        $stmt = $db->prepare($query);
        $stmt->bindValue(":date", $date . "%");

        if ($stmt->execute()) {
            $arrayToReturn = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = $row;
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());

    }

    public static function getAllWithOutPaginationByUserID(PDO $db, int $user_id): array
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE deleted_at IS NULL AND created_by=:user_id";

        $stmt = $db->prepare($query);
        $stmt->bindParam(":user_id", $user_id);

        if ($stmt->execute()) {
            $arrayToReturn = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }

    public static function get(PDO $db, int $id): Appointment
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted_at IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Appointment not foud");
    }

    function update(): bool
    {
        $query = "Update `" . self::$table_name . "`
        SET date=:date, reason=:reason, final_description=:final_description, deleted_at=:deleted_at
        WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":date", $this->date);
        $stmt->bindParam(":reason", $this->reason);
        $stmt->bindParam(":final_description", $this->final_description);
        $stmt->bindParam(":deleted_at", $this->deleted_at);
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

    private static function getMainObject(PDO $db, array $row): Appointment
    {
        $newObj = new Appointment($db);
        $newObj->id = intval($row["id"]);
        $newObj->created_by = intval($row["created_by"]);
        $newObj->created_for = intval($row["created_for"]);
        $newObj->date = $row["date"];
        $newObj->reason = $row["reason"];
        $newObj->final_description = $row["final_description"];
        $newObj->created_at = $row["created_at"];
        $newObj->updated_at = $row["updated_at"];
        $newObj->deleted_at = $row["deleted_at"];
        return $newObj;
    }
}