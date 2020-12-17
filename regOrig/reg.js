
var titles = ["First Name", " Last Name", " Username", " Password", " Email" ];  
var columns = ['firstname', 'lastname', 'username', 'password', 'email' ];
var addusercolumns =  "(firstname, lastname, username, password, email)";
var colnkeys = ['rfn', 'rln', 'run', 'rup', 'rem'];
/*
//changed below because we added two new colns... emailorig @ [] & usernameorig @ []  (note: xxxorig can up uppercase and lowercase letters;
//BUT email @ [] & username @ [] MUST BE ALL LOWER CASE WHICH WILL BE DONE IN CODE PROGRAMMATICALLY!!!

var titles = ["First Name", " Last Name", " Username", " Password", " Email" ];  
var columns = ['firstname', 'lastname', 'username', 'password', 'email', 'emailorig', 'usernameorig' ];
var addusercolumns =  "(firstname, lastname, username, password, email, emailorig, usernameorig)";
var colnkeys = ['rfn', 'rln', 'run', 'rup', 'rem'];*/
//------------------------------------------------------------------------------------
var dbAddress = "localhost";
var dbUser = "root";
var dbPwd = "slowbyte1";
var loggedUser = "slowbyte";
var dbName = "cf1";
var funcName = "";
var $yourVariable = "";

//====================BEGIN FUNCTION ChkSignIn() = 'true' or 'false' =================================
 function ChkSignIn()  //is it set to true or false???
{ 
   var x = document.getElementById("myAudio"); 
   x.play();
   funcName = "chkstateSignedIn";
   loggedUser = "whoCares";
   $dbValues = [dbAddress, dbUser, dbPwd, loggedUser, dbName, funcName] ;
   alert($dbValues);
   setTimeout(function()
   {   
     retn = ajax1($dbValues); //php returns the 3 $_SESSION[] with log info yea or nay
     //alert("ChkSignIn() retn  = " + retn);
     if(retn[0] == "false")
     {
      //alert("retned false");
      document.getElementById('a3').style.pointerEvents="none";
      document.getElementById('a3').style.cursor="default";
      document.getElementById('div4').style.backgroundColor = "rgb(70, 70, 173)";
      document.getElementById('a3').style.color = "lightgrey";
      document.getElementById('logged').innerHTML = retn[1]; 
      //document.getElementById(soundObj).soundPlay(sound1); 
      x.play();
     }
     else if(retn[0] == "true" || retn == "success")
     {
      //alert("retned true or success");
      document.getElementById('a3').style.pointerEvents="auto";
      document.getElementById('a3').style.cursor="pointer";
      document.getElementById('div4').style.backgroundColor = "blue";
      document.getElementById('a3').style.color = "white";
      //document.getElementById(soundObj).soundPlay(sound1);      
         if(retn[1].length >= 5)
         {
           document.getElementById('logged').innerHTML = retn[1];
           x.play();
           //document.getElementById(soundObj).soundPlay(sound1);
         } 
         else
         {          
           x.play();           
         }       
     }
   }, 1000);  
   ajax1($dbValues);
//}

//END FUNCTION ChkSignIn() = 'true' or 'false' ==============
}
//======================================================== 
 /////////////BEGIN FUNCTION FillPage1(retn)/////////////////////////========================
function FillPage1(rowData)
{
  document.getElementById('fn').value = rowData[1];
  document.getElementById('ln').value = rowData[2];
  document.getElementById('ci').value = rowData[3];
  document.getElementById('st').value = rowData[4];
  document.getElementById('zc').value = rowData[5];
  document.getElementById('em').value = rowData[6];
}
  
  /////////////BEGIN FUNCTION CreateRegBtn()/////////////////////////========================
function CreateRegBtn() 
{
  //alert("cpp1nxt");
  button = (document.createElement('input'));
  button.type = "button"; 
  button.name = 'butsubmit'; 
  button.className = "butSub";
  button.id = "btn99";
  button.value = "SUBMIT";
  button.style.backgroundColor = "grey";
  button.addEventListener("click", butsubmitClicked); 
  submit.appendChild(button); 
}

//=================BEGIN FUNCTION  IsUsernameAvail() =============================
function IsUsernameAvail()
{
  //alert("in IsUsernameAvail() @ reg.js")

  //===============================================================================
var r1 = document.getElementById('rfn');
r1.value = r1.value.trim();
//alert("iuna = " +  (document.getElementById(colnkeys[0]).value).trim());
var r2 = document.getElementById('rln');
r2.value = r2.value.trim();
var r3 = document.getElementById('run');
r3.value = r3.value.trim();
var r4 = document.getElementById('rup');
r4.value = r4.value.trim();
var r5 = document.getElementById('rem');
r5.value = r5.value.trim();
/*emailOrig = r5.value;
r5.value = r5.value.toLowerCase();
if(emailOrig != r5.value)
{
  alert("Emails are entered in our database\r\nin all lowercase letters...");
}
*/
  //===============================================================================
 var errors = false;
 var values = [];
 var errorList = [];
 $dataString = "(";
 $strTemp ="";

 for(var i = 0; i < columns.length; i++)
 {      
   values[columns[i]] = (document.getElementById(colnkeys[i]).value).trim();
   //var x = (document.getElementById(colnkeys[i]).value).trim();
  // alert(i +values[columns[i]]  + "....." + x);
  $strTemp= "'" + values[columns[i]] + "', ";    //values[columns[i]] = "'" + values[columns[i]] + "', ";
   $dataString = $dataString +  $strTemp;   //values[columns[i]];   
   if (values[columns[i]] == "")
     { 
       errors = true;
       errorList.push(titles[i]);
     }      
 }
// alert(errors + "-------" + errorList);

 len = $dataString.length;
 $dataString = $dataString.slice(0, len-2);
 $dataString = $dataString + ")";
 //alert("values Reg to insert = " + $dataString);

//alert("the values = " + values);
 if(errors)
   {   
    document.getElementById('modal-content').style.border = "4px solid red";     
  var data = [];
     data[0] = "ERROR: please correct...";
     data[1] =  "All items are required for Registration!<br>The following item(s) need to be filled in ... ";
     data[2] =  errorList;
     data[3] =   "";
    //alert( "ERROR: All items are required for Registration!\n\rThe following item(s) need to be corrected ... <br>" + errorList);
    displayModal( data);   ///ERROR: All items are required for Registration!\n\rThe following item(s) need to be corrected ... <br>" + errorList);
     return;      
   }


//Now check whether the requested username is already taken...
//var input = document.getElementById('run').value.trim();
//==============IsUsernameAvail code starts here===========================
  var username = document.getElementById('run').value.trim();
  var colntb2 = "username";
  funcName = "registerMySql";
  dbAddress = "localhost";
  dbUser = "root";
  dbPwd = "slowbyte1";
  loggedUser = "slowbyte";
  dbName = "cf1";
  dbColumns = addusercolumns;
  dbValuesToInsert = $dataString;

  $dbValues = [dbAddress, dbUser, dbPwd, loggedUser, dbName, funcName, username, dbColumns, dbValuesToInsert];  
  //alert($dbValues);
  setTimeout(function()
   {    
      var queryresult = ajax0($dbValues); 
      if(queryresult == null || queryresult == "" ) 
       {         
        //alert("new username ok");                 
         $dbValues[5] = "addnewuser"
         //alert("abt to anuser") ;       
         AddNewUser($dbValues);    
         //alert("return after anuser") ;
       }
      else
       {  
         document.getElementById('modal-content').style.border = "4px solid red";    
         document.getElementById('s1').style.color = "red";  
         var data = [];
            data[0] = "ERROR: please correct...";
            data[1] =  "USERNAME TAKEN: <br><br>"+ "username... " + document.getElementById('run').value.trim()  + "  ...is already taken... ";
            data[2] =  "";
            data[3] =   "";
           //alert( "ERROR: All items are required for Registration!\n\rThe following item(s) need to be corrected ... <br>" + errorList);
           displayModal( data);   ///ERROR: All items are required for Registration!\n\rThe following item(s) need to be corrected ... <br>" + errorList);         
       }     
   }, 2500);  
   ajax0($dbValues);
   ajax0($dbValues);
}
//==============IsUsernameAvail code ends here===========================

//===================== BEGIN FUNCTION AddNewUser ==========================
function AddNewUser($newData)
{
    setTimeout(function()
   {     
      $retn = ajax0($newData);
      //alert($retn);
      if($retn.includes("email_UNIQUE"))
      {
      document.getElementById('modal-content').style.border = "4px solid red"; 
      document.getElementById('s1').style.color = "red";     
      var data = [];
         data[0] = "ERROR: please correct...";
         data[1] =  "The EMAIL you entered is already used by another member...<br></br>";
         data[2] =  " You entered email: " + document.getElementById('rem').value.trim() ;
         data[3] =   "";      
        displayModal( data);  //email already  used by someone else;     
      }
      else  if($retn.includes("success"))
      {
        document.getElementById('modal-content').style.border = "4px solid green";    
        document.getElementById('s1').style.color = "black"; 
        var data = [];
           data[0] = "SUCCESS:";
           data[1] =  "you have successfully registered username...<br><br>" + $newData[6];;
           data[2] =  "";
           data[3] =   "";      
          displayModal( data);  //successfully register as a new user 
      }
   },2500);
   ajax0($newData); 
}
//================================ END FUNCTION AddNewUse() =============================

//=============================== BEGIN FUNCTION ajax1() ======================================
//================================================================================================
function ajax1($dbValues)
{
  //alert("reg.js " +  $dbValues[5]);
  funcCalled = "NONE";
  
  if($dbValues[5] == 'retrieveDB')
  {
    funcCalled = "retrieveDB";
  }
  else if($dbValues[5] == 'usernameavail')
  {
    funcCalled = "usernameavail";
    //alert('else if = ' + funcCalled);    
  }
  else if($dbValues[5] == 'addnewuser')
  {   
    funcCalled = "addnewuser";
    //alert("addnewuser now");
  }
  else if($dbValues[5] == 'registerMySQL')
  {
    funcCalled = "registerMySQL";
    //alert('else if = ' + funcCalled);    
  }

   

   //alert("func = " + funcCalled);

   jQuery.ajax({type: "POST", url: "signin/signin.php", dataType: 'json', data: {functionname: funcCalled, arguments: [$dbValues, 'blank'] },
   success: function (obj, textstatus)
          {
           if( !('error' in obj) && !('Error' in obj) && !('ERROR' in obj) )
           {
             $yourVariable = obj.result;
              //alert('no errors');
              if(funcName == "updateDB")
              {
              alert("ajax1 " + textstatus); //do this only when WRITTING TO DB NOT WHEN READING FROM DB
              }
           }
           else
           {
             alert("ajax2 " + obj.error);
             //alert('fuck');
             //console.log(obj.error);
           }
          }
         });
//}
return $yourVariable;
}
////////// END FUNCTION ajax1 /////////////////===================================

//&&&&&&&&&&& END page1.js &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&