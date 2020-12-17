
function navRunProfile3()
{
    alert("IN navRunProfile3()");
    currentPPpage = 3;   
    objNAVnvmc.style.display = "flex";
    objNAVnvpp3form.style.display = "flex";
    objNAVnvmct.innerHTML = "EDIT PROFILE (PAGE 3 of 3) PREFERENCES ";
    objNAVnvmcp.innerHTML = "all sections (4) need at least 1 checkbox checked! ";
    objNAVnvmcp.style.color = "red";
    objNAVnvmcp.style.fontStyle = "italic";

}