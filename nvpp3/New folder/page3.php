<?php
    if (session_id() == "")
    session_start();

    header('Content-Type: application/json');

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch($_POST['functionname'])
        {
            case 'ldpg3dB':
                if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                    $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                }
                else {
                    //$userName = 'Ron';
                    //$userName = $_POST['arguments'][0];
                    $aResult['result'] = ldpg3dB($_POST['arguments'][0], $_POST['arguments'][1]);
 
                }
                break;   
            case 'updateDB':
               if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                   $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
               }
               else {
                   //$userName = 'Ron';
                   //$userName = $_POST['arguments'][0];
                   $aResult['result'] = updateDB($_POST['arguments'][0], $_POST['arguments'][1]);

               }
               break;
               case 'retrieveDB':
                if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                    $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                }
                else {
                    //$userName = 'Ron';
                    //$userName = $_POST['arguments'][0];
                    $aResult['result'] = retrieveDB($_POST['arguments'][0], $_POST['arguments'][1]);
 
                }
                break;   

            default:
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }

    }
    echo json_encode($aResult);

     ///////////////////// BEGIN ldpg3dB() /////////////////////////////////////////////////
     function ldpg3dB($values, $blank)
     {
         $servername = $values[0];   //"67.85.230.142\\SQLEXPRESS2014";
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
             //return "connection OK";            ;
         }
         else 
         {
             return "connection FAILED";
         }                       
 /////////////// BEGIN CODE retrieveRow ///////////////////////////////////////////////////////////////////////
     $userName = $_SESSION['loggeduser'];
     $sql = "SELECT  * FROM tblprofilePg2 WHERE username= '$userName'";
     $stmt = "hello";
     $stmt = sqlsrv_query( $conn, $sql );
     if( $stmt === false)
     {
        return "stmt = false";
       //die( print_r( sqlsrv_errors(), true) );
     }
     else
     {
         $retArray = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_NUMERIC);        
         //===============destroy session
 //remove PHPSESSID from browser
 //if ( isset( $_COOKIE[session_name()] ) )
 //setcookie( session_name(), “”, time() - 3600, “/” );
 //clear session from globals
 //$_SESSION = array();
 //clear session from disk
 //session_destroy();
 //===============================
         return $retArray;  
     }                    
    }
 //========================================================================================
    

    function updateDB($values, $blank)    
    {
         //return "in updateDB";
         $servername = $values[0];   //"67.85.230.142\\SQLEXPRESS2014";
	     $usernameDB = $values[1];   //"slowbyte";
	     $password = $values[2];   //"slowbyte1";
	     $loginName = $_SESSION["loggeduser"] ;       //$values[3];   //"lexoRULEZ";
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

    ///////////////////// BEGIN retrieveDB /////////////////////////////////////////////////
    function retrieveDB($values, $blank)
    {      
         $servername = $values[0];   //"67.85.230.142\\SQLEXPRESS2014";
         $usernameDB = $values[1];   //"slowbyte";        
	     $password = $values[2];   //"slowbyte1";
	     $loginName = $_SESSION["loggeduser"] ;  //$values[3];   //"lexoRULEZ";
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
   //$user = $_SESSION["loggeduser"];
    $sql = "SELECT * FROM tblprofilePg2 WHERE username= '$loginName'";
   //$sql = "SELECT * FROM tblprofilePg2 WHERE username= '$user' ";
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

/////////////// END CODE retrieveRow ///////////////////////////////////////////////////////////////////////

   
///////////////////// END retrieveDB ///////////////////////////////////////////////////////////////////////

?>