<?php
    require_once("connectToDatabase.php");
    $registerError = "";
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
                        $id = $_SESSION['teacherId'];
                        $attribute = $_POST["regAttribute"];
                        $sql = "INSERT INTO students (username, password, addedAt, level, points, luckIndicator, attribute, teacherId) VALUES ('$username', '$password','".date('Y-m-d H:i:s', time())."', 0, 0, 0, '$attribute', $id)";
                        mysqli_query($conn, $sql);
                        header("Location: ".$_SERVER['PHP_SELF']);
                    }
                    else $registerError = "Toks vartotojo vardas jau egzistuoja";
                }
            }
        }
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
    </body>
</html>