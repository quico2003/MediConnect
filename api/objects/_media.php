<?php


class Media
{
    private $conn;
    private static $table_name = "media";
    public $id;
    public $boardid;
    public $cardid;
    public $uniquecode;
    public $guid;
    public $title;
    public $description;
    public $alt;
    public $size;
    public $mime;
    public $meta;
    public $url;
    public $thumbnail;
    public $extension;
    public $searchdata;
    public $createdat;
    public $uploadedby;
    public $updatedat;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    private function searchableValues()
    {
        return [
            $this->title,
            $this->description,
            $this->alt,
        ];
    }

    function store()
    {

        $query = "INSERT INTO `" . self::$table_name . "` SET boardid=:boardid, cardid=:cardid, thumbnail=:thumbnail, extension=:extension, url=:url, guid=:guid, title=:title, description=:description, alt=:alt, size=:size, mime=:mime, uploadedby=:uploadedby, uniquecode=:uniquecode, meta=:meta, searchdata=:searchdata";

        $stmt = $this->conn->prepare($query);

        $this->guid = createGUID();
        $stmt->bindParam(":guid", $this->guid);
        $stmt->bindParam(":boardid", $this->boardid);
        $stmt->bindParam(":cardid", $this->cardid);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":size", $this->size);
        $stmt->bindParam(":mime", $this->mime);
        $stmt->bindParam(":extension", $this->extension);
        $stmt->bindParam(":url", $this->url);
        $stmt->bindParam(":thumbnail", $this->thumbnail);
        $stmt->bindParam(":uploadedby", $this->uploadedby);
        $stmt->bindParam(":alt", $this->alt);
        $stmt->bindParam(":uniquecode", $this->uniquecode);
        $stmt->bindValue(":meta", json_encode($this->meta));
        $stmt->bindValue(":searchdata", convertSearchValues($this->searchableValues()));

        $stmt->execute();
        return $this->id = $this->conn->lastInsertId();
    }

    function update()
    {

        $query = "UPDATE `" . self::$table_name . "` SET title=:title, description=:description, alt=:alt, meta=:meta, searchdata=:searchdata WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":alt", $this->alt);
        $stmt->bindValue(":meta", json_encode($this->meta));
        $stmt->bindValue(":searchdata", convertSearchValues($this->searchableValues()));
        $stmt->bindParam(":id", $this->id);


        return $stmt->execute();
    }

    function delete()
    {
        $query = "DELETE FROM `" . self::$table_name . "` WHERE id=:id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        return $stmt->execute();
    }

    public static function getByGuid($db, $guid)
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid";
        $stmt = $db->prepare($query);
        $stmt->bindValue(":guid", $guid);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException("SQL Error", 500);
    }

    public static function getByUniquecode($db, $uniquecode)
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE uniquecode=:uniquecode";
        $stmt = $db->prepare($query);
        $stmt->bindValue(":uniquecode", $uniquecode);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException("SQL Error", 500);
    }

    private static function getMainObject($db, $row)
    {
        $newObj = new Media($db);
        $newObj->id = intval($row['id']);
        $newObj->uniquecode = $row['uniquecode'];
        $newObj->guid = $row['guid'];
        $newObj->title = $row['title'];
        $newObj->description = $row['description'];
        $newObj->alt = $row['alt'];
        $newObj->size = intval($row['size']);
        $newObj->mime = $row['mime'];
        $newObj->extension = $row['extension'];
        $newObj->meta = json_decode($row['meta']);
        $newObj->url = $row['url'];
        $newObj->thumbnail = $row['thumbnail'];
        $newObj->createdat = $row['createdat'];
        $newObj->uploadedby = $row['uploadedby'];
        $newObj->updatedat = $row['updatedat'];
        return $newObj;
    }
}
