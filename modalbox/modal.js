//var modalData = [];

function displayModal($displayData)
{
  //modalData = displayData;

// Get the modal
//var modal = document.getElementById("modal-content");
if($displayData[0].includes("ERROR") == true)
{ 
  //document.getElementById('modal-content').style.border = "4px solid red";
}
else{
  //alert("false");
}

document.getElementById('s1').innerHTML = $displayData[0];
document.getElementById('line2').innerHTML = $displayData[1];
document.getElementById('line3').innerHTML = $displayData[2];
document.getElementById('ftr').innerHTML = $displayData[3];
// Get the button that opens the modal
////var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Show the modalBox
//alert('in displayModal1');
//alert(objModal);
//alert('in displayModal'2);
objModal.style.display = "flex";
//showModal.style.display = "flex";


/*btn.onclick = function() {
  objModal.style.display = "none";
}*/

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  objModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
 if(event.target == "[object HTMLBodyElement]" ) {    
    objModal.style.display = "none";
  }
}
}
