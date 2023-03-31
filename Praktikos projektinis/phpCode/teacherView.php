<?php
    require_once("connectToDatabase.php");
    $registerError = "";
    $error = "";
    $teacherId = $_SESSION['teacherId'];
    if (isset($_POST["registerButton"]))
    {
        if (empty($_POST["regUsername"]) || empty($_POST["regPassword"]) || empty($_POST["regConfirm_password"])) $registerError = "Tiktais norimas požymis gali būti neįrašomas";
        else
        {
            if (strlen($_POST["regPassword"]) < 6) $registerError = "Slaptažodis turėtų būti sudarytas bent jau iš 6 simbolių";
            else
            {
                if ($_POST["regPassword"] !== $_POST["regConfirm_password"]) $registerError = "Slaptažodžiai nesutampa";
                else
                {
                    $usernameExists = false;
                    $students = mysqli_query($conn,"SELECT * FROM students");
                    $studentsRows = mysqli_fetch_all($students, MYSQLI_ASSOC);
                    foreach ($studentsRows as $row) if ($_POST["regUsername"] === $row["username"]) $usernameExists = true;
                    if (!$usernameExists)
                    {
                        $username = $_POST["regUsername"];
                        $password = password_hash($_POST["regPassword"], PASSWORD_DEFAULT);
                        $attribute = $_POST["regAttribute"];
                        $sql = "INSERT INTO students (username, password, addedAt, attribute, firstLogin, teacherId) VALUES ('$username', '$password','".date('Y-m-d H:i:s', time())."', '$attribute', true, '$teacherId')";
                        mysqli_query($conn, $sql);
                        $studentId = mysqli_insert_id($conn);
                        $sql = "INSERT INTO studentsresults (level, points, luckIndicator, studentId) VALUES (0, 0, 0, $studentId)";
                        mysqli_query($conn, $sql);
                        header("Location: ".$_SERVER['PHP_SELF']);
                    }
                    else $registerError = "Toks vartotojo vardas jau egzistuoja";
                }
            }
        }
    }
    $students = mysqli_query($conn,"SELECT * FROM students");
    $studentsRows = mysqli_fetch_all($students, MYSQLI_ASSOC);
    foreach ($studentsRows as $row)
    {
        if (isset($_POST['recoverPassword'.$row['id']])) 
        {
            if (strlen($_POST['recPassword'.$row['id']]) < 6) $error = "Slaptažodis turėtų būti sudarytas bent jau iš 6 simbolių";
            else
            {
                if ($_POST['recPassword'.$row['id']] !== $_POST['recConfirm_password'.$row['id']]) $error = "Slaptažodžiai nesutampa";
                else
                {
                    $id = $row['id'];
                    $password = password_hash($_POST['recPassword'.$row['id']], PASSWORD_DEFAULT);
                    $sql = "UPDATE students SET password = '$password', firstLogin = true WHERE id = '$id'";
                    mysqli_query($conn, $sql);
                    header("Location: ".$_SERVER['PHP_SELF']);
                }
            }
        }
    }
    function createStudentsTable($conn, $teacherId, $noDataText)
    {
        $studentsResults = mysqli_query($conn, "SELECT students.*, studentsresults.* FROM students 
        JOIN studentsresults ON students.id = studentsresults.studentId WHERE students.teacherId = '$teacherId'");
        $studentsResultsRows = mysqli_fetch_all($studentsResults, MYSQLI_ASSOC);
        echo "<table class='fancy-table'><tr>";
        echo "<th colspan='6'><h1 id='studentsHeader'>Mano mokiniai</h1></th><tr>";
        echo "<th>Vartotojo vardas</th>";
        echo "<th>Patvirtinta šiuo laiku</th>";
        echo "<th>Esamas lygis</th>";
        echo "<th>Surinkti taškai</th>";
        echo "<th>Sėkmės lygis</th>";
        echo "<th>Atstatyti mokinio slaptažodį</th></tr>";
        if (sizeof($studentsResultsRows) === 0) echo "<tr><td>$noDataText</td><td></td></tr>";
        else 
        {
            foreach ($studentsResultsRows as $row)
            {
                $id = $row['id'];
                echo "<tr>";
                echo "<td>".$row['username']."</td>";
                echo "<td>".$row['addedAt']."</td>";
                echo "<td>".$row['level']."</td>";
                echo "<td>".$row['points']."</td>";
                echo "<td>".$row['luckIndicator']."</td>";
                echo "<td style='width: 50%'>";
                echo "<form method='post'>";
                echo "<div class='inline-container'>";
                echo "<input type='submit' class='inline' value='Atstatyti slaptažodį' name=recoverPassword".$id.">";
                echo "<input type='password' class='inline' id=recPassword".$id." name=recPassword".$id." maxlength='100' style='width: 30%;' required>";
                echo "<input type='password' class='inline' id=recConfirm_password".$id." name=recConfirm_password".$id." maxlength='100' style='width: 30%;' required>";
                echo "</div>";
                echo "</form>";
                echo "</td>";
                echo "</tr>";
            }
        }
        echo "</table>";
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Teacher</title>
        <link rel="stylesheet" href="teacherView.css">
    </head>
    <body>
        <div class="form-column">
            <h2>Mokinio registracija</h2>
            <form method="post" id = "registrationForm">
                <label for="regUsername">Vartotojo vardas:</label>
                <input type="text" id="regUsername" name="regUsername" maxlength="50" required value="<?php echo isset($_POST['regUsername']) ? $_POST['regUsername'] : '' ?>"><br><br>
                <label for="regPassword">Slaptažodis:</label>
                <input type="password" id="regPassword" name="regPassword" maxlength="100" required><br><br>
                <label for="regConfirm_password">Patvirtinkite slaptažodį:</label>
                <input type="password" id="regConfirm_password" name="regConfirm_password" maxlength="100" required><br><br>
                <label for="regAttribute">Norimas skirstymo požymis</label>
                <input type="text" id="regAttribute" name="regAttribute" maxlength="50" value="<?php echo isset($_POST['regAttribute']) ? $_POST['regAttribute'] : '' ?>"><br><br>
                <input type = "submit" value = "Užregistruoti mokinį" name="registerButton">
            </form>
            <p name="registerErrorDisplay" class="errorDisplay"><?php echo $registerError;?></p>
        </div>
        <?php
            createStudentsTable($conn, $teacherId, "Nėra jokių registruotų mokinių.");
        ?>
        <?php if (!empty($error)): ?>
        <div class="error-container"><p name="errorDisplay" class="errorDisplay"><?php echo $error;?></p></div>
        <?php endif; ?>
    </body>
</html>