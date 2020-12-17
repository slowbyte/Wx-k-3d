<?php
   include_once 'includes/dbh.inc.php';
   include_once 'includes/user.inc.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width= , initial-scale=1.0">
    <title>WT2</title>
</head>
<body>
    ronzo<br>
    <?php
        $obj = new User;
        $obj->getAllUsers();
        $obj->getAllUsersByPrepared();
        // print_r(PDO::getAvailableDrivers());
    ?>
</body>
</html>