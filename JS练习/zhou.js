// JavaScript Document

function $( v ){
	if( typeof v === 'function' ){
		window.onload = v;
	} else if ( typeof v === 'string' ) {
		return document.getElementById(v);
	} else if ( typeof v === 'object' ) {
		return v;
	}
}

<!-- 图片切换 -->

function Imgs(id,arrPic,arrText,event){	
	var oDiv=document.getElementById(id);
	var aPic=oDiv.getElementsByTagName('img')[0];
	var aSpan=oDiv.getElementsByTagName('span')[0];
	var aP=oDiv.getElementsByTagName('p')[0];
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	var num=0;
	var oldLi='';		//该变量指的是上一个li

	for (var i = 0; i < arrPic.length; i++) {
		oUl.innerHTML+='<li>'+[i+1]+'</li>';
	}
	
	aSpan.innerHTML=num+1+'/'+arrPic.length;
	aP.innerHTML=arrText[num];
	aPic.src=arrPic[num];
	aLi[num].className='active';
	oldLi=aLi[num];		//上一个li为0
	//初始化

	for (var i = 0; i < arrPic.length; i++) {
		aLi[i].index=i;
		aLi[i][event]=function(){	//会变的属性用[]括起来！！！
			aPic.src=arrPic[this.index];
			aSpan.innerHTML=[this.index+1]+'/'+arrPic.length;
			aP.innerHTML=arrText[this.index];
			//如何切换选中的状态
			//思路一：全部清空，当前添加 (可扩张性好~~性能会差一点！！！)
			// for (var i = 0; i < arrText.length; i++) {
			// 	aLi[i].className='';
			// }
			// this.className='active';
			// 思路二：清空上个，当前添加 
			oldLi.className='';
			oldLi=this;		//把上一个li存起来
			this.className='active';
		}
	}
};

<!-- 背景自动切换 -->

function changeBg(obj,arrUrl){		//对象和图片数组要传进来~~
	clearInterval(obj.timer);
	var num=0;
	obj.timer = setInterval(function(){
	obj.style.background='url('+arrUrl[num]+')';
	num++;
	if (num===arrUrl.length) {
		num=0;
	}
},1000);
}

<!-- 属性获取 -->

function getStyle( obj, attr ){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle( obj )[attr];
}

<!-- 物体移动 -->

function doMove(obj,attr,dir,target,endFn){	
//obj代表需要移动的对象，attr代表方向，dir代表步长，target代表目的地，endFn代表回调函数

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

		endFn && endFn();	//判断是否有回调函数，如果有就执行~~
	}
	},50);
	
}

<!-- 透明度渐变 -->

function oPacity(obj,dir,target,endFn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var speed = parseInt(getStyle(obj,'opacity')*100)/100-0.1;	
		//不能直接减小数，要先乘100取整再除以100！！！

		obj.style.opacity=speed;
		if (speed<=target) {
			clearInterval(obj.opa);
			endFn && endFn();					
		}
	},200);
	
}

<!-- 物体抖动 -->

function shake(obj,attr,endFn){			
	var pos=parseInt(getStyle(obj,attr));	////这条代码其实是有bug! ! !
	var arr=[];		//20,-20,18,-18....0
	var num=0;

	for (var i = 20; i > 0; i-=2) {
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

<!-- 检测输入框内只能为数字 -->

function detectNum(str){
	var n = 0;
	for (var i = 0; i < str.length; i++) {
		n = str.charCodeAt(i);
		if ( n<48 || n>57 ) return false;
	}
	return true;			
}

<!-- 获取绝对位置 -->

function getPos(obj) {
	
	var pos = {left:0, top:0};
	
	while (obj) {
		pos.left += obj.offsetLeft;
		pos.top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	
	return pos;
	
}

 <!-- 设置cookie函数封装 -->

function setCookie(key,value,t){
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + t);
	document.cookie = key + '=' +value +';expires=' + oDate.toGMTString();
}

<!-- 获取cookie函数封装 -->

function getCookie(key){
	var arr1 = document.cookie.split('; ');
	for ( var i = 0;i<arr1.length;i++){
		var arr2 = arr1[i].split('=');
		if (arr2[0] == key) {
			return decodeURI(arr2[1]);
		}
	}
}  

<!-- 删除cookie函数封装（原理：设置过期时间为昨天） -->

function removeCookie(key){
	setCookie(key,'',-1);
}

<!-- 拖拽函数的封装 -->

function drag(obj){
		obj.onmousedown = function(ev){
		var ev = ev || event;

		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop;

		if (obj.setCapture) {
			obj.setCapture();
		}

		document.onmousemove = function(ev){
			var ev = ev || event;

			var L = ev.clientX - disX;
			var T = ev.clientY - disY;

			if (L < 0) {
				L = 0;
			}else if ( L>document.documentElement.clientWidth - obj.offsetWidth ){
				L = document.documentElement.clientWidth -obj.offsetWidth;
			}

			if (T < 0) {
				T = 0;
			}else if ( T>document.documentElement.clientHeight - obj.offsetHeight ){
				T = document.documentElement.clientHeight -obj.offsetHeight;
			}

			obj.style.left = L +'px';
			obj.style.top = T + 'px'; 
		}

		document.onmouseup = function(){
			document.onmousemove = document.onmouseup = null;

			if (obj.releaseCapture) {
				obj.releaseCapture();
			}
		}
		return false;
	}
}


<!-- classname的封装 -->
function getClass(classname)   //  类的写法
{
   //判断支持否
   if(document.getElementsByClassName)
   {
       return document.getElementsByClassName(classname);
   }
   var arr = []; //用于返回 数组
   var dom = document.getElementsByTagName("*");
   for(var i=0;i<dom.length;i++)  // 遍历所有的 盒子
   {
       var txtarr = dom[i].className.split(" "); // 分割类名 并且 转换为数组
       //  ["demo","test"];
       for(var j=0;j<txtarr.length;j++)  // 遍历 通过类名分割的数组
       {
           if(txtarr[j] == classname)
           {
               arr.push(dom[i]); // 我们要的是 div
           }
       }
   }
   return arr;
}


<!-- 封装自己的$ -->
function $(str) {
    var s = str.charAt(0);   //  一个s 的变量 存放是 符号  #  .
    var ss = str.substr(1);  // demo
    switch(s)
    {
        case "#":
            return document.getElementById(ss);
        break;
        case ".":
            return getClass(ss);
        break;
        default :
            return document.getElementsByTagName(str);
    }
}

<!-- 封装滚动条scroll -->
function scroll() {
    if(window.pageYOffset != null)  //  ie9+ 和其他新版本的浏览器
    {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode == "CSS1Compat")  // 声明的了 DTD
    // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
    {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return { //  剩下的肯定是怪异模式的
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}

<!-- 回到顶部（匀速） -->

function pickUp(obj,dir){
	window.onscroll = function(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

		if (scrollTop == 0) {
			obj.style.right = '-80px';
		}else{
			obj.style.right = 0;
		}

		obj.onclick = function(){

			clearInterval(obj.topTimer);
			obj.topTimer = setInterval(function(){

				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				document.body.scrollTop = document.body.scrollTop - dir;
				document.documentElement.scrollTop = document.documentElement.scrollTop - 50;
				
				if (scrollTop <= 0) {
					clearInterval(obj.topTimer);
				}
			},10);
		}
	}	
}

<!-- 回到顶部（缓动） -->

function pickUpSpeed(obj,speed){
	window.onscroll = function() {
    	if (scroll().top == 0) {
			obj.style.display = 'none';
		}else{
			obj.style.display = 'block';
		} 
        leader = scroll().top; 
    }
    var leader = 0,target = 0,timer = null;
    obj.onclick = function() {
        target = 0; 
        timer = setInterval(function() {
            leader = leader + (target - leader ) / speed;
            window.scrollTo(0,leader);
            if(leader == target)
            {
                clearInterval(timer);
            }
        },20);
    }
}

<!-- 幻灯片函数封装 -->

function lanternSilder(obj,dur,target){
	var num = 0;	// 控制left值

	obj.timer = setInterval(autoPlay,dur);

	obj.onmouseover = function(){
		clearInterval(obj.timer);
	}
	obj.onmouseout = function(){
		obj.timer = setInterval(autoPlay,10);
	}

	function autoPlay(){
		num--;
		num <= -target ? num = 0 : num;// 当走完第target张的时候，在从头开始走

		obj.style.left = num +'px';
		
	}
}

<!-- 封装可视区域大小的函数 -->

function client(){
	if (window.innerHTML != null) //  ie9+ 和其他新版本的浏览器
	{
		return {
			width : window.innerWidth,
			height : window.innerHeight
		}
	}
	else if (document.compatMode==="CSS1Compat")	// 标准浏览器
	{
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}
	}
	return {   // 怪异浏览器
        width: document.body.clientWidth,
        height: document.body.clientHeight

    }
}


<!-- 多个属性运动框架 -->

function animate(obj,json,fn) {  // 给谁    json
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;  // 用来判断是否停止定时器   一定写到遍历的外面
        for(var attr in json){   // attr  属性     json[attr]  值
            //开始遍历 json
            // 计算步长    用 target 位置 减去当前的位置  除以 10
           // console.log(attr);
            var current = 0;
            if(attr == "opacity")
            {
                current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
            }
            else
            {
                current = parseInt(getStyle(obj,attr)); // 数值
            }
           // console.log(current);
             // 目标位置就是  属性值
            var step = ( json[attr] - current) / 10;  // 步长  用目标位置 - 现在的位置 / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //判断透明度
            if(attr == "opacity")  // 判断用户有没有输入 opacity
            {
                 if("opacity" in obj.style)  // 判断 我们浏览器是否支持opacity
                 {
                     // obj.style.opacity
                     obj.style.opacity = (current + step) /100;
                 }
                else
                 {  // obj.style.filter = alpha(opacity = 30)
                     obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                 }
            }
            else if(attr == "zIndex")
            {
                obj.style.zIndex = json[attr];
            }
            else
            {
                obj.style[attr] = current  + step + "px" ;
            }

            if(current != json[attr])  // 只要其中一个不满足条件 就不应该停止定时器  这句一定遍历里面
            {
                flag =  false;
            }
        }
        if(flag)  // 用于判断定时器的条件
        {
            clearInterval(obj.timer);
            //alert("ok了");
            if(fn)   // 很简单   当定时器停止了。 动画就结束了  如果有回调，就应该执行回调
            {
                fn(); // 函数名 +  （）  调用函数  执行函数 暂且这样替代
            }
        }
    },30)
}

<!-- 正则版getByClass -->

function getByClass(oParent,sClass){
	var aEle = oParent.getElementsByTagName("*");
	var aResult = [];
	var re = new RegExp("\\b"+sClass+"\\b","i");
	var i = 0;
	
	for(i = 0;i < aEle.length;i++){
		if (re.test(aEle[i].className)) {

			aResult.push(aEle[i]);
		}
	}
	return aResult;
}