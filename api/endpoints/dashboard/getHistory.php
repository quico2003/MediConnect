<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();


    $cursesCount = Course::getAllCountDashboard($db);
    $copiesCount = Copy::getAllCountDashboard($db);
    $booksCount = Book::getAllCountDashboard($db);
    $subjectsCount = Subject::getAllCountDashboard($db);
    $studentsCount = Student::getAllCountDashboard($db);

    $goodCopiesCount = Copy::getAllCountGoodCopiesDashboard($db);
    $badCopiesCount = Copy::getAllBadCopiesCountDashboard($db);

    $studentGraphicsData = Student::getAllCountStudentsData($db);
    $copyGraphicsData = Copy::getAllCountCopiesData($db);

    $pieChart = [
        [
            "name" => "BadCopies",
            "uv" => $badCopiesCount,
            "color" => "#FF6961"
        ],
        [
            "name" => "GoodCopies",
            "uv" => $goodCopiesCount,
            "color" => "#77DD77"
        ]
    ];

    $responseData = [
        "cursesCount" => $cursesCount,
        "subjectsCount" => $subjectsCount,
        "booksCount" => $booksCount,
        "studentsCount" => $studentsCount,
        "copiesCount" => $copiesCount,
        "badCopiesCount" => $badCopiesCount,
        "goodCopiesCount" => $goodCopiesCount,
        "studentHistory" => $studentGraphicsData,
        "copiesHistory" => $copyGraphicsData,
        "pieChart" => $pieChart,
        "cursesCountColor" => "#ffaa00",
        "subjectsCountColor" =>  "#00AAFF",
        "booksCountColor" => "#797D7F",
        "studentsCountColor" =>  "#5B2C6F",
        "goodCopiesColor" => "#55FF55",
        "badCopiesColor" => "#ff4545",
    ];

    $db->commit();
    Response::sendResponse([
        "data" => $responseData,
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
