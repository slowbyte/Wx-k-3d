const All = 1;
const Mornings = 2;
const Middays = 3;
const Evenings = 4;
var ran = 0;

//BEGIN PRIMARY FUNCTIONS FOR LOADING PAGE PP3 ================================================
function PP3Run()
{
    //alert("In PP3Run()");
    objNAVnvpp1form.style.display = "none";
    objNAVnvpp2form.style.display = "none"; // do to form3 when its coded
    currentPPpage = 3;
    objNAVnvmc.style.display = "flex";  
    objNAVnvpp3form.style.display = "grid";
    objNAVnvmct.innerHTML = "EDIT PROFILE (PAGE 3 of 3) PREFERENCES ";
    objNAVnvmcp.innerHTML = "all sections (4) need at least 1 checkbox checked! ";
    objNAVnvmcp.style.color = "red";
    objNAVnvmcp.style.fontStyle = "italic";
          if(nvpp3btncreated == false)
          {          
            PP3createButtons(6);
            nvpp3btncreated = true;
          }
          //alert("done 1");
          if(created2ChkboxesPP3 == false)
          {
            PP3createChkBoxes(1, 21); 
            created2ChkboxesPP3 = true;
          }
          //alert("done 2");

          PP3Fill('gtt', 4, 0, PP3LastDBdata);
          PP3Fill('gss', 3, 1, PP3LastDBdata);
          PP3Fill('grs', 3, 2, PP3LastDBdata);
          PP3Fill('chk', 21, 3, PP3LastDBdata);                  
}



// BEGIN FUNCTION PP3createButtons() //=================================================
function PP3createButtons(numbButtons)
{
  //var btnOk = document.getElementById('btnOK');
 // btnOk.addEventListener("click", butOkClicked); // special OK button in RED Error Dialog

  var i;
  for (i = 1; i <= numbButtons; i++)
   {
    button = (document.createElement('input'));
    button.type = "button";
    button.name = i;
    button.className = "but";
    button.id = "but" + i; 
    if(i <= 4)
    button.addEventListener("click", PP3butClicked);
    else if((i == 5) || (i == 6) )
    {
      button.addEventListener("click", PP3BtnPreOrUpdateClked);
    }

    switch (i) {
      case 1:
        sb1.appendChild(button);
        button.value = "       Chk All         ";
        break;
      case 2:
        sb2.appendChild(button);
        button.value = "Chk All Mornings";
        break;
      case 3:
        sb3.appendChild(button);
        button.value = "Chk All Mid Days";
        break;
      case 4:
        sb4.appendChild(button);
        button.value = "Chk All Evenings";
        break;
      case 5:
        sbPrev.appendChild(button);
        button.value = "<<  Previous";
        break;
      case 6:
        sbNext.appendChild(button);
        button.value = "Update Profile";
        break;
    }
  }
   return;
}
// END FUNCTION PP3createButtons() ==============================================

//BEGIN FUNCTION PP3createChkBoxes() ===========================================
function PP3createChkBoxes(start, numbChBoxes)
 {
  
  var chkBoxCount = 1;
  var i;
  for (i = start; i < (start + numbChBoxes); i++)
  {
    //===============================================================
    var j = i;
    var z = 1;
    for (var k = 1; k <= j - 1; k++) {
      z = z * 2;
    }
    z = z;
    //===============================================================
    var str2 = z;
    var str1 = "chk";
    var str3 = "cnt";

    checkbox = (document.createElement('input'));
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.value = "value";
    checkbox.id = str1.concat(str2);
    checkbox.checked = false;//;
    checkbox.addEventListener("change", PP3chkBoxChanged);
    PP3addChkBox(checkbox, chkBoxCount++);
  }
  return;
}
// END FUNCTION PP3createChkBoxes() ==============================================

// BEGIN FUNCTION PP3FILL() ======================================================
function PP3Fill(idltrs, numbChBoxes, valIndex, values)
{    
  //alert("in PP3Fill / " + PP3LastDBdata[0] + "/" + PP3LastDBdata[1]);
  currentPPpage = 3;
  var binaryNumb = parseInt(values[valIndex]).toString(2);
  //alert("binary = " + binaryNumb);
  var totalValue = 0;
  while(binaryNumb.length < numbChBoxes)
  {
    binaryNumb = '0' + binaryNumb;
  }
 // alert(binaryNumb);
  for (var j = 1; j <= numbChBoxes; j++) {
    var j = j;
    var z = 1;
    for (var k = 1; k <= j - 1; k++) {
      z = z * 2;
    }
    checkBox = document.getElementById(idltrs + z);
    if(binaryNumb[(numbChBoxes) - j] == 1)
    {
      //alert('true: j = ' + j);
       checkBox.checked = true;
    }
    else if(binaryNumb[(numbChBoxes) - j] == 0)
    {
      //alert('false: j = ' + j);
       checkBox.checked = false;
    }
  }  
    return;
}    
// END FUNCTION PP3FILL() ==========================================================
// END PRIMARY FUNCTIONS FOR LOADING PAGE PP3=====================================

// BEGIN PRIMARY FUNCTIONS FOR PP3  PREVIOUS OR UPDATE BUTTON CLICKED =============
//BEGIN FUNCTION PP3BtnPreOrUpdateClked() ========================================
function PP3BtnPreOrUpdateClked() 
{ 
   //Prev or Update Clicked???
   if(this.id == "but6")
   {
     lastProfileButtonPushed = "Update";
   } 
   else if(this.id == "but5")  
   {
     lastProfileButtonPushed = "Previous";  
   }
   //alert(lastProfileButtonPushed);
   document.getElementById('PP3ErrorBox').style.display = "none";
   objnvModal.style.display = "none";
   objNAVnvmc.style.height = objHeightnvmc;
     setTimeout(function()
     { 
        PP3EntriesPresent(); 
     },1000); 
  }
//END FUNCTION PP3BtnPreOrUpdateClked() ========================================

//BEGIN FUNCTION PP3EntriesPresent() ========================================
function PP3EntriesPresent()
{
   // alert("in PP3EntriesPresent()");
     var errorlist = "";
     var validated = true;

     var gametypeSum = PP3sumChkedBoxes('gtt', 4);
     //alert("returned gametypeSum = " + gametypeSum);
      if(gametypeSum == 0)
      { validated = false;
         errorlist = errorlist + "Game Type, ";
        // alert(errorlist);
      }
       // alert(gametypeSum + "/" + errorlist);
      
      var gamestyleSum = PP3sumChkedBoxes('gss', 3);
      //alert("returned gamestyleSum = " + gamestyleSum);
      if(gamestyleSum == 0)
      { validated = false; errorlist = errorlist + "Game Style, ";}
      //alert(gamestyleSum + "/" + errorlist);

     var gamesizeSum = PP3sumChkedBoxes('grs', 3);
      //alert("returned gamesizeSum = " + gamesizeSum);
      if(gamesizeSum == 0)
      { validated = false; errorlist = errorlist + "Game Size, ";}
      //alert(gamesizeSum + "/" + errorlist);

      var availableSum = PP3sumChkedBoxes('chk', 21);
      //alert("returned availableSum = " + availableSum);
      if(availableSum == 0)
      { validated = false; errorlist = errorlist + "When Available";}
     
      var sectionSums = [gametypeSum, gamestyleSum, gamesizeSum, availableSum];
      alert("validated as " + validated + "/" + sectionSums[0] + "/" + sectionSums[1] + "/" + sectionSums[2] + "/" + sectionSums[3] );

      if(validated == true)
      {
        objnvModal.style.display = "none";
        objNAVnvmc.style.height = objHeightnvmc;
        PP3ChkDataChanged();
      }
      else if(validated == false)
      {
        //alert("need to popup  errorbox with errorlist info...");
        document.getElementById('PP3ErrorBox').style.display = "none";       
        data[0] = "ERROR: all sections (4) need at least 1 checkbox checked!";
        data[1] =  "Please Correct..."; 
        data[2] =   errorlist;
        data[3] =   ""; 
        data[4] = "PP3";
        PPxdisplayModal(data);   
        return false;       
    
      }
}
// END FUNCTION PP3EntriesPresent() ========================================

// BEGIN FUNCTION PP3ChkDataChanged() ========================================
function PP3ChkDataChanged()
{
   // alert("chking PP3ChkDataChanged() ");
    var keys = [];
    var newData = [];
    var line = [];
    line[0] =  PP3sumChkedBoxes('gtt', 4);
    //alert("section gtt = " + line[1]);
    line[1] =  PP3sumChkedBoxes('gss', 3);
    //alert("section gss = " + line[2]);
    line[2] =  PP3sumChkedBoxes('grs', 3);
    //alert("section grs = " + line[3]);
    line[3] =  PP3sumChkedBoxes('chk', 21);
    //alert("section chk = " + line[4]);
   
     entryChanged = false;
     $dataTmp = "";
     var index = 0;
     for(var i = 0; i < line.length; i++)  
     {      
       if(line[i] != PP3LastDBdata[i ].trim())
       {              
         $dataTmp = $dataTmp + PP3LastColumns[i]   + "'" + line[i] + "'" + ", ";
         keys[index] = i;
         newData[index] = line[i];
         index++;
         entryChanged = true;         
       }
     }
      var len = $dataTmp.length;
      $dataTmp = $dataTmp.slice(0, len -2);
      //alert("$dataTmp Final = " + $dataTmp); 
     
     if(entryChanged == false)  
     {  //No changes so no update needed!
        //alert("Changed = false; lPBPushed = " + lastProfileButtonPushed);
        objNAVnvpp3form.style.display = "none";
        document.getElementById('PP3ErrorBox').style.display = "none";
       if( lastProfileButtonPushed == "Update")
       {
          alert("finished with last profile page PP3");
       } 
       else if(lastProfileButtonPushed == "Previous")  
      {
          PP2Run();
      }
    }
   else if(entryChanged == true)
   {      
      PP3Update($dataTmp, keys, newData);
   }
}
// END FUNCTION PP3ChkDataChanged() ==========================================

// BEGIN  PP3Update =============================================================================
function PP3Update($dataStr, keys, newData)
{
  alert("in the PP3Update func \n\r" + $dataStr + "\n\r" + keys + "\n\r" + newData);
  if( !(lastProfileButtonPushed == "Update" || lastProfileButtonPushed == "Previous"))
  {
    //alert("In PP2Update w/o Next or Previous clked");
    //return; //we are only allowed to update the dB if "Update or Previous" button clicked got us here.!!!
  } 
     currentPPpage == 3
     
      var dbHost = "localhost";
      //var dbHost = "74.207.235.136";
      var dbUser = "root";
      var dbPwd = "slowbyte1";
      var loggedUser = username;
      var dbName = "cf1";
      var funcName =  "pp3UPDATEwrite";   
      var dBtable = "tblProfilePg2"; 
      var dbValuesToInsert  =  $dataStr;           
      alert("dbValuesToInsert:   "  + dbValuesToInsert);
     
     $dbValues = [dbHost, dbUser, dbPwd, loggedUser, dbName, funcName, username.toLowerCase(), dbValuesToInsert , dbValuesToInsert, dBtable]; 
     alert("dbValues = " + $dbValues);

     setTimeout(function()
    {     
       pp3rtnUpdate = PP3ajax($dbValues);
      // alert(pp3rtnUpdate)

      // ( if ) SUCCESS CODE BEGINS ========================================================================
       //need some kind of chk for success!
   if(pp3rtnUpdate == "success")
   {    
        alert("Success & LBtn Pushed = " + lastProfileButtonPushed );
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
       //Update PP3LastDBdata with just the changes made to the database...
       alert("==== " + PP3LastDBdata);
      // for(i = 1; i < keys.length; i++)
       for(i = 0; i < keys.length; i++)
       {
         PP3LastDBdata[keys[i]]  = newData[i];
         alert("key column name = " + PP3LastColumns[keys[i] ]);
       }
       alert("+++ " + PP3LastDBdata);
        
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
 
         document.getElementById('PP1ErrorBox').style.display = "none";
         document.getElementById('PP2ErrorBox').style.display = "none";
         document.getElementById('PP3ErrorBox').style.display = "none";
         objNAVnvpp2form.style.display = "none";

        if( lastProfileButtonPushed == "Update")
        {
             lastProfileButtonPushed = "NONE"
             alert("Nothing to do past here, all 3 PPx done");             
        }       
        else if( lastProfileButtonPushed == "Previous")
        {
              lastProfileButtonPushed = "NONE"
              PP2Run();
        }
    } 
     // ( if ) SUCCESS CODE ENDS ========================================================================    

       else // UPDATE FAILED...
       {  
        //alert(pp3rtnUpdate);
        //Display Error that email is not available...
        document.getElementById('PP2ErrorBox').style.display = "none";
        //document.getElementById('PP2ErrorBox').style.border = "4px solid red";  

        data[0] = "ERROR: Update Problem; please correct...";
        data[1] =  pp3rtnUpdate ;
        data[2] =  "";
        data[3] =   ""; 
        data[4] = "PP3";
        PPxdisplayModal(data); 
        return false;                               
       }
    }, 2500);
    pp3rtnUpdate = PP3ajax($dbValues);
}
// END  PP2Update =================================================================
// END PRIMARY FUNCTIONS FOR PP3  PREVIOUS OR UPDATE BUTTON CLICKED =============


// BEGIN PP3 HELPER FUNCTIONS =========================================================
function BASE_raised_EXP(base, exp) //this function not used at all; kept here for possible future use...
{
 // for (var j = 1; j <= exp; j++)
  origexp = exp;
   if(exp < 0)
   {
     exp = exp * -1;
   }
    var z = 1;
    for (var k = 1; k <= exp ; k++)
    {
      //alert("begin" + z);
      z = z * base;
      //alert("end" + z);
    }
  //
  if(origexp >=0)
  {
    alert("answer = " + z);
  }
  else
  {
    alert("answer = " + (1/z));
  }
}

// BEGIN FUNCTION PP3addChkBox() ===================================================
function PP3addChkBox(checkbox, id) {

    //alert(id);
    if (id == 1 || id == 9 || id == 17) {
      checkbox.checked = false;
    }
    switch (id) {
      case 1:
        d1.appendChild(checkbox);
        break;
      case 2:
        d2.appendChild(checkbox);
        break;
      case 3:
        d3.appendChild(checkbox);
        break;
      case 4:
        d4.appendChild(checkbox);
        break;
      case 5:
        d5.appendChild(checkbox);
        break;
      case 6:
        d6.appendChild(checkbox);
        break;
      case 7:
        d7.appendChild(checkbox);
        break;
      case 8:
        d8.appendChild(checkbox);
        break;
      case 9:
        d9.appendChild(checkbox);
        break;
      case 10:
        d10.appendChild(checkbox);
        break;
      case 11:
        d11.appendChild(checkbox);
        break;
      case 12:
        d12.appendChild(checkbox);
        break;
      case 13:
        d13.appendChild(checkbox);
        break;
      case 14:
        d14.appendChild(checkbox);
        break;
      case 15:
        d15.appendChild(checkbox);
        break;
      case 16:
        d16.appendChild(checkbox);
        break;
      case 17:
        d17.appendChild(checkbox);
        break;
      case 18:
        d18.appendChild(checkbox);
        break;
      case 19:
        d19.appendChild(checkbox);
        break;
      case 20:
        d20.appendChild(checkbox);
        break;
      case 21:
        d21.appendChild(checkbox);
        break;
    }
  
  }
  // END FUNCTION PP3addChkBox() ===============================================================

// BEGIN FUNCTION PP3sumChkedBoxes() =============================================================
function PP3sumChkedBoxes(idltrs, numbChBoxes)
 {
  var totalValue = 0;
  for (var j = 1; j <= numbChBoxes; j++) 
  {
    var j = j;
    var z = 1;
    for (var k = 1; k <= j - 1; k++) {
      z = z * 2;
    }
    checkBox = document.getElementById(idltrs + z);
    var chkIdStr = checkBox.id;
    //alert(chkIdStr);

    if (checkBox.checked)
    {      
      status = status + checkBox.id + ' = checked ... ';
      var chkIdStr = checkBox.id;
      addNumb = parseInt(chkIdStr.substring(3, chkIdStr.length));
      totalValue = totalValue + addNumb;
      //alert("chkBx is Chked it's value = " + addNumb + " and Total = " + totalValue);
    } 
    else
    {
      status = status + checkBox.id + ' = NOT checked ... ';
      //alert("check box " + j + "not chked");
    }
  }
   /////Is this needed here??? ////// document.getElementById('sumTemp').innerHTML =  totalValue; //// + " STATUS: " + status;
  //alert("Returning " + totalValue)
  return totalValue;
}
// END FUNCTION PP3sumChkedBoxes() =============================================

// BEGIN FUNCTION PP3chkBoxChanged() ============================================
function PP3chkBoxChanged()
{
  //used only to display on PP3 form if "When Available to Play" has changed. Will display new number in the "When Available to Play" area...
  var totalValue = 0;
  var numbChBoxes = 21;
  var idltrs = "chk";
  for (var j = 1; j <= numbChBoxes; j++) 
  {
    var j = j;
    var z = 1;
    for (var k = 1; k <= j - 1; k++) 
    {
      z = z * 2;
    }
    checkBox = document.getElementById(idltrs + z);
    var chkIdStr = checkBox.id;
    //alert(chkIdStr);

    if (checkBox.checked)
    {      
      status = status + checkBox.id + ' = checked ... ';
      var chkIdStr = checkBox.id;
      addNumb = parseInt(chkIdStr.substring(3, chkIdStr.length));
      totalValue = totalValue + addNumb;
    } 
    else
    {
      status = status + checkBox.id + ' = NOT checked ... ';
      //alert("check box " + j + "not chked");
    }
  }
  alert(totalValue);
  document.getElementById('sumTemp').innerHTML =  totalValue; 
}
// END FUNCTION PP3chkBoxChanged() ========================================

// BEGIN FUNCTION PP3setRetrievedCBs() =============================================
function PP3setRetrievedCBs(idltrs, numbChBoxes, valIndex, values)
{
  var binaryNumb = values[valIndex].toString(2);
  var totalValue = 0;
  //alert(binaryNumb);

  while(binaryNumb.length < numbChBoxes)
  {
    binaryNumb = '0' + binaryNumb;
  }
  //alert(binaryNumb);

  for (var j = 1; j <= numbChBoxes; j++) {
    var j = j;
    var z = 1;
    for (var k = 1; k <= j - 1; k++) {
      z = z * 2;
    }
    checkBox = document.getElementById(idltrs + z);
    if(binaryNumb[(numbChBoxes) - j] == 1)
    {
      //alert('true: j = ' + j);
       checkBox.checked = true;
    }
    else if(binaryNumb[(numbChBoxes) - j] == 0)
    {
      //alert('false: j = ' + j);
       checkBox.checked = false;
    }
  }
    return;
}
// END FUNCTION PP3setRetrievedCBs() =========================================

// BEGIN FUNCTION PP3butClicked() ============================================
function PP3butClicked(e) {
  var button = this;

  switch (button.name[0]) {
    case "1":
      if (button.value.trim() == "Chk All") {
        button.value = "      UnChk All        ";
        button.name += "1";
        var butt2 = document.getElementById('but2')
        butt2.value ="UnChk All Mornings";
        var butt3 = document.getElementById('but3')
        butt3.value ="UnChk All Mid Days";
        var butt4 = document.getElementById('but4')
        butt4.value ="UnChk All Evenings";
      } else if (button.value.trim() == "UnChk All") {
        button.value = "       Chk All         ";
        button.name += "0";
        var butt2 = document.getElementById('but2')
        butt2.value ="Chk All Mornings";
        var butt3 = document.getElementById('but3')
        butt3.value ="Chk All Mid Days";
        var butt4 = document.getElementById('but4')
        butt4.value ="Chk All Evenings";
      }
      break;
    case "2":
      if (button.value.trim() == "Chk All Mornings") {
        button.value = "UnChk All Mornings";
        button.name += "1";
      } else if (button.value.trim() == "UnChk All Mornings") {
        button.value = "Chk All Mornings";
        button.name += "0";
      }
      break;
    case "3":
      if (button.value.trim() == "Chk All Mid Days") {
        button.value = "UnChk All Mid Days";
        button.name += "1";
      } else if (button.value.trim() == "UnChk All Mid Days") {
        button.value = "Chk All Mid Days";
        button.name += "0";
      }
      break;
    case "4":
      if (button.value.trim() == "Chk All Evenings") {
        button.value = "UnChk All Evenings";
        button.name += "1";
      } else if (button.value.trim() == "UnChk All Evenings") {
        button.value = "Chk All Evenings";
        button.name += "0";
      }
      break;
    default:
  }
  var butName = button.name[0];
  PP3serviceBtn(button.name)
  button.name = butName;
}
// END FUNCTION PP3butClicked() ========================================

// BEGIN FUNCTION PP3serviceBtn() =======================================
function PP3serviceBtn(butCode) {
  var str1 = "chk";
  var butPressed = butCode[0];
  var butStatus = butCode[1];
  var start = 0;
  var stop = 0;

  switch (butPressed) {
    case "1":
      start = 1;
      stop = 21;
      break;
    case "2":
      start = 1;
      stop = 7;
      break;
    case "3":
      start = 8;
      stop = 14;
      break;
    case "4":
      start = 15;
      stop = 21;
      break;
  }
  for (var j = start; j <= stop; j++) {
    var j = j;
    var z = 1;
    for (var k = 1; k <= j - 1; k++) {
      z = z * 2;
    }
    var id = str1.concat(z);
    //alert("id - " + id);
    checkbox = document.getElementById(id);

    if (butStatus == 1) {
      //alert("chking a chkbox");
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    //alert(checkbox.id  + "   "  + checkbox.checked);
  }
  var totalVal = PP3sumChkedBoxes('chk', 21); // sum for When Avail To Play
  //alert(totalVal);
}
// END FUNCTION PP3serviceBtn() =========================================

// BEGIN FUNCTION PP3ajax() ================= ===========================================
function PP3ajax($dbValues)
{
  //alert("DB fcn =  " +  $dbValues[5]);
  funcCalled = "NONE";

 //PP3 ONLY BELOW ======================================================================
 
  if($dbValues[5] == 'pp3UPDATEwrite')
  {
    funcCalled = "pp3UPDATEwrite";
    //alert("fcnCalled = " + funcCalled);
  }
  //PP3 ONLY ABOVE======================================================================
 
  if(funcCalled == "NONE")
  {
    alert("PP3ajax()  CALLED = NONE\r\nCancelling" );
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
// END FUNCTION PP3ajax() ==========================================================
// END PP3  HELPER FUNCTIONS =============================================================


