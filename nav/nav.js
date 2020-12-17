
var lastProfileButtonPushed = "none";
var line = [];

function blankPP1entries()
{
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
}


function objectsInit()
{
    //alert("in objs Init @ load");   //blank works...
    objNAVnvmc = document.getElementById("nvmc") ;
    objNAVnvmct = document.getElementById("nvmct") ;
    objNAVnvmcp = document.getElementById("nvmcp") ;
    objNAVnvpp1form = document.getElementById("nvpp1form") ;
    objNAVnvpp2form = document.getElementById("nvpp2form") ;
    objNAVnvpp3form = document.getElementById("nvpp3form") ;
   // objNAVnvpp1btnnxt = document.getElementById("nvpp1btnnxt") ;
    objA11 = document.getElementById("a11") ;    
    objA12 = document.getElementById("a12") ; 
    objA13 = document.getElementById("a13") ; 
    objA14 = document.getElementById("a14") ;  
    objnvModal = document.getElementById("nvmodal-content");    
   // objHeightnvmc = $("container").height();
    //alert(objHeightnvmc);
    //nvAnchorsOnOff(ON)  ;
}

function nvAnchorsOnOff(ON_OFF)
{
    if(ON_OFF == true)
    {
        //alert("turn them on");
        objA11.style.pointerEvents = "auto";
        objA11.style.color = "blue";
        objA12.style.pointerEvents = "auto";
        objA12.style.color = "grey";
        objA13.style.pointerEvents = "auto";
        objA13.style.color = "blue";
        objA14.style.pointerEvents = "auto";
        objA14.style.color = "grey";
    }
    else if(ON_OFF == false)
    {
        //alert("turn them off");
        objA11.style.pointerEvents = "none";
        objA11.style.color = "rgb(223, 219, 219)";
        objA12.style.pointerEvents = "none";
        objA12.style.color = "rgb(223, 219, 219)";
        objA13.style.pointerEvents = "none";
        objA13.style.color = "rgb(223, 219, 219)";
        objA14.style.pointerEvents = "none";
        objA14.style.color = "rgb(223, 219, 219)";
    }
}

function nvClosePP1()
 {   
   objnvModal.style.display = "none";
   objNAVnvmc.style.height = objHeightnvmc;
   //objNAVnvmct.style.display = "none";
   //objNAVnvmcp.style.display = "none";
   objNAVnvmc.style.display = "none";
   currentPPpage = 0;
 }

function XnvClosePP1()
{
  //alert("closing");
  objnvModal.style.display = "none"
  objNAVnvmct.style.display = "none";
  objNAVnvmcp.style.display = "none";
  objNAVnvmc.style.display = "none";
}

function nvdisplayModal($displayData)
{
  //alert("in nvdisplayModal");
document.getElementById('nvs1').innerHTML = $displayData[0];
document.getElementById('nvline2').innerHTML = $displayData[1];
document.getElementById('nvline3').innerHTML = $displayData[2];
document.getElementById('nvftr').innerHTML = $displayData[3];

document.getElementById('nvs1').style.fontSize = "23px"; //OK
document.getElementById('nvs1').style.color = "red";  //OK

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("nvclose")[0];

// Show the modalBox
objNAVnvpp1form.style.height = "550px";
objNAVnvpp2form.style.height = "550px";
//alert("h = " + objNAVnvpp1form.style.height);
objnvModal.style.display = "flex";

// When the user clicks on <span> (x), close the modal 
  span.onclick = function()
  {
  objnvModal.style.display = "none";
  objNAVnvmc.style.height = objHeightnvmc;
  }
}

function PPxdisplayModal($displayData)
{
//alert("in PP3displayModal");
      document.getElementById('PP1ErrorBox').style.display = "none";
      document.getElementById('PP2ErrorBox').style.display = "none";
      document.getElementById('PP3ErrorBox').style.display = "none";
let whichPP = $displayData[4]
let whichErrorBox = whichPP +"ErrorBox";
whichErrorBox = "'" + whichErrorBox + "'";
objNAVnvmc.style.height = "1000";
/*document.getElementById('line0').innerHTML = $displayData[0];
document.getElementById('line1').innerHTML = $displayData[1];
document.getElementById('line2').innerHTML = $displayData[2];
document.getElementById('line0').style.fontSize = "26px"; //OK
document.getElementById('line0').style.color = "red";  //OK
document.getElementById('line0').style.fontStyle = "bold";  //OK
alert("4 ... " + whichErrorBox + " ... " + document.getElementById(whichErrorBox));
document.getElementById('PP2ErrorBox').style.display = "flex";whichErrorBox;
*/
if(whichPP == "PP1")
{
 // document.getElementById('PP2ErrorBox').style.display = "none";
 // document.getElementById('PP3ErrorBox').style.display = "none";
  document.getElementById('pp1line0').innerHTML = $displayData[0];
  document.getElementById('pp1line1').innerHTML = $displayData[1];
  document.getElementById('pp1line2').innerHTML = $displayData[2];
  document.getElementById('pp1line0').style.fontSize = "26px"; //OK
  document.getElementById('pp1line0').style.color = "red";  //OK
  document.getElementById('pp1line0').style.fontStyle = "bold";  //OK
  document.getElementById('PP1ErrorBox').style.border = "4px solid red";  
  document.getElementById('PP1ErrorBox').style.display = "flex";
return;
}
if(whichPP == "PP2")
{
  //document.getElementById('PP1ErrorBox').style.display = "none";
  //document.getElementById('PP3ErrorBox').style.display = "none";
  document.getElementById('pp2line0').innerHTML = $displayData[0];
  document.getElementById('pp2line1').innerHTML = $displayData[1];
  document.getElementById('pp2line2').innerHTML = $displayData[2];
  document.getElementById('pp2line0').style.fontSize = "26px"; //OK
  document.getElementById('pp2line0').style.color = "red";  //OK
  document.getElementById('pp2line0').style.fontStyle = "bold";  //OK
  document.getElementById('PP2ErrorBox').style.border = "4px solid red";  
  document.getElementById('PP2ErrorBox').style.display = "flex";
return;
}
if(whichPP == "PP3")
{
//alert($displayData[0] + " ... " + $displayData[1] + " ... " + $displayData[2]);
//document.getElementById('PP1ErrorBox').style.display = "none";
//document.getElementById('PP2ErrorBox').style.display = "none";
document.getElementById('pp3line0').innerHTML = $displayData[0];
document.getElementById('pp3line1').innerHTML = $displayData[1];
document.getElementById('pp3line2').innerHTML = $displayData[2]; //errorlist displays here????
document.getElementById('pp3line0').style.fontSize = "26px"; //OK
document.getElementById('pp3line0').style.color = "red";  //OK
document.getElementById('pp3line0').style.fontStyle = "bold";  //OK
document.getElementById('PP3ErrorBox').style.border = "4px solid red";  
document.getElementById('PP3ErrorBox').style.display = "flex";
return;
}
return;



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("nvclose")[0];

// Show the modalBox
//var origHeight = $("container").height();
//alert(origHeight);
var tempHeight = (objHeightnvmc + 735) ;
tempHeight = tempHeight + "px";
//alert("tH = " + tempHeight);
//objNAVnvmc.style.height = "1042.047px";

objnvModal.style.margin.Top = -100;
objnvModal.style.display = "flex";

/*btn.onclick = function() {
  objModal.style.display = "none";
}*/

// When the user clicks on <span> (x), close the modal
  //alert("span clked");
  span.onclick = function()
  {
  objnvModal.style.display = "none";
  objNAVnvmc.style.height = objHeightnvmc;
  }
}

function chooseWhichPPpage()
{
  //alert("chooseWhichPPpage");
  currentPPpage = 0; // (set to 0 or 1 for PP1  set to 2 for PP2  set to 3 for PP3) to determine which PPx page to open on clicking profile nav choice...
  lastProfileButtonPushed = "profile";
  if(currentPPpage == 0 || currentPPpage == 1)
  {
    objNAVnvpp2form.style.display = "none";
    objNAVnvpp3form.style.display = "none";    
    blankPP1entries();
    //alert("PP1Run");
    PP1Run();
  }
  else if(currentPPpage == 2)
  {
    objNAVnvpp1form.style.display = "none";    
    objNAVnvpp3form.style.display = "none"; 
    document.getElementById('PP1ErrorBox').style.display = "none";    
    //alert("PP2Run");
    PP2Run();
  }
  else if(currentPPpage == 3)
  {
    objNAVnvpp1form.style.display = "none";
    objNAVnvpp2form.style.display = "none"; 
    document.getElementById('PP2ErrorBox').style.display = "none";     
    //alert("PP3Run");
    PP3Run();
  }
}  

function SetLastDBdataArrays(data)
{
 //PP1 only below 
  for(var j = 0; j <= 6;  j++)
     {          

           PP1LastDBdata[j] = data[j]              
     }
     PP1LastDBdata[j] = data[12];
     //alert("PP1... [" + PP1LastDBdata + "]");

//PP2 only below 
  for(var j = 0; j <= 4;  j++)
     {          
           PP2LastDBdata[j] = data[j + 7] ;  //remember we alrdy used up data[0 through 6]  in the PP1 for loop      
           //alert(PP2LastDBdata);  
     }
     //alert(j);
     PP2LastDBdata[j] = data[13];
     //alert("PP2... [" + PP2LastDBdata + "]");

     //PP3 only below 
  for(var j = 0; j <=3;  j++)
    {          
        PP3LastDBdata[j] = data[j + 18 ] ;  //remember we alrdy used up data[0 through 13]  in the PP1 + PP2 for loop      
        //alert("PP3 data: " + (j + 14) + "/" + data[j + 14 ]);  
    }
    //alert("PP3... [" + PP3LastDBdata + "]");

 //PP123 only below
 for(var j = 0; j <= 22;  j++)
   {          
        PP123LastDBdata[j] = data[j ] ;  //remember this is all the marbles in one array only...
        //alert(PP2LastDBdata);  
   }
  alert("PP123... [" + PP123LastDBdata + "]");







 /* var PP1LastDBdata = [];
  var PP2LastDBdata = [];
  var PP3LastDBdata = [];
  var PP1PriorDBdata = [];
  var PP2PriorDBdata = [];
  var PP3PriorDBdata = [];*/
}


