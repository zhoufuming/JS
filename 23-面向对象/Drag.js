/* 面向对象版的简单拖拽 */
function Drag(id){
	var _this = this;
	this.disX = 0;
	this.disY = 0;
	this.oDiv = document.getElementById(id);
	this.oDiv.onmousedown = function(){
		_this.fnDown();
		return false;//不return false的话，第二次拖动会有bug！！！
	};
};

Drag.prototype.fnDown = function(ev){
	var ev = ev || event;
	var _this = this;
	this.disX = ev.clientX - this.oDiv.offsetLeft;
	this.disY = ev.clientY - this.oDiv.offsetTop;

	document.onmousemove = function(ev){
		_this.fnMove(ev);
	};

	document.onmouseup = function(ev){
		_this.fnUp();
	};
};

Drag.prototype.fnMove = function(ev){
	var ev = ev || event;

	this.oDiv.style.left = ev.clientX - this.disX +'px';
	this.oDiv.style.top = ev.clientY - this.disY + 'px';

};

Drag.prototype.fnUp = function(){
	document.onmousemove = document.onmouseup = null;
};