function Popup(header, el) {
	this.template = '<div class="header">\
						<label>Popup</label>\
					</div>\
					<div class="close">X</div>';
	this.initialise(header, el);
}
Popup.prototype.initialise = function(headerText, el){
	if(!Popup.popupWrapper) {
		Popup.popupWrapper = document.createElement('div');
		Popup.popupWrapper.className = 'popup-wrapper hide';
		document.body.appendChild(Popup.popupWrapper);
	}
	if(!Popup.popupLayer) {
		Popup.popupLayer = document.createElement('div');
		Popup.popupLayer.className = 'popup-layer';
		Popup.popupWrapper.appendChild(Popup.popupLayer);
		Popup.popupLayer.addEventListener('click', function() {
			Popup.currentPopup.closePopup();
		}, false);
	}
	this.popupContent = document.createElement('div');
	this.popupContent.className = 'popup-content hide';
	this.popupContent.innerHTML = this.template;
	this.popupHeader = this.popupContent.getElementsByTagName('label')[0];
	if(headerText) {
		this.popupHeader.innerText = headerText;
	}
	Popup.popupLayer.appendChild(this.popupContent);

	if(!el) {
		el = document.createElement('div');
		el.className = 'popup-message';
		this.popupMessage = el;
	}
	this.popupContent.appendChild(el);

	this.popupClose  = this.popupContent.getElementsByClassName('close')[0];
	var boundClosePopupHandler = this.closePopup.bind(this);
	this.popupClose.addEventListener('click', boundClosePopupHandler, false);
}
Popup.prototype.closePopup = function(e){
	if(this.popupContent) {
		this.popupContent.className = "popup-content hide";
	}
	if(Popup.popupWrapper) {
		Popup.popupWrapper.className = "popup-wrapper hide";	
	}
	if(e) {
		e.preventDefault();
		e.stopPropagation();
	}
}
Popup.prototype.showPopup = function(){
	if(Popup.popupWrapper) {
		Popup.popupWrapper.className = "popup-wrapper show";	
	}
	if(this.popupContent) {
		this.popupContent.className = "popup-content show";
	}
	Popup.currentPopup = this;
}
Popup.prototype.showMessage = function(message){
	if(!this.popupMessage) {
		return;
	}
	this.showPopup();
	this.popupMessage.innerText = message;
}