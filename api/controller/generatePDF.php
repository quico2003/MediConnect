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
        $options->set('isHtml5ParserEnabled', true);
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
        $fecha = date('d/m/Y');
        $path = FileStorage::FilePathLogo();

        $this->finalHtml = "
            <html>
            <head>
                <style>
                    @page {
                        margin: 170px 30px 100px 30px; 
                    }

                    body {
                        font-family: sans-serif;
                        font-size: 12px;
                        margin: 0px;
                        padding: 0px;
                    }

                    header {
                        position: fixed;
                        top: -150px; 
                        left: 0;
                        right: 0;
                        height: 150px;
                        text-align: center;
                        font-size: 10px;
                        color: #555;
                    }

                    footer {
                        position: fixed;
                        bottom: -60px;
                        left: 0px;
                        right: 0px;
                        height: 50px;
                        text-align: center;
                        font-size: 10px;
                        color: #555;
                        border-top: 1px solid #ccc;
                        padding-top: 5px;
                    }

                    .footer .pagenum:before {
                        content: counter(page);
                    }

                    .table {
                        max-width: 100%;
                        height: auto;
                        border: 1px solid black;
                        border-radius: 10px;
                        border-style: groove;
                    }

                    .content {
                        margin-top: 20px;
                    }

                    th, td {
                        padding: 10px;
                    }   

                </style>
            </head>
            <body>

                <header>
                    <div>
                        <table align='center'>
                        <tr>
                        <td><img src='$path' width='350' height='150'></td>
                        </tr>
                        </table>
                    </div>
                </header>

                <footer class='footer'>
                    Mediconnect© - Documento generado el $fecha | Página <span class='pagenum'></span>
                </footer>

                <div class='content'>
                    {$this->html}
                </div>
            </body>
            </html>";
    }

    function createPDF()
    {
        $this->init();
        $this->mountHtml();
        $this->loadHtml();
    }

    function renderInformation()
    {
        $avatarUserPath = $this->userProfile->avatar;

        $this->html .= "<table class='table' style='text-align:center;' border='1' width='540'>";
        $this->html .= "<tr class='tr'>";
        $this->html .= "<th class='th'>Client Information:</th>";
        $this->html .= "<th class='th'>Practicioner Information:</th>";
        $this->html .= "</tr>";
        $this->html .= "<tr class='tr'>";
        $this->html .= "<td class='td'>";
        $this->renderValueLabel("First Name", $this->client->first_name);
        $this->renderValueLabel("Last Name", $this->client->last_name);
        $this->renderValueLabel("Email", $this->client->email);
        $this->renderValueLabel("Phone", $this->client->phone);
        $this->html .= "</td>";
        $this->html .= "<td class='td'>";
        $this->html .= "<img src='$avatarUserPath' width='50' height='50'>";
        $this->renderValueLabel("First Name", $this->userProfile->first_name);
        $this->renderValueLabel("Last Name", $this->userProfile->last_name);
        $this->renderValueLabel("Email", $this->user->email);
        $this->html .= "</td>";
        $this->html .= "</tr>";
        $this->html .= "</table>";
    }

    function renderValueLabel($value, $label)
    {
        $this->html .= "<p><strong>" . $value . " </strong>: " . $label . "</p>";
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

        $this->html .= "<table class='table' style='text-align:center; page-break-before: always;' border='1' width='540'>";
        $this->html .= "<col>";
        $this->html .= "<col>";
        $this->html .= "<colgroup span='3'></colgroup>";
        $this->html .= "<tr>";
        $this->html .= "<th colspan='3' scope='colgroup'>Recomendes Products</th>";
        $this->html .= "</tr>";
        $this->html .= "<tr>";
        $this->html .= "<th>Name product</th>";
        $this->html .= "<th>Images</th>";
        $this->html .= "<th>BarCode</th>";
        $this->html .= "</tr>";
        foreach ($this->products as $product) {
            $img = json_decode($product->images)[0];

            $image = FileStorage::FilePathProduct($img);

            $uniqid = $product->uniqid;
            $barcode = (new Picqer\Barcode\Types\TypeCode128())->getBarcode($uniqid);
            $render = new Picqer\Barcode\Renderers\HtmlRenderer();

            $this->html .= "<tr>";
            $this->html .= "<td>" . $product->name . "</td>";
            $this->html .= "<td><img src='$image' width='50' heigth='50'/></td>";
            $this->html .= "<td style='text-align: center; vertical-align: middle;'>
                                <div style='display: inline-block;'>" . $render->render($barcode) . "</div>
                            </td>";
            $this->html .= "</tr>";
        }
        $this->html .= "</table>";


    }

    function init()
    {
        $this->renderInformation();
        $this->descriptionAppointment();
        $this->renderProducts();
    }

    function loadHtml()
    {

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