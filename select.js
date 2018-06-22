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