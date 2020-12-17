//&&&&&&&&&&& BEGIN index.js &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

var dbAddress = "67.85.230.142\\SQLEXPRESS2014";
var dbUser = "slowbyte";
var dbPwd = "slowbyte1";
var loggedUser = "slowbyte";
var dbName = "DND1";
var funcName = "x";
var retn = "";
var $yourVariable = "shit....Ron";
var session = ""

//===========================================================
function passSessionID($sessID)
{
  session = $sessID;
  //alert(session);
  //alert("passSessionID($sessID)");
  //SetObjs();
  return;
   var X = document.getElementById('divfm')  ;  //works returned what's between the div tags
  //X.innerHTML = "SID   "  +  $sessID;
  SetObjs();
  //objStatus = document.getElementById('frmstatus');
    //alert(thestatus) ;
    objStatus.style.display = "flex";
    objLogin.style.display = "flex";
}
//===========================================================
/////////////BEGIN FUNCTION validateSignIn() fromindex.js/////////////////////////========================
function validateSignIn(retn)
{
  //alert("in Validate passed in = " + retn );
  var objUser = document.getElementById('un').value.trim();
  var objPwd = document.getElementById('up').value.trim(); 
  if(retn == null || retn == "" )
  {    
    alert("ERROR: NO SUCH USER NAME " + objUser); //NO SUCH USER
    btn99.style.display = "none";
    var thebox = document.getElementById('login');
    thebox.style.display = "none";
    return;
  }
  if(objPwd != retn[8].trim())
  {
    alert("ERROR Password  " + objPwd + " is not correct..." + retn[8]  );//BAD PASSWORD
    //alert('username = ' + retn[7] + '  password = ' +retn[8] );
    btn99.style.display = "none";
    var thebox = document.getElementById('login');
    thebox.style.display = "none";
    return;
  }  
  if (objPwd == retn[8].trim())
  { 
    alert("USER AND PWD CORRECT so go here next... ");
    btn99.style.display = "none";
    var thebox = document.getElementById('login');
    thebox.style.display = "none";
    return;
  }
      return;
}
//============================= END validateSignin()=============================

//&&&&&&&&&&& BEGIN FUNCTION destroySession() &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
function destroySession()
 {
   alert("destroy");
  funcName = "destroySession";
  //alert('func = ' + funcName);
  $dbValues = [dbAddress, dbUser, dbPwd, loggedUser, dbName, funcName];
  //alert($dbValues[5]);

  setTimeout(function()
   {
    retn = ajax0($dbValues);
    document.getElementById('logged').innerHTML = retn;
    setuserLoggedFalse();
    //alert(retn);
   }, 3000);
   ajax0($dbValues);
   ajax0($dbValues);
 }

//=========================================================

//&&&&&&&&&&& BEGIN FUNCTION setuserLoggedFalse() &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
function setuserLoggedFalse()
{
 setTimeout(function()
 {
   funcName = "setsignedInFALSE";
   $dbValues = [dbAddress, dbUser, dbPwd, loggedUser, dbName, funcName];
   retn = ajax0($dbValues);
   alert(retn);
 }, 3000);
 ajax0($dbValues);

}

/////////////// BEGIN FUNCTION ajax0 //////////////////////////////////////////////////
//================================================================================================
function ajax0($dbValues)
{
 funcCalled = "NONE";
 if($dbValues[5] == "setuserFalse")
 {
   funcCalled = "setuserFalse";
   //alert('ajax setusreFalse');
 }
 else if($dbValues[5] == 'validateUserPwd')
 {
   //alert("ajaxok");
   funcCalled = "validateUserPwd";
 }
 else if($dbValues[5] == 'destroySession')
 {
   funcCalled = "destroySession";

 }

  //alert("ajax funccalled =  " + funcCalled);
  //alert($dbValues);
 jQuery.ajax({type: "POST", url: "signin.php", dataType: 'json', data: {functionname: funcCalled, arguments: [$dbValues, 'blank'] },
   success: function (obj, textstatus)
          {
           if( !('error' in obj) || !('Error' in obj) || !('ERROR' in obj) )
           {
             $yourVariable = obj.result;
              //alert('no errors');
              if(funcName == "updateDB")
              {
              alert(textstatus); //do this only when WRITTING TO DB NOT WHEN READING FROM DB
              }
           }
           else
           {
             //alert(obj.error);
             alert('fuck');
             //console.log(obj.error);
           }
          }
         });
return $yourVariable;
}
////////// END FUNCTION ajax0 /////////////////===================================

//&&&&&&&&&&& END index.js &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&