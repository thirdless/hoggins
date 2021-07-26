<?php

$kw = "q";

if(!isset($_GET[$kw])){
    http_response_code(500);
    echo "Malformed request!";
    die();
}

$search = $_GET[$kw];

$headers = [
    "http" => [
        "method" => "GET",
        "header" => "Accept-language: en-US,en;q=0.9\r\n" .
            "Referer: https://www.google.com/\r\n" . 
            "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 OPR/77.0.4054.146\r\n"
    ]
];

$headers_context = stream_context_create($headers);
$results = file_get_contents("https://www.google.com/complete/search?q=" . urlencode($search) . "&client=opera", false, $headers_context);
echo $results;