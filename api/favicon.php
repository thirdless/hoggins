<?php

$url = $_GET["url"];
$scheme = parse_url($url, PHP_URL_SCHEME);
$hostname = parse_url($url, PHP_URL_HOST);

$favicon = $scheme . "://" . $hostname . "/favicon.ico";

echo file_get_contents($favicon);