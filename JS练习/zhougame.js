// JavaScript Document

window.onload=function(){
	var oBtn = document.getElementsByTagName('input')[0];
	var oBox = document.getElementById('box');
	var oP = oBox.getElementsByTagName('p')[0];
	var oQQ = document.getElementById('qq');
	var oPic = oQQ.getElementsByTagName('img')[0];
	var arrPic = ['img/10-1.png','img/10-2.png','img/10-3.png','img/10-4.png','img/10-5.png','img/10-6.png','img/10-7.png','img/10-8.png','img/10-9.png','img/10-10.png','img/10-11.png'];
	var num1 = 0;
	var timer =null;
	oPic.style.opacity = 0;

	oBtn.onclick=function(){

		this.value = '游戏进行中...';
		//this.setAttribute('disabled','');
		this.style.opacity = 0.7;
		this.style.cursor = 'text';
		oPic.style.opacity = 1;
		// oBox.style.background = '#bef1f9';
		doMove(oPic,'top',1,430);
		detection();
	}

	oPic.onclick=function(){

		var str = '';
		num1++;
		this.src='./img/10-qq.png';
		clearInterval(oPic.timer);
		shake(oPic,'left',4);
		setTimeout(function(){
			oPic.style.top = 0;
			doMove(oPic,'top',num1,430);
			oPic.src = arrPic[Math.round(Math.random()*10)];
			oPic.style.left = Math.round(Math.random()*750) + 'px';

		},300);

		oP.innerHTML = '当前分数：'+num1+' 分';
		 var num2 = parseInt(oPic.style.top);
	}

	function detection(){
		timer = setInterval(function(){
			if (oPic.style.top == '430px') {
				if (num1 < 10) {
					alert('游戏结束！！！你的分数为'+num1+'分'+'！哎，没眼看~');
				}else if (num1 < 20){
					alert('游戏结束！！！你的分数为'+num1+'分'+'！一般般吧~');
				}else{
					alert('游戏结束！！！你的分数为'+num1+'分'+'！大神，请手下我的膝盖~');
				}

				clearInterval(oPic.timer);
				num1 = 0;
				oPic.style.opacity = 0;
				//oBtn.removeAttribute('disabled');
				oBtn.style.opacity = 1;
				// oBox.style.background = '';
				oBtn.style.cursor = 'pointer';
				oBtn.value = '开始游戏';
				oP.innerHTML = '当前分数：0 分';
				oPic.style.top = 0;
				clearInterval(timer);

			}
		},50);
	}	
}

function getStyle( obj, attr ){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle( obj )[attr];
}

function doMove(obj,attr,dir,target,endFn){	

	clearInterval(obj.timer);
	
	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;	
	//比较当前位置与目标点的大小，来判断dir的正负！！！

	obj.timer=setInterval(function (){
		var speed = parseInt(getStyle( obj, attr )) + dir;	
	
		if ( speed < target && dir < 0 || speed > target && dir > 0 ) {		
			speed = target;
		}
		obj.style[attr] = speed + 'px';	

		if (speed == target) {

		clearInterval(obj.timer);

		endFn && endFn();	
	}
	},50);
	
}

function shake(obj,attr,number,endFn){			
	var pos=parseInt(getStyle(obj,attr));
	var arr=[];	
	var num=0;

	for (var i = number; i > 0; i-=2) {
		arr.push(i,-i);
	}
	arr.push(0);

	clearInterval(obj.shake);
	
	obj.shake=setInterval(function(){
		obj.style[attr]=pos+arr[num]+'px';
		num++;
		if (num==arr.length) {
			num=0;
			clearInterval(obj.shake);
			endFn && endFn();
		}		
	},50);	

}