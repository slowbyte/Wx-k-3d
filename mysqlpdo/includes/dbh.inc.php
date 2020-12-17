<?php

class Dbh
 {
    private $servername;
    private $username;
    private $password;
    private $dbname;
    private $charset;

    protected function connect()
    {
       $this->servername = "localhost";
       $this->username = "root";
       $this->password = "slowbyte1";
       $this->dbname = "cf1";
       $this->charset = "utf8mb4";

       try
       {
       $dsn = "mysql:host=".$this->servername .";dbname=".$this->dbname.";charset=".$this->charset;
       $pdo = new PDO($dsn,  $this->username,  $this->password);
       $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       echo "Connection OK!" . "<br>";
       return $pdo;
       }
       catch(PDOException $e)
       {
        echo "Connection failed:" . $e->getMessage();
       }
    }
}

?>

