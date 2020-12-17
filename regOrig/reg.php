<?php
if (session_id() == "")
  {session_start();}
//echo session_id();
//session_start([array()]);  

    header('Content-Type: application/json');

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch($_POST['functionname'])
        {
               case 'usernameavail':
                if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                    $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                }
                else {                   
                    $aResult['result'] = usernameavail($_POST['arguments'][0], $_POST['arguments'][1]);
                }
                break;
              case 'updateDB':
               if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                   $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
               }
               else {                   
                   $aResult['result'] = updateDB($_POST['arguments'][0], $_POST['arguments'][1]);
               }
               break;
               case 'retrieveDB':
                if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                    $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                }
                else {             
                    $aResult['result'] = retrieveDB($_POST['arguments'][0], $_POST['arguments'][1]); 
                }
                break;
                case 'addnewuser':
                    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                        $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                    }
                    else {                    
                        $aResult['result'] = addnewuser($_POST['arguments'][0], $_POST['arguments'][1]);     
                    }
                    break;
                case 'chkstateSignedIn':
                    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2 ) ) {
                         $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                    }
                    else {                
                         $aResult['result'] = chkstateSignedIn($_POST['arguments'][0], $_POST['arguments'][1]);
                    }
                    break;      
                    

            default://
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }

    }
    echo json_encode($aResult);

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

///////////////////// BEGIN addnewuser() /////////////////////////////////////////////////
 function addnewuser($values, $blank)
{        
//(firstname, lastname, username, password, email)
//('Joe','Jones', 'woody','slowbyte1','joe@gmail.com')
//$sql = array($sql1, $sql2);
$sql = "INSERT INTO tblprofilePg1 (firstname, lastname, username, password, email) VALUES ('Joe','Jones', 'woody','slowbyte1','joe@gmail.com')";         
$stmt = "error stmt";
}
//=============================================================================

////////////////////////// BEGIN usernameavail() /////////////////////////////////////////////////
    function usernameavail($values, $blank)    
    {
        return " echo in php reg una";
       /* $servername = $values[0];   //"67.85.230.142\\SQLEXPRESS2014";
        $usernameDB = $values[1];   //"slowbyte";        
        $password = $values[2];   //"slowbyte1";
        $loginName = $values[3];   //"lexoRULEZ";
        $dbname = $values[4];   //"DND1";
        $charset = "utf8mb4";
        $txt = "txt";
       
        $connInfo = array("Database"=>$dbname, "UID"=>$usernameDB, "PWD"=>$password);         
        $conn = sqlsrv_connect($servername, $connInfo);       
        if($conn == true)
        {
            //return "connection OK";            
        }
        else 
        {
            return "connection FAILED";
        }                       
/////////////// BEGIN CODE retrieveLikeUsernames ///////////////////////////////////////////////////////////////////////
//$userName = $_SESSION['loggeduser'];
$sql = " SELECT  userID FROM tblprofilePg1 WHERE username = " ."'"  .$values[6] ."'" ;
//return $sql;
$stmt = "stmt error";
$stmt = sqlsrv_query( $conn, $sql );
if( $stmt == false)
{
   return "stmt = false";
  //die( print_r( sqlsrv_errors(), true) );
}
else
{
    $retArray = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_NUMERIC);
    return $retArray;  
}          */ 
}       
 
//========================================================================================
   
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
             ////return "connection OK";
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
		     return "Statement prepared: <br />";
		     //echo($sql);
		 } else {

		     return "Statement could not be prepared:";
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
         return "ERROR: somewhere???";

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
