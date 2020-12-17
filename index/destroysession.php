<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
   
$_SESSION['signedIn'] = 'true';

function setsignedInFALSE()
{
    //echo 'RONZO' .'<br><br><br>';
   $my_arr = array(22,21,11);

   //echo '<script>';
   //echo 'console.log('. json_encode(session_id(), JSON_HEX_TAG) .')';
   //echo 'console.log('. json_encode($my_arr, JSON_HEX_TAG) .')';
   //echo 'console.log('. json_encode(session_id(), JSON_HEX_TAG) .')';
   //echo '</script>';

        //echo 'ssIF';
        //echo session_start();
        //$_SESSION['signedIn'] = 'fuck ron';
        //return  'fuck me';  //print_r($_SESSION);
 }

    ///////////////////// BEGIN destroySession() /////////////////////////////////////////////////
    function destroySession()
    {        
        $initID = session_id();
        $_SESSION = array();
        if (ini_get("session.use_cookies")) {
           $params = session_get_cookie_params();
           setcookie(session_name(), '', time() - 42000,
              $params["path"], $params["domain"],
              $params["secure"], $params["httponly"]
             );
            }              
        session_destroy();
        $_SESSION['signedIn'] = 'false'; //must be false 'cause impossible to have signedIn yet!         
        $retnThis = "Killed SID... " .$initID ." ... signedIN = " .$_SESSION['signedIn'];
        echo '<script>';
      //echo 'console.log('. json_encode($my_arr, JSON_HEX_TAG) .')';
        echo 'console.log('. json_encode($retnThis, JSON_HEX_TAG) .')';
        echo '</script>';    
    }
    ///////////////////// END destroySession() /////////////////////////////
 ?>   