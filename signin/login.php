<?php 
if ((session_status() == PHP_SESSION_NONE))
{    
   session_start();
}

$ID2 = session_id();

 $_SESSION["sessionid2"] = "$ID2";

//========================== BEGIN CLASS DEFINITIONS ===========================================
class DbnSi
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
//====================== END of CLASS DbnSi ================================================================

//BEGIN CLASS SIGNIN =============================================================================   
class Signin extends DbnSi
{
    public function Tbls2Signin($values)
    {              
        //$sql = "Select * From tblprofilepg1  join tblprofilepg2 on tblprofilepg1.username=tblprofilepg2.username Where tblprofilepg1.username='slowbyte' ";       
         $sql = "Select * From $values[6] left join $values[7] on $values[6].username = $values[7].usernamelc Where $values[6].usernameorig = '$values[3]' ";     
        $stmt = $this->connect($values)->query($sql) ;
        $row = $stmt->fetch();     
 
        return $row;
    }

    public function lastLoginloginCountUpdate($values)  
   {    
     try
     {   
     $sql = "UPDATE `$values[7]` SET " .$values[6]  ." WHERE usernameorig = " ."'" .$values[3] ."'" ;   //WORKING & FINISHED SQL     
      $stmt = $this->connect($values)->exec($sql);   
      return "success";
    
 
     }
     catch(PDOException $e)
     {
       return "ERROR in Update... "  .$e->getMessage();
     }
   }
}
//END CLASS SIGNIN==============================================================================

//========================== END CLASS DEFINITIONS ===========================================


header('Content-Type: application/json');

    //header('Content-Type: application/json');

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

if( !isset($aResult['error']) ) 
{

  switch($_POST['functionname'])  
  {
    case 'loginOnly':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) 
    {
        $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
    }
    else
    {
        $aResult['result'] = loginOnly($_POST['arguments'][0], $_POST['arguments'][1]);   
    }
    break;  
    
    case 'signinUPDATEwrite':
        if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) 
        {
            $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
        }
        else
        {
            $aResult['result'] = signinUPDATEwrite($_POST['arguments'][0], $_POST['arguments'][1]);   
        }
        break;          
            
    default:
        $aResult['error'] = 'test.php ERROR: Not found, function '.$_POST['functionname'].'!';
        break;
  }

}
echo json_encode($aResult);

    
//============= BEGIN loginOnly($values, $blank) ===============================
function loginOnly($values, $blank)
{
 $obj = new Signin;
 return $obj->Tbls2Signin($values);
 ////return "fuck ron";
}
//============= END loginOnly($values, $blank) =================================

//============= BEGIN signinUPDATEwrite($values, $blank) ===============================
function signinUPDATEwrite($values, $blank)
{
 $obj = new Signin;
 return $obj->lastLoginloginCountUpdate($values);
}
//============= END signinUPDATEwrite($values, $blank) =================================





 


    

     

     

  

    







?>