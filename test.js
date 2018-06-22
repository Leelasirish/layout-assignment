window.addEventListener('load', onload);
window.addEventListener('click', hideMenuHandler);
var newPopupContainer , popupWindowContainer;
var transPopup, confirmPopup, userCreatePopup;
var currentTime;

function onload(){
	// clock 
	//*************//
	var clock = ['hours', 'minutes', 'seconds'];
	var time = ['hh', 'mm', 'ss'];
	var clockHours = document.getElementsByClassName('hh')[0];
	for(var i = 0, len = clock.length; i < len; i++){
		var clockTime = document.getElementsByClassName(time[i])[0];
		clockHandler(clock[i], clockTime);
	}
	hours.addEventListener('change', currentClockTime, false);
	minutes.addEventListener('change', currentClockTime, false);
	seconds.addEventListener('change', currentClockTime, false);
	//************//
	var selects = document.getElementsByTagName('select');
	for(var i = 0, len = selects.length; i < len; i++) {
		var select = selects[i];
		new Select(select);
	}
	transactionPopup = new PopupWindow('Transaction', document.getElementById('trans_popup'));
	confirmPopup = new PopupWindow('Confirm', document.getElementById('save_confirm'));
	userCreatePopup = new PopupWindow('New User', document.getElementById('user_create'));
	userdetails = new PopupWindow('User Details', document.getElementById('user_details'));
	popupWindowContainer = new PopupWindow();

	document.getElementById('showTrans').addEventListener('click', function(e) {
		transactionPopup.showPopup(e);
	}, false);
	document.getElementById('showConfirm').addEventListener('click', function(e) {
		confirmPopup.showPopup(e);
	}, false);
	document.getElementById('showUserCreate').addEventListener('click', function(e) {
		userCreatePopup.showPopup(e);
	}, false);
	document.getElementById('popupMessage').addEventListener('click', function(e){
		popupWindowContainer.popupWindowMessage(document.getElementById('data').value);
		data.value = '';
	}, false);
	document.getElementById('showUserDetails').addEventListener('click', function(e){
		userdetails.showPopup(e);
	}, false);
	document.getElementById('showMessage').addEventListener('click', function(e){
		popupWindowContainer.popupWindowMessage(document.getElementById('pop_message').value);
		pop_message.value = '';
	}, false);
	first_select.addEventListener('change', function(event) {
		console.log(first_select.value);
	}, false);
	second_select.addEventListener('change', function() {
		console.log(second_select.value);
	}, false);
/*

	transPopup = new Popup('Trasaction', document.getElementById('trans_popup'));
	confirmPopup = new Popup('Confirm', document.getElementById('save_confirm'));
	userCreatePopup = new Popup('New User', document.getElementById('user_create'));
	genericPopup = new Popup();
	document.getElementById('showTrans').addEventListener('click', function(e) {
		transPopup.showPopup(e);
	}, false);
	document.getElementById('showConfirm').addEventListener('click', function(e) {
		confirmPopup.showPopup(e);
	}, false);
	document.getElementById('showUserCreate').addEventListener('click', function(e) {
		userCreatePopup.showPopup(e);
	}, false);
	document.getElementById('showMessage').addEventListener('click', function(e) {
		genericPopup.showMessage(document.getElementById('pop_message').value);
	}, false);
*/
}
function currentClockTime(){
	
	var clock = document.getElementsByClassName('clock')[0];
	var hours = clock.getElementsByClassName('select_value')[0];
	var minutes = clock.getElementsByClassName('select_value')[1];
	var seconds = clock.getElementsByClassName('select_value')[2];
	if(hours && minutes && seconds){
		var currentClockTime = ''+hours.innerText+':'+minutes.innerText+':'+seconds.innerText;
		console.log(currentClockTime);
		if(hours.innerText !== 'HH' && minutes.innerText !== 'MM' && seconds.innerText !== 'SS'){
			popupWindowContainer.popupWindowMessage(currentClockTime);
		}
	}
}
function clockHandler(clock, clockTime){
	var el = '<option value="HH">HH</option>';
	if(clock == 'hours'){
		for(var i = 1,len = 24; i <= len; i++){
			el += '<option value=""'+i+'>'+i+'</option>';
			
		}
		clockTime.innerHTML = el;
	}
	if(clock == 'minutes'){
		el = '<option value="MM">MM</option>';
		for(var i = 1,len = 60; i <= len; i++){
			el += '<option value=""'+i+'>'+i+'</option>';
		}
		clockTime.innerHTML = el;
	}
	if(clock == 'seconds'){
		el = '<option value="SS">SS</option>';
		for(var i = 1,len = 60; i <= len; i++){
			el += '<option value=""'+i+'>'+i+'</option>';
		}
		clockTime.innerHTML = el;
	}
}
function hideMenuHandler(){
	var selects = document.getElementsByClassName('select-menu');
	for(var i = 0, len = selects.length; i < len; i++) {
		var select = selects[i];
		removeClass(select, 'show');
		addClass(select, 'hide');
	}
}
function PopupWindow(header, element) {
	
	this.template = '<div class="header">\
						<label>popup</label>\
					</div>\
					<div class="close">X</div>'
					
	this.initialise(header, element);
}
PopupWindow.prototype.initialise = function(header, element){
	
	if(!PopupWindow.popupWrapper){
		PopupWindow.popupWrapper = document.createElement('div');
		PopupWindow.popupWrapper.className = 'popup-wrapper hide';
		document.body.appendChild(PopupWindow.popupWrapper);
	}
	if(!PopupWindow.popupLayer){
		PopupWindow.popupLayer = document.createElement('div');
		PopupWindow.popupLayer.className = 'popup-layer';
		PopupWindow.popupWrapper.appendChild(PopupWindow.popupLayer);
	}
	this.popupContent = document.createElement('div');
	this.popupContent.className = 'popup-content hide';
	this.popupContent.innerHTML = this.template;
	this.popupHeader = this.popupContent.getElementsByTagName('label')[0];
	if(header){
		this.popupHeader.innerText = header;
	}
	if(!element){
		element = document.createElement('div');
		element.className = 'popup-message';
		this.popupMessage = element;
	}
	this.popupContent.appendChild(element);
	PopupWindow.popupWrapper.appendChild(this.popupContent);
	this.popupClose = this.popupContent.getElementsByClassName('close')[0];

	var boundClosePopupHandler = this.closePopupHandler.bind(this);
	this.popupClose.addEventListener('click', boundClosePopupHandler, false);
	PopupWindow.popupLayer.addEventListener('click', boundClosePopupHandler, false);

}
PopupWindow.prototype.closePopupHandler = function(e){ 	 
	if(PopupWindow.popupWrapper) {
		PopupWindow.popupWrapper.className = "popup-wrapper hide";	
	}
	if(this.popupContent) {
		this.popupContent.className = "popup-content hide";
	}
	e.preventDefault();
	e.stopPropagation();
}
PopupWindow.prototype.showPopup = function() {
	if(PopupWindow.popupWrapper) {
		PopupWindow.popupWrapper.className = 'popup-wrapper show-item';
	}
	if(this.popupContent) {
		this.popupContent.className = 'popup-content show';
	}
}
PopupWindow.prototype.popupWindowMessage = function(message){
	
	if(!this.popupMessage){
		return;
	}
	this.showPopup();
	this.popupMessage.innerText = message;
}