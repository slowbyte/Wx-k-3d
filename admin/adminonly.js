
function adminstuffclicked( )
{
   displayDropbox(true);
}

function displayDropbox($true_false)
{ 
   var grid2 =  document.getElementById('grid2');
   if($true_false == true) 
   {      
      grid2.style.display = "grid";
   }
   else if($true_false == false)
   {
    grid2.style.display = "none";
   }
}

function showDropDwn1Choice()
{
   var theSelect1 = demoForm1.demoSelect1;
   displayDropbox(false) 
   var selectedIndex1Num = theSelect1.selectedIndex;
   
   switch(selectedIndex1Num)
   {
    case 0:
      // do nothing it's just "select"
      break;
    case 1:
      // SESSION cookies
      displaySessionCookies(true);
      break;
    case 2:
        // 2nd Admin Choice
        display2ndAdminChoice(true);
        break;
    case 3:
        // 3rd Admin Choice
        break;
    case 4:
            // 4th Admin Choice
            break;
    case 5:
            // 5th Admin Choice
            break;
    default:
      // throw some kind of ERROR msg...
  }
}
function showDropDwn2Choice()
{
  //alert("ShowDropDwn2Choice_1");
   var theSelect2 = demoForm2.demoSelect2;
   displayDropbox(false) 
   var selectedIndex2Num = theSelect2.selectedIndex;
   //alert("ShowDropDwn2Choice_2" + theSelect2 );
   result = document.getElementById('ain1');

   switch(selectedIndex2Num)
   {
    case 0:
      // do nothing it's just "select"
      break;
    case 1:
      // SESSION cookies
      //displaySessionCookies(true);
     
      //alert("got choice username");
      result.value = "username";  //
      break;
    case 2:
      result.value = "sessionid1"
;        break;
    case 3:
      result.value = "sessionid2"
        break;
    case 4:
            // 4th Admin Choice
            break;
    case 5:
            // 5th Admin Choice
            break;
    default:
      // throw some kind of ERROR msg...
  }
}

function displaySessionCookies($true_false)
{
    if($true_false == true)
    {
        //alert("displaySessionCookies(true) ");
        var objSessionCookies = document.getElementById('adminScookies'); 
        objSessionCookies.style.display = "flex";
        objSessionCookies.style.width = 400;
        //alert("createbuttons1");
        //createSetGetButtons();
        //alert("createbuttons3");
    } 
    else if ($true_false == false)  
    {
        alert("displaySessionCookies(false) ");
    }
}


function createSetGetButtons()
{
//Create Admin Set Button
//============================
buttonSET = (document.createElement("BUTTON"));
buttonSET.type = "button";
buttonSET.name = 'butset';
buttonSET.className = "butSet";
buttonSET.id = "butset";
buttonSET.value = "SET";
//button.style.backgroundColor = "white";
buttonSET.addEventListener("click", butSetGetClicked);        //butsubmitClicked);
buttonSET.style.width = "110px";
buttonSET.innerHTML = "Set Value";
//alert("createbuttons2b");
aset.appendChild(buttonSET);

//Create Admin Get Button
//============================
buttonGET = (document.createElement("BUTTON"));

buttonGET.type = "button";

buttonGET.name = 'butget';
buttonGET.className = "butGet";

buttonGET.id = "butget";
buttonGET.value = "GET";
//button.style.backgroundColor = "white";
buttonGET.style.width = "110px";
buttonGET.addEventListener("click", butSetGetClicked);
buttonGET.innerHTML = "Get Value";
//alert("createbuttons2d");
aget.appendChild(buttonGET);
}
//=====================================================================

//===================== BEGIN FUNCTION butSetGetClicked() ===========================================
function butSetGetClicked()
{
  //alert("butsetgetclked");

  //get inputs
  $SESSIONtitle = document.getElementById('ain1').value;
  $SESSIONvalue =  document.getElementById('ain2').value;

 // alert("which cookie do we need = " + SESSIONname);

  if(this.name  == "butset")
  {
      //alert("IN SET cookieValue = " +  $SESSIONvalue);
      var values = [$SESSIONtitle, $SESSIONvalue, "AsetSESSIONcookie"];
      //alert(values);
      AsetSESSIONcookie(values);  
     // alert("returned from talking to PHP") ;
      return;   
  }  
  
  else if(this.name == "butget")
  {
     //alert("AbutGetClicked = Yeap GET is the choice!");
     var values = [$SESSIONtitle, "blank", "getSESSIONcookie"];
     //alert("values = " + values);
     AgetSESSIONcookie(values);
     //alert("returned back to AbutGetCliked");
     return;
  }
}
//================== END butSetGetClicked() =========================================

//======================== BEGIN FUNCTION  AsetSESSIONcookie() ======================= 
function AsetSESSIONcookie(passedArray)
{
  //alert("IN AsetSESSIONcookie");
  
 // funcName = fName;
  //$values = [cookieName, blank , funcName] ;
   //alert($dbValues);
 var result = document.getElementById('ain3');
result.value = "";  //blank out resultbox till new one comes in...

  setTimeout(function()
  {
   //alert("setTimeout1");
   retn = ajaxA(passedArray);
   //alert(retn);
   result.value = retn;
    //alert("Admin code using = " + retn);
  }, 3000);
  ajaxA(passedArray);
  ajaxA(passedArray);
}
//================== END AsetSESSIONcookie() =========================================

//======================== BEGIN FUNCTION  AgetSESSIONcookie() ======================= 
function AgetSESSIONcookie(passedArray)
{
  //alert("IN AgetSESSIONcookie");
  
 // funcName = fName;
  //$values = [cookieName, blank , funcName] ;
   //alert($dbValues);
 var result = document.getElementById('ain3');
 result.value = "";  //blank out resultbox till new one comes in...

  setTimeout(function()
  {
   //alert("setTimeout1");
   retn = ajaxA(passedArray);
   //alert(retn);
   result.value = retn;
    //alert("Admin code using = " + retn);
  }, 3000);
  ajaxA(passedArray);
  ajaxA(passedArray);
}
//================== END AgetSESSIONcookie() =========================================


function display2ndAdminChoice($true_false)
{
    if($true_false == true)
    {
        alert("display2ndAdminChoices(true) ");
    } 
    else if ($true_false == false)  
    {
        alert("display2ndAdminChoice(false) ");
    }
}







//============================BEGIN FUNCTION ajaxA ===============================================
function ajaxA($Values)
{
  //alert($Values));
  funcCalled = "NONE";

 if($Values[2] == 'AsetSESSIONcookie')
  {
    funcCalled = "AsetSESSIONcookie";
   // alert("func = setSESSIONcookie");
  }

  else if($Values[2] == 'getSESSIONcookie')
  {
    funcCalled = "getSESSIONcookie";
   // alert("func = getSESSIONcookie");
  }

  if(funcCalled == "NONE")
  {
    alert("AjaxA FUNCTION CALLED = NONE\r\nCancelling" );
    return;
  }
   //alert("Ajax FUNCTION CALLED = " + funcCalled);
   //alert("AJAX dbval = " + $dbValues);
	jQuery.ajax({type: "POST", url: "signin/signin.php", dataType: 'json', data: {functionname: funcCalled, arguments: [$Values, 'blank'] },
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
						  console.log(obj.error);
					  }
           }
          });
return $yourVariable;
}
//================= END FUNCTION ajaxA() ===========================================