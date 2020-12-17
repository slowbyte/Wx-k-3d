<?php
if (session_status() == PHP_SESSION_NONE)
 {
    session_start();
 }
include_once "index/destroysession.php";
include_once 'mysqlpdo/includes/dbh.inc.php';
include_once 'mysqlpdo/includes/user.inc.php';
destroySession();

 session_start();
 $_SESSION["username"] = "none";
 $ID = session_id();


?>
<!DOCTYPE html>
<html>

<head>
    <title>ChairFiller WX1-K-3d</title>

    <script src="signin/jquery.js"></script>
    <script src="globalVaribles/globalVars.js"></script>
   <!-- <script src="nvpp1/test.js"></script>-->
    <script src="reg/reg.js"></script>
    <script src="signin/signin.js"></script>    
    <script src="modalbox/modal.js"></script>
    <script src="admin/adminonly.js"></script>
    <script src="nav/nav.js"></script>
    <script src="nvpp1/nvpp1NEW.js"></script>
    <script src="nvpp2/nvpp2.js"></script>
    <script src="nvpp3/nvpp3NEW.js"></script>    
    <script src="modalbox/modal.js"></script>

    <link rel="stylesheet" href="index/newtryG.css">
    <link rel="stylesheet" href="modalbox/modal.css">
    <link rel="stylesheet" href="nv/nvmodal.css">
    <link rel="stylesheet" href="admin/admin.css">
    <link rel="stylesheet" href="admin/dropdwn.css">
    <link rel="stylesheet" href="nav/nav.css">
    <link rel="stylesheet" href="nvpp1/nvpp1.css">
    <link rel="stylesheet" href="nvpp2/nvpp2.css">
   <link rel="stylesheet" href="nvpp3/nvpp3.css">
    <link rel="stylesheet" href="nvpp3/page3_1.css">
    <link rel="stylesheet" href="nvpp3/page3.css">
    <link rel="stylesheet" href="nvpp3/alertp3.css">
   
</head>

<body  onunload="myFunction()">
<!--<script> //objectsInit() </script> -->
<section id="grid">
         <div  id="logos" onclick="login();" href="javascript:void(0);" >
            <img  id="img1" src="logos/logo3simple.png" alt="icon80" width="60" height="76">
            <span  id="divmid"><img  id="img1" src="logos/CFtext.png" alt="icon80" width="225" height="300"></span><span id="ver">wx1-k-3d<br>cleanup</span>
         </div>  <!-- end first 3 rows | end id logos -->

            <div class="gridareas"  id="s11"><a id="a11" onclick="DBCall();" href="javascript:void(0);" >Find a Table</a></div>
            <div class="gridareas"  id="s12"><a id="a12" href="index/uc.html">Community</a></div>
            <div class="gridareas"  id="s13"><a id="a13" onclick="displayAbtUs(true);" href="javascript:void(0);">About Us</a></div>
            <div  class="line1"></div>
            <div class="gridareas"  id="s14"><a id="a14" onclick="chooseWhichPPpage();" href="javascript:void(0);">Profile</a></div>
          <!--  <div class="gridareas"  id="s14"><a id="a14" onclick="navRunProfile3();" href="javascript:void(0);">Profile</a></div> -->
            <div class="gridareas"  id="s15"><a id="a15" onclick="login();" href="javascript:void(0);">Log In</a></div>
            <div class="gridareas"  id="s16"><a id="a16" onclick="adminstuffclicked();" href="javascript:void(0);">Admin</a></div>

   <div class="cntrltxt"  id="content">
        <h4><em>"Pull up the perfect chair for your TTRPG"</em></h4>
        <p class="mtxt"> <br>
          Chair Filler`s first priority is right there in it`s name: We want to fill the chairs at your table. It`s a simple and honest enough quest to
               embark on, sure. But we don`t just want you to have a full table. We want it to be the <em><b>best table</b></em> you`ve ever been at.<br><br>
          So how do we go about doing that? First, matchmaking. Every player and every GM have their own style, their own preferences.
               Chair FIller takes your profile and casts a nice divination spell to help find players and GM`s with matching playstyles,
               <em><b>availability</b></em> (how many games have had a wonderful session 1 and never made it to 2?), and other preferences.<br><br>
          Second, we build on that. We ask you about your experience at the table after each session and we take those reviews and add
               them to your matchmaking score for future games. <br><br>
          Lastly, we want to improve the ttrpg community and help it grow. We want to help foster and create friendships, help you run a game that
                not many people know about. Or even find you a game you didn`t know about. We want to reward amazing GM`s and players.<br><br>
         </p>
         <button class="gridareas" id="bntxtclose" ><a id="atxtclose" onclick="displayAbtUs(false);" href="javascript:void(0);">Close</a></button>
  </div>
  <div id="login">
        <form id="frmstatus">
                <h3>Log In Status</h3>
                <div class="title" id="tunu">username</div>
                <div class="instatus" id="top"></div>
                <div class="title" id="loginerror">login result</div>
                <div class="instatus"  id="bottom"></div>
                <div class="title" id="stus"> status</div>
                <div class="instatus" id="middle"></div>

                <img  id="img2" src="images/ron2.jpg" alt="icon80" width="80" height="80">
            </form>
        
            <form id="frmlog">
                <div class="title" id="tun">Username</div>
                <input class="inright" id="un"></input>
                <div class="title">Password</div>
                <input class="inright" id="up"></input>

                <div class="divsub">
                    <span id="submit"></span><span id="cancel"></span>
                    <span id="set"></span><span id="get"></span>
                </div>
                <button   type ="button" id="butreg" onclick="displayRegister(true)"; href="javascript:void(0);"> Acc't Registration</button>
            </form>
        </div>

        <div id="login2">
            <form id="frmreg">
                <div class="title" id="rtfn">First Name</div>
                <input class="inright" id="rfn"></input>
                <div class="title">Last Name</div>
                <input class="inright" id="rln"></input>
                <div class="title" id="">Username</div>
                <input class="inright" id="run"></input>
                <div class="title">Password</div>
                <input class="inright" id="rup"></input>
                <div class="title" >Email</div>
                <input class="inright" id="rem"></input>

                <div class="rdivsub">
                   <span id="rsubmit"></span><span id="rcancel"></span>
                </div>
            </form>
        </div>
        <div id="pics">
             <img  id="img44" src="logos/logo3.png" alt="icon9" width="255" height="330">
            <!-- <img  id="img44" src="images/test1.svg" alt="icon9" width="255" height="330"> -->
        </div>


     <div id="modal-content">
              <div class="modal-header">
                    <span class="close"><span id="s1"></span> <span id="s2">&times;</span></span>

              </div>
            <div class="modal-body">
                 <p id="line2"></p>
                 <p id="line3"></p>
            </div>
            <div class="modal-footer">
                 <h3 id="ftr"></h3>
            </div>
    </div>

</div>

<!-- </section> --><!-- end gridPart1 -->

<!-- ===============================ADMIN HTML ONLY BELOW ========================================== -->
<!-- ================== Dropdwn Box Html =================== -->
<div id="grid2">
    <form name="demoForm1">
        <div class="custom-select">
            <select id="select1" name="demoSelect1" onchange="showDropDwn1Choice()">
                <option value="minus one">select</option>
                 <option value="one">SESSION cookies</option>
                 <option value= two >2nd Admin Choice</option>
                 <option value="three">3rd Admin Choice</option>
                 <option value="four">4th Admin Choice</option>
                 <option value="five">5th Admin Choice</option>
             </select>
             <span class="custom-arrow"></span>
        </div>
    </form>
 </div>
 <!-- ==================      GetSet Session Cookies  Html           =================== -->
      <div class="admin-Scookies" id="adminScookies">
            <h3>SESSIONcookies</h3>
            <h4 id="sc1"></h4>
        <form name="demoForm2">
            <select id="select2"  name="demoSelect2" onchange="showDropDwn2Choice()">
                <option value="-1">select an item</option>
                 <option value="1">username</option>
                 <option value="2" >sessionid1</option>
                 <option value="3">sessionid2</option>
                 <option value="4">sessionid3</option>
                 <option value="5">fifth</option>
             </select>
        </form>

            <div class="title" id="at1">SESSIONcookie Name</div>
            <input class="inright" id="ain1"></input>
            <div class="title" id="at2">"SET" SESSIONcookie Value</div>
            <input class="inright" id="ain2"></input>

            <div><span id="aset"></span><span id="aget"></span></div>

            <div class="title" id="at3">SET/GET Result</div>
            <input class="inright" id="ain3"></input>
      </div>



<!-- ================== NAV-ITEM-CLKED HTML BELOW === ============================ =================== -->
<container class="mainContainer" id="nvmc">
            <h1 id="nvmct"> Nav Item Here... </h1>
            <p id="nvmcp"></p>
          
<!-- ================== Profile Clked HTML BEGIN  =============== =================== -->
        <form class="nvpp1frm" id="nvpp1form">
                <div class="title" id='fnt'>First Name</div>
                <input class="inleft" id="fn"></input>
                <div class="title">Last Name</div>
                <input class="inleft" id="ln"></input>
                <div class="title">City </div>
                <input class="inleft" id="ci"></input>
                <div class="title">State</div>
                <input class="inleft" id="st"></input>
                <div class="title">Zip Code </div>
                <input class="inleft" id="zc"></input>
                <div class="title">Email</div>
                <input class="inleft" id="em"></input>

                <div ><span id="nvpp1sbtn"></span></div>
                    <script>
                        //alert('from script1');
                        //CreatePP1NextBtn(); // temp blocking of this item
                    </script>
        </form>
        <div id="PP1ErrorBox">
                 <p id="pp1line0"></p>
                 <p id="pp1line1"></p>
                 <p id="pp1line2"></p>
          </div>


        <form class="nvpp2frm" id="nvpp2form">
                <div class="title" id='untitle'>Username (not allowed to be changed)</div>
                <input class="inleft" id="unt"></input>
                <div class="title">Password</div>
                <input class="inleft" id="pwt"></input>
                <div class="title">Area Code + Phone# (optional) </div>
                <input class="inleft" id="pnt"></input>
                <div class="title">DM and/or Player</div>           
               <div id="pp2chkboxes">
                   <span><label><input id="pp2chk1" type="checkbox" name="checkbox" value="value"></input>DM</label></span>
                   <span><label><input id="pp2chk2" type="checkbox" name="checkbox" value="value"></input>Player</label></span>
               </div>
                <div class="title">Birth Year ( yyyy )</div>
                <input class="inleft" id="byt"></input>

                <div id="pp2prevnxt">
                     <div id="nvpp2sbtp"></div>
                     <div id="nvpp2sbtn"></div>
                </div>    
                
        </form>
        <div id="PP2ErrorBox">
                 <p id="pp2line0"></p>
                 <p id="pp2line1"></p>
                 <p id="pp2line2"></p>
        </div>



        <div class="nvpp3form" id="nvpp3form">
       <!-- <div id="row00">
                 <div id="note">
                      <p id="note-p"><em><strong>at least one chkbox must be checked in each section!</strong></em></p> 
                 </div>
                 <div  id="alrt">
                       <div id="msg1">
                            <p class="myp1" id="p1" > ERROR: </p>
                            <p class="myp1" id="p2" ></p>
                       </div> 
                      <button type="button" class="closebtn" id="btnOK">Ok</button>
                </div>
        </div> -->

        <div id="row11">
            <div class="box1" id="br11">GAME   TYPE</div>
            <label class="container">DND SE
              <input type="checkbox" name="cb1" value="myvalue" id = "gtt1">
              <span id="chk100" class="checkmark"></span>
            </label>
            <label class="container">DND 3.5
              <input type="checkbox"  name="cb2" id = "gtt2" >
              <span class="checkmark" id="chk200"></span>
            </label>
            <label class="container">Pathfinder
              <input type="checkbox" name="cb4" id = "gtt4">
              <span class="checkmark" id="chk300"></span>
            </label>
            <label class="container">Other
              <input type="checkbox" name='cb8' id = "gtt8">
              <span class="checkmark" id="chk400"></span>
            </label>
            <div id="br12"></div>
          </div>

      <div id="row12">
        <div class="box1" id="br11">GAME STYLE</div>
        <label class="container">Roll Playing
          <input type="checkbox" id = "gss1">
          <span class="checkmark"></span>
        </label>
        <label class="container">Combat
          <input type="checkbox" id = "gss2">
          <span class="checkmark"></span>
        </label>
        <label class="container">Exploration
          <input type="checkbox" id = "gss4">
          <span class="checkmark"></span>
        </label>

        <div id="br12"></div>
      </div>

      <div id="row13">
        <div class="box1" id="br11">GROUP  SIZE</div>
        <label class="container">Less Than 3
          <input type="checkbox" id = "grs1">
          <span class="checkmark"></span>
        </label>
        <label class="container">Less Than 6
          <input type="checkbox" id = "grs2">
          <span class="checkmark"></span>
        </label>
        <label class="container">Any Size
          <input type="checkbox" id = "grs4">
          <span class="checkmark"></span>
        </label>
        <div id="br12"></div>
      </div>

          <!--\\\\\\\\\\\\\\\\\\\\\\\ START REMOVE AND REPLACE \\\\\\\\\\\\\\\\\\\\-->


          <div id="row21">
     
          <div id="gridR21">
        
            <div id="sumTemp"></div>

            <div id="titleR21">WHEN AVAILABLE TO PLAY</div> <!-- row1  -->

            <div class="days" id="day1">Mon</div> <!-- row2  -->
            <div class="days" id="day2">Tue</div> <!-- row2  -->
            <div class="days" id="day3">Wed</div> <!-- row2  -->
            <div class="days" id="day4">Thu</div> <!-- row2  -->
            <div class="days" id="day5">Fri</div> <!-- row2  -->
            <div class="days" id="day6">Sat</div> <!-- row2  -->
            <div class="days" id="day7">Sun</div> <!-- row2  -->

            <div class="when" id="morning">Morning</div> <!-- row3  -->
            <div class="cbSpans" id="d1"></div> <!-- row3  -->
            <div class="cbSpans" id="d2"></div> <!-- row3  -->
            <div class="cbSpans" id="d3"></div> <!-- row3  -->
            <div class="cbSpans" id="d4"></div> <!-- row3  -->
            <div class="cbSpans" id="d5"></div> <!-- row3  -->
            <div class="cbSpans" id="d6"></div> <!-- row3  -->
            <div class="cbSpans" id="d7"></div> <!-- row3  -->

            <div class="when" id="midday">Mid Day</div> <!-- row4  -->
            <div class="cbSpans" id="d8"></div>  <!-- row4  -->
            <div class="cbSpans" id="d9"></div>  <!-- row4  -->
            <div class="cbSpans" id="d10"></div> <!-- row4  -->
            <div class="cbSpans" id="d11"></div> <!-- row4  -->
            <div class="cbSpans" id="d12"></div> <!-- row4  -->
            <div class="cbSpans" id="d13"></div> <!-- row4  -->
            <div class="cbSpans" id="d14"></div> <!-- row4  -->

            <div class="when" id="evening">Evening</div> <!-- row5  -->
            <div class="cbSpans" id="d15"></div> <!-- row5  -->
            <div class="cbSpans" id="d16"></div> <!-- row5  -->
            <div class="cbSpans" id="d17"></div> <!-- row5  -->
            <div class="cbSpans" id="d18"></div> <!-- row5  -->
            <div class="cbSpans" id="d19"></div> <!-- row5  -->
            <div class="cbSpans" id="d20"></div> <!-- row5  -->
            <div class="cbSpans" id="d21"></div> <!-- row5  -->
          </div>
          <div id="divbuts"><span class="butClass" id="sb1"></span><span class="butClass" id="sb2"></span><span class="butClass"
               id="sb3"></span><span class="butClass" id="sb4"></span></div> <!-- area 6  -->
          <div id="divlastbuts"><span id="sbPrev"></span><span id="sbNext"></span></div>

          <!-- testing below only -->
          <div id="PP3ErrorBox">
                 <p id="pp3line0"></p>
                 <p id="pp3line1"></p>
                 <p id="pp3line2"></p>
          </div>

          


          <script>
            //createCheckBoxes(1, 21);
            //createButtons(6);
           // LoadProfilePage3();
          </script>

        <!--\\\\\\\\\\\\\\\\\\\\\\ END REMOVE AND REPLACE \\\\\\\\\\\\\\\\\\\\\\\-->
      </div>
    </div>
  </div>










      <!--    <div class="maincontentgrid" id="maincontentgrid">        
      <div id="row00">
                 <div id="note">
                      <p id="note-p"><em><strong>at least one chkbox must be checked in each section!</strong></em></p> 
                 </div>
                 <div  id="alrt">
                       <div id="msg1">
                            <p class="myp1" id="p1" > ERROR: </p>
                            <p class="myp1" id="p2" ></p>
                       </div> 
                      <button type="button" class="closebtn" id="btnOK">Ok</button>
                </div>
        </div> 
        <div id="row11">
            <div class="box1" id="br11">GAME   TYPE</div>
            <label class="container">DND SE
              <input type="checkbox" name="cb1" value="myvalue" id = "gtt1">
              <span id="chk100" class="checkmark"></span>
            </label>
            <label class="container">DND 3.5
              <input type="checkbox"  name="cb2" id = "gtt2" >
              <span class="checkmark" id="chk200"></span>
            </label>
            <label class="container">Pathfinder
              <input type="checkbox" name="cb4" id = "gtt4">
              <span class="checkmark" id="chk300"></span>
            </label>
            <label class="container">Other
              <input type="checkbox" name='cb8' id = "gtt8">
              <span class="checkmark" id="chk400"></span>
            </label>
            <div id="br12"></div>
          </div>
</div> -->
        

      <!--  <containerpp3 class="nvpp3frm" id="nvpp3form">
              <div id="pp3grid">
              <div id="row11">
            <div class="box1" id="br11">GAME   TYPE</div>
            <label class="container">DND SE
              <input type="checkbox" name="cb1" value="myvalue" id = "gtt1">
              <span id="chk100" class="checkmark"></span>
            </label>
            <label class="container">DND 3.5
              <input type="checkbox"  name="cb2" id = "gtt2" >
              <span class="checkmark" id="chk200"></span>
            </label>
            <label class="container">Pathfinder
              <input type="checkbox" name="cb4" id = "gtt4">
              <span class="checkmark" id="chk300"></span>
            </label>
            <label class="container">Other
              <input type="checkbox" name='cb8' id = "gtt8">
              <span class="checkmark" id="chk400"></span>
            </label>
            <div id="br12"></div>
          </div>
             </div>   
        </containerpp3> 
                
                    <script>
                        //alert('from script1');
                        //CreatePP1NextBtn(); // temp blocking of this item
                    </script>  -->
       
     <!-- ================== Profile Clked HTML END      =============== =================== -->
   <!--  <button   type ="button" id="butclosePP3" onclick="nvClosePP1()"; href="javascript:void(0);">CzLOSE</button> -->
     <div id="nvmodal-content">
              <div class="nvmodal-header">
                    <span class="nvclose"><span id="nvs1"></span> <span id="nvs2"></span></span>
              </div>
            <div class="nvmodal-body">
                 <p id="nvline2"></p>
                 <p id="nvline3"></p>
            </div>
            <div class="nvmodal-footer">
                 <h3 id="nvftr"></h3>
            </div>
    </div>
    <button   type ="button" id="butclosePP1" onclick="nvClosePP1()"; href="javascript:void(0);">CLOSE</button>
</container>

 <!-- =========================== END OF NAV-ITEM-CLKED HTML ====================================== -->
</section><!-- end gridPart1 -->

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>   this is needed for GREENSOCK animation!!!  -->
<!-- <script src="../greensock/greensock_min.js"></script>    pretty sure this doesn't work must use above... -->

</body>
 </html>
 
<script>
    createLoginButtons(); // signin.js
    createSetGetButtons(); //adminonly.js
    SetObjs();   // signin.js
    objectsInit(); // nav.js
 </script>

<script> /*
$data = <?php echo json_encode($_SESSION['username']); ?>;
alert("got " + $data);
passPHP($data); */
</script>











