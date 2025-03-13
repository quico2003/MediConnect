<?php

class Student
{
    private PDO $conn;
    private static string $table_name = "student";


    public int $id;
    public string $guid;
    public int $nia;
    public int $createdBy;
    public string $searchdata;
    public string $created;
    public string|null $updated;
    public string|null $deleted;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    private function searchableValues(): array
    {
        return [
            $this->nia,
            array(
                "from" => $this->profile(),
                "what" => [
                    'name',
                    'surnames',
                    'email'
                ]
            )
        ];
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            guid=:guid,
            nia=:nia,
            createdby=:createdby,
            searchdata=:searchdata
            ";

        $stmt = $this->conn->prepare($query);

        $this->guid = createGUID();
        $stmt->bindParam(":guid", $this->guid);
        $stmt->bindParam(":nia", $this->nia);
        $stmt->bindParam(":createdby", $this->createdBy);
        $stmt->bindValue(":searchdata", convertSearchValues($this->searchableValues()));

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
            SET nia=:nia, updated=:updated, deleted=:deleted, searchdata=:searchdata
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nia", $this->nia);
        $stmt->bindParam(":updated", $this->updated);
        $stmt->bindParam(":deleted", $this->deleted);
        $stmt->bindValue(":searchdata", convertSearchValues($this->searchableValues()));
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
        $this->deleted = newDate();
        return $this->update();
    }

    function profile(): StudentProfile|bool
    {
        if (isset($this->id)) {
            return StudentProfile::getByStudentId($this->conn, $this->id);
        } else return false;
    }


    public static function getwithoutDelete(PDO $db, int $id): Student
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Student not found");
    }

    public static function get(PDO $db, int $id): Student
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Student not found");
    }

    public static function getByGuidWithoutDelete(PDO $db, string $guid): Student
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Student not found");
    }

    public static function getByGuid(PDO $db, string $guid): Student
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Student not found");
    }

    public static function getAll(PDO $db, int $page, int $offset, string $search = ""): array
    {
        $query = "
        SELECT s.*
        FROM `" . self::$table_name . "` s
        WHERE deleted IS NULL";

        applySearchOnQuery($query);
        doPagination($offset, $page, $query);

        $stmt = $db->prepare($query);

        applySearchOnBindedValue($search, $stmt);

        if ($stmt->execute()) {
            $arrayToReturn = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }

    public static function getAllCountStudentsData(PDO $db): array
    {
        $query = "
        SELECT 
        CONCAT(MONTH(created), '/', YEAR(created)) AS name,
        IF(COUNT(*) > 0, COUNT(*), 0) AS uv 
        FROM 
            `" . self::$table_name . "` 
        WHERE 
            deleted IS NULL AND DATE(created) >= DATE_ADD(NOW(), INTERVAL -12 MONTH)
        GROUP BY 
            YEAR(created), MONTH(created) 
        ORDER BY 
            created ASC LIMIT 12
        ";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {
            $studentHistory = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $studentHistory[] = [
                    "name" => $row['name'],
                    "students" => intval($row['uv'])
                ];
            }

            $currentDate = new DateTime();
            $dataNames = array_column($studentHistory, "name");

            $history = [];


            for ($i = 0; $i < 12; $i++) {
                if ($i > 0) {
                    $currentDate->modify('-1 month');
                }
                $currentMonth = $currentDate->format('n/Y');
                $index = array_search($currentMonth, $dataNames);
                if ($index === false) {
                    $history[$i] = [
                        "name" => $currentMonth,
                        "students" => 0
                    ];
                } else {
                    $object = $studentHistory[$index];
                    $history[$i] = ["name" => $object['name'], "students" => $object['students']];
                }
            }

            return array_reverse($history);
        }

        createException($stmt->errorInfo());
    }

    public static function getAllCountDashboard(PDO $db): int
    {
        $query = "
        SELECT COUNT(s.id) as total
        FROM `" . self::$table_name . "` s
        WHERE deleted IS NULL";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }

    public static function getAllCount(PDO $db, string $search = ""): int
    {
        $query = "
        SELECT COUNT(s.id) as total
        FROM `" . self::$table_name . "` s 
        WHERE deleted IS NULL
        ";

        applySearchOnQuery($query);

        $stmt = $db->prepare($query);

        applySearchOnBindedValue($search, $stmt);

        if ($stmt->execute()) {

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }

    public static function getByNia(PDO $db, int $nia): Student | bool
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE nia=:nia AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":nia", $nia);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException("Invalid credentials");
    }

    private static function getMainObject(PDO $db, array $row): Student
    {
        $newObj = new Student($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->nia = intval($row['nia']);
        $newObj->created = $row['created'];
        $newObj->updated = $row['updated'];
        $newObj->deleted = $row['deleted'];
        $newObj->createdBy = intval($row['createdby']);
        return $newObj;
    }
}
