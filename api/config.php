<?php

function error($e){
    http_response_code(500);
    echo $e;
    die();
}

function get_config($pdo){
    global $userid;

    $select = $pdo->prepare("SELECT * FROM Users WHERE UserID = ?");
    $select->execute([$userid]);
    $config = $select->fetch();

    if($config == null)
        $config = array();
    else
        $config = json_decode($config["Data"], true);

    return $config;
}

function set_config($pdo, $config){
    global $userid;

    $statement = "UPDATE Users SET Data = ? WHERE UserID = ?";

    $verify = $pdo->prepare("SELECT * FROM Users WHERE UserID = ?");
    $verify->execute([$userid]);
    $verify = $verify->fetch();

    if($verify == null)
        $statement = "INSERT INTO Users(Data, UserID) VALUES(?, ?)";

    $exec = $pdo->prepare($statement);
    $exec->execute([json_encode($config), $userid]);
    $res = $exec->fetch();
}

function eval_tile($config, $name, $value){
    if(!isset($config["tiles"]))
        $config["tiles"] = array();

    switch($name){
        case "Gmail":
            // only name
            array_push($config["tiles"], $name);
            break;
        case "Weather":
            // can have value
            if($value == null)
                $value = "";

            array_push($config["tiles"], array($name, $value));
            break;
        case "RSS":
        case "Reddit":
            // must have value
            if($value == null)
                error("Input must have a value");

            array_push($config["tiles"], array($name, $value));
            break;
    }

    return $config;
}

session_start();
$userid = session_id();

try{
    $pdo = new PDO("mysql:host=localhost;dbname=hoggins", "root", "");
    $pdo->exec("CREATE TABLE IF NOT EXISTS Users (UserID VARCHAR(40) PRIMARY KEY, Data TEXT)");
    $config = get_config($pdo);

    if(!isset($_POST["type"])){
        echo json_encode($config);
    }
    else{
        switch($_POST["type"]){
            case "auto-background":
                if($_POST["value"] == "true")
                    $config["auto-background"] = true;
                else
                    $config["auto-background"] = false;
                break;
            case "change-background":
                if(isset($_POST["value"])){
                    if(filter_var($_POST["value"], FILTER_VALIDATE_URL) || $_POST["value"] == "")
                        $config["background-url"] = $_POST["value"];
                    else
                        error("URL is invalid");
                }
                break;
            case "change-theme":
                if(isset($_POST["value"]) && in_array($_POST["value"], array(0, 1, 2)))
                    $config["theme"] = $_POST["value"];
                break;
            case "create-bookmark":
                if(isset($_POST["title"]) && isset($_POST["url"])){
                    if(!isset($config["bookmarks"]))
                        $config["bookmarks"] = array();
                    
                    if(count($config["bookmarks"]) >= 6)
                        error("Maximum number of bookmarks is 6.");
                    else if(strlen($_POST["title"]) > 20)
                        error("Title must have maximum 20 characters.");
                    else if(!filter_var($_POST["url"], FILTER_VALIDATE_URL))
                        error("URL is invalid");

                    array_push($config["bookmarks"], array($_POST["title"], $_POST["url"]));
                }
                break;
            case "remove-bookmark":
                if(isset($_POST["value"]) && isset($config["bookmarks"]) && isset($config["bookmarks"][$_POST["value"]]))
                    array_splice($config["bookmarks"], $_POST["value"], 1);
                break;
            case "add-tile":
                if(isset($_POST["name"]))
                    $value = null;
                    
                    if(isset($_POST["value"]))
                        $value = $_POST["value"];

                    $config = eval_tile($config, $_POST["name"], $value);
                break;
            case "remove-tile":
                if(isset($_POST["value"]) && isset($config["tiles"]) && isset($config["tiles"][$_POST["value"]]))
                    array_splice($config["tiles"], $_POST["value"], 1);
                break;
            default:
                error("Invalid type");
        }

        set_config($pdo, $config);
    }

}
catch(PDOException $e){
    error($e->getMessage());
}