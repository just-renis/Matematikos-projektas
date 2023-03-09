<?php
    require_once("connectToDatabase.php");
    echo "<h1 id='pendingTeachersHeader'>Laukiantys užtvirtinimo mokytojai</h1>";
    createPendingHTMLTable($conn, "pendingteachers", "Nėra jokių patvirtinimo laukiančių mokytojų.", ["Užtvirtinti šį mokytoją", "Neužtvirtinti šio mokytojo"]);
    echo "<h1 id='approvedTeachersHeader'>Užtvirtinti mokytojai</h1>";
    createApprovedHTMLTable($conn, "approvedteachers", "Nėra jokių registruotų mokytojų.");
    echo "<h1 id='studentsHeader'>Užtvirtinti mokiniai</h1>";
    createApprovedHTMLTable($conn, "students", "Nėra jokių registruotų mokinių.");
    function createPendingHTMLTable($conn, $table, $noDataText, $buttonsText)
    {
        $pending = mysqli_query($conn, "SELECT * FROM $table");
        $pendingRows = mysqli_fetch_all($pending, MYSQLI_ASSOC);
        echo "<table class='fancy-table'><tr>";
        echo "<th>Vartotojo vardas</th>";
        echo "<th>Registruotasi šiuo laiku</th>";
        echo "<th>Patvirtinimas</th></tr>";
        if (sizeof($pendingRows) === 0) echo "<tr><td>$noDataText</td><td></td><td></td></tr>";
        else
        {
            foreach ($pendingRows as $row)
            {
                echo "<tr><td>".$row["username"]."</td>";
                echo "<td>".$row["date"]."</td>";
                echo "<td><form method='post'><input type='submit' name='approve_".$row["id"]."' value='$buttonsText[0]'> <input type='submit' name='notApprove_".$row["id"]."' value='$buttonsText[1]'></form></td></tr>";
            }
        }
        echo "</table>";
        foreach ($pendingRows as $row)
        {
            if (isset($_POST["approve_".$row["id"]]))
            {
                $sql = "INSERT INTO $table (username, password, approvedAt) VALUES ('".$row["username"]."','".$row["password"]."','".date("Y-m-d H:i:s", time())."')";
                mysqli_query($conn, $sql);
                $sql = "DELETE FROM $table WHERE id=".$row["id"];
                mysqli_query($conn, $sql);
                header("Location: ".$_SERVER['PHP_SELF']);
                exit;
            }
            elseif (isset($_POST["notApprove_".$row["id"]]))
            {
                $sql = "DELETE FROM $table WHERE id=".$row["id"];
                mysqli_query($conn, $sql);
                header("Location: ".$_SERVER['PHP_SELF']);
                exit;
            }
        }
    }
    function createApprovedHTMLTable($conn, $table, $noDataText)
    {
        $approved = mysqli_query($conn,"SELECT * FROM $table");
        $approvedRows = mysqli_fetch_all($approved, MYSQLI_ASSOC);
        echo "<table class='fancy-table'><tr>";
        echo "<th>Vartotojo vardas</th>";
        echo "<th>Patvirtinta šiuo laiku</th></tr>";
        if (sizeof($approvedRows) === 0) echo "<tr><td>$noDataText</td><td></td></tr>";
        else 
        {
            foreach ($approvedRows as $row)
            {
                echo "<tr><td>".$row["username"]."</td>";
                echo "<td>".$row["addedAt"]."</td>";
            }
        }
        echo "</table>";
    }
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