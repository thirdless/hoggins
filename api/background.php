<?php

$api = file_get_contents("https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN");
$json = json_decode($api);

echo "https://cn.bing.com" . $json->images[0]->url;