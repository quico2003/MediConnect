<?php

class History
{
    private PDO $conn;
    private static string $table_name = "history";


    public int $id;
    public string $guid;
    public int $copy_id;
    public int $subject_id;
    public int $student_id;
    public int $initialstate;
    public int|null $finalstate;
    public string $initialdate;
    public string|null $finaldate;
    public string|null $observations;
    public string|null $updated;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    private function searchableValues(): array
    {
        return [
            array(
                "from" => $this->copy(),
                "what" => [
                    'uniqid',
                    'book.name'
                ]
            ),
            array(
                "from" => $this->student(false),
                "what" => [
                    'nia',
                ]
            ),
            array(
                "from" => $this->subject(false),
                "what" => [
                    'course.season',
                ]
            )
        ];
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            guid=:guid,
            copy_id=:copy_id,
            subject_id=:subject_id,
            student_id=:student_id,
            initialstate=:initialstate,
            searchdata=:searchdata
            ";

        $stmt = $this->conn->prepare($query);

        $this->guid = createGUID();
        $stmt->bindParam(":guid", $this->guid);
        $stmt->bindParam(":copy_id", $this->copy_id);
        $stmt->bindParam(":subject_id", $this->subject_id);
        $stmt->bindParam(":student_id", $this->student_id);
        $stmt->bindParam(":initialstate", $this->initialstate);
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
            SET finalstate=:finalstate, finaldate=:finaldate, observations=:observations, searchdata=:searchdata, updated=:updated
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":finalstate", $this->finalstate);
        $stmt->bindParam(":finaldate", $this->finaldate);
        $stmt->bindParam(":observations", $this->observations);
        $stmt->bindParam(":updated", $this->updated);
        $stmt->bindValue(":searchdata", convertSearchValues($this->searchableValues()));
        $stmt->bindParam(":id", $this->id);

        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    function copy(): Copy
    {
        return Copy::get($this->conn, $this->copy_id);
    }

    function subject(bool $checkdelete): Subject
    {
        if ($checkdelete) {
            return Subject::getWithoutDelete($this->conn, $this->subject_id);
        } else
            return Subject::get($this->conn, $this->subject_id);
    }

    function student(bool $checkdelete): Student|null
    {
        if ($checkdelete) {
            return Student::getwithoutDelete($this->conn, $this->student_id);
        } else
            return Student::get($this->conn, $this->student_id);
    }

    public static function get(PDO $db, int $id): History
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("History not found");
    }

    public static function getByCopyId(PDO $db, int $copy_id): History
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE copy_id=:copy_id";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":copy_id", $copy_id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException($stmt->errorInfo());
    }

    public static function getByGuid(PDO $db, string $guid): History|bool
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException($stmt->errorInfo());
    }

    public static function asignedCopy(PDO $db, int $copyId): int
    {
        $query = "
        SELECT COUNT(*) as total
        FROM `" . self::$table_name . "` 
        WHERE copy_id=:copy_id AND finaldate IS NULL";

        $stmt = $db->prepare($query);
        $stmt->bindParam(":copy_id", $copyId);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }

        createException($stmt->errorInfo());
    }

    public static function getCopiesByUserId(PDO $db, string $id): array
    {
        $query = "
        SELECT h.*
        FROM `" . self::$table_name . "` h 
        INNER JOIN `copy` c ON c.id = h.copy_id
        INNER JOIN `subject` s ON s.id = h.subject_id
        WHERE h.student_id = :id AND h.finaldate IS NULL
        AND s.deleted IS NULL;
        ";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            $arrayToReturn = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }

    public static function getHistoryByUserId(PDO $db, string $id, int $page, int $offset, string $search = ""): array
    {
        $query = "
        SELECT h.*
        FROM `" . self::$table_name . "` h 
        INNER JOIN `copy` c ON c.id = h.copy_id
        WHERE h.student_id=:id AND LOWER(h.searchdata) LIKE LOWER(:search)
        ";

        doPagination($offset, $page, $query);

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);
        $stmt->bindValue(":search", "%" . $search . "%");

        if ($stmt->execute()) {
            $arrayToReturn = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }
    public static function getHistoryByCopyId(PDO $db, string $id, int $page, int $offset, string $search = ""): array
    {
        $query = "
        SELECT h.*
        FROM `" . self::$table_name . "` h 
        INNER JOIN `copy` c ON c.id = h.copy_id
        WHERE h.copy_id=:id AND LOWER(h.searchdata) LIKE LOWER(:search)
        ";

        doPagination($offset, $page, $query);

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);
        $stmt->bindValue(":search", "%" . $search . "%");

        if ($stmt->execute()) {
            $arrayToReturn = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }
    public static function getHistoryByUserIdCount(PDO $db, string $id, int $page, int $offset, string $search = ""): int
    {
        $query = "
        SELECT COUNT(*) as total
        FROM `" . self::$table_name . "` h 
        INNER JOIN `copy` c ON c.id = h.copy_id
        WHERE h.student_id =:id AND LOWER(h.searchdata) LIKE LOWER(:search)
    ";

        $stmt = $db->prepare($query);
        $stmt->bindParam(":id", $id);

        $stmt->bindValue(":search", "%" . $search . "%");
        if ($stmt->execute()) {

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }
    public static function getHistoryByCopyIdCount(PDO $db, string $id, int $page, int $offset, string $search = ""): int
    {
        $query = "
        SELECT COUNT(*) as total
        FROM `" . self::$table_name . "` h 
        INNER JOIN `copy` c ON c.id = h.copy_id
        WHERE h.copy_id=:id AND LOWER(h.searchdata) LIKE LOWER(:search)
    ";

        $stmt = $db->prepare($query);
        $stmt->bindParam(":id", $id);

        $stmt->bindValue(":search", "%" . $search . "%");
        if ($stmt->execute()) {

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }


    public static function checkIfStudentHaveSubjectAssigned(PDO $db, int $subject_id, int $student_id): bool
    {
        $query = "SELECT id
        FROM `" . self::$table_name . "`
        WHERE subject_id = :subject_id AND student_id = :student_id  AND finalstate IS null";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":subject_id", $subject_id);
        $stmt->bindParam(":student_id", $student_id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return true;
            }
            return false;
        }
        createException($stmt->errorInfo());
    }
    public static function checkIfStudentHaveABookOfACopy(PDO $db, int $copy_id, int $student_id): bool
    {

        $query = "SELECT id
        FROM `" . self::$table_name . "`
        WHERE subject_id = :subject_id AND student_id = :student_id  AND finalstate IS null";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":subject_id", $subject_id);
        $stmt->bindParam(":student_id", $student_id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return true;
            }
            return false;
        }
        createException($stmt->errorInfo());
    }

    public static function checkIfCopyIsAssigned(PDO $db, int $copy_id): bool
    {
        $query = "
        SELECT * FROM `" . self::$table_name . "` AS h 
        WHERE copy_id = :copy_id AND h.finaldate IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":copy_id", $copy_id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return false;
            }
            return true;
        }
        createException($stmt->errorInfo());
    }

    private static function getMainObject(PDO $db, array $row): History
    {
        $newObj = new History($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->copy_id = intval($row['copy_id']);
        $newObj->subject_id = intval($row['subject_id']);
        $newObj->student_id = intval($row['student_id']);
        $newObj->initialstate = $row['initialstate'];
        $newObj->finalstate = $row['finalstate'];
        $newObj->initialdate = $row['initialdate'];
        $newObj->finaldate = $row['finaldate'];
        $newObj->observations = $row['observations'];
        $newObj->updated = $row['updated'];
        return $newObj;
    }
}
