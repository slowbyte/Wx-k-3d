
var dbAddress = "67.85.230.142\\SQLEXPRESS2014";
var dbUser = "slowbyte";
var dbPwd = "slowbyte1";
var loggedUser = "";
var dbName = "DND1";
var funcName = "";
var callsCount = -1;
var setTimeoutCount = 0;
//var retn = "";
var objHome = null;
var objHome2 = null;
var objStatus = null;
var objLogin = null;
var objReg = null;
var objAbtUs = null;
var objPic = null;
var dialog_login_state = 'logstatus';
var lastFormObj = null;
var objModal = null;
var loginResult = ["none", "not logged in", "no login "];


var timeOutSet = false;
var  loopRan = false;
var retned =  ["Saab", "Volvo", "BMW"];
var btnclked = false;


//=================START Pass PHP varibles to store in full file scope ========================
function passPHP( justLoggedIn)
{
  //("in passPHP");
  currentlyLoggedIn = justLoggedIn;
  username = justLoggedIn;
  //alert(username);
}

//=================END  Pass PHP varibles to store in full file scope ========================

//=====================================================================
function createLoginButtons()
{
 //alert("createLoginButtons_1");
//CREATE LOGIN SUBMIT BUTTON
//============================
button = (document.createElement("BUTTON"));
button.type = "button";
button.name = 'butsubmit';
button.className = "butSub";
button.id = "btn99";
button.value = "SUBMIT";
//button.style.backgroundColor = "white";
button.addEventListener("click", butSiClicked);        //butsubmitClicked);
button.innerHTML = "Submit";
submit.appendChild(button);

//CREATE LOGIN CANCEL BUTTON
//============================
buttonC = (document.createElement("BUTTON"));
buttonC.type = "button";
buttonC.name = 'butccancel';
buttonC.className = "butcCan";
buttonC.id = "btn100";
button.value = "CANCEL";
//button.style.backgroundColor = "white";
buttonC.addEventListener("click", butSiClicked);        //butsubmitClicked);
buttonC.innerHTML = "Cancel";
cancel.appendChild(buttonC);

/*CREATE LOGIN SET BUTTON
//============================
buttonSET = (document.createElement("BUTTON"));
buttonSET.type = "button";
buttonSET.name = 'butset';
buttonSET.className = "butSet";
buttonSET.id = "butset";
buttonSET.value = "SET";
//button.style.backgroundColor = "white";
buttonSET.addEventListener("click", butSetGetClicked);        //butsubmitClicked);
buttonSET.innerHTML = "Set";
set.appendChild(buttonSET);

//CREATE LOGIN GET BUTTON
//============================
buttonGET = (document.createElement("BUTTON"));

buttonGET.type = "button";

buttonGET.name = 'butget';
buttonGET.className = "butGet";

buttonGET.id = "butget";
buttonGET.value = "GET";
//button.style.backgroundColor = "white";

buttonGET.addEventListener("click", butSetGetClicked);        //butsubmitClicked);
buttonGET.innerHTML = "Get";
get.appendChild(buttonGET);
*/
//CREATE REGISTER SUBMIT BUTTON
//============================
buttonRS = (document.createElement("BUTTON"));
buttonRS.type = "button";
buttonRS.name = 'butrlsubmit';
buttonRS.className = "butrSub";
buttonRS.id = "btn101";
buttonRS.value = "SUBMIT";
//button.style.backgroundColor = "white";
buttonRS.addEventListener("click", butSiClicked);        //butsubmitClicked);
buttonRS.innerHTML = "Submit";
rsubmit.appendChild(buttonRS);

//CREATE REGISTER CANCEL   BUTTON
//============================
buttonRC = (document.createElement("BUTTON"));
buttonRC.type = "button";
buttonRC.name = 'butccancel';
buttonRC.className = "butrCan";
buttonRC.id = "btn102";
buttonRC.value = "CANCEL";
//button.style.backgroundColor = "white";
buttonRC.addEventListener("click", butSiClicked);        //butsubmitClicked);
buttonRC.innerHTML = "Cancel";
rcancel.appendChild(buttonRC);
}
//==============================================================================================

/*/===================== BEGIN FUNCTION butSetGetClicked() ===========================================
  function butSetGetClicked( arg1, arg2)
  {
    //alert(this.name);
    if(this.name  == "butset")
    {
       //alert("butSetClicked = " + arg1 + " ---- " + arg2);
        setSESSIONcookie("lexoRULEZ" , "blank");      
    }
    else if(this.name == "butget")
    {
      // alert("butGetClicked = " + arg1 + " ---- " + arg2);
       getSESSIONcookie("blank" , "blank") ;
    }
  }
*///===================== END FUNCTION butSetGetClicked() ===========================================

//================= BEGIN FUNCTION SetObjs() ======================================================
    function SetObjs()
    {
      //alert("SetObjs()");
      objHome2 = document.getElementById('login2');   
      objHome = document.getElementById('login')   
      objStatus = document.getElementById('frmstatus');
      objLogin = document.getElementById('frmlog'); 
      objReg = document.getElementById('frmreg');  
      objPic = document.getElementById('img2') ;
      objAbtUs = document.getElementById('content');
      objModal = document.getElementById('modal-content');
      //alert(objHome + "\n"  + objStatus +  "\n" + objLogin +  "\n" + objReg  +  "\n" + objAbtUs );
      //=====================================================================
      objNAVnvmc = document.getElementById("nvmc") ;
      objNAVnvmct = document.getElementById("nvmct") ;
      objNAVnvmcp = document.getElementById("nvmcp") ;
      objNAVnvpp1form = document.getElementById("nvpp1form") ;
      objNAVnvpp2form = document.getElementById("nvpp2form") ;
     // objNAVnvpp1btnnxt = document.getElementById("nvpp1btnnxt") ;
      objA11 = document.getElementById("a11") ;    
      objA12 = document.getElementById("a12") ; 
      objA13 = document.getElementById("a13") ; 
      objA14 = document.getElementById("a14") ;  
      objnvModal = document.getElementById("nvmodal-content");    
      //=========================================================================

      displayStartup(true);    
    }

//====================BEGIN FUNCTION displayStartup(T/F)==================================================
function displayStartup($true_false)
{  
  if($true_false == true)
  {    
    nullLastFormObject();   
    document.getElementById('top').innerHTML = loginResult[0];
    document.getElementById('middle').innerHTML = loginResult[1];
    document.getElementById('bottom').innerHTML = loginResult[2];    
     objHome2.style.display = "none";
     objHome.style.display = "flex";
     objStatus.style.display = "flex"
     lastFormObj  = objStatus;
     status = "statusform"
  }
  else if($true_false == false)
  {
    //alert(objStatus);
    objStatus.style.display = "none";   
  }
return;
}
//==================== BEGIN FUNCTION displayLogout() ==================================================
function displayLogout()
{
  nullLastFormObject();   
  objnvModal.style.display = "none";
  loginResult[0] = username;
  loginResult[1] = "Logged Out";
  loginResult[2] = "no login attempt";
  document.getElementById('top').innerHTML = username;
  document.getElementById('middle').innerHTML = "Logged Out";
  document.getElementById('bottom').innerHTML = "no login attempt";    
   objHome2.style.display = "none";
   objHome.style.display = "flex";
   objStatus.style.display = "flex";
   objPic.style.display = "none";
   lastFormObj  = objStatus;
   document.getElementById('a15').innerHTML =  "Log In";
   //Must set $_SESSION["username"] varible to "none"
   setSESSIONcookie("none" , "blank");
   objNAVloggedinStatus = "none"; //set the globally available varible to status = none      
   nvAnchorsOnOff(OFF);
   objNAVnvmc.style.display = "none";  
   currentPPpage = 0;;
}
//===================== END FUNCTION displayLogout() ==================================================

//====================BEGIN FUNCTION displayLogin(T/F)==================================================
function displayLogin($true_false)
{
  //alert("display Login");
  if($true_false == true)
  {     
    document.getElementById('un').value = "";
    document.getElementById('up').value = ""; ;
    nullLastFormObject();
    objHome2.style.display = "none";
     objHome.style.display = "flex";
     objLogin.style.display = "flex"
     lastFormObj = objLogin;
     status = "loginform";
  }
  else if($true_false == false)
  {    
    //objHome.style.display = "none";   
    lastFormObj.style.display = "none";
    //displayLogin(false);
    //displayStartup(true);
    lastFormObj = objStatus;
    status = "statusform"
    username = "none";
  
    displayStartup(true);

    }
return;
}
//====================BEGIN FUNCTION displayRegister(T/F)==================================================
function displayRegister($true_false)
{
  
  if($true_false == true)
  {     
    document.getElementById('rfn').value = "";
    document.getElementById('rln').value = ""; 
    document.getElementById('run').value = "";
    document.getElementById('rup').value = ""; 
    document.getElementById('rem').value = "";
    objHome.style.display = "none";    
    nullLastFormObject();
    objHome2.style.display = "flex";
    objReg.style.display = "flex"
     lastFormObj = objReg;
     status = "registerform"
  }
  else if($true_false == false)
  {
    objHome2.style.display = "none";    
    lastFormObj.style.display = "none";
    displayStartup(true);
    lastFormObj = objStatus;
    status = "statusform" 
  }
return;
}

//====================BEGIN FUNCTION displayAbtUs(T/F)==================================================
function displayAbtUs($true_false)
{
 objAbtUs =  document.getElementById('content');
 if($true_false == true)
  {    
   // nullLastFormObject();
    
   
     objAbtUs.style.display = "flex";
     //lastFormObj  = objAbtUs;
  }
  else if($true_false == false)
  {  
    objAbtUs.style.display = "none";   
  }
return;
}

//====================BEGIN FUNCTION displayAdmin(T/F)==================================================
function displayAdmin($true_false)
{
 // alert("in displayAdmin" + $true_false);
  
 objAdmin =  document.getElementById('s16');
 if($true_false == true)
  {    
   // nullLastFormObject();
    
   
     objAdmin.style.display = "flex";
     //lastFormObj  = objAbtUs;
  }
  else if($true_false == false)
  {  
    objAdmin.style.display = "none";   
  }
return;
}


//====================BEGIN FUNCTION nullLastFormObject==================================================
function nullLastFormObject()
{
   if(lastFormObj == null)
   {
     //alert("returning we got a null lastFormObj");
     return;
   }
    lastFormObj.style.display = "none";

}

/*/=============================== BEGIN FUNCTION ChkSignIn()  =================================
function ChkSignIn()  //is it set to true or false???
{  
  alert("ChkSignIn() si.js");
   var x = document.getElementById("myAudio");
   //x.play();
   funcName = "chkstateSignedIn";
   loggedUser = "whoCares";
   $dbValues = [dbAddress, dbUser, dbPwd, loggedUser, dbName, funcName] ;
   setTimeout(function()
   {
     retn = ajaxsi($dbValues); //php returns the 3 $_SESSION[] with log info yea or nay
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
   ajaxsi($dbValues);
}

//END FUNCTION ChkSignIn() = 'true' or 'false' ===================================*/


//========================================
function login()
{
//alert("in login()");
//alert("logged in status..."  + objNAVloggedinStatus);
objNAVnvmc.style.height = objHeightnvmc; //=============you are the prob.
//alert(objNAVnvmc);
var a15 = document.getElementById('a15').innerHTML;
//alert("a15 =" + a15);
if(a15 == "Log In")
{
  //alert("1");
  displayLogin(true); 
  //alert("2");
}
if(a15 == "Log Out")
{
   displayLogout();  
}
  return;
  //alert("login start");
  if(dialog_login_state  ==  "logstatus")
  {
    alert(dialog_login_state);
    
    alert(objStatus) ;
    objStatus.style.display = "none"; //HIDE THE STATUS FORM
    alert(objLogin);
   objLogin.style.display = "flex"; //DISPLAY THE LOGIN FORM
   //alert(thefrmL) ;
    but = document.getElementById('btn99');
    but.style.display = "block";
    alert(objLogin);
   
   
    //alert("logstatus4");
    //erase all prior inputs
    var both = document.getElementsByClassName('inleft');
    //alert("logstatus5");
    both[0].value = "";
    both[1].value = "";
   // alert("logstatus6");   
    //objLogin.style.display = "flex";
    //alert("logstatus7");
    objLogin.style.display = "none";
    dialog_login_state  = "login";
    //alert("logstatus8");
  }
  else if (dialog_login_state  ==  "hidden") 
 {
  alert("turn off objHome");
  btn99.style.display = "none";
   objHome.style.display = "none";
  dialog_login_state  = "hidden";
 }
}
//=====================================================================


//======================================================================

////////////BEGIN FUNCTION butSiClicked /////////////////////////=============================
function butSiClicked()
   {   
   if("butSub" == this.className)
   {
   //
      //WE WILL GO IMMEDIATELY TO A NEW FUNCTION WHICH IS WHERE WE WILL START TO GO TO MySQL instead of MSSQL
      ////////////////////////////////////mySQLtestDB(); orig get dBase data function...
      Signin4BothTables();  //////////////////// new function being tested Started On 10/31/2020 in place of mySQLtestDB() ...
   }
   else if("butcCan" == this.className)
   {
    //alert("butcCan = " + this.className);
     //objLogin.style.display = "none";
     displayLogin(false);
     displayStartup(true);
     dialog_login_state  = "logstatus";
   }
   else if ("butrSub" == this.className) //RegisterSubmitClked
   {
   //alert(document.getElementById('rfn').value);
   //alert("butrSub = " + this.className);
   // displayRegister(true);
    //alert("butrSub = " + this.className);
  var rtn = regChk4AllEntries();  //@reg.js   var rtn = IsUsernameAvail(); //this func is in reg.js
   //alert("DONE");
   return;
   }
   else if("butrCan" == this.className)
   {
    //alert("butrCan = " + this.className);
     //objLogin.style.display = "none";
     objModal.style.display = "none";  // Close any open Error or Success dialog box
     displayRegister(false);
     displayStartup(true);
     dialog_login_state  = "logstatus";
   }

  return;
  }
  /* should this be cancelled?/======================================================
  var both = document.getElementsByClassName('inleft');
  //alert( both[0].value + "   " + both[1].value);
   funcName = "validateUserPwd";
   loggedUser = document.getElementById('un').value;
   //alert(loggedUser);
   $dbValues = [dbAddress, dbUser, dbPwd, loggedUser, dbName, funcName] ;
   setTimeout(function()
   {
	 //alert("timeouted 1");
    retn = ajaxsi($dbValues);
    //alert("timeouted 2");
    //alert(retn) ;
    validateSignIn(retn);
    //btn99.style.display = "none";
    //var thebox = document.getElementById('login');
    //thebox.style.display = "none";
    objLogin.style.display = "none";
    dialog_login_state  = "status";
   }, 3000);
   ajaxsi($dbValues);
   ajaxsi($dbValues);
   */
    
///============= END FUNCTION butSiClicked =========================================

//============================= BEGIN  MYSQL($) ===============================
/*function XXmySQL($clsName)  //replaced by new version of mySQL($clsName) function below
{
  alert("mySQL");
//==========================

  whoCallAjax = "ajaxsi";
  //alert("clsName = " + $clsName);
  var dbHost = "localhost";
 // var dbHost = "74.207.235.136";
  var dbUser = "root";
  var dbPwd = "slowbyte1";
  var loggedUser = "";
  var dbName = "cf1";
  var funcName = "";  

  objnvModal.style.display = "none";
  if($clsName == "butSub")
  {
  // alert("In $clsName =  butSub");
   funcName =  "signinMySql";
   loggedUser = document.getElementById('un').value.trim();
   //alert("loggedUser = " + loggedUser);
   password = document.getElementById('up').value.trim();
  // alert("pw = " + password);
  }
  else if($clsName == "butrSub")
  {
    //need to add funcName = ??? and need to trim() all input boxes that user filled in
    //alert("In $clsName = butrSub");
  }
  var theRetn = null;
   $dbValues = [dbHost, dbUser, dbPwd, loggedUser, dbName, funcName] ;
   //alert($dbValues);
  
   setTimeout(function()
   {
    //alert("mySQL ajax call");
    //theRetn = ajaxtestDB($dbValues);
    alert("after ajax call " + theRetn);
    //=========================
    
    var msg = "";
    for(var i = 0; i <= 13; i++)
    {
       msg = msg + "\r\n" + theRetn[i];
    }
    alert(msg);
    
   //=========================
    validateSignIn(theRetn);
    
    displayStartup(true);
    dialog_login_state  = "startup";
    theRetn = null;
   }, 3000);
   ajaxtestDB($dbValues);
  theRetn = ajaxtestDB($dbValues);
  }  */
//============================= END MYSQL1==================================

//==============BEGIN FUNCTION validateSignIn() =====================================
function validateSignIn(retn)
{
  //alert("in Validate Signin");   //// +   JSON.stringify(retn));
  var objPic =document.getElementById('img2');
  objPic.style.display = "none";
  var objUser = document.getElementById('un').value.trim();
  var objPwd = document.getElementById('up').value.trim();
  var objBottomLine = document.getElementById('bottom');

  if(retn == null || retn == "" )
  {
    //alert("null or dbl quotes ");
    //alert("Error: no such user name " + objUser); //NO SUCH USER  
    objBottomLine.style.color = "red";
    objBottomLine.style.fontWeight = "bold";
    loginResult[0] = "none";
    loginResult[1] = "login attempt failed";
    loginResult[2] = "Error: no username " + objUser;    
    return;
  }

  if(objPwd != retn[10].trim())
  {
    //alert('ERROR" Password "' + objPwd + '" is not correct...');//BAD PASSWORD
    //alert('username = ' + retn[7] + '  password = ' +retn[8] );
    objBottomLine.style.color = "red";
    objBottomLine.style.fontWeight = "bold";
    loginResult[0] = "none";
    loginResult[1] = "login attempt failed";
    loginResult[2] = "Error: password " + objPwd + " is incorrect";
    return;
  }

  if (objPwd == retn[10].trim())
  {
    //alert("USER AND PWD CORRECT so go here next...");
     passPHP( objUser);
     objBottomLine.style.color = "black";
     objBottomLine.style.fontWeight = "normal";
     objPic.style.display = "block"
           
  
     //$_SESSION["username"] = objUser;
    // alert($_SESSION["username"]);
     loginResult[0] = objUser;
     loginResult[1] = "Logged In";
     loginResult[2] = "Success";
     username = objUser;
    //NOW time to  setSESSIONcookie(username, "blank");
    //alert("setsessioncookie_1 = "  + username);
    ///////////////////////////////// setSESSIONcookie(username, "blank");
     objNAVloggedinStatus = username;
     //Login123LastDBdata = retn;
     //alert(Login123LastDBdata[14] + "/"  +Login123LastDBdata[15]);
    //Nov 12 2020... new stuff! At a member successful login need to update "tblprofileg1 columns lastlogin & logincount" =======
    //need to create a new function to call the database to do the above new stuff...
    results = signinUPDATEtblprofilepg1(retn);
    //alert("si Validate..." + JSON.stringify(retn));
    console.log(JSON.stringify(retn));
    //alert("results = "  + results);
    //===============================================================================================
     SetLastDBdataArrays(retn);  // these will be the source for filling ProfilePages PP1 PP2 PP3  initially with data returned from signin...
                                                   // using PP1LastDBdata, PP2LastDBdata, PP3LastDBdata,PP123LastDBdata
     retn = null;
//============================
     setTimeout(function()  //delay so that we have more reliable data showing w/o garbage first time profile is clked  
  {
    nvAnchorsOnOff(ON);  
  }, 10);
 //============================  
    // nvRtnPPbyUser (username, "tblProfilePg1");
     var val = document.getElementById('a15');
     val.innerHTML = "Log Out";
    if(username  == "admin")
    {
        //alert("admin has logged in");
        displayAdmin(true);
    }
     return;
  }
}
//============================= END validateSignin()=============================

// BEGIN signinUPDATEtblprofilepg1() ================================================
function signinUPDATEtblprofilepg1(row)  // this function is to update the last time/date user signed in and # times user has signed in total
{                                                                  // given that the login attempt was SUCCESSFUL....
    //alert("SIUD row = " + JSON.stringify(row));
    var newCount =   parseInt( row[15]) + 1 ;
    var d = new Date(); // d is used to get a "lastlogin" formated date/time to add to database
    var currentDateTime = "'"  + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "'";  // formated as yyyy-mm-dd hh:min:sec;
    $dataStr = " lastlogin = " + currentDateTime + ", logincount = "  + newCount ;
    
    var dbHost = "localhost";
    //var dbHost = "74.207.235.136";
    var dbUser = "root";
    var dbPwd = "slowbyte1";
    var loggedUser = row[8];
    var dbName = "cf1";
    var funcName = "signinUPDATEwrite";
    var dBtable = "tblProfilePg1";
    var dbValuesToInsert = $dataStr; 

    $dbValues = [dbHost, dbUser, dbPwd, loggedUser, dbName, funcName, dbValuesToInsert, dBtable];
    //alert("Update dbValues = " + $dbValues);
  
    setTimeout(function () 
    {
      rtnSiUpdate =  Loginajax($dbValues);
      if (rtnSiUpdate === "success")
      {
        //alert("NEWupdate was successful");
        dataBaseUpdated = true;
        return;
      } 
      else
       {
        //alert("else");   // alert("emailcurrentstatus");
        return false;
       }
    }, 2500);
     rtnSiUpdate = Loginajax($dbValues);
}
// END signinUPDATEtblprofilepg1() ==================================================

//======================== BEGIN FUNCTION setSESSIONcookie() ======================= 
function setSESSIONcookie(loggedInUser, secondParam)
{
  //alert('set cookie to = ' + loggedInUser);
  funcName = "setSESSIONcookie";
  $dbValues = [dbAddress, dbUser, dbPwd, loggedInUser, dbName, funcName] ;
   //alert($dbValues);
 //  alert("setsessioncookie_2 = "  + loggedInUser);
  setTimeout(function()
  {
   retn = ajaxsi($dbValues);
    ////alert(retn);
  }, 3000);
  ajaxsi($dbValues);
  ajaxsi($dbValues);
}
//================== END setSESSIONcookie() =========================================

//======================== BEGIN FUNCTION getSESSIONcookie() ======================= 
function getSESSIONcookie(loggedInUser, secondParam)
{
  //alert('set cookie to = ' + loggedInUser);
  funcName = "getSESSIONcookie";
  $dbValues = [dbAddress, dbUser, dbPwd, loggedInUser, dbName, funcName] ;
   //alert($dbValues);

  setTimeout(function()
  {
   retn = ajaxsi($dbValues);
    alert(retn);
  }, 3000);
  ajaxsi($dbValues);
  ajaxsi($dbValues);
}
//================== END getSESSIONcookie() =========================================


/////////////// BEGIN FUNCTION WriteLastSignInInfo() //////////////////////////////////////////////////
function WriteLastSignInInfo()
{
  //alert("wlsiinfo");
  funcName = "setlastsignin";
  $dbValues = [dbAddress, dbUser, dbPwd, loggedUser, dbName, funcName] ;
  //alert("timedout");
  setTimeout(function()
  {
    //alert("in timedout func");
     retn = ajaxsi($dbValues);
     //alert(retn);
  }, 2000);
  ajaxsi($dbValues);
  ajaxsi($dbValues);

}
//==============================================================================================*/

//============================BEGIN FUNCTION ajaxsi ===============================================
function ajaxsi($dbValues)
{
  //alert("in ajaxsi");
  //alert("ajaxsi fcn =  " +  $dbValues[5]);
  funcCalled = "NONE";

 if($dbValues[5] == 'setSESSIONcookie')
  {
    funcCalled = "setSESSIONcookie";
   // alert("func = setSESSIONcookie");
  }

  else if($dbValues[5] == 'getSESSIONcookie')
  {
    funcCalled = "getSESSIONcookie";
   // alert("func = getSESSIONcookie");
  }


  else if($dbValues[9] == "updateDB")
  {
    funcCalled = "updateDB";
  }
  else if($dbValues[5] == 'signinMySql')
  {
    funcCalled = "signinMySql";
    //alert(funcCalled);
  }
  else if($dbValues[5] == 'validateUserPwd')
  {
    funcCalled = "validateUserPwd";
  }
  else if($dbValues[5] == "addnewuser")
  {
    funcCalled = "addnewuser";
    //alert("funcCalled = " + funcCalled);
  }
  else if($dbValues[5] == "chkstateSignedIn")
  {
    funcCalled = "chkstateSignedIn";
  }
  else if($dbValues[5] == "setlastsignin")
  {
    funcCalled = "setlastsignin";    
  }
  else if($dbValues[5] == 'registerMySql')
  {
    funcCalled = "registerMySql";
   // alert('else if = ' + funcCalled);    
  }
   
  if(funcCalled == "NONE" && whoCallAjax == "ajaxsi")
  {
    alert("Ajaxsi NOT 7 FUNCTION CALLED = NONE\r\nCancelling" );
    return;
  }
   //alert("Ajax FUNCTION CALLED = " + funcCalled);
   //alert("AJAX dbval = " + $dbValues);
	jQuery.ajax({type: "POST", url: "signin/signin.php", dataType: 'json', data: {functionname: funcCalled, arguments: [$dbValues, 'blank'] },
		success: function (obj, textstatus)
				   {
					  if( !('error' in obj) )
					  {
              $yourVariable = obj.result;
              //alert(obj.result);
               if(funcName == "updateDB")
               {
               alert(textstatus); //do this only when WRITTING TO DB NOT WHEN READING FROM DB
               }
					  }
					  else
					  {
              alert(obj.error);
              alert('fuck me');
						  console.log(obj.error);
					  }
           }
          });
return $yourVariable;
}
////////////////// END FUNCTION ajaxsi() ===========================================

/*  //============================= BEGIN  mySQLtestDB()==================================
function  mySQLtestDB()        //from project testDB fcn = findtableclkSQLTest()
{    
  //findtableclkSQLTest();
  //btnclked = false;
  //alert("in  mySQLtestDB");
 // alert(retned);
  //whoCallAjax = "ajaxtest";
  var dbHost = "localhost";
  //var dbHost = "74.207.235.136";
  var dbUser = "root";
  var dbPwd = "slowbyte1";
  var loggedUser = "nobody";
  var dbName = "cf1";
  var funcName = "testNVrtnpp1row";  
  var dBtable = "tblProfilePg1";
  var whichSQL = "username";  //email or "username is OK "
  var email = "none";

  //objnvModal.style.display = "none";
  // alert("In $clsName =  butSub");
   loggedUser = document.getElementById('un').value.trim();
   //alert("loggedUser = " + loggedUser);
   password = document.getElementById('up').value.trim();
  // alert("pw = " + password);
  
    //===============new procedure below for getting back an Ajax* retn value=======================
  //FINALLY WORKS 8/21/2020 AND IT WORKS EXCELLENTLY.... FML

  //var retned = null;
  var datax = "";
  $dbValues = [dbHost, dbUser, dbPwd, loggedUser, dbName, funcName, dBtable, whichSQL, email] ; 
  //alert($dbValues);
 
   /////THIS NEEDS TO HAVE THE FOR LOOP FIX TO ACCOUNT WHETHER ITS A username OR email TYPE BEING REQUESTED
  var sizeOfExpectedRetn = 16; //FOR USER NAME ITS A 15
        
 // alert("1- at setTimeout..." + sizeOfExpectedRetn );
  //alert(retned[4]);
  timeout = 1000; 
  setTimeout(function()
    {       
      //retned = ajaxtestDB($dbValues);
      //alert("setTOut = ");
      for(var j = 0; j < sizeOfExpectedRetn;  j++)
      {         
            datax = datax + "\r\n " + retned[j];    
      }

      if(loopRan == false)   
      {            
          loopRan = true;   
          timeout = 2000;  
          //alert(" findtableclkSQLTest() being called 2nd time now")   ;
          mySQLtestDB();
      }
      else
      {    
          //alert("2nd call has retned here, good");            
          loopRan = false;
          //alert(datax);
          validateSignIn(retned);
          displayStartup(true);
          dialog_login_state  = "startup";
          retned = null;          
      }       
    }, timeout);
    retned = ajaxtestDBSI($dbValues);
}  
//============================= END mySQLtestDB()================================== */

///////////////////////////////////////////////////BEGIN special test on returning both tables full data with one sql call//////////////////////////////////////////
function Signin4BothTables()
{
//alert("PP123LastColumns = " + PP123LastColumns);
 var enteredUN = document.getElementById('un').value.trim();
 var enteredPW =  password = document.getElementById('up').value.trim();
 //alert(enteredUN + "/" + enteredPW);
 var dbHost = "localhost";
 //var dbHost = "74.207.235.136";
 var dbUser = "root";
 var dbPwd = "slowbyte1";
 var fauxloggedUser = enteredUN;
 var dbName = "cf1";
 var funcName = "loginOnly";  
 var dBtable1 = "tblProfilePg1";
 var dBtable2 = "tblProfilePg2";
 
 var retn2Tbls = [];
 var datax = "";
 $dbValues = [dbHost, dbUser, dbPwd, fauxloggedUser, dbName, funcName, dBtable1, dBtable2] ; 
 //alert($dbValues);
 var sizeOfExpectedRetn = 23; //FOR BOTH TABLES

 timeout = 1000; 
 setTimeout(function()
   {       
     retn2Tbls = Loginajax($dbValues);
     alert(JSON.stringify(retn2Tbls));
     for(var j = 0; j < sizeOfExpectedRetn;  j++)
     {         
           //datax = datax + ", " +pp1rtnSQL[j];      
           //datax = datax + "\r\n " + retn2Tbls[j];    
     }

     if(loopRan == false)   
     {            
         loopRan = true;   
         timeout = 2000;          
         Signin4BothTables();
     }
     else
     {    
       
         loopRan = false; 
         //alert(datax);
         validateSignIn(retn2Tbls);
         displayStartup(true);
         dialog_login_state = "startup"; 
         //alert( retnBothTbls[13] + " ... " + retnBothTbls[0]);
         retn2Tbls = null;                        
     }       
   }, timeout);
   retn2Tbls = Loginajax($dbValues);
}  

///////////////////////////////////////////////////END special test on returning both tables full data with one sql call///////////////////////////////////////////////

//BEGIN FUNCTION Loginajax() ================= ===========================================
function Loginajax($dbValues)
{
  //alert("DB fcn =  " +  $dbValues[5]);
  funcCalled = "NONE";

//LOGIN ONLY BELOW ======================================================================
  if($dbValues[5] == 'loginOnly')
  {
    funcCalled = "loginOnly";
    //alert("fcnCalled = " + funcCalled);
  }
  else if($dbValues[5] == 'signinUPDATEwrite')       
  {
    funcCalled = "signinUPDATEwrite";
    //alert("fcnCalled = " + funcCalled);
  }
//LOGIN ONLY ABOVE======================================================================

  if(funcCalled == "NONE")
  {
    alert("Loginajax()  CALLED = NONE\r\nCancelling" );
    return;
  }
   //alert("Ajax FUNCTION CALLED = " + funcCalled);
   //alert("AJAX dbval = " + $dbValues);
	jQuery.ajax({type: "POST", url: "signin/login.php", dataType: 'json', data: {functionname: funcCalled, arguments: [$dbValues, 'blank'] },
		success: function (obj, textstatus)
				   {           
					  if( !('error' in obj) )
					  {
              $yourVariable = obj.result;
              //alert(obj.result);
               if(funcName == "updateDB")
               {
               alert(textstatus); //do this only when WRITTING TO DB NOT WHEN READING FROM DB
               }
					  }
					  else
					  {
              alert(obj.error);
              alert('fuckMEtwice');
						  //console.log(obj.error);
					  }
           }
          });
return $yourVariable;
}   
// END FUNCTION Loginajax() ===================================================================

////////////////// BEGIN FUNCTION ajaxtestDBSI()  ===========================================
function ajaxtestDBSI($dbValues)  //from project testDB
{
  alert("DB fcn passed to ajax =  " +  $dbValues[5]);

  funcCalled = "NONE";

  if($dbValues[5] == 'aNVrtnpp1row') 
  {
    funcCalled = "aNVrtnpp1row";
   //alert("fcnCalled = " + funcCalled);
  }
  else if($dbValues[5] == 'anvUpdatePP')
  {
    funcCalled = "anvUpdatePP";
    //alert("fcnCalled = " + funcCalled);
  }
  else if($dbValues[5] == 'signinMySql')
  {
    funcCalled = "signinMySql";
    //alert("fcnCalled = " + funcCalled);
  }
  else if($dbValues[5] == 'testNVrtnpp1row')       
  {
    funcCalled = "testNVrtnpp1row";
    //alert("fcnCalled = " + funcCalled);
  }
  else if($dbValues[5] == 'regAddNewUser')       
  {
    funcCalled = "regAddNewUser";
    //alert("fcnCalled @ ajaxtestDB() = " + funcCalled);   
  }
  


  if(funcCalled == "NONE")
  {
    alert("AjaxtesDBSI FUNCTION CALLED = NONE\r\nCancelling" );
    return;
  }
   //alert("Ajax FUNCTION CALLED = " + funcCalled);
   //alert("AJAX dbval = " + $dbValues);
	jQuery.ajax({type: "POST", url: "signin/testDB.php", dataType: 'json', data: {functionname: funcCalled, arguments: [$dbValues, 'blank'] },
		success: function (obj, textstatus)
				   {
					  if( !('error' in obj) )
					  {
              $yourVariable = obj.result;
              //alert(obj.result);
               if(funcName == "updateDB")
               {
               alert(textstatus); //do this only when WRITTING TO DB NOT WHEN READING FROM DB
               }
					  }
					  else
					  {
              alert(obj.error);
              alert('fuckME');
						  console.log(obj.error);
					  }
           }
          });
return $yourVariable;
}   

////////////////// END FUNCTION ajaxtestDBSI() ===========================================