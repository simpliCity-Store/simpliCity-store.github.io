var isOpen = false;

function openDropdown(id) {
    var element = document.getElementById(id);

    element.style.top = "65px";
    element.style.opacity = "1";
    element.style.visibility = "visible";

    isOpen = true;
}

function closeDropdown(id) {
    var element = document.getElementById(id);

    element.style.top = "-100px";
    element.style.opacity = "0";
    element.style.visibility = "collapse";
}

function toggleDropdown(id) {
    var element = document.getElementById(id);

    if (isOpen) {
	element.style.top = "-100px";
	element.style.opacity = "0";
	element.style.visibility = "collapse";
	isOpen = false;
    } else {
       	element.style.top = "65px";
	element.style.opacity = "1";
	element.style.visibility = "visible";
	isOpen = true;
    }
}
