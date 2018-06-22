/**************************************************************/
//Utility functions
/**************************************************************/

function addClass(el, className) {
	if(!hasClass(el, className)) {
		el.className += ''+className;
	}
}
function removeClass(el, className) {
	if(hasClass(el, className)) {
		el.className = el.className.replace(className, '');
	}
}
function hasClass(el, className) {
	return el.className.indexOf(className) != -1;
}
function toggleClass(el, className) {
	if(hasClass(el, className)) {
		removeClass(el, className);
	}
	else {
		addClass(el, className);
	}
}
function addChildClass(el, selector, className) {
	var children = el.getElementsByClassName(selector);
	for(var i = 0, len = children.length; i < len; i++) {
		addClass(children[i], className);
	}
}
function removeChildClass(el, selector, className) {
	var children = el.getElementsByClassName(selector);
	for(var i = 0, len = children.length; i < len; i++) {
		removeClass(children[i], className);
	}
}
function toggleChildClass(el, selector, className) {
	var children = el.getElementsByClassName(selector);
	for(var i = 0, len = children.length; i < len; i++) {
		toggleClass(children[i], className);
	}
}
/**************************************************************/