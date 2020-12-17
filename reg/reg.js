
var titles = ["First Name", " Last Name", " Username", " Password", " Email" ];  
/////////////////////////////////////////////////var columns = ['firstname', 'lastname', 'username', 'password', 'email'];
////////////////////////////////////////////////var addusercolumns =  "(firstname, lastname, username, password, email, emailorig, usernameorig)";
///////////////////////////////////////////////var colnkeys = ['rfn', 'rln', 'run', 'rup', 'rem'];
//------------------------------------------------------------------------------------
var dbAddress = "localhost";
var dbUser = "root";
var dbPwd = "slowbyte1";
var loggedUser = "slowbyte";
var dbName = "cf1";
var funcName = "";
var $yourVariable = "";

//================= BEGIN regChk4AllEntries() ================================= 
function regChk4AllEntries()
{
//alert("chkallentries now");
var d = new Date(); // d is used in line[8] to get a "membersince" formated date to add to database
var currentDate =  d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() ;  // formated as yyyy-mm-dd
var titles = ['ignore', 'First Name',  ' Last Name', ' Username', ' Password', ' Email']  ;
///////////////////////////////////////////////////var columns = ['ignore', 'firstname', 'lastname', 'username', 'password', 'email'];
var line = [];
line[0] = "userID ... ignore this ";
line[1] = document.getElementById('rfn').value.trim();
line[2] = document.getElementById('rln').value.trim();
line[3] = document.getElementById('run').value.trim();   //usernameorig  /as entered on the reg form dialog....
line[4] = document.getElementById('rup').value.trim();   
line[5] = document.getElementById('rem').value.trim();  //emailorig  /as entered on the reg form dialog....
line[6] = document.getElementById('rem').value.trim().toLowerCase();  //emailorig  /converted to all lowercase
line[7] =document.getElementById('run').value.trim().toLowerCase();    //usernameorig  /converted to all lowercase
line[8] = currentDate;

//now chk if any lines are = "" (not filled in);
//and save which entries are missing if any...
var errors = false;
var errorList = [];
for (var i = 1; i < line.length; i++) 
{
  //alert(line[i]);
  if (line[i] == "")
  {
    errors = true;
    errorList.push(titles[i]);
    //alert(titles[i] + ".." + errorList);
  }
}

if (errors) 
{
  //alert(errorList);
  document.getElementById('modal-content').style.border = "4px solid red";     
  var data = [];
   data[0] = "ERROR: please correct...";
   data[1] =  "All items are required for Registration!<br>The following item(s) need to be filled in ... ";
   data[2] =  errorList;
   data[3] =   "";
  displayModal( data);   
  return;  
}
 else 
 {
  //close any error msg displayed
  objModal.style.display = "none";
  regChkUsernameTaken(line);
  ////regChkEmailTaken(line) ; 
    
 } 
}
//================= END regChk4AllEntries() =========================================

//================= BEGIN regChkUsernameTaken() ===================================
function regChkUsernameTaken(entries)
{
  //alert(entries);
  //var usernameOrig = entries[3]; 
  var dbHost = "localhost";
  //var dbHost = "74.207.235.136";
  var dbUser = "root";
  var dbPwd = "slowbyte1";
  var chk4usertaken =  entries[7];  //usernameOrig.toLowerCase();
  var dbName = "cf1";
  var funcName = "RegSQLrow";
  var dBtable = "tblProfilePg1";
  
  objnvModal.style.display = "none";
    //===============new procedure below for getting back an Ajax* retn value=======================
  //FINALLY WORKS 8/21/2020 AND IT WORKS EXCELLENTLY.... FML

  var retned = null;
  var datax = "";
  var $dbValues = [];
  $dbValues = [dbHost, dbUser, dbPwd,  chk4usertaken, dbName, funcName, dBtable] ;  
  timeout = 1000;  /////THIS NEEDS TO HAVE THE FOR LOOP FIX TO ACCOUNT WHETHER ITS A username OR email TYPE BEING REQUESTED
  var sizeOfExpectedRetn = 16; //FOR USER NAME ITS A 15
        
  setTimeout(function()
    {       
      retned = ajaxReg($dbValues);
      //alert("Username retned = " + retned);
      for(var j = 0; j < sizeOfExpectedRetn;  j++)
      {         
            //datax = datax + ", " + retned[j];      
            datax = datax + "\r\n " + retned[j];    
      }

      if(loopRan == false)   
      {            
          loopRan = true;   
          timeout = 2000;  
          regChkUsernameTaken(entries);
      }
      else
      {        
          //alert(datax);
          loopRan = false;

          if(retned == false || retned == undefined || retned == null || retned == "false" || retned == "undefined" || retned == "null")
          {
            //alert("username   IS available");    
            regChkEmailTaken(entries) ;        
          }
          else if(retned[13] == chk4usertaken)
          {
            //alert("username  " + usernameOrig + " IS NOT available");
            document.getElementById('modal-content').style.border = "4px solid red";    
            document.getElementById('s1').style.color = "red";  
            var data = [];
            data[0] = "ERROR: please correct...";
            data[1] =  "USERNAME TAKEN: <br><br>"+ "username... " + document.getElementById('run').value.trim()  + "  ...is already taken... ";
            //data[1] =  "USERNAME TAKEN: <br><br>"+ "username... " + retned[7]  + "  ...is already taken... ";
            data[2] =  "";
            data[3] =   "";
           displayModal( data);     
          }
      }       
    }, timeout);
    retned = ajaxReg($dbValues);
}
//================= END regChkUsernameTaken() ===================================

//================= BEGIN regChkEmailTaken() ===================================
function regChkEmailTaken(entriesdata) 
{
  //alert(regChkEmail);
  var retned = null;

  var dbHost = "localhost";
  //var dbHost = "74.207.235.136";
  var dbUser = "root";
  var dbPwd = "slowbyte1";
  var chk4emailtaken = entriesdata[6];     //emailOrig.toLowerCase().trim() ... So this item should always be ALL Lower Case;
  var dbName = "cf1";
  var funcName = "RegEMAILrow";  
  var dBtable = "tblProfilePg1";

  objnvModal.style.display = "none";
    //===============new procedure below for getting back an Ajax* retn value=======================
  //FINALLY WORKS 8/21/2020 AND IT WORKS EXCELLENTLY.... FML

  var retned = null;
  var datax = "";
  var $dbValues = [];
  $dbValues = [dbHost, dbUser, dbPwd,chk4emailtaken, dbName, funcName, dBtable] ; 
  //alert("dbvalues = " + $dbValues);
  
  timeout = 1000;  /////THIS NEEDS TO HAVE THE FOR LOOP FIX TO ACCOUNT WHETHER ITS A username OR email TYPE BEING REQUESTED
  var sizeOfExpectedRetn = 16; //FOR USER NAME ITS A 15   

  setTimeout(function()
    {       
      retned = ajaxReg($dbValues);
      for(var j = 0; j < sizeOfExpectedRetn;  j++)
      {                    
            //datax = datax + "\r\n " + retned[j];    
      }

      if(loopRan == false)   
      {            
          loopRan = true;   
          timeout = 2000;           
          regChkEmailTaken(entriesdata);
      }
      else
      {       
          //alert(retned);
          loopRan = false;
           //alert(retned);
          if(retned == false || retned == "false" || retned == undefined || retned === "undefined" || retned === null || retned == "null" )
          {           
            //alert("email   IS available");
            //run next function now....
            regAddNewUser(entriesdata);
          }          
          else if(retned[12] == chk4emailtaken)
          {
            document.getElementById('modal-content').style.border = "4px solid red";    
            document.getElementById('s1').style.color = "red";  
            var data = [];
            data[0] = "ERROR: please correct...";
            data[1] =  "EMAIL TAKEN: <br><br>"+ "email requested " + document.getElementById('rem').value.trim()  + " is already taken... ";
            data[2] =  "";
            data[3] =   "";
           displayModal( data);     
          }
      }       
    }, timeout);
    retned = ajaxReg($dbValues);     
}
//================= END regChkEmailTaken() ===================================


//================ BEGIN FUNCTION regAddNewUser() ====================================
function regAddNewUser(rowvalues)
{
 //alert("regAddNewUser"  + rowvalues  + "///" + rowvalues.length);
var dbAddData1 = "(" ;
for(var i = 1; i < rowvalues.length; i++)
{
   dbAddData1 = dbAddData1 + "'" + rowvalues[i] + "', ";
}

dbAddData1 = dbAddData1.slice(0, dbAddData1.length - 2);
dbAddData1 = dbAddData1 + ")";
//alert("dbAD1 = " + dbAddData1);

  var usernameOrig = document.getElementById('run').value.trim();
  var usernamelowercase = usernameOrig.toLowerCase();
  usernamelowercase = "'" + usernamelowercase + "'";
  funcName = "RegCREATEuser";
  dbAddress = "localhost";
  dbUser = "root";
  dbPwd = "slowbyte1";
  loggedUser = "slowbyte";
  dbName = "cf1";

  dbColumns1 = RegColumns1;
  dbValuesToInsert1 = dbAddData1;
  var dBtable1 = "tblProfilePg1";

  dbColumns2 = RegColumns2;
  dbValuesToInsert2 =  "(" + "'" + usernameOrig.toLowerCase() + "'"  + " , '0',  '0',  '0', '0' )";
  alert(dbValuesToInsert2);
  var dBtable2 = "tblProfilePg2";
  
  var $newData= [];
  $newData = [dbAddress, dbUser, dbPwd, loggedUser, dbName, funcName, usernameOrig, dbColumns1, dbValuesToInsert1, dBtable1,
                        dbColumns2, dbValuesToInsert2, dBtable2];
  alert("newData = " + $newData);

 setTimeout(function()
 {
    //alert("timer went off");
    $retn = ajaxReg($newData);
     //alert("$retn is  = " + $retn);

    if($retn == "false")
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
    //else  if($retn.includes("success"))
    else  if($retn == "success")
    {
      document.getElementById('modal-content').style.border = "4px solid green";
      document.getElementById('s1').style.color = "black";
      var data = [];
         data[0] = "SUCCESS:";
         data[1] =  "Successfully registered new user "+ "'" + $newData[6] + "'";
         data[2] =  "Click the 'Red Cancel Button' to continue & 'Login'.Then \r\n" + 
                          "click on Profile to complete your required 'PROFILE' information";
         data[3] = ""                          ;
        displayModal( data);  //successfully register as a new user
    }
    else
    {
      alert("returned FUBAR");
    }
 },2500);
 ajaxReg($newData);
}

//================ END FUNCTION regAddNewUser() ====================================


//============================BEGIN FUNCTION ajaxReg ===============================================
function ajaxReg($dbValues)
{
  //alert("ajaxReg fcn =  " +  $dbValues[5]);
  funcCalled = "NONE";

  if($dbValues[5] == "RegSQLrow")
  {
    funcCalled = "RegSQLrow";
    //alert(funcCalled);
  }
  else if($dbValues[5] == "RegEMAILrow")
  {
    funcCalled = "RegEMAILrow";
    //alert(funcCalled);
  }
  else if($dbValues[5] == "RegCREATEuser")
  {
    funcCalled = "RegCREATEuser";
    //alert(funcCalled);
  }


  if(funcCalled == "NONE")
  {
    alert("FUNCTION CALLED = NONE\r\nCancelling" );
    return;
  }
   //alert("Ajax FUNCTION CALLED = " + funcCalled);
   //alert("AJAX dbval = " + $dbValues);
	jQuery.ajax({type: "POST", url: "reg/reg.php", dataType: 'json', data: {functionname: funcCalled, arguments: [$dbValues, 'blank'] },
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
              alert('fuck');
						 // console.log(obj.error);
					  }
           }

          });
return $yourVariable;
}
//==================END FUNCTION ajaxREG() ===========================================

