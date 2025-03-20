<?php



include_once $document_root . '/helpers/utils.php';
include_once $document_root . '/config/storagePaths.php';
include_once $document_root . '/config/database.php';

//Helpers
include_once $document_root . '/helpers/http_codes.php';
include_once $document_root . '/helpers/Response.php';
include_once $document_root . '/helpers/Validator.php';

//Email content
include_once $document_root . '/helpers/emails/forgot_password_content.php';

//Objects
include_once $document_root . '/objects/admin.php';
include_once $document_root . '/objects/category.php';

include_once $document_root . '/objects/customexception.php';
include_once $document_root . '/objects/book.php';
include_once $document_root . '/objects/copy.php';
include_once $document_root . '/objects/course.php';
include_once $document_root . '/objects/subject.php';
include_once $document_root . '/objects/user.php';
include_once $document_root . '/objects/userprofile.php';
include_once $document_root . '/objects/student.php';
include_once $document_root . '/objects/history.php';
include_once $document_root . '/objects/studentprofile.php';
include_once $document_root . '/objects/_media.php';


//Resources
include_once $document_root . '/resources/AdminResource.php';
include_once $document_root . '/resources/CategoryResource.php';

include_once $document_root . '/resources/BookResource.php';
include_once $document_root . '/resources/UserResource.php';
include_once $document_root . '/resources/StudentResource.php';
include_once $document_root . '/resources/SubjectResource.php';
include_once $document_root . '/resources/CopyResource.php';
include_once $document_root . '/resources/CourseResource.php';
include_once $document_root . '/resources/HistoryResource.php';
include_once $document_root . '/resources/AccountResource.php';

//include_once $document_root . '/objects/invitations.php';
