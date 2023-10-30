var isOpen = false;

function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    
    if (isOpen) {
	sidebar.style.right = "-800px";
    } else {
	sidebar.style.right = "0px";
    }
    
    isOpen = !isOpen;
}
