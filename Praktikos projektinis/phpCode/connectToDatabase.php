<?php
    date_default_timezone_set('Europe/Vilnius');
    session_start();
    $serverName = "localhost";
    $username = "root";
    $password = "";
    $dbName = "matematikos_projektas";
    $conn = new mysqli($serverName, $username, $password, $dbName);
    if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);
?>