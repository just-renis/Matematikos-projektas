<?php
    require_once("connectToDatabase.php");
    echo "<h1 id='pendingTeachersHeader'>Laukiantys užtvirtinimo mokytojai</h1>";
    createPendingTeachersHTMLTable($conn, ["Užtvirtinti šį mokytoją", "Neužtvirtinti šio mokytojo"]);
    echo "<h1 id='approvedTeachersHeader'>Užtvirtinti mokytojai</h1>";
    createApprovedHTMLTable($conn, "teachers", "Nėra jokių registruotų mokytojų.");
    echo "<h1 id='studentsHeader'>Visi mokiniai</h1>";
    createApprovedHTMLTable($conn, "students", "Nėra jokių registruotų mokinių.");
    setRecovering($conn, "students", "mokinio");
    setRecovering($conn, "teachers", "mokytojo");
    function createPendingTeachersHTMLTable($conn, $buttonsText)
    {
        $pending = mysqli_query($conn, "SELECT * FROM teachers");
        $pendingRows = mysqli_fetch_all($pending, MYSQLI_ASSOC);
        foreach ($pendingRows as $row)
        {
            if (isset($_POST["approve_".$row["id"]]))
            {
                $id = $row["id"];
                $sql = "UPDATE teachers SET isApproved = true WHERE id = '$id'";
                mysqli_query($conn, $sql);
                header("Location: ".$_SERVER['PHP_SELF']);
                exit;
            }
            else if (isset($_POST["notApprove_".$row["id"]]))   
            {
                $sql = "DELETE FROM teachers WHERE id=".$row["id"];
                mysqli_query($conn, $sql);
                header("Location: ".$_SERVER['PHP_SELF']);
                exit;
            }
        }
        echo "<table class='fancy-table'><tr>";
        echo "<th>Vartotojo vardas</th>";
        echo "<th>Registruotasi šiuo laiku</th>";
        echo "<th>Patvirtinimas</th></tr>";
        $pendingCount = 0;
        foreach ($pendingRows as $row)
        {
            if (!$row["isApproved"])
            {
                echo "<tr><td>".$row["username"]."</td>";
                echo "<td>".$row["addedAt"]."</td>";
                echo "<td><form method='post'><input type='submit' name='approve_".$row["id"]."' value='$buttonsText[0]'> <input type='submit' name='notApprove_".$row["id"]."' value='$buttonsText[1]'></form></td></tr>";
                $pendingCount++;
            }
        }
        if ($pendingCount === 0) echo "<tr><td>Nėra jokių patvirtinimo laukiančių mokytojų.</td><td></td><td></td></tr>";
        echo "</table>";
    }
    function createApprovedHTMLTable($conn, $table, $noDataText)
    {
        $approved = mysqli_query($conn,"SELECT * FROM $table");
        $approvedRows = mysqli_fetch_all($approved, MYSQLI_ASSOC);
        echo "<table class='fancy-table'><tr>";
        echo "<th>Vartotojo vardas</th>";
        echo "<th>Patvirtinta šiuo laiku</th>";
        $userTypeText = $table === "students" ? "mokinio" : "mokytojo";
        echo "<th>Atstatyti $userTypeText slaptažodį</th></tr>";
        if (sizeof($approvedRows) === 0) echo "<tr><td>$noDataText</td><td></td><td></td></tr>";
        else 
        {
            foreach ($approvedRows as $row)
            {
                if ($table === "teachers" && $row["isApproved"]) echoTable($row, $userTypeText);
                else if ($table !== "teachers") echoTable($row, $userTypeText);
            }
        }
        echo "</table>";
    }
    function echoTable($row, $userTypeText)
    {
        $id = $row["id"];
        echo "<tr><td>".$row["username"]."</td>";
        echo "<td>".$row["addedAt"]."</td>";
        echo "<td style='width: 50%'>";
        echo "<form method='post'>";
        echo "<div class='inline-container'>";
        echo "<input type='submit' class='inline' value='Atstatyti slaptažodį' name=".$userTypeText."recoverPassword".$id.">";
        echo "<input type='password' class='inline' id=".$userTypeText."recPassword".$id." name=".$userTypeText."recPassword".$id." maxlength='100' style='width: 30%;' required>";
        echo "<input type='password' class='inline' id=".$userTypeText."recConfirm_password".$id." name=".$userTypeText."recConfirm_password".$id." maxlength='100' style='width: 30%;' required>";
        echo "</div>";
        echo "</form>";
        echo "</td>";
    }
    function setRecovering($conn, $table, $userType)
    {
        $approved = mysqli_query($conn,"SELECT * FROM $table");
        $approvedRows = mysqli_fetch_all($approved, MYSQLI_ASSOC);
        foreach ($approvedRows as $row)
        {
            if (isset($_POST[$userType.'recoverPassword'.$row['id']])) 
            {
                if (strlen($_POST[$userType.'recPassword'.$row['id']]) >= 6)
                {
                    if ($_POST[$userType.'recPassword'.$row['id']] === $_POST[$userType.'recConfirm_password'.$row['id']])
                    {
                        $id = $row['id'];
                        $password = password_hash($_POST[$userType.'recPassword'.$row['id']], PASSWORD_DEFAULT);
                        if ($userType === "mokytojo") $sql = "UPDATE $table SET password = '$password' WHERE id = '$id'";
                        else $sql = "UPDATE $table SET password = '$password', firstLogin = true WHERE id = '$id'";
                        mysqli_query($conn, $sql);
                        header("Location: ".$_SERVER['PHP_SELF']);
                    }
                }
            }
        }
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