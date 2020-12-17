
var pp1rtnSQL =  ["sql", "sql", "sql"];
var pp1rtnEmail =  ["email", "email", "email"];
var pp1rtnUpdate =  ["update", "update", "update"];


function PP1Run() {
    //alert("PP1run()  ");
    objNAVnvmc.style.display = "flex";
    objNAVnvpp1form.style.display = "flex";
    objNAVnvmct.innerHTML = "EDIT PROFILE PAGE (1 of 3) PREFERENCES ";
    objNAVnvmcp.innerHTML = "all items must be filled in!";
    objNAVnvmcp.style.color = "red";
    objNAVnvmcp.style.fontStyle = "italic";
    if (nvpp1btncreated == false)
    {
       PP1makeBtn();
       nvpp1btncreated = true;    
    }
    //alert( PP123LastColumns);
    //PP1mySQL()  //PP1LastDBdata[] new object available at signin time (11/6/202) negates the need for another signin type call to the database
    PP1Fill(); 
  }

  function PP1makeBtn() {
    //alert("cpp1nxtbtn_1");
    button = (document.createElement('input'));
    button.type = "button";
    button.name = 'pp1next';
    button.className = "butPP1";
    button.id = "nvpp1btnnxt";
    button.value = "NEXT >>";
    button.style.backgroundColor = "grey";  
    nvpp1sbtn.appendChild(button);
    button.addEventListener("click", PP1BtnNxtClked);
  }

  function PP1BtnNxtClked()
 {
    //alert("PP1BtnNxt Clked() ");
    document.getElementById('PP1ErrorBox').style.display = "none";
    lastProfileButtonPushed = "next";
    objnvModal.style.display = "none";
    objNAVnvmc.style.height = objHeightnvmc;
    setTimeout(function()
    { 
       PP1EntriesPresent(); 
    },1000);       
  }


function PP1Fill()
 {  
   // alert("In FillPP1");

    currentPPpage = 1;
    var line1 = document.getElementById('fn');
    var line2 = document.getElementById('ln');
    var line3 = document.getElementById('ci');
    var line4 = document.getElementById('st');
    var line5 = document.getElementById('zc');
    var line6 = document.getElementById('em');
  
    line1.value = "";
    line2.value = "";
    line3.value = "";
    line4.value = "";
    line5.value = "";
    line6.value = "";
  
    setTimeout(function ()
     {
      //new on 11/4/2020 way of doing it
      line1.value = PP1LastDBdata[1].trim();
      line2.value = PP1LastDBdata[2].trim();
      line3.value = PP1LastDBdata[3].trim();
      line4.value = PP1LastDBdata[4].trim();
      line5.value = PP1LastDBdata[5].trim();
      line6.value = PP1LastDBdata[6].trim();// changed 9/4/20 to show dB coln emailorig instead of coln email
    }, 10);
  }
  function PP1EntriesPresent() {
   // alert("In  PP1EntriesPresent()");
    var columns = ['ignore', 'firstname', 'lastname', 'city', 'state', 'zipcode', 'email'];
    var line = [];
    line[0] = "unused-ignore";
    line[1] = document.getElementById('fn').value;
    line[2] = document.getElementById('ln').value;
    line[3] = document.getElementById('ci').value;
    line[4] = document.getElementById('st').value;
    line[5] = document.getElementById('zc').value;
    line[6] = document.getElementById('em').value;
    //now chk if any lines are = "" (not filled in);
    //and save which entries are missing if any...
    var errors = false;
    var errorList = [];
    for (var i = 1; i < line.length; i++) {
      if (line[i] == "") {
        errors = true;
        errorList.push(columns[i] + " ");
      }
    }
    if (errors) {
      //document.getElementById('PP1ErrorBox').style.border = "4px solid red"; 
      var data = [];
      data[0] = "ERROR: please correct...<br>";
      data[1] = "All items are required to be filled in! The following item(s) need to be filled in ... ";
      data[2] = errorList;
      data[3] = "";
      data[4] = "PP1";
      //alert( "ERROR: All items are required for Registration!\n\rThe following item(s) need to be corrected ... <br>" + errorList);
      PPxdisplayModal(data); ///ERROR: All items are required to be filled  in!\n\rThe following item(s) need to be corrected ... <br>" + errorList);
      return;
    }
     else {
      //close any error msg displayed
      objnvModal.style.display = "none";
      objNAVnvmc.style.height = objHeightnvmc;
     //alert("else");
      PP1ZipCodeEntry(line[5]);
    }
  }

  function PP1ZipCodeEntry(zpcd) {
    //alert("chking nvChkPP1ZipCodeEntry();... " + zpcd);
    // alert("Val Entries" + zpcd.length);
    //chk if  (zipcode#) has exactly length 5 and all 5 digits are a number not a letter or... 
    zpcd = zpcd.trim();
    if (zpcd.length > 0 ) 
    {
      if (zpcd.length < 5 || zpcd.length > 5) {
       document.getElementById('PP1ErrorBox').style.border = "4px solid red";
        var data = [];
        data[0] = "ERROR: Zip Code Number Length!";
        data[1] = " Zip Code must be EXACTLY 5 numbers long.";
        data[2] = "Please Correct...";
        data[3] = "";
        data[4] = "PP1";
        PPxdisplayModal(data);
        return false;
      }
    }
    //now are all Zip Code characters  numbers ONLY, if not pop up ERROR msg red box...
    var Err = false;
  
    for (var i = 0; i < zpcd.length; i++) {
      if (zpcd.charCodeAt(i) < 48 || zpcd.charCodeAt(i) > 57) // ERROR... found a non-numeric char....
      {
        Err = true;
      }
    }
    if (Err == true) {
     document.getElementById('PP1ErrorBox').style.border = "4px solid red";
      var data = [];
      data[0] = "ERROR: Zip Code Has NON-NUMBERS!";
      data[1] = "Zip Code must consist of ONLY numbers.<br>Spaces and letters are not allowed!";
      data[2] = "Please Correct...";
      data[3] = "";
      data[4] = "PP1";
      PPxdisplayModal(data);
      return false;
    }
     else
      {
      //close any error msg displayedl 
      objnvModal.style.display = "none";
      objNAVnvmc.style.height = objHeightnvmc;
      isPP1EmailEntryAvail();
     }
  }

  // START EMAIL ==============================================================================
function isPP1EmailEntryAvail() 
{
   //alert("EmailChk");
  //============================================================================
 
    var dbHost = "localhost";
    //var dbHost = "74.207.235.136";
    var dbUser = "root";
    var dbPwd = "slowbyte1";
    //var loggedUser = username.toLowerCase();  //changed 11/5/2020 morning to new method on next line
    var loggedUser = PP2LastDBdata[0];  // using Original username column from database
    var dbName = "cf1";
    var funcName = "pp1EMAILrow";  
    var dBtable = "tblProfilePg1";
    var whichSQL = "email";  //email or "username is OK to use here"
    var findThisEmail = document.getElementById('em').value.trim().toLowerCase();
  
   //alert("who is logged in = " + username);
    //objnvModal.style.display = "none";
    
      //===============new procedure below for getting back an Ajax* retn value=======================
    //FINALLY WORKS 8/21/2020 AND IT WORKS EXCELLENTLY.... FML
    var datax = "";
    $dbValues = [dbHost, dbUser, dbPwd, loggedUser, dbName, funcName, dBtable, whichSQL, findThisEmail] ; 
    //alert($dbValues);
   
     /////THIS NEEDS TO HAVE THE FOR LOOP FIX TO ACCOUNT WHETHER ITS A username OR email TYPE BEING REQUESTED
    var sizeOfExpectedRetn = 20; //FOR USER NAME ITS A 15
    timeout = 1000; 
    setTimeout(function()
      {       
        //pp1rtnSQL = PP1ajax($dbValues);
        //alert("setTOut = ");
        for(var j = 0; j < sizeOfExpectedRetn;  j++)
        {         
              datax = datax + "\r\n " + pp1rtnEmail[j];    
        }
  
        if(loopRan == false)   
        {            
            loopRan = true;   
            timeout = 2000;  
            //alert(" isPP1EmailEntryAvail() fcn being called 2nd time now")   ;
            isPP1EmailEntryAvail(); 
        }
        else
        {    
            //alert("2nd call has returned here, good");            
            loopRan = false;
            //alert("datax = " + datax);
            //alert(pp1rtnEmail);
            if (pp1rtnEmail == "BeingUsed")
            {
              PP1ChkDataChanged("BeingUsed");
             //Display Error that email is not available...
             PP1ChkDataChanged = "BeingUsed";
            document.getElementById('PP1ErrorBox').style.border = "4px solid red";
             var data = [];
             data[0] = "ERROR: Chosen Email Is NOT Available!";
             data[1] = "You must request a unique Email that no other member is using!";
             data[2] = "Please Correct...";
             data[3] = "";
             data[4] = "PP1";
             PPxdisplayModal(data);
            /////// return false;
           }
            else if (pp1rtnEmail == "Not  Used")                 // && lastProfileButtonPushed == "next")  
           {
             //alert("Not  Used from Email Fcn");
             //alert("end of Email Chk is "NotUsed" Calling CHK DATACHANGE");
             PP1ChkDataChanged("Not  Used");
           }
           else if (pp1rtnEmail == "IOwnEmail" )             // && lastProfileButtonPushed == "profile")  
           {
            //alert("IOwnEmail from Email Fcn");
            // alert("end of Email Chk @ IOE Calling CHK DATACHANGE fcn");
            PP1ChkDataChanged("IOwnEmail");        
           }
           else
           {
            PP1ChkDataChanged("else FUBAR");
            //alert("Error PHP = FUBAR");
            //nvChkPP1ForDataChanged();
            //return;  // what happens if we are here ????
           }                   
        } //end of main else...       
      }, timeout);
      pp1rtnEmail = PP1ajax($dbValues);  
}
// END EMAIL=======================================================================================

// BEGIN CHK FOR DATA CHANGED =======================================================================
function PP1ChkDataChanged(emailChkedStatus)
 {
  //alert("In PP1ChkDataChanged() = " + emailChkedStatus);
  line[0] = "no entry";
  line[1] = document.getElementById('fn').value.trim();
  line[2] = document.getElementById('ln').value.trim();
  line[3] = document.getElementById('ci').value.trim();
  line[4] = document.getElementById('st').value.trim();
  line[5] = document.getElementById('zc').value.trim();
  line[6] = document.getElementById('em').value.trim();
  line[7] = line[6].toLowerCase();

  entryChanged = false;

  for (var i = 1; i < (line.length -1); i++)
  {
    if(line[i] !== PP1LastDBdata[i]);
     {
      entryChanged = true;   
    }
  }
  //alert("chk for changed = " + entryChanged);
  if(entryChanged == false && emailChkedStatus == "IOwnEmail" )
  {
    //alert("FALSE but have to save changes to dB; IOwnEmail ");
    //alert("end Chk Datachange? @ false & IOE");
    //PP1Update(line, emailChkedStatus); //noting has changed in PP1 entries no need to Update page PP1 entries go to PP2 page entries
    //NO NEED TO UPDATE JUST GO TO NEXT PP2 page
    PP2Run();  //onwards to PP2 page 2 entries
  }

  else if (entryChanged == false)
   {
    //alert("real entry changed == false");
    objNAVnvpp1form.style.display = "none";   // just added 9/30/2020
    PP2Run();  //onwards to PP2 page 2 entries
  }
   else if (entryChanged == true) {
   // alert("TRUE & have to save changes to dB");
    //alert("end Chk Datachange? @ true");
    PP1Update(line, emailChkedStatus);  // have to update to database PP1 entries because 1 or more have been modified by user
  }
}
// END CHK FOR DATA CHANGED =======================================================================

// BEGIN UPDATE dBASE ==============================================================================
function PP1Update(entries, emailcurrentstatus)
 {
  //alert("in the PP1Update func");
  if(lastProfileButtonPushed != "next")
  {
    alert("In PP1Update w/o Next clked");
    // return //we are only allowed to update the dB if "next" button pushed got us here.!!!
    PP2Run();  //onwards to PP2 page 2 entries
  }
   

  $dataStr = "";
  $tmpStr = "";
  for (var j = 1; j < PP1LastColumns.length; j++) {
    $dataStr = $dataStr + PP1LastColumns[j] + "'" + entries[j] + "'" + ", "; //WORKS OK FINALLY
  }
  var len = $dataStr.length;
  $dataStr = $dataStr.slice(0, len - 2); //remove last "," in $dataStr array" because it is not needed and cud case problem in the database...
  //alert($dataStr);
  var dbHost = "localhost";
  //var dbHost = "74.207.235.136";
  var dbUser = "root";
  var dbPwd = "slowbyte1";
  var loggedUser = PP2LastDBdata[0];
  var dbName = "cf1";
  var funcName = "pp1UPDATEwrite";
  var dBtable = "tblProfilePg1";
  var dbValuesToInsert = $dataStr; 
  //alert(dbValuesToInsert);

  $dbValues = [dbHost, dbUser, dbPwd, loggedUser, dbName, funcName, PP2LastDBdata[5], dbValuesToInsert, dbValuesToInsert, dBtable];
  ////alert("Update dbValues = " + $dbValues);

  setTimeout(function () 
  {
    pp1rtnUpdate = PP1ajax($dbValues);
    //alert("retn = " + pp1rtnUpdate);
    //need some kind of chk for success!
    if (pp1rtnUpdate === "success")
     {
      ////alert("update was successful");
      dataBaseUpdated = true;
      // 1- Save present PP1LastDBdata to PP1PriorDBdata = [];
      // 2 - now change   PP1LastDBdata[] to updated row data 
      
     //// alert("0- pp1Prior = " + PP1PriorDBdata);
     ////alert("0a- pp1Prior = " + PP123PriorDBdata);
      PP1PriorDBdata = PP1LastDBdata;
      ////alert("1- pp1Prior = " + PP1PriorDBdata);
      
          for (var i = 1; i < PP1LastColumns.length; i++) 
          {                     
               PP1LastDBdata[i] = entries[i];
               PP123LastDBdata[i] = entries[i];
          }
          ////alert("2- PP1LastDBdata = " + PP1LastDBdata)
          ////alert("3- PP123LastDBdata = " + PP123LastDBdata)
      document.getElementById('PP1ErrorBox').style.display = "none";
      document.getElementById('PP2ErrorBox').style.display = "none";
      document.getElementById('PP3ErrorBox').style.display = "none";
      objNAVnvpp1form.style.display = "none";
      PP2Run();  //on to PP2 page Entries
    } 
    else
     {
      //alert("else");   // alert("emailcurrentstatus");
       if(emailcurrentstatus != "IOwnEmail  from Update Fcn");
       {
      // alert(pp1rtnUpdate);
     document.getElementById('PP1ErrorBox').style.border = "4px solid red";
      var data = [];
      data[0] = "ERROR: Update Problem; please correct...";
      data[1] = pp1rtnUpdate;
      data[2] = "";
      data[3] = "";
      data[4] = "PP1";
      PPxdisplayModal(data);
      return false;
     }
    }
    // nvLoadPP2();
    //alert(pp1rtnUpdate[1]);nvLoadPP2();
  }, 2500);
   pp1rtnUpdate = PP1ajax($dbValues);
   }

// END UPDATE dBASE ================================================================================

//BEGIN FUNCTION PP1ajax() ================= ===========================================
function PP1ajax($dbValues)
{
  //alert("DB fcn =  " +  $dbValues[5]);
  funcCalled = "NONE";

 //PP1 ONLY BELOW ======================================================================
 if($dbValues[5] == 'pp1SQLrow')       
  {
    funcCalled = "pp1SQLrow";
    //alert("fcnCalled = " + funcCalled);
  }

  else if($dbValues[5] == 'pp1EMAILrow')       
  {
    funcCalled = "pp1EMAILrow";
    //alert("fcnCalled @ PP1ajax() = " + funcCalled);
  }

  else if($dbValues[5] == 'pp1UPDATEwrite')
  {
    funcCalled = "pp1UPDATEwrite";
   // alert("fcnCalled = " + funcCalled);
  }
  //PP1 ONLY ABOVE======================================================================

  if(funcCalled == "NONE")
  {
    alert("AjaxtesDBt FUNCTION CALLED = NONE\r\nCancelling" );
    return;
  }
   //alert("Ajax FUNCTION CALLED = " + funcCalled);
   //alert("AJAX dbval = " + $dbValues);
	jQuery.ajax({type: "POST", url: "nvpp1/testDB.php", dataType: 'json', data: {functionname: funcCalled, arguments: [$dbValues, 'blank'] },
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
						  //console.log(obj.error);
					  }
           }
          });
return $yourVariable;
}   
// END FUNCTION PP1ajax() ===================================================================