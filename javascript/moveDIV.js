//需要移动的div元素
function moveDiv(divID){
    var div1 = document.getElementById(divID);
    var divHead = $(div1).find('.modal-header')[0];//面板头部标题栏
　　divHead.onmousedown = function(ev){
　　　　var oevent = ev || event;
　　　　var distanceX = oevent.clientX - div1.offsetLeft;
　　　　var distanceY = oevent.clientY - div1.offsetTop;

　　　　document.onmousemove = function(ev){
　　　　　　var oevent = ev || event;
        div1.style.opacity = 0.5;
        divHead.style.cursor = "move";
　　　　　　div1.style.left = oevent.screenX  + 'px';//clientX  - distanceX
　　　　　　div1.style.top = oevent.screenY + 'px'; //- distanceY 
　　　　};
　　　　document.onmouseup = function(){
　　　　　　document.onmousemove = null;
　　　　　　document.onmouseup = null;
         div1.style.opacity = 1;
         divHead.style.cursor = "normal";
　　　　};
      window.event? window.event.cancelBubble = true : oevent.stopPropagation();
  }
}