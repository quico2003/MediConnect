<?php

include_once $document_root . '/helpers/utils.php';
include_once $document_root . '/config/storagePaths.php';
include_once $document_root . '/config/database.php';

//Helpers
include_once $document_root . '/helpers/http_codes.php';
include_once $document_root . '/helpers/Response.php';
include_once $document_root . '/helpers/Validator.php';

//Objects
include_once $document_root . '/objects/admin.php';
include_once $document_root . '/objects/category.php';
include_once $document_root . '/objects/product.php';
include_once $document_root . '/objects/userprofile.php';
include_once $document_root . '/objects/user.php';
include_once $document_root . '/objects/customexception.php';
include_once $document_root . '/objects/_media.php';
include_once $document_root . '/objects/client.php';
include_once $document_root . '/objects/appointment.php';
include_once $document_root . '/objects/recipe.php';


//Resources 
include_once $document_root . '/resources/UserLoginResource.php';
include_once $document_root . '/resources/AdminResource.php';
include_once $document_root . '/resources/CategoryResource.php';
include_once $document_root . '/resources/ProductResource.php';
include_once $document_root . '/resources/UserResource.php';
include_once $document_root . '/resources/ClientResource.php';
include_once $document_root . '/resources/AppointmentResource.php';

//Controllers 
include_once $document_root . '/controller/generatePDF.php';

