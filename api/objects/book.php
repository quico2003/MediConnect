<?php

class Book
{
    private PDO $conn;
    private static string $table_name = "book";


    public int  $id;
    public string $guid;
    public String $name;
    public String $isbn;
    public int $subject_id;
    public int $stock;
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
            $this->name,
            $this->isbn,
            array(
                "from" => $this->subject(),
                "what" => [
                    'name',
                ]
            )
        ];
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            guid=:guid,
            name=:name,
            isbn=:isbn,
            stock=:stock,
            subject_id=:subject_id,
            searchdata=:searchdata
            ";

        $stmt = $this->conn->prepare($query);


        $this->guid = createGUID();
        $stmt->bindValue(":guid", $this->guid);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":isbn", $this->isbn);
        $stmt->bindParam(":stock", $this->stock);
        $stmt->bindParam(":subject_id", $this->subject_id);
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
        SET name=:name, isbn=:isbn, stock=:stock, updated=:updated, deleted=:deleted, searchdata=:searchdata
        WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":isbn", $this->isbn);
        $stmt->bindParam(":stock", $this->stock);
        $stmt->bindValue(":updated", newDate());
        $stmt->bindValue(":deleted", $this->deleted);
        $stmt->bindParam(":id", $this->id);
        $stmt->bindValue(":searchdata", convertSearchValues($this->searchableValues()));
        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($th->getMessage());
        }
    }

    function delete(): bool
    {
        $this->deleted = newDate();
        return $this->update();
    }

    public static function deleteBySubject(PDO $db, int $subject_id): bool
    {
        $query = "UPDATE `" . self::$table_name . "` SET deleted=:deleted WHERE subject_id=:subject_id";

        $stmt = $db->prepare($query);
        $stmt->bindValue(":deleted", newDate());
        $stmt->bindValue(":subject_id", $subject_id);

        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    function subject(): Subject | bool
    {
        if (isset($this->subject_id)) {
            return Subject::get($this->conn, $this->subject_id);
        }
        return null;
    }


    public static function get(PDO $db, int $id): Book
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Book not found");
    }
    public static function getWithoutDeleted(PDO $db, int $id): Book
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Book not found");
    }

    public static function getByIsbn(PDO $db, string $isbn): Book | bool
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE isbn=:isbn AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":isbn", $isbn);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException("Invalid credentials");
    }

    public static function getByGuid(PDO $db, string $guid): Book
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Book not found");
    }

    public static function getBySubject(PDO $db, int $subject_id): array
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE subject_id=:subject_id AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":subject_id", $subject_id);

        if ($stmt->execute()) {
            $arrayToReturn = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException("Book not found");
    }


    public static function getAll(PDO $db, int $page, int $offset, string $search = "", $filters = []): array
    {
        $query = "
        SELECT b.*
        FROM `" . self::$table_name . "` b
        WHERE b.deleted IS NULL";

        foreach ($filters as $index => $object) {
            $query .= " AND $object->id = :val$index";
        }

        applySearchOnQuery($query);
        doPagination($offset, $page, $query);

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

    public static function getAllWithCourseFilter(PDO $db, int $page, int $offset, string $search = "", $filters = []): array
    {
        $query = "
        SELECT b.*
        FROM `" . self::$table_name . "` b
        JOIN subject s ON b.subject_id = s.id
        JOIN course c ON s.course_id = c.id
        WHERE b.deleted IS NULL";

        if (!empty($filters)) {
            $query .= " AND c.id = :course";
        }

        $query .= " AND LOWER(b.searchdata) LIKE LOWER(:search)";

        doPagination($offset, $page, $query);

        $stmt = $db->prepare($query);

        if (!empty($filters)) {
            $courseId = $filters[0]->value;
            $stmt->bindParam(":course", $courseId, PDO::PARAM_INT);
        }

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

    public static function getAllCountWithCourseFilter(PDO $db, string $search = "", $filters = []): int
    {
        $query = "
        SELECT COUNT(b.id) as total
        FROM `" . self::$table_name . "` b
        JOIN subject s ON b.subject_id = s.id
        JOIN course c ON s.course_id = c.id
        WHERE b.deleted IS NULL AND c.deleted IS NULL";

        if (!empty($filters)) {
            $query .= " AND c.id = :course";
        }

        $query .= " AND LOWER(b.searchdata) LIKE LOWER(:search)";

        $stmt = $db->prepare($query);

        if (!empty($filters)) {
            $courseId = $filters[0]->value;
            $stmt->bindParam(":course", $courseId, PDO::PARAM_INT);
        }

        applySearchOnBindedValue($search, $stmt);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }



    public static function getAllCount(PDO $db, string $search = "", $filters = []): int
    {
        $query = "
        SELECT COUNT(b.id) as total
        FROM `" . self::$table_name . "` b 
        WHERE deleted IS NULL
        ";

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

    public static function getAllCountDashboard(PDO $db): int
    {
        $query = "
        SELECT COUNT(b.id) as total
        FROM `" . self::$table_name . "` b
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


    public static function getCountOfCopiesByBookGuid(PDO $db, string $book_guid): int
    {
        $query = "
        SELECT COUNT(h.id) as total
        FROM `" . self::$table_name . "` b
        INNER JOIN `copy` c ON c.book_id = b.id
        INNER JOIN `history` h ON h.copy_id = c.id
        WHERE h.finaldate IS NULL AND b.guid=:book_guid
        ";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":book_guid", $book_guid);
        if ($stmt->execute()) {

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }

    private static function getMainObject(PDO $db, array $row): Book
    {
        $newObj = new Book($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->name = $row['name'];
        $newObj->isbn = $row['isbn'];
        $newObj->subject_id = intval($row['subject_id']);
        $newObj->stock = intval($row['stock']);
        $newObj->created = $row['created'];
        $newObj->updated = $row['updated'];
        $newObj->deleted = $row['deleted'];
        return $newObj;
    }
}
