<?php 
if ((session_status() == PHP_SESSION_NONE))
{    
   session_start();
}

$ID2 = session_id();

 $_SESSION["sessionid2"] = "$ID2";

//========================== BEGIN CLASS DEFINITIONS ===========================================
class Dbn
{
    public function connect($values)
    {       
     $servername =  $values[0];  // "localhost"; 
     $username =  $values[1];    //"root";                  
     $password =$values[2];     //"slowbyte1";
     $dbname = $values[4];       //"cf1";
     $charset = "utf8mb4";
     //return $servername . $dbname .  $username . $password ;
      try
      {
      $dsn = "mysql:host=".$servername .";dbname=".$dbname.";charset=".$charset;    
      //return "$dsn";
      $pdo = new PDO($dsn,  $username,  $password);
      // return "TEST3";
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $retn = "Connection OK!" . "<br>";
      return  $pdo;
      }
      catch(PDOEXCEPTION $e)
      {
        //return "TEST3";
       return "Connection failed:" . $e->getMessage();
      }
   }
}
//====================== END of CLASS Dbn ================================================================
class User extends Dbn
{    
    public function getaAllUsers($values)
    {   
        // $sql = "UPDATE `$values[9]` SET " .$values[8]  ." WHERE username = " ."'" .$values[6] ."'" ;   //WORKING & FINISHED SQL
        //WORKING LIKE IT SHOULD AFTER TOO MANY MISTAKES BY IDIOT ME!
      
     
        $sql = "Select * From $values[6] WHERE usernameorig = '$values[3]' ";       
       //$sql = " Select * From tblProfilePg1 WHERE username = 'slowbyte'  ";     
       if($values[7] == "email")
       {
        $sql = " Select * From tblProfilePg1 WHERE username = 'slowbyte'  ";   
        //$sql = "Select * From $values[6] WHERE email = '$values[3]' ";   
        // $sql = "Select * From $values[6] WHERE email = '$values[3]' ";
        // $sql = "Select * From $values[6] WHERE email = "  ."'" .$values[3]  ."'"; 
        
       }
       $stmt = $this->connect($values)->query($sql) ;
       $row = $stmt->fetch();     
       $pp1Rows =  array($row[1], $row[2], $row[3], $row[4], $row[5], $row[6]) ;
         //, $row[7], $row[8],  $row[9], $row[10], $row[11], $row[12], $row[13] );
       //$sze = sizeof($pp1Row, 0);
       //array_push($pp1Row, $sze);
       return $row;
   } 
   //====================================================== 
   public function aupdateProfilePage($values)  
  {    
    try
    { 
    //$sql = "UPDATE tblprofilepg1 SET city='shitRon', state='TrumpLand' WHERE username= 'slowbyte'";  
   // $sql = "UPDATE `$values[9]` SET city='shitRon', state='TrumpLane' WHERE username = " ."'" .$values[6] ."'" ;  
    $sql = "UPDATE `$values[9]` SET " .$values[8]  ." WHERE username = " ."'" .$values[6] ."'" ;   //WORKING & FINISHED SQL
   //$sql = "UPDATE tblprofilepg1 SET city = 'xbridgewater', state = 'ny' WHERE (username = 'slowbyte')";
    
    $stmt = $this->connect($values)->exec($sql);   
     return "success";
   

    }
    catch(PDOException $e)
    {
      return "ERROR in Update... "  .$e->getMessage();

    }
  }
  //==============================================================================
  /* public function TEMPHOLDTHISgetaAllUsers($values)
   {
      //$sql = "UPDATE `$values[9]` SET " .$values[8]  ." WHERE username = " ."'" .$values[6] ."'" ;   //WORKING & FINISHED SQL
      //WORKING LIKE IT SHOULD AFTER TOO MANY MISTAKES BY IDIOT ME!
      // return  "'" .$num ."'";
      $sql = "Select * From tblProfilePg1 WHERE username = '$values[3]' ";
      $stmt = $this->connect($values)->query($sql) ;
      $row = $stmt->fetch();     
      $pp1Row =  array($row[1], $row[2], $row[3], $row[4], $row[5], $row[6], $row[7], $row[8] );
      $sze = sizeof($pp1Row, 0);
      array_push($pp1Row, $sze);
      return $pp1Row;
  }*/
//============================================================
  public function registerNewUser($values)
 { 
    $sql = "SELECT * From tblProfilePg1 WHERE username = '$values[6]' ";
    $stmt = $this->connect($values)->query($sql) ;
    $row = $stmt->fetch();
    return $row;
 }
//==============================================================
  public function AddNewUser($values)
  {
    
    try
    {
   // $sql = "INSERT INTO tblProfilePg1 " .$values[7]  ." VALUES "  .$values[8];  
    $sql = "INSERT INTO  " .$values[9] ." " .$values[7]  ." VALUES "  .$values[8];
    $stmt = $this->connect($values)->exec($sql);
    return "success";
    }
    catch(PDOException $e)
    {
      return "ERROR in Insert... "  .$e->getMessage();

    }
  }
//===============================================================
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
//===========================END of CLASS User ==========================
//========================== END CLASS DEFINITIONS ===========================================


header('Content-Type: application/json');


    header('Content-Type: application/json');

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch($_POST['functionname'])
        {
            case 'testNVrtnpp1row':  
                if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                    $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                }
                else {
                    //$userName = 'Ron';
                    //$userName = $_POST['arguments'][0];
                    $aResult['result'] = testNVrtnpp1row($_POST['arguments'][0], $_POST['arguments'][1]);
                                              
                }
                break;

                case 'anvUpdatePP':
                    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                        $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                    }
                    else {
                        //$userName = 'Ron';
                        //$userName = $_POST['arguments'][0];
                        $aResult['result'] = anvUpdatePP($_POST['arguments'][0], $_POST['arguments'][1]);
     
                    }
                    break;

               
              case 'signinMySql':
               if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                   $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
               }
               else {
                   //$userName = 'Ron';
                   //$userName = $_POST['arguments'][0];
                   $aResult['result'] = signinMySql($_POST['arguments'][0], $_POST['arguments'][1]);

               }
               break;
               case 'registerMySql':
                if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                    $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                }
                else {
                    //$userName = 'Ron';
                    //$userName = $_POST['arguments'][0];
                    $aResult['result'] = registerMySql($_POST['arguments'][0], $_POST['arguments'][1]);
 
                }
                break;
                
                case 'regAddNewUser':
                    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                        $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                    }
                    else {
                        //$userName = 'Ron';
                        //$userName = $_POST['arguments'][0];
                        $aResult['result'] =  regAddNewUser($_POST['arguments'][0], $_POST['arguments'][1]);
     
                    }
                    break;
                                   
            default:
               $aResult['error'] = 'test.php ERROR: Not found, function '.$_POST['functionname'].'!';
               break;
        }

    }
    echo json_encode($aResult);


      //============= BEGIN testNVrtnpp1row($values, $blank) ===============================
      function testNVrtnpp1row($values, $blank)
      {          
        $obj = new User;          
        return $obj->getaAllUsers($values); 
        //return "help" ;
        //return Dbn::connect();
     }
     //============= END testNVrtnpp1row($values, $blank) =================================
     
     //============= BEGIN anvUpdatePP($values, $blank) ===============================
     function anvUpdatePP($values, $blank)
     {
     /////// $obj = new User;
      ///////////return $obj->;
      //var usernameOrig = entries[3];
     /////// var emaillcase = emailOrig.toLowerCase(); ($values);
  
       // $obj = new User;
        //$myRetnArray = [];
        //$myRetnArray = $obj->getAllUsers($values);      'nvUpdatePP
        //return $myRetnArray;   // "returning";  // 
       // $rows = $obj->getAllUsers($values);
       // return  $rows;
        // return Db::connect();
    }
    //============= END anvUpdatePP($values, $blank) =================================

   //============= BEGIN signinMySql($values, $blank) ===============================
    function signinMySql($values, $blank)
    {
       $obj = new User;
       return $obj->getAllUsers($values);
       // return Db::connect();
   }
   //============= END signinMySql($values, $blank) =================================

  //============= BEGIN REGISTER MySql($values, $blank) ===============================
  function registerMySql($values, $blank)
  {
     $obj = new User;
     return $obj->registerNewUser($values);
     //Db::connect();
 }
 //============= END registerMySql($values, $blank) =================================

 //============= BEGIN  regAddNewUser($values, $blank) ===============================
 function  regAddNewUser($values, $blank)
{     
    $obj = new User;
    return $obj->AddNewUser($values);
//(firstname, lastname, username, password, email)
//('Joe','Jones', 'woody','slowbyte1','joe@gmail.com')
//$sql = array($sql1, $sql2);
//$sql = "INSERT INTO tblprofilePg1 (firstname, lastname, username, password, email) VALUES ('Joe','Jones', 'woody','slowbyte1','joe@gmail.com')";         
//$stmt = "error stmt";
}
//============= END  regAddNewUser($values, $blank) ===============================


    ///////////////////// BEGIN chkstateSignedIn() /////////////////////////////////////////////////
    function chkstateSignedIn($values, $blank)
    {
        //$_SESSION['loggeduser'];
        //$_SESSION['displayUser'];
        //$_SESSION['signedIn'];
        //$rtn = array($_SESSION['loggeduser'], $_SESSION['displayUser'], $_SESSION['signedIn'] );
        //$rtn = array("Volvo", "BMW", "Toyota");
        if(isset($_SESSION['signedIn']))
        {
           $myArray = array($_SESSION['signedIn'], $_SESSION['displayUser']) ;
           return $myArray;
        }
        else
        {
           $myArray = array("false", "Signed In = None") ;
           return $myArray;
           // return 'false';
        }

        
        
    }
     ///////////////////// END chkstateSignedIn() /////////////////////

    ///////////////////// BEGIN setlastsignin() /////////////////////////////////////////////////
    function setlastsignin($values, $blank)
    {
       //return "in updateDB";
       $servername = $values[0];   //"67.85.230.142\\SQLEXPRESS2014";
       $usernameDB = $values[1];   //"slowbyte";
       $password = $values[2];   //"slowbyte1";
       $loginName = $values[3];   //"lexoRULEZ";
       $dbname = $values[4];   //"DND1";
       $charset = "utf8mb4";
       $whoIsSignedIn = $_SESSION["loggeduser"];

       $connInfo = array("Database"=>$dbname, "UID"=>$usernameDB, "PWD"=>$password);
       //$conn = sqlsrv_connect($servername,$connInfo);
       $conn = new PDO($servername,$connInfo);
       if($conn == true)
       {
           //return "connection OK";
       }
       else 
       {
           return "connection FAILED";
       }

       //$sql = "UPDATE tblprofilePg2 SET gametype=?, gamestyle=?, groupsize=?, availability=? WHERE username = '$loginName' ";
       $sql = "UPDATE tblprofilePg2 SET lastsignin = current_timestamp, signincount = signincount + 1 WHERE username = '$whoIsSignedIn' ";

       // Prepare the statement.
       //$stmt = sqlsrv_prepare($conn, $sql, $params);
       $stmt = sqlsrv_prepare($conn, $sql);
       if ($stmt == true)
       {
           //return "Statement prepared: <br />";
           //echo($sql);
       } else {

           return "Statement could not be prepared: <br />";
           //die(print_r(sqlsrv_errors(), true));
       }

        //Execute the statement.
       if (sqlsrv_execute($stmt) == true)
       {
           //sqlsrv_close($this->conn);
           return 'success';// "Database  Updates Successful...";
       }
       else
       {
           sqlsrv_close($this->conn);
           return "ERROR: Database Updates Failed... ";
           //return die(print_r(sqlsrv_errors(), true));
       }

       /* Free the statement and connection resources. */
       sqlsrv_free_stmt($stmt);
       sqlsrv_close($this->conn);
       return 'ERROR: somewhere???';        
    }
    //=======================END setlastsignin() ================================================

    

      //==================== BEGIN setSESSIONcookie() ==================================================
     /* function setSESSIONcookie($values, $blank)
      {
        $_SESSION["username"] = $values[3];
        return "test.php says: session username SET = " .$_SESSION["username"];
       } */       
      
         //===================== OLD ORIGINAL CODE BELOW
         /* if($values[6] == "set")
          {
              $_SESSION["username"] = $values[3];
              return "session username set = " .$_SESSION["username"];
          }
          else if($values[6] == "get")
          {
              return "session username get = " .$_SESSION["username"];
          }
          return $values[6];
         //$file = fopen("C:\\Apache24\\htdocs\\texts\\test.txt", "w");
          //$str = fread($file, filesize("C:\\Apache24\\htdocs\\texts\\test.txt"));
      
          $_SESSION["username"] = $values[3];
          $_SESSION["direction"] = $values[6];
         // $_SESSION['signedIn'] = 'true';
          //$user = $_SESSION["loggeduser"];
         
          //fwrite($file, $_SESSION["loggeduser"]);
          //fflush($file);
          //$str = fread($file, filesize("C:\\Apache24\\htdocs\\texts\\test.txt"));
          //fclose($file);
              $user = $_SESSION["username"];
              $getset = $_SESSION["direction"];
          
              return  "session username = " .$getset;
          // return $_SESSION["loggeduser"];   //"Returned from function saveLoggedUser";*/
      
      //==================== END setSESSIONcookie ===================================================

        //==================== BEGIN AsetSESSIONcookie() ==================================================
        function AsetSESSIONcookie($values, $blank)
        {
          $cookieTitle = $values[0];  
          $_SESSION["$cookieTitle"] = "$values[1]";
          $preText = "";
switch($cookieTitle)  
{
    case "username":
      $preText = "New Logged client = ";
      break;
    case "sessionid1":
      $preText = "SID1 Set: ";
      break;
      case "sessionid2":
        $preText = "SID2 Set: ";
        break;
    default:
        $preText = "ERROR";
        break; 
  }

          return $preText .$_SESSION["$cookieTitle"];
         }  
         //==================== END AsetSESSIONcookie() ==================================================      
        

     //==================== BEGIN getSESSIONcookie() ==================================================
     function getSESSIONcookie($values, $blank)
     { 
         $cookieTitle = $values[0];
         $preText = "";
         
switch($cookieTitle)  
{
    case "username":
      $preText = "Logged client = ";
      break;
    case "sessionid1":
      $preText = "SID1 = ";
      break;
      case "sessionid2":
        $preText = "SID2 = ";
        break;
    default:
        $preText = "ERROR";
        break; 
  }

        return  $preText   .$_SESSION["$cookieTitle"];
     }      
     
        //===================== OLD ORIGINAL CODE BELOW
        /* if($values[6] == "set")
         {
             $_SESSION["username"] = $values[3];
             return "session username set = " .$_SESSION["username"];
         }
         else if($values[6] == "get")
         {
             return "session username get = " .$_SESSION["username"];
         }
         return $values[6];
        //$file = fopen("C:\\Apache24\\htdocs\\texts\\test.txt", "w");
         //$str = fread($file, filesize("C:\\Apache24\\htdocs\\texts\\test.txt"));
     
         $_SESSION["username"] = $values[3];
         $_SESSION["direction"] = $values[6];
        // $_SESSION['signedIn'] = 'true';
         //$user = $_SESSION["loggeduser"];
        
         //fwrite($file, $_SESSION["loggeduser"]);
         //fflush($file);
         //$str = fread($file, filesize("C:\\Apache24\\htdocs\\texts\\test.txt"));
         //fclose($file);
             $user = $_SESSION["username"];
             $getset = $_SESSION["direction"];
         
             return  "session username = " .$getset;
         // return $_SESSION["loggeduser"];   //"Returned from function saveLoggedUser";*/
     
     //==================== END getSESSIONcookie ===================================================

    ///////////////////// BEGIN validateUserPwd() /////////////////////////////////////////////////
    function validateUserPwd($values, $blank)
    {

        $servername = $values[0];   //"67.85.230.175\\SQLEXPRESS2014";
        $usernameDB = $values[1];   //"slowbyte";        
        $password = $values[2];   //"slowbyte1";
        $loginName = $values[3];   //"lexoRULEZ";
        $dbname = $values[4];   //"DND1";
        $charset = "utf8mb4";        
       
        $connInfo = array("Database"=>$dbname, "UID"=>$usernameDB, "PWD"=>$password);
         
        $conn = sqlsrv_connect($servername,$connInfo);
       
        if($conn == true)
        {
            //return "connection OK";
        }
        else 
        {
            return "connection FAILED";
        }    
         //return "start retrieve row";//
        $sql = " SELECT  * FROM tblprofilePg1 WHERE username= '$loginName' ";
        $stmt = null;
        $stmt = sqlsrv_query( $conn, $sql );
        if( $stmt === false)
        {
           return "stmt = false";
          //die( print_r( sqlsrv_errors(), true) );
        }
        
        //$retArray = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11];
        $retArray = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_NUMERIC);
        return $retArray;
    }
    ///////////////////// END validateUserPwd() /////////////////////////////////////////////////

    ///////////////////// BEGIN updateDB() /////////////////////////////////////////////////
    function updateDB($values, $blank)    
    {
         //return "in updateDB";
         $servername = $values[0];   //"67.85.230.142\\SQLEXPRESS2014";
	     $usernameDB = $values[1];   //"slowbyte";
	     $password = $values[2];   //"slowbyte1";
	     $loginName = $values[3];   //"lexoRULEZ";
	     $dbname = $values[4];   //"DND1";
	     $charset = "utf8mb4";


         $connInfo = array("Database"=>$dbname, "UID"=>$usernameDB, "PWD"=>$password);
         $conn = sqlsrv_connect($servername,$connInfo);
         if($conn == true)
         {
             //return "connection OK";
         }
         else 
         {
             return "connection FAILED";
         }


         $sql = "UPDATE tblprofilePg2 SET gametype=?, gamestyle=?, groupsize=?, availability=? WHERE username = '$loginName' ";

		 // Assign parameter values.
		 $param0 = $values[5];//$values[0];  //gametype value;
		 $param1 = $values[6]; //$values[1];  //gamestyle value;
		 $param2 = $values[7];  //$values[2];  //gamesize value;
		 $param3 = $values[8]; //$values[3];  //availability value;
		 $params = array(&$param0, &$param1, &$param2, &$param3);

		 // Prepare the statement.
		 $stmt = sqlsrv_prepare($conn, $sql, $params);
		 if ($stmt == true)
		 {
		     //return "Statement prepared: <br />";
		     //echo($sql);
		 } else {

		     return "Statement could not be prepared: <br />";
		     //die(print_r(sqlsrv_errors(), true));
		 }

		  //Execute the statement.
		 if (sqlsrv_execute($stmt) == true)
		 {
             //sqlsrv_close($this->conn);
		     return;// "Database3 Updates Successful...";
		 }
		 else
		 {
             sqlsrv_close($this->conn);
		     return "ERROR: Database Updates Failed... ";
		     //return die(print_r(sqlsrv_errors(), true));
		 }

		 /* Free the statement and connection resources. */
		 sqlsrv_free_stmt($stmt);
		 sqlsrv_close($this->conn);
         return 'ERROR: somewhere???';

    }

    ///////////////////// BEGIN retrieveDB() /////////////////////////////////////////////////
    function retrieveDB($values, $blank)
    {      
         $servername = $values[0];   //"67.85.230.142\\SQLEXPRESS2014";
         $usernameDB = $values[1];   //"slowbyte";        
	     $password = $values[2];   //"slowbyte1";
	     $loginName = $values[3];   //"lexoRULEZ";
	     $dbname = $values[4];   //"DND1";
         $charset = "utf8mb4";        
        
         $connInfo = array("Database"=>$dbname, "UID"=>$usernameDB, "PWD"=>$password);
          
         $conn = sqlsrv_connect($servername,$connInfo);
        
         if($conn == true)
         {
             //return "connection OK";
         }
         else 
         {
             return "connection FAILED";
         }

 /////////////// BEGIN CODE retrieveRow ///////////////////////////////////////////////////////////////////////
   //return "start retrieve row";
   $sql = "SELECT * FROM tblprofilePg2 WHERE username= '$loginName'";

   $stmt = sqlsrv_query( $conn, $sql );
   if( $stmt === false)
   {
       //return "stmt = false";
   //die( print_r( sqlsrv_errors(), true) );
   }
   //return "mid retrieve row";

    return sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_NUMERIC);

   //=======================================================

}

   /*
   while($row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_NUMERIC)) 
   {
       return $row;
         //$theRow = $row;
         $arr_length = count($row);
         //echo('num $row elements = ' .$arr_length ."<br />");
         //return 'num $row elements = ' .$arr_length;
         for($i = 0; $i < $arr_length; $i++)
        {
           
           //echo('row element '.$i. "= ".$row[$i]."<br />");

        }
        return $row;
   }
  //sqlsrv_free_stmt( $stmt);
  return $row;
  */
/////////////// END CODE retrieveRow ///////////////////////////////////////////////////////////////////////

   
///////////////////// END retrieveDB ///////////////////////////////////////////////////////////////////////

?>


