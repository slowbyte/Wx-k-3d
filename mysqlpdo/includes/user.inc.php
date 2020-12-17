<?php

class User extends Dbh
{
    
   public function getAllUsers()
   {
      $sql = "Select * From tblProfilePg1";
      $stmt = $this->connect()->query($sql) ;
      while($row = $stmt->fetch())
      {
        echo "<br>"  ;
         echo $row['firstname'] . "<br>";
         echo $row['lastname'] . "<br>";
         echo $row['city'] . "<br>";    
         echo $row['state'] . "<br>";
         echo $row['email'] . "<br>";
         echo "<br>";
      }
  }

  public function getAllUsersByPrepared()
  {
    $firstName = "ron";  
    $lastName = "lessnick";
    $sql = "Select * From tblProfilePg1 Where firstname=? AND lastname=?";
    $stmt = $this->connect()->prepare($sql) ;
    $stmt->execute([$firstName, $lastName]);
    if($stmt->rowCount() )
    {
       while($row = $stmt->fetch())
       {
           echo "<br>";
           echo $row['lastname']  .  "<br>";
           echo $row['email'];
       }
    } 
 }
}