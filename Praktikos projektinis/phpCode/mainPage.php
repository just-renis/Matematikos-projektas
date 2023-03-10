<?php
    require_once("connectToDatabase.php");
    $teachers = mysqli_query($conn,"SELECT * FROM approvedteachers");
    $teachersRows = mysqli_fetch_all($teachers, MYSQLI_ASSOC);
    $admins = mysqli_query($conn, "SELECT * FROM admins");
    $adminsRows = mysqli_fetch_all($admins, MYSQLI_ASSOC);
    $students = mysqli_query($conn, "SELECT * FROM students");
    $studentsRows = mysqli_fetch_all($students, MYSQLI_ASSOC);
    $registerError = "";
    $loginError = "";
    if (isset($_POST["loginButton"]))
    {
        foreach ($teachersRows as $row)
        {
            if ($_POST["logUsername"] === $row["username"] && password_verify($_POST["logPassword"], $row["password"])) 
            {
                $_SESSION['teacherId'] = $row["id"];
                header("location: teacherView.php");
                exit;
            }
        }
        foreach ($adminsRows as $row)
        {
            if ($_POST["logUsername"] === $row["username"] && password_verify($_POST["logPassword"], $row["password"]))
            {
                header("location: adminView.php");
                exit;
            }
        }
        foreach ($studentsRows as $row)
        {
            if ($_POST["logUsername"] === $row["username"] && password_verify($_POST["logPassword"], $row["password"]))
            {
                $_SESSION['studentId'] = $row["id"];
                header("location: ../startPageCode/startPage.php");
                exit;
            }
        }
        $loginError = "Neteisingas vartotojo vardas arba slaptažodis";
    }
    if (isset($_POST["registerButton"]))
    {
        if (empty($_POST["regUsername"]) || empty($_POST["regPassword"]) || empty($_POST["regConfirm_password"])) $registerError = "Visi laukai turi būti užpildyti";
        else
        {
            if (strlen($_POST["regPassword"]) < 6) $registerError = "Slaptažodis turėtų būti sudarytas bent jau iš 6 simbolių";
            else
            {
                if ($_POST["regPassword"] !== $_POST["regConfirm_password"]) $registerError = "Slaptažodžiai nesutampa";
                else
                {
                    $usernameExists = false;
                    $pendingTeachers = mysqli_query($conn,"SELECT * FROM pendingteachers");
                    $pendingTeachersRows = mysqli_fetch_all($pendingTeachers, MYSQLI_ASSOC);
                    foreach ($teachersRows as $row) if ($_POST["regUsername"] === $row["username"]) $usernameExists = true;
                    foreach ($pendingTeachersRows as $row) if ($_POST["regUsername"] === $row["username"]) $usernameExists = true;
                    if (!$usernameExists)
                    {
                        $username = $_POST["regUsername"];
                        $password = password_hash($_POST["regPassword"], PASSWORD_DEFAULT);
                        $sql = "INSERT INTO pendingteachers (username, password, date) VALUES ('$username','$password','".date('Y-m-d H:i:s', time())."')";
                        mysqli_query($conn, $sql);
                        header("Location: ".$_SERVER['PHP_SELF']);
                        exit;
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
        <title>Pagrindinis puslapis</title>
        <link rel="stylesheet" href="registerLoginForm.css">
        <script>
            function guestJoin()
            {
                <?php $_SESSION['studentId'] = null; ?>
                window.location.href='../startPageCode/startPage.php'
            }
        </script>
    </head>
    <body>
        <div class="form-container">
            <div class="form-column">
                <h2>Registracija mokytojui</h2>
                <form method="post" id = "registrationForm">
                    <label for="regUsername">Vartotojo vardas:</label>
                    <input type="text" id="regUsername" name="regUsername" required value="<?php echo isset($_POST['regUsername']) ? $_POST['regUsername'] : '' ?>"><br><br>
                    <label for="regPassword">Slaptažodis:</label>
                    <input type="password" id="regPassword" name="regPassword" required><br><br>
                    <label for="regConfirm_password">Patvirtinkite slaptažodį:</label>
                    <input type="password" id="regConfirm_password" name="regConfirm_password" required><br><br>
                    <input type = "submit" value = "Registruotis" name="registerButton">
                    <button id = "loginAsGuest" onclick=guestJoin()>Prisijungti kaip svečias</button>
                </form>
                <p name="registerErrorDisplay" class="errorDisplay"><?php echo $registerError;?></p>
            </div>
            <div class="form-column">
                <h2>Prisijungimas</h2>
                <form method="post" id = "loginForm">
                    <label for="logUsername">Vartotojo vardas:</label>
                    <input type="text" id="logUsername" name="logUsername" required value="<?php echo isset($_POST['logUsername']) ? $_POST['logUsername'] : '' ?>"><br><br>
                    <label for="logPassword">Slaptažodis:</label>
                    <input type="password" id="logPassword" name="logPassword" required><br><br>
                    <input type="submit" value="Prisijungti" name = "loginButton">
                </form>
                <p name="loginErrorDisplay" class="errorDisplay"><?php echo $loginError;?></p>
            </div>
        </div>
    </body>
</html>