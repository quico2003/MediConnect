<?php

class Course
{
    private PDO $conn;
    private static string $table_name = "course";


    public int  $id;
    public string $guid;
    public string $name;
    public string $abbr;
    public string $season;
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
            $this->abbr,
        ];
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            guid=:guid,
            name=:name,
            abbr=:abbr,
            season=:season,
            searchdata=:searchdata
            ";

        $stmt = $this->conn->prepare($query);
        $this->guid = createGUID();
        $stmt->bindParam(":guid", $this->guid);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":abbr", $this->abbr);
        $stmt->bindParam(":season", $this->season);
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
            SET name=:name, abbr=:abbr, updated=:updated, deleted=:deleted, searchdata=:searchdata
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":abbr", $this->abbr);
        $stmt->bindValue(":updated", newDate());
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

    public static function get(PDO $db, int $id): Course|bool
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException("Course not found");
    }

    public static function getwithoutDeleted(PDO $db, int $id): Course|bool
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Course not found");
    }

    public static function getByGuid(PDO $db, string $guid): Course
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Course not found");
    }


    public static function getAll(PDO $db, int $page, int $offset, string $search = "", array $filters = []): array
    {

        $query = "
        SELECT c.*
        FROM `" . self::$table_name . "` c 
        WHERE c.deleted IS NULL";

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

    public static function getAllCountDashboard(PDO $db): int
    {
        $query = "
        SELECT COUNT(c.id) as total
        FROM `" . self::$table_name . "` c 
        WHERE deleted IS NULL
        ";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }


    public static function getAllWithoutPaginationToFilter(PDO $db): array
    {
        $query = "
        SELECT DISTINCT c.*
        FROM `" . self::$table_name . "` AS c
        INNER JOIN `subject` AS s ON c.id = s.course_id
        WHERE c.deleted IS NULL";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {
            $arrayToReturn = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }

    public static function getAllWithoutPaginationToFilterSeasons(PDO $db): array
    {
        $query = "
        SELECT DISTINCT c.*
        FROM `" . self::$table_name . "` AS c
        WHERE c.deleted IS NULL GROUP BY season";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {
            $arrayToReturn = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }


    public static function getAllWithoutPagination(PDO $db): array
    {
        $query = "
        SELECT c.*
        FROM `" . self::$table_name . "` c 
        WHERE c.deleted IS NULL";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {
            $arrayToReturn = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }

    public static function getAllNames(PDO $db): array
    {
        $query = "
        SELECT c.*
        FROM `" . self::$table_name . "` c 
        RIGHT JOIN `subject` s ON c.id = s.course_id
        WHERE c.deleted IS NULL AND s.deleted IS NULL GROUP BY c.id";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {
            $arrayToReturn = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }


    public static function getAllCount(PDO $db, string $search = "", array $filters = []): int
    {
        $query = "
        SELECT COUNT(c.id) as total
        FROM `" . self::$table_name . "` c
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

    private static function getMainObject(PDO $db, array $row): Course
    {
        $newObj = new Course($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->name = $row['name'];
        $newObj->abbr = $row['abbr'];
        $newObj->season = $row['season'];
        $newObj->created = $row['created'];
        $newObj->updated = $row['updated'];
        $newObj->deleted = $row['deleted'];
        return $newObj;
    }
}
