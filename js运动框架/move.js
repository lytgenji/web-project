/*
 *getStyle 获取样式
 */

function getStyle(obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr]; //ie
    }else{
        return getComputedStyle(obj,false)[attr]; //ff
    }
}
function startMove(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var stop = true;
        for(var attr in json) {
            var iCur = 0;   //存储attr的值
            iCur = parseInt(getStyle(obj, attr));

            var speed = (json[attr] - iCur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (iCur != json[attr]) {
                stop = false;
            }
            if (attr == 'opacity') {
                iCur += speed;
                obj.style.filter = 'alpha(opacity:' + iCur + ')';
                obj.style.opacity = iCur / 100;
            } else {
                obj.style[attr] = iCur + speed + 'px';
            }
        }
        if(stop){
            clearInterval(obj.timer);
            if(fn)
                fn();
        }
    },50)
}