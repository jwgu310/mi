
var banner = document.getElementById('banner');
var bannerInner = utils.getElesByClass('bannerInner',banner)[0];
var imgs = bannerInner.getElementsByTagName('img');
var ul = utils.getElesByClass('ul',banner)[0];
var lis = ul.getElementsByTagName('li');
var leftBtn = utils.getElesByClass('left',banner)[0];
var rightBtn = utils.getElesByClass('right',banner)[0];

(function(){
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt',false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            data = utils.jsonParse(xhr.responseText)
        }
    }
    xhr.send(null)
})();

console.log(data);

(function(){
    var str = '';
    var str1 = '';
    for (var i= 0;i<data.length;i++){
        var curData = data[i];
        str += '<div><img src="" realSrc="'+curData.src+'"/></div>';
        str1 += i == 0? '<li class="select"></li>' : '<li></li>';
    }
    bannerInner.innerHTML = str;
    ul.innerHTML = str1;
})();

window.setTimeout(lazy,15);
function lazy(){
    for (var i = 0; i< imgs.length; i++){
        var curImg = imgs[i];
        if(i == 0){
            utils.css(curImg.parentNode,'zIndex',1);
            animate(curImg.parentNode,{opacity:1},200)
        }
        var tempImg = new Image;
        tempImg.index = i;
        tempImg.src = curImg.getAttribute("realSrc");
        tempImg.onload = function (){
            imgs[this.index].src = this.src;
            imgs[this.index].style.display = 'block';
        }
    }
}

var timer = window.setInterval(autoMove,3000);
var step = 0;
function autoMove(){
   if(step == data.length - 1 ){
       step = -1;
   }
    step++;
    setBannerImg();
}


function setBannerImg(){
    for(var i = 0;i<imgs.length;i++){
        var curImg = imgs[i];
        if(step == i){
            utils.css(curImg.parentNode,'zIndex',1);
            animate(curImg.parentNode,{opacity:1},200,function(){
                var sibilings = utils.siblings(this);
                for (var i=0 ; i<sibilings.length;i++){
                    utils.css(sibilings[i],'opacity',0)
                }
            })
        }else{
            utils.css(curImg.parentNode,'zIndex',0);
        }

    }
    for (var i = 0;i< lis.length ; i++){
        lis[i].className = step == i ? "select": "";
    }
}
banner.onmousemove = function (){
    window.clearInterval(timer);
};
banner.onmouseout = function (){
    timer = window.setInterval(autoMove,3000);
};
leftBtn.onclick = function (){

    if(step == 0){
        step = data.length;
    }
    step--;
    setBannerImg();
};
rightBtn.onclick = function() {

    autoMove();
};
(function (){
    for (var i = 0;i <lis.length ;i++){
        lis[i].index = i;
        lis[i].onclick = function (){
            step = this.index;
            setBannerImg();
        }
    }
})();
