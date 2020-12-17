<?php

//========================== BEGIN CLASS DEFINITIONS ===========================================
class DbnReg
{
    public function connect($values)
    {       
     $servername =  $values[0];  // "localhost"; 
     $username =  $values[1];    //"root";                  
     $password =$values[2];     //"slowbyte1";
     $dbname = $values[4];       //"cf1";
     $charset = "utf8mb4";
 
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
//====================== END of CLASS DbnReg ================================================================

// BEGIN CLASS Reg ==============================================================================
class Reg extends DbnReg
{    
    public function RegGetUSERrow($values)
    {       
        $sql = "Select * From $values[6] WHERE username = '$values[3]' ";        
       //$sql = "Select * From tblProfilePg1 WHERE username = 'slowbyte3' ";
      
       $stmt = $this->connect($values)->query($sql) ;
       $row = $stmt->fetch();     
       return $row;
   } 
   //====================================================== 
   public function RegGetEMAILrow($values)
   {
    // $thisEmail = "'" .$values[3] ."'" ;
     //$sql = "Select * From $values[6] WHERE email = 'abc' ";                          //'$values[3]' ";   
     // $sql = "Select * From tblProfilePg1 WHERE email =  'slowbyte'  ";
    // $thisemail = '"' .$values[3] .'"' ;
     //$thisemail = "'" ."abc" ."'";
     // return $thisemail;
     $sql = " select * from $values[6] where email =   '$values[3]'  " ;    
      $stmt = $this->connect($values)->query($sql) ;
      $row = $stmt->fetch();     
      return $row;

           
   }
   //====================================================== 
   public function RegWriteNewUser($values)  
   {    
     try
     {
      //$sql = " INSERT INTO tblprofilepg1 (firstname, lastname, usernameorig, password, username, email, emailorig) VALUES ('abc', 'def', 'ronzpi', 'jkl777', 'fuckyou', 'aba', 'xys')";
      //$sq = "INSERT INTO tblProfilePg1 (firstname, lastname, usernameorig, password, emailorig, email, username, membersince) VALUES ('dff', 'dfdf', 'slowbytess', 'slowbyte1', 'dffdd', 'dffdd', 'slowbytess', '2020-11-12') ";
     $sql1 = " INSERT INTO $values[9] $values[7] VALUES $values[8] ";
     $stmt = $this->connect($values)->exec($sql1); 

     $sql2 = " INSERT INTO $values[12] $values[10] VALUES $values[11] ";
     $stmt = $this->connect($values)->exec($sql2); 

      return "success";
     }
     catch(PDOException $e)
     {
       return "ERROR in Update... "  .$e->getMessage();
     }
   }
}

// END CLASS Reg ==============================================================================

//========================== END CLASS DEFINITIONS ===========================================


header('Content-Type: application/json');


    header('Content-Type: application/json');

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch($_POST['functionname'])
        {
// REG BELOW ONLY===================================================================
            case 'RegSQLrow':  
                if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                    $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                }
                else {
                    //$userName = 'Ron';
                    //$userName = $_POST['arguments'][0];
                    $aResult['result'] = RegSQLrow($_POST['arguments'][0], $_POST['arguments'][1]);                                              
                }
                break;
            case 'RegEMAILrow':
                    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                        $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                    }
                    else {
                        //$userName = 'Ron';
                        //$userName = $_POST['arguments'][0];
                        $aResult['result'] =  RegEMAILrow($_POST['arguments'][0], $_POST['arguments'][1]);     
                    }
                    break;  
            case 'RegCREATEuser':
                        if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                            $aResult['error'] = '... count args is only ' .count($_POST['arguments']);
                        }
                        else {
                            //$userName = 'Ron';
                            //$userName = $_POST['arguments'][0];
                            $aResult['result'] = RegCREATEuser($_POST['arguments'][0], $_POST['arguments'][1]);
                        }
                        break;     

            default:
                        $aResult['error'] = 'test.php ERROR: Not found, requested function '.$_POST['functionname'].'!';
                        break;
// REG ABOVE ONLY===================================================================                           

        } //end switch statements

    }
    echo json_encode($aResult);

    
// BEGIN REG FCNs ONLY ==============================================================
//============= BEGIN pp1SQLrow($values, $blank) ===============================
function RegSQLrow($values, $blank)
      {          
        $obj = new Reg;          
        return $obj->RegGetUSERrow($values); 
     }
//============= END pp1SQLrow($values, $blank) =================================

//============= BEGIN  pp1EMAILrow($values, $blank) ===============================
function  RegEMAILrow($values, $blank)
{     
    $obj = new Reg;
    return $obj->RegGetEMAILrow($values);
}
//============= END  pp1EMAILrow($values, $blank) ===============================

//============= BEGIN pp1UPDATEwrite ($values, $blank) ===============================
function RegCREATEuser($values, $blank)
{
   $obj = new Reg;
   return $obj->RegWriteNewUser($values);
   //Db::connect();
}
//============= END pp1UPDATEwrite($values, $blank) =================================
// END REG FCNs ONLY =======================================================================

?>



