/**
 * Created by jiawei on 2016/9/17.
 */
//banner左边
(function () {
    var category = document.getElementById('category_list');
    //var lis = category.getElementsByTagName('li');
    var lis = utils.children(category, 'li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onmouseenter = function () {
            lis[this.index].style.backgroundColor = '#ff6700';
            var lisChild = utils.children(lis[this.index], 'div')[0];
            // console.log(lisChild);
            lisChild.style.display = 'block';
        };
        lis[i].onmouseleave = function () {
            lis[this.index].style.backgroundColor = '';
            var lisChild = utils.children(lis[this.index], 'div')[0];
            //console.log(lisChild);
            lisChild.style.display = 'none';
        }
    }
})();

//banner上面
(function () {
    var category = document.getElementById('ttt');
    var lis = utils.children(category, 'li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onmouseenter = function () {
            var lisChild = utils.children(lis[this.index], 'div')[0];
            lisChild.style.display = 'block';
            var b = utils.siblings(lis[this.index]);
            for (var j = 0; j < b.length; j++) {
                var c = utils.children(b[j], 'div')[0];
                c.style.display = 'none';
            }
        };
    }
    category.onmouseenter = function (){
        var a=utils.children(this,'li');
        for(var i=0;i< a.length;i++){
            var lisChild = utils.children(a[i], 'div')[0];
            animate(lisChild,{height:220},300);
        }
    };
    category.onmouseleave = function (){
        var a=utils.children(this,'li');
        for(var i=0;i< a.length;i++){
            var lisChild = utils.children(a[i], 'div')[0];
            animate(lisChild,{height:0},300);
        }
    };
})();

/*<!--小米明星单品-->*/
(function () {
    function star(star) {
        var star_banner = document.getElementById(star);
        var star_ul = star.getElementsByTagName('ul')[0];
        var sibs = utils.siblings(star)[0];
        var star_leftBtn = utils.getElesByClass('star_leftBtn', sibs)[0];
        var star_rightBtn = utils.getElesByClass('star_rightBtn', sibs)[0];
        var left_i = utils.getElesByClass('left_i', star_leftBtn)[0];
        var right_i = utils.getElesByClass('right_i', star_rightBtn)[0];
        var timer = window.setInterval(auto, 4000);
        var step = 0;

        function auto() {
            if (step == 1) {
                step = -1;
            }
            step++;
            animate(star_ul, {left: -1226 * step}, 1000);
        }

        star_leftBtn.onclick = function () {
            animate(star_ul, {left: 0}, 400)
        };
        star_rightBtn.onclick = function () {
            animate(star_ul, {left: -1226}, 400)
        }

    }

    window.star = star;
})();

//视频
(function () {
    var video = document.getElementById('video_ul');
    var lis = video.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onmouseover = function () {
            var lisChild = utils.children(lis[this.index], 'a')[0];
            utils.removeClass(lisChild, 'little_icon');
            utils.addClass(lisChild, 'little_icon_hover');
            utils.addClass(lis[this.index], 'box_shadow');
        };
        lis[i].onmouseout = function () {
            var lisChild = utils.children(lis[this.index], 'a')[0];
            utils.removeClass(lisChild, 'little_icon_hover');
            utils.addClass(lisChild, 'little_icon');
            utils.removeClass(lis[this.index], 'box_shadow');
        };
    }

})();


//选项卡
(function () {

    function tab(container, defaultIndex) {
        //var box1 = document.getElementById("tabBox1");
        var ul = utils.children(container, 'ul')[0];
        var lis = utils.children(ul);
        var divs = utils.children(container, 'div');

        defaultIndex = defaultIndex || 0;
        utils.addClass(lis[defaultIndex], 'select');
        utils.addClass(divs[defaultIndex], 'select');

        for (var i = 0; i < lis.length; i++) {
            // lis[i].index = i;
            lis[i].onmousemove = function () {
                var siblings = utils.siblings(this);
                for (var j = 0; j < siblings.length; j++) {
                    utils.removeClass(siblings[j], 'select')
                }
                utils.addClass(this, 'select');
                // var divs = utils.nextAll(this.parentNode);
                var index = utils.index(this);
                for (var k = 0; k < divs.length; k++) {
                    k === index ? utils.addClass(divs[k], "select") : utils.removeClass(divs[k], "select");

                }
            }

        }
    }

    window.tab = tab;
})();