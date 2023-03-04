<?php
    require_once("connectToDatabase.php");
    $pendingTeachers = mysqli_query($conn,"SELECT * FROM pendingteachers");
    $pendingTeachersRows = mysqli_fetch_all($pendingTeachers, MYSQLI_ASSOC);
    echo "<table class='fancy-table'><tr>";
    echo "<th>Vartotojo vardas</th>";
    echo "<th>Registruotasi šiuo laiku</th>";
    echo "<th>Patvirtinimas</th></tr>";
    if (sizeof($pendingTeachersRows) === 0) echo "<tr><td>Nėra jokių patvirtinimo laukiančių mokytojų.</td><td></td><td></td></tr>";
    else
    {
        foreach ($pendingTeachersRows as $row)
        {
            echo "<tr><td>".$row["username"]."</td>";
            echo "<td>".convertToDate($row["date"])."</td>";
            echo "<td><form method='post'><input type='submit' name='approve_".$row["id"]."' value='Užtvirtinti šį mokytoją'> <input type='submit' name='notApprove_".$row["id"]."' value='Neužtvirtinti šio mokytojo'></form></td></tr>";
        }
    }
    echo "</table>";
    foreach ($pendingTeachersRows as $row)
    {
        if (isset($_POST["approve_".$row["id"]]))
        {
            $sql = "INSERT INTO approvedteachers (username, password, approvedAt) VALUES ('".$row["username"]."','".$row["password"]."','".convertToDate(time())."')";
            mysqli_query($conn, $sql);
            $sql = "DELETE FROM pendingteachers WHERE id=".$row["id"];
            mysqli_query($conn, $sql);
            header("Location: ".$_SERVER['PHP_SELF']);
            exit;
        }
        elseif (isset($_POST["notApprove_".$row["id"]]))
        {
            $sql = "DELETE FROM pendingteachers WHERE id=".$row["id"];
            mysqli_query($conn, $sql);
            header("Location: ".$_SERVER['PHP_SELF']);
            exit;
        }
    }
    $approvedTeachers = mysqli_query($conn,"SELECT * FROM approvedteachers");
    $approvedTeachersRows = mysqli_fetch_all($approvedTeachers, MYSQLI_ASSOC);
    echo "<table class='fancy-table'><tr>";
    echo "<th>Vartotojo vardas</th>";
    echo "<th>Patvirtinta šiuo laiku</th></tr>";
    if (sizeof($approvedTeachersRows) === 0) echo "<tr><td>Nėra jokių registruotų mokytojų.</td><td></td></tr>";
    else 
    {
        foreach ($approvedTeachersRows as $row)
        {
            echo "<tr><td>".$row["username"]."</td>";
            echo "<td>".$row["approvedAt"]."</td>";
        }
    }
    echo "</table>";
    function convertToDate($time) { return date("Y-m-d H:i:s", $time); }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Admin</title>
        <link rel="stylesheet" href="adminView.css">
    </head>
    <body>
        
    </body>
</html>