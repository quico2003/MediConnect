<?php

class Category
{

    private PDO $conn;

    private static string $table_name = "category";

    public int $id;

    public string $guid;

    public string $name;

    public string|null $description;

    public string $created_at;

    public string $update_at;

    public string|null $deleted_at;

    public function __construct(PDO $db)
    {

        $this->conn = $db;
    }


    // function store(): int
    // {
    //     $query = "INSERT INTO `" . self::$table_name . "` SET 
    //     guid=:guid, name=:name, description=:description";

    //     $stmt = $this->conn->prepare($query);

    // }


    public static function getAll(PDO $db, int $page, int $offset, string $search = "", array $filters = []): array
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE deleted_at IS NULL";

        foreach ( $filters as $index => $object) {
            
        }
    }



    private static function getMainObject(PDO $db, array $row): Category
    {

        $newObj = new Category($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->name = $row['name'];
        $newObj->description = $row['description'];
        $newObj->created_at = $row['created_at'];
        $newObj->update_at = $row['update_at'];
        $newObj->deleted_at = $row['deleted_at'];
        return $newObj;

    }


}