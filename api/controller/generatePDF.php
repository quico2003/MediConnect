<?php

use Dompdf\Dompdf;
use Dompdf\Options;

class GeneratePDF
{
    private $pdf;
    private $conn;
    private string $html = "";
    private string $finalHtml = "";
    private $products = [];
    private Recipe $recipe;
    private Appointment $appointment;
    private User $user;
    private UserProfile $userProfile;
    private Client $client;

    public function __construct($db, $appointment_id)
    {
        $this->conn = $db;
        $options = new Options();
        $options->set('isRemoteEnabled', true);
        $this->pdf = new Dompdf($options);
        $this->fetchData($appointment_id);
    }

    public function fetchData($appointment_id)
    {
        $this->appointment = Appointment::get($this->conn, $appointment_id);
        $this->user = User::get($this->conn, $this->appointment->created_by);
        $this->client = Client::get($this->conn, $this->appointment->created_for);
        $this->userProfile = UserProfile::getByUserId($this->conn, $this->user->id);
        $products_id = Recipe::getAllProductsByAppointment($this->conn, $appointment_id);
        foreach ($products_id as $id) {
            $this->products[] = Product::get($this->conn, $id);
        }
    }

    function mountHtml()
    {
        $this->finalHtml .= "<html><head>
        </head><body>";
        $this->finalHtml .= $this->html;
        $this->finalHtml .= "</body></html>";
    }

    function createPDF()
    {
        $this->init();
        $this->loadHtml();
    }

    function renderInformation()
    {
        $avatarUserPath = $this->userProfile->avatar;

        $this->html .= "<table style='text-align:center;' border='1' width='540'>";
        $this->html .= "<tr>";
        $this->html .= "<th>Client Information:</th>";
        $this->html .= "<th>Practicioner Information:</th>";
        $this->html .= "</tr>";
        $this->html .= "<tr>";
        $this->html .= "<td>";
        $this->renderValueLabel("First Name", $this->client->first_name);
        $this->renderValueLabel("Last Name", $this->client->last_name);
        $this->renderValueLabel("Email", $this->client->email);
        $this->renderValueLabel("Phone", $this->client->phone);
        $this->html .= "</td>";
        $this->html .= "<td>";
        $this->html .= "<img src='$avatarUserPath' width='50' height='50'>";
        $this->renderValueLabel("First Name", $this->userProfile->first_name);
        $this->renderValueLabel("Last Name", $this->userProfile->last_name);
        $this->renderValueLabel("Email", $this->user->email);
        $this->html .= "</td>";
        $this->html .= "</tr>";
        $this->html .= "</table>";
    }

    function renderLogo()
    {
        $path = FileStorage::FilePathLogo();
        $this->html .= "<div><table align='center'>";
        $this->html .= "<tr>";
        $this->html .= "<td>";
        $this->html .= "<img src='$path' width='350' height='150'>";
        $this->html .= "</td>";
        $this->html .= "</tr>";
        $this->html .= "</table></div>";
    }

    function renderValueLabel($value, $label)
    {
        $this->html .= "<p>" . $value . " : " . $label . "</p>";
    }

    function descriptionAppointment()
    {
        $description = $this->appointment->final_description;

        $this->html .= "<div style='margin:40px;'>";
        $this->html .= "<h3>Description Appointment:</h3>";
        $this->html .= "<div>$description</div>";
        $this->html .= "</div>";

    }

    function renderProducts()
    {

        $this->html .= "<table style='page-break-before: always; text-align:center;' border='1' width='540'>";
        $this->html .= "<tr>";
        $this->html .= "<th>Name product</th>";
        $this->html .= "<th>Images</th>";
        $this->html .= "<th>BarCode</th>";
        $this->html .= "</tr>";
        foreach ($this->products as $product) {
            $img = json_decode($product->images)[0];

            $image = FileStorage::FilePathProduct($img);
            logAPI($image);
            $uniqid = $product->uniqid;
            $barcode = (new Picqer\Barcode\Types\TypeCode128())->getBarcode($uniqid);
            $render = new Picqer\Barcode\Renderers\HtmlRenderer();

            $this->html .= "<tr>";
            $this->html .= "<td>" . $product->name . "</td>";
            $this->html .= "<td><img src='$image' width='50' heigth='50'/></td>";
            $this->html .= "<td>" . $render->render($barcode) . "</td>";
            $this->html .= "</tr>";
        }
        $this->html .= "</table>";
        // $uniqid = $this->product->uniqid;

        // $barcode = (new Picqer\Barcode\Types\TypeCode128())->getBarcode($uniqid);
        // logAPI($barcode);
        // $render = new Picqer\Barcode\Renderers\HtmlRenderer();
        // logAPI($render);
        // $this->html .= "<table style='page-break-before: always;'>";
        // $this->html .= "<tr>";
        // $this->html .= "<td><strong>Recommended products:<strong></td>";
        // $this->html .= "</tr>";
        // $this->html .= "<tr>";
        // $this->html .= $render->render($barcode);
        // $this->html .= "</tr>";
        // $this->html .= "</table>";

    }

    function init()
    {
        $this->renderLogo();
        $this->renderInformation();
        $this->descriptionAppointment();
        $this->renderProducts();
    }

    function loadHtml()
    {
        $this->mountHtml();
        $this->pdf->loadHtml($this->finalHtml);
        $this->pdf->render();
        $this->output();
    }

    function output()
    {
        $pdfOutput = $this->pdf->output();

        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="receta.pdf"');
        header('Content-Length: ' . strlen($pdfOutput));
        echo $pdfOutput;
        exit;
    }


}