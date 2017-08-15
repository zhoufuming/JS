/* 面向对象版的限制范围的拖拽 */
function LimitDrag(id){
	// 构造函数伪装
	Drag.call(this,id);
}

for (var i in Drag.prototype){
	LimitDrag.prototype[i] = Drag.prototype[i];
}

// 写自己的fnMove函数，这个函数会覆盖掉从父级上继承过来的fnMove函数
LimitDrag.prototype.fnMove = function(ev){
	var ev = ev || event;
	var l = ev.clientX - this.disX;
	var t = ev.clientY - this.disY;

	if (l<0) {
		l = 0;
	}
	else if (l>document.documentElement.clientWidth-this.oDiv.offsetWidth){
		l = document.documentElement.clientWidth-this.oDiv.offsetWidth;
	}

	if (t<0) {
		t = 0;
	}
	else if (t>document.documentElement.clientHeight-this.oDiv.offsetHeight){
		t = document.documentElement.clientHeight-this.oDiv.offsetHeight;
	}

	this.oDiv.style.left = l +'px';
	this.oDiv.style.top = t + 'px';

};