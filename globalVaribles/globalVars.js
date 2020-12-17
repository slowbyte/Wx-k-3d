var currentlyLoggedIn = "";
var username = "";
var loopRan =  false;
var whoCallAjax = "no one yet";
var objNAVloggedinStatus = false; // should than have a usernameOrig here...
var objNAVnvmc = null;
var  objNAVnvmct = null;
var  objNAVnvmcp = null;
var objNAVnvpp1form = null;
var objNAVnvpp2form = null;
var objNAVnvpp3form = null;
var nvpp1btncreated = false;
var nvpp2btncreated = false;
var  created2ChkboxesPP2 = false;
var nvpp3btncreated = false;
var  created2ChkboxesPP3 = false;
//var objNAVnvpp1btnnxt = null;
var objA11 = null;
var objA12 = null;
var objA13 = null;
var objA14 = null;
var objnvModal = null;
const ON = true;
const OFF = false;

//===================================================================================
var RegInputs = [];
var RegColumns1 = "( firstname, lastname, usernameorig, password, emailorig, email, username, membersince )"; //MUST ADD TBL2 COLUMNS ALSO
var RegColumns2 = "( usernamelc, gametype, gamestyle, groupsize, availability)"; 

var Login123LastDBdata = []
var PP123LastDBdata = [];
var PP1LastDBdata = [];
var PP2LastDBdata = [];
var PP3LastDBdata = [];

var PP1PriorDBdata = [];
var PP2PriorDBdata = [];
var PP3PriorDBdata = [];
var PP123PriorDBdata = [];

var PP123LastColumns = [ " userID = ", " firstname = ", " lastname = ", " city = ", " state = ", " zipcode = ", " emailorig = ", " email = ",  
                                             " usernameorig = ", " username = ", " password = ",  " phonenumber = ", " dmplayer = ", " birthyear = ",
                                             " lastlogin = ", " logincount = ",  " membersince = ", " usernamelc = ",
                                             " gametype = ", " gamestyle = ", " groupsize = ", " availability = " , " userIndx = " ];  
                                      
//var PP1LastColumns = ["userID = ",  "firstname = ", "lastname = ", "city = ", "state = ", "zipcode = ", "emailorig = ", "email = "];
//var PP1LastColumns = ["firstname = ", "lastname = ", "city = ", "state = ", "zipcode = ", "emailorig = ", "email = "];
//****** PP1LastColumns and the data fields used in PP1LastDBdata
var PP1LastColumns = ["firstname = ", "lastname = ", "city = ", "state = " , "zipcode = ", "emailorig = " ];
 //=============================================================================
 
//var PP2LastColumns = ["usernameorig = ", "password = ", "phonenumber = ", "dmplayer = ", "birthyear = ", "username = "];
//var PP2LastColumns = ["password = ", "phonenumber = ", "dmplayer = ", "birthyear = "];
//****** PP2LastColumns and the data fields used in PP2LastDBdata
var PP2LastColumns = ["password = ", "phonenumber = ", "dmplayer = ", "birthyear = "];
//==============================================================================

//var PP3LastColumns = ["username = ", "gametype = ", "gamestyle = ", "groupsize = ", "availability = ", "lastsignin = ", "signincount = ", "membersince = " ];
//var PP3LastColumns = ["gametype = ", "gamestyle = ", "groupsize = ", "availability = "];
//****** PP3LastColumns and the data fields used in PP3LastDBdata
var PP3LastColumns = ["gametype = ", "gamestyle = ", "groupsize = ", "availability = "]; 
//==============================================================================

//*************************** these are never editable by the user/member directly in any PPx...*****************************//
var PPSpecial = [userID, email, usernameorig, username, lastlogin, logincount, membersince, usernamelc, userIndx];
//************************************************************************************************************************************//


//====================================================================================    
var objHeightnvmc = 945;
var dataBaseUpdated = false;
var currentPPpage = "0"
var callNxtFcn = false;
var nvPP2DMPlyr = 0;