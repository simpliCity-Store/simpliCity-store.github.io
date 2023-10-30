function select(id, index) {
    var element = document.getElementById(id);
    var children = element.children;
    
    for (var i = 0; i < children.length; i++) {
	children[i].classList.remove("active");
    }

    children[index].classList.add("active");
}
