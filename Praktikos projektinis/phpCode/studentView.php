<?php
    require_once("connectToDatabase.php");
    $error = "";
    if ($_SESSION["studentData"]["firstLogin"])
    {
        if (isset($_POST["changePasswordButton"]))
        {
            if (empty($_POST["password"]) || empty($_POST["confirm_password"])) $error = "Visi laukai turi būti užpildyti";
            else
            {
                if (strlen($_POST["password"]) < 6) $error = "Slaptažodis turėtų būti sudarytas bent jau iš 6 simbolių";
                else
                {
                    if ($_POST["password"] !== $_POST["confirm_password"]) $error = "Slaptažodžiai nesutampa";
                    else
                    {
                        $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
                        $id = $_SESSION["studentData"]["studentId"];
                        $sql = "UPDATE students SET password = '$password', firstLogin = 'false' WHERE id = '$id'";
                        mysqli_query($conn, $sql);
                        header("Location: ../startPageCode/startPage.php");
                        exit;
                    }
                }
            }
        }
    }
    else 
    {
        header("Location: ../startPageCode/startPage.php");
        exit;
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Student</title>
        <link rel="stylesheet" href="studentView.css">
    </head>
    <body>
        <div class="form-column">
            <h2>Slaptažodžio keitimas</h2>
            <form method="post" id = "changePassword">
                <label for="password">Slaptažodis:</label>
                <input type="password" id="password" name="password" maxlength="100" required><br><br>
                <label for="confirm_password">Patvirtinkite slaptažodį:</label>
                <input type="password" id="confirm_password" name="confirm_password" maxlength="100" required><br><br>
                <input type="submit" value="Keisti slaptažodį" name="changePasswordButton">
            </form>
            <p name="errorDisplay" class="errorDisplay"><?php echo $error;?></p>
        </div>
    </body>
</html>