  var pp2btncreated = false;
  var data = [];

  function PP2Run()
{
    //alert("in PP2Run()");
    objNAVnvpp1form.style.display = "none"; // do to form3 when its coded    
    currentPPpage = 2;
    objNAVnvmc.style.display = "flex";
    objNAVnvpp2form.style.display = "flex";
    objNAVnvmct.innerHTML = "EDIT PROFILE (PAGE 2 of 3) PREFERENCES ";
    objNAVnvmcp.innerHTML = "all items must be filled in! ( except Phone Number which is Optional )";
    objNAVnvmcp.style.color = "red";
    objNAVnvmcp.style.fontStyle = "italic";

       if(pp2btncreated == false)
       {
         PP2makeBtn();
         pp2btncreated = true;
       }
     
      PP2Fill() ;
 }

function PP2makeBtn() 
{
  //alert("cpp2nxt");
  button = (document.createElement('input'));
  button.type = "button"; 
  button.name = 'pp2next';  
  button.className = "butPP2";
  button.id = "nvpp2btnnxt";
  button.value = "NEXT >>";
  button.style.backgroundColor = "grey";
  nvpp2sbtn.appendChild(button);
  button.addEventListener("click", PP2BtnPreNxtClked);

  buttonPrv = (document.createElement('input'));
  buttonPrv.type = "button"; 
  buttonPrv.name = 'pp2previous';  
  buttonPrv.className = "butPP2";
  buttonPrv.id = "nvpp2btnprv";
  buttonPrv.value = "<< PREVIOUS";
  buttonPrv.style.backgroundColor = "grey";
  nvpp2sbtp.appendChild(buttonPrv);
  buttonPrv.addEventListener("click", PP2BtnPreNxtClked);
}
function PP2BtnPreNxtClked() //NEXT or PREVIOUS CLICKED @ PP2 page
{
   //alert("PP2 Nxt Clked() "); 
   //Prev or Nxt Clicked???
   if(this.id == "nvpp2btnnxt")
   {
     lastProfileButtonPushed = "Next";
   } 
   else if(this.id == "nvpp2btnprv")  
   {
     lastProfileButtonPushed = "Previous";  
   }
   document.getElementById('PP2ErrorBox').style.display = "none";
   objnvModal.style.display = "none";
   objNAVnvmc.style.height = objHeightnvmc;
     setTimeout(function()
     { 
        PP2EntriesPresent(); 
     },1000); 
  }
     
        
    


function PP2Fill() 
{
  alert("in PP2Fill ");
  currentPPpage = 2;
  var line1 = document.getElementById('unt');
  var line2 = document.getElementById('pwt');
  var line3 = document.getElementById('pnt');
  var line4dm = document.getElementById('pp2chk1');
  var line4plyr = document.getElementById('pp2chk2');
  var line5 = document.getElementById('byt');
 // alert("FillPP2_2");
  line1.value = "";
  line2.value = "";
  line3.value = "";
  line4dm.checked = false;
  line4plyr.checked = false;
  line5.value = ""; 

  setTimeout(function() 
  {  
  var DMPlyrNumb = 0;

  DMPlyrNumb =PP2LastDBdata[3];  //DM
  if(DMPlyrNumb == 1)
  {
    line4dm.checked = true;
  }
  else if(DMPlyrNumb == 2)
  {
    line4plyr.checked = true;
  }
  else if(DMPlyrNumb == 3)
  {
    line4dm.checked = true;
    line4plyr.checked = true;
  }

  
  line1.value =PP2LastDBdata[0].trim(); // userOrig
  line2.value =PP2LastDBdata[1].trim();  //pwd
  line3.value =PP2LastDBdata[2].trim();  //phone#
  DMPlyrNumb =PP2LastDBdata[3];  //DM
  line5.value =PP2LastDBdata[4].trim(); // birthday

  if(lastProfileButtonPushed == "profile")
  {
   //alert("stopped end of FILL PP2");
  }
  }, 100);
}

function PP2EntriesPresent()
{
  alert("in  PP2EntriesPresent()");  
  var columns = [ 'ignore', 'username', 'password', 'phonenumber', 'dm &/or player', 'birthyear' ];
  //alert((document.getElementById('pp2chk1').checked == false && document.getElementById('pp2chk2').checked == false));
  //get value for checkboxes at dm/player first...
  dmplyr = "entry present";
  if((document.getElementById('pp2chk1').checked == false && document.getElementById('pp2chk2').checked == false))
 {
   dmplyr = "";
 }
//alert("position 1");
  var line = [];
  line[0] = "unuse-ignore";
  line[1] = document.getElementById('unt').value;
  line[2] = document.getElementById('pwt').value;
  line[3] = document.getElementById('pnt').value;
 // alert("position 2");
  line[4] = dmplyr;
  //alert("position 3");
  line[5] = document.getElementById('byt').value;

  //now chk if any lines are = "" (not filled in);
  //and save which entries are missing if any...
 var errors = false;
 var errorList = []; 
  for(var i = 1; i < line.length; i++)
  {
    //alert("position 3a ... i = " + i + "..." + line[i] + "..." + errors);
      if (line[i] == "")
      
        {  
          if(( i != 3))
          {
            //alert("position 4... i = " + i);
          errors = true;
          errorList.push(columns[i] + " ");
          }
        }      
  }
  if(errors)
  {   
   //document.getElementById('nvmodal-content').style.border = "4px solid red";   
   document.getElementById('PP2ErrorBox').style.display = "none";  
   //document.getElementById('PP2ErrorBox').style.border = "4px solid red";    

    data[0] = "ERROR: please correct...";
    data[1] =  "All items are required to be filled in! The following item(s) need to be filled in ... ";
    data[2] =  "error(s) @: " + errorList;
    data[3] =   ""; 
    data[4] = "PP2";
   // nvdisplayModal(data);
   PPxdisplayModal(data);   
    return false;      
  }
  else
  {
    //close any error msg displayed
    objnvModal.style.display = "none";
    objNAVnvmc.style.height = objHeightnvmc;
    PP2PhoneNumber(line[3]);   
  }
}

function PP2PhoneNumber(phonenum)
{  
  //alert("In Phone #");
    //chk if  (zipcode#) has exactly length 5 and all 5 digits are a number not a letter or... 
    if(phonenum == "")
    {
      //alert("No Phone Number so DONE")
      PP2ChkDataChanged()
    }
    else
    {
    phonenum = phonenum.trim();
    if(phonenum.length > 0)
    {
        if(phonenum.length < 10 || phonenum.length > 10)
         {    
          document.getElementById('PP2ErrorBox').style.display = "none";
          //document.getElementById('PP2ErrorBox').style.border = "4px solid red";  
            
            data[0] = "ERROR: Phone Number Length!";
            data[1] = "Phone Number must be EXACTLY 10 numbers long.";  
            data[2] =  "Please Correct...";
            data[3] =   ""; 
            PPxdisplayModal(data);   
            return false;           
         }
     }
    //now are all Phone Number characters  numbers ONLY, if not pop up ERROR msg red box...
var Err = false;

    for ( var i = 0; i < phonenum.length; i++)
    {
       if( phonenum.charCodeAt(i)  <  48 ||  phonenum.charCodeAt(i)  > 57) // ERROR... found a non-numeric char....
       {
           Err = true;
       }       
    }
    if(Err == true)
    {    
          document.getElementById('PP2ErrorBox').style.display = "none";
          //document.getElementById('PP2ErrorBox').style.border = "4px solid red";  

          data[0] = "ERROR: Phone Number Has NON-NUMBERS!";
          data[1] =  "Phone Number must consist of ONLY numbers. Spaces and letters are not allowed!"; 
          data[2] =  "Please Correct...";
          data[3] =   ""; 
          PPxdisplayModal(data);   
          return false;                  
    } 
    else
    {
       //close any error msg displayedl 
       objnvModal.style.display = "none";
       objNAVnvmc.style.height = objHeightnvmc;
       PP2ChkDataChanged();         
    }
  }
  }

function PP2ChkDataChanged()
{
   // alert("chking PP2ChkDataChanged() ");
   /* var keys = [1, 3, 4];
    var values = ["newPWD", 3, "1949"];
    for( i = 0; i < keys.length; i++)
    {
      alert(PP2LastDBdata[keys[i]] + " ... " + PP2LastDBdata[2]);
        PP2LastDBdata[keys[i]]  =  values[i];
      alert(PP2LastDBdata[keys[i]] + " ... " + PP2LastDBdata[2]);

    }
    return;
    */
    var keys = [];
    var newData = [];
    var line = [];
    line[0] = document.getElementById('pwt').value.trim();
    line[1] = document.getElementById('pnt').value.trim();
    line[2] = calcDMPlyrValue();      //document.getElementById('dmt').value.trim();
    line[3] = document.getElementById('byt').value.trim();  // old values line[11] = document.getElementById('byt').value.trim();
   
     entryChanged = false;
     $dataTmp = "";
     var index = 0;
     for(var i = 0; i < line.length; i++)  
     {
       if(line[i] != PP2LastDBdata[i].trim())
       {       
        //////////// alert(line[i]  + " ....." + PP2LastDBdata[i].trim());        
         $dataTmp = $dataTmp + PP2LastColumns[i]   + "'" + line[i] + "'" + ", ";
         keys[index] = i;
         newData[index] = line[i];
         index++;
         entryChanged = true;
         //alert($dataTmp);
       }
     }
    /*  // alert(keys.length + "/" + newData.length);
     for(j = 0; j <keys.length; j++)
     {
          alert(keys[j] + "/" + newData[j])
     }
     return;
     */
     var len = $dataTmp.length;
      $dataTmp = $dataTmp.slice(0, len -2);
      //alert("$dataTmp Final = " + $dataTmp); 
     

    /* for(var i = 1; i < line.length; i++)   ORIG PRE- 11/23/2020
     {
       if(line[i] != PP2LastDBdata[i].trim())
       {       
         alert(line[i]  + " ....." + PP2LastDBdata[i].trim());
         entryChanged = true;
       }
     }*/

     if(entryChanged == false)
     {
       alert("Changed = false;lPBPushed = " + lastProfileButtonPushed);
       //alert("NO CHANGES so on to: PP3Run() or back to PP1Run();");
        objNAVnvpp2form.style.display = "none";
        document.getElementById('PP2ErrorBox').style.display = "none";
       if( lastProfileButtonPushed == "Next")
       {
          PP3Run();
       } 
       else if(lastProfileButtonPushed == "Previous")  
      {
          PP1Run();
      }
    }
   else if(entryChanged == true)
   {
      //alert("have to save changes to dB");
      PP2Update($dataTmp, keys, newData);
   }
}

// BEGIN  PP2Update =============================================================================
function PP2Update($dataStr, keys, newData)
{
  alert("in the PP2Update func... " + $dataStr + "/" + keys + "/"  + newData);  
  if( !(lastProfileButtonPushed == "Next" || lastProfileButtonPushed == "Previous"))
  {
    //alert("In PP2Update w/o Next or Previous clked");
    //return; //we are only allowed to update the dB if "next or previous" button clicked got us here.!!!
  } 
     currentPPpage == 2
     
      var dbHost = "localhost";
      //var dbHost = "74.207.235.136";
      var dbUser = "root";
      var dbPwd = "slowbyte1";
      var loggedUser = username;
      var dbName = "cf1";
      var funcName =  "pp2UPDATEwrite";       
      var dBtable = "tblProfilePg1"; 
      var dbValuesToInsert  =  $dataStr; 
      //alert("dbValuesToInsert:   "  + dbValuesToInsert);
     
     $dbValues = [dbHost, dbUser, dbPwd, loggedUser, dbName, funcName, username.toLowerCase(), dbValuesToInsert , dbValuesToInsert, dBtable]; 
    // alert("dbValues = " + $dbValues);

     setTimeout(function()
    {     
       pp2rtnUpdate = PP2ajax($dbValues);
      // alert(pp2rtnUpdate)

      //SUCCESS CODE BEGINS ========================================================================
       //need some kind of chk for success!
   if(pp2rtnUpdate == "success")
   {    
        alert("Success & LBtn is Pushed = " + lastProfileButtonPushed );
       //Save present PP2LastDBdata b4 updating to PP2PriorDBdata for "JUST IN CASE"
    
      /* var $PP2PriorOrig = "";
       for(j = 0; j < PP2LastDBdata.length; j++)
       {
        $PP2PriorOrig =  $PP2PriorOrig + PP2PriorDBdata[j] + " ... ";
       }
       alert("PriorOrig: " + $PP2PriorOrig);

       var $PP2Lastx = "";
       for(j = 0; j < PP2LastDBdata.length; j++)
       {
        //$PP2Prior =  $PP2Prior + PP2PriorDBdata[j] + " ... ";
        $PP2Lastx =  $PP2Lastx + PP2LastDBdata[j] + " ... ";
       }
       alert("Lastx: " + $PP2Lastx)
      

       PP2PriorDBdata = PP2LastDBdata;
       var $PP2Priorx = "";
       for(j = 0; j < PP2LastDBdata.length; j++)
       {
        //$PP2Prior =  $PP2Prior + PP2PriorDBdata[j] + " ... ";
        $PP2Priorx =  $PP2Priorx + PP2PriorDBdata[j] + " ... ";
        
       }
       alert("Priorx: " + $PP2Priorx)
       */
       //Update PP2LastDBdata with just the changes made to the database...
       alert("--- " + PP2LastDBdata);
       for(i = 0; i < keys.length; i++)
       {
         PP2LastDBdata[keys[i]]  = newData[i];
         alert("i = ") + i + "/" + keys[i] + "/" + newData[i];
       }
       alert("+ " + PP2LastDBdata);
        
      /* var $PP2Prior = "";
       var $PP2Last = "";
       for(j = 0; j < PP2LastDBdata.length; j++)
       {
        $PP2Prior =  $PP2Prior + PP2PriorDBdata[j] + " ... ";
        //$PP2Last =  $PP2Last + PP2LastDBdata[j] + " ... ";
       }
       for(j = 0; j < PP2LastDBdata.length; j++)
       {
        //$PP2Prior =  $PP2Prior + PP2PriorDBdata[j] + " ... ";
          $PP2Last =  $PP2Last + PP2LastDBdata[j] + " ... ";
       }
       alert($PP2Prior + "\r\n" + $PP2Last + "\r\n" + $PP2Lastx + "\r\n" + $PP2Priorx + "\r\n" + $PP2PriorOrig);
       */
       //return;
 
         document.getElementById('PP1ErrorBox').style.display = "none";
         document.getElementById('PP2ErrorBox').style.display = "none";
         document.getElementById('PP3ErrorBox').style.display = "none";
         objNAVnvpp2form.style.display = "none";

        if( lastProfileButtonPushed == "Next")
        {
             lastProfileButtonPushed = "NONE"
             PP3Run();
        }       
        else if( lastProfileButtonPushed == "Previous")
        {
              lastProfileButtonPushed = "NONE"
              PP1Run();
        }
    }
     //SUCCESS CODE ENDS ========================================================================    

       else
       {  
        //alert(pp2rtnUpdate);
        //Display Error that email is not available...
        document.getElementById('PP2ErrorBox').style.display = "none";
        //document.getElementById('PP2ErrorBox').style.border = "4px solid red";  

        data[0] = "ERROR: Update Problem; please correct...";
        data[1] =  pp2rtnUpdate ;
        data[2] =  "";
        data[3] =   ""; 
        data[4] = "PP2";
        PPxdisplayModal(data); 
        return false;                               
       }
    }, 2500);
    pp2rtnUpdate = PP2ajax($dbValues);
}
// END  PP2Update ==========================================================================

 function calcDMPlyrValue()
 {
  dmObjState = document.getElementById('pp2chk1').checked;
  plyrObjState = document.getElementById('pp2chk2').checked;
  DMPlyrValue = 0;
  if(dmObjState == true)
  {
     DMPlyrValue = DMPlyrValue +1;
  }
  if(plyrObjState == true)
  {
    DMPlyrValue = DMPlyrValue + 2;
  }
  return DMPlyrValue;
 }
  
  ///////////////////////////////////////////////////BEGIN special test on returning both tables full data with one sql call//////////////////////////////////////////
   function returnBothTablesrow()
   {
    var dbHost = "localhost";
    //var dbHost = "74.207.235.136";
    var dbUser = "root";
    var dbPwd = "slowbyte1";
    var loggedUser = username.toLowerCase();
    var dbName = "cf1";
    var funcName = "dblTables";  
    var dBtable1 = "tblProfilePg1";
    var dBtable2 = "tblProfilePg2";
    
    var retnBothTbls = [];
    var datax = "";
    $dbValues = [dbHost, dbUser, dbPwd, loggedUser, dbName, funcName, dBtable1, dBtable2] ; 
    //alert($dbValues);
    var sizeOfExpectedRetn = 22; //FOR BOTH TABLES
   
    timeout = 1000; 
    setTimeout(function()
      {       
        retnBothTbls = PP2ajax($dbValues);
        for(var j = 0; j < sizeOfExpectedRetn;  j++)
        {         
              //datax = datax + ", " +pp1rtnSQL[j];      
              datax = datax + "\r\n " + retnBothTbls[j];    
        }
  
        if(loopRan == false)   
        {            
            loopRan = true;   
            timeout = 2000;          
            returnBothTablesrow();
        }
        else
        {    
          
            loopRan = false; 
            alert(datax);          
            //alert( retnBothTbls[13] + " ... " + retnBothTbls[0]);
            retnBothTbls = null;                        
        }       
      }, timeout);
      retnBothTbls = PP2ajax($dbValues);
  }  

   
  ///////////////////////////////////////////////////END special test on returning both tables full data with one sql call///////////////////////////////////////////////
//BEGIN FUNCTION PP2ajax() ================= ===========================================
function PP2ajax($dbValues)
{
  //alert("DB fcn =  " +  $dbValues[5]);
  funcCalled = "NONE";

 //PP2 ONLY BELOW ======================================================================
  if($dbValues[5] == 'pp2UPDATEwrite')
  {
    funcCalled = "pp2UPDATEwrite";
    //alert("fcnCalled = " + funcCalled);
  }
  //PP2 ONLY ABOVE======================================================================
 
  if($dbValues[5] == 'dblTables') 
  {
    funcCalled = "dblTables";
   //alert("fcnCalled = " + funcCalled);
  }
 

  if(funcCalled == "NONE")
  {
    alert("PP2ajax()  CALLED = NONE\r\nCancelling" );
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
// END FUNCTION PP2ajax() ===================================================================

  
  
