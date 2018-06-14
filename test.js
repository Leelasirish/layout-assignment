window.addEventListener('load', onload);
window.addEventListener('click', hideMenuHandler);

function onload(){
	var send = document.getElementById('send');
	send.addEventListener("click", sendHandler, false);
	var cancel = document.getElementById('cancel');
	cancel.addEventListener('click', cancelHandler, false);
	var close = document.getElementById('close');
	close.addEventListener('click', cancelHandler, false);
	var popupclose = document.getElementById('popup_layer');
	popupclose.addEventListener('click', cancelHandler);

	
	/*var select_value = document.getElementById('select_value');
	select_value.addEventListener('click', menuHandler, true);
	var menu = document.getElementById('menu');
	menu.addEventListener('click', menuHandler, true);
	var select = document.getElementsByClassName('select-menu');*/
	/*if(select[0]){
		select[0].addEventListener('click', selectHandler, true);
	}*/

	var selects = document.getElementsByTagName('select');
	for(var i = 0, len = selects.length; i < len; i++) {
		var select = selects[i];
		new Select(select);
	}

	first_select.addEventListener('change', function(event) {
		console.log(first_select.value);
	}, false);
	second_select.addEventListener('change', function(event) {
		console.log(second_select.value);
	}, false);
}
function selectHandler(e){
	var option = e.target;
	//var optionValue = option.innerText;
	var optionValue = option.getAttribute('value');
	var parent = option.parentElement;
	if(option.tagName.toLowerCase() != "li"){
		e.stopPropagation();
		e.preventDefault();
		return;
	}
	if(parent) {
		var arr = parent.getElementsByClassName('selected');
		for(var i = 0, length = arr.length; i < length; i++){
			arr[i].className = arr[i].className.replace('selected', '');
		}
	}
	if(option.className.indexOf('selected') == -1){
		option.className += ' selected';
	}
	var select_value = document.getElementById('select_value');
	select_value.innerText = optionValue;
	menuHandler(e);
}
function sendHandler(){
	document.getElementById('popup-wrapper').className="show";
	document.getElementById('popup_layer').className = "popup-layer show";
}
function cancelHandler(){
	document.getElementById('popup-wrapper').className="hide";
}
function menuHandler(e){
	/*var select = document.getElementsByClassName('select-menu');
	
	if(select[0]){
		var select_menu = select[0];
		var className = select_menu.className;
		if(className.indexOf('show') != -1) {
			select_menu.className = 'select-menu hide';
		}
		else {
			select_menu.className = 'select-menu show';
		}
		dataValue = select_menu.className;
		e.stopPropagation();
	}*/
	Select.collapseAllSelects(e);

}
function hideMenuHandler(){
	var selects = document.getElementsByClassName('select-menu');
	for(var i = 0, len = selects.length; i < len; i++) {
		var select = selects[i];
		removeClass(select, 'show');
		addClass(select, 'hide');
	}
}







function Select(el) {
	this.select = el;
	this.template = '<div class="menu">\
						<div class="select_value"></div>\
						<div class="arrow-container">\
							<span class="icon-arrow-down"></span>\
						</div>\
						<ul class="select-menu hide">\
						</ul>\
					</div>'
	this.initialise();
}

Select.prototype.initialise = function() {
	//Create new select box DOM
	this.select.style.display = 'none';
	this.parentEl = this.select.parentElement;
	var menuContainer = document.createElement('div');
	menuContainer.className = 'menu-container';
	menuContainer.innerHTML = this.template;
	this.newSelect = this.parentEl.insertBefore(menuContainer, this.select);
	this.newSelectMenu = this.newSelect.getElementsByClassName('select-menu')[0];
	this.newSelectValue = this.newSelect.getElementsByClassName('select_value')[0];
	this.newSelectArrow = this.newSelect.getElementsByClassName('arrow-container')[0];

	//Create new select box options and copy the actual options values and text
	var options = this.select.getElementsByTagName('option');
	for(var i = 0, len = options.length; i < len; i++) {
		var option = options[i];
		var newOption = document.createElement('li');
		newOption.setAttribute('value', option.getAttribute('value'));
		newOption.innerText = option.innerText;
		this.newSelectMenu.appendChild(newOption);
	}
	if(options[0]) {
		this.newSelectValue.innerText = options[0].innerText;
	}

	//Attach event handlers
	var boundToggle = this.toggle.bind(this);
	this.newSelectValue.addEventListener('click', boundToggle, false);
	this.newSelectArrow.addEventListener('click', boundToggle, false);

	var boundMenuSelectionHandler = this.handleMenuSelection.bind(this);
	this.newSelectMenu.addEventListener('click', boundMenuSelectionHandler, false);

	//Add to collection of selects
	Select.addToSelectCollection(this);
}

Select.prototype.expand = function(event) {
	//First collapse all other selects
	Select.collapseAllSelects(event);

	var selectMenu = this.newSelectMenu;
	if(selectMenu){
		removeClass(selectMenu, 'hide');
		addClass(selectMenu, 'show');
	}
	event.stopPropagation();
}

Select.prototype.collapse = function(event) {
	var selectMenu = this.newSelectMenu;
	if(selectMenu){
		removeClass(selectMenu, 'show');
		addClass(selectMenu, 'hide');
	}
	event.stopPropagation();
}

Select.prototype.toggle = function(event) {
	var selectMenu = this.newSelectMenu;
	if(selectMenu){
		if(hasClass(selectMenu, 'show')) {
			this.collapse(event);
		}
		else {
			this.expand(event);
		}
	}
	event.stopPropagation();
}

Select.prototype.handleMenuSelection = function(event) {
	var option = event.target;
	var optionText = option.innerText;
	var optionValue = option.getAttribute('value');
	var parent = this.newSelectMenu;
	if(option.tagName.toLowerCase() != "li"){
		e.stopPropagation();
		e.preventDefault();
		return;
	}
	if(parent) {
		var arr = parent.getElementsByClassName('selected');
		for(var i = 0, length = arr.length; i < length; i++){
			removeClass(arr[i], 'selected');
		}
	}
	addClass(option, 'selected');
	var select_value = this.newSelectValue;
	select_value.innerText = optionText;
	this.select.value = optionValue;
	this.collapse(event);

	//Trigger event on actual select
	var event = new Event('change');
	this.select.dispatchEvent(event);
}

Select.addToSelectCollection = function(select) {
	if(!this.selects) {
		this.selects = [];
	}
	this.selects.push(select);
}

Select.collapseAllSelects = function(event) {
	if(this.selects) {
		this.selects.forEach(function(select) {
			select.collapse(event);
		});
	}
}



/**************************************************************/
//Utility functions
/**************************************************************/

function addClass(el, className) {
	if(!hasClass(el, className)) {
		el.className += ' '+className;
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