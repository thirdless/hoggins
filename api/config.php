<?php

session_start();

try{
    $pdo = new PDO("mysql:host=localhost;dbname=hoggins", "root", "");
    $select = $pdo->prepare("SELECT * FROM Users WHERE UserID = ?");
    $select->execute([session_id()]);
    $config = $select->fetch();

    print_r($config);
    if($config == null){
        echo "yes";
    }
}
catch(PDOException $e){
    http_response_code(500);
    echo $e->getMessage();
    die();
}