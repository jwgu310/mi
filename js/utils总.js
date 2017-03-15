/**
 * Created by jiawei on 2016/9/3.
 */
var utils = (function () {

    var isStanderBrowser = "getComputedStyle" in window;   // 标准浏览器

    //类数组转为数组
    function listToArray(likeArray) {
        try {
            return [].slice.call(likeArray)
        } catch (e) {
            var ary = [];
            for (var i = 0; i < likeArray.length; i++) {
                ary.push(likeArray[i]);
            }
        }
        return ary;
    }

    //JSON格式的字符串转为JSON格式的对象
    function jsonParse(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")")
    }

    //获取n - m之间的随机整数
    function getRandom(n, m) {

        return Math.round(Math.random() * (m - n) + n)
    }

    //获取样式
    function getCss(ele, attr) {
        var val = null;
        if (isStanderBrowser) {
            val = window.getComputedStyle(ele)[attr];
        } else {
            if (attr == 'opacity') {
                val = ele.currentStyle.filter;
                var reg = /^alpha\(opacity=(\d+(\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = ele.currentStyle[attr];
            }
        }
        var reg = /^-?\d+(\.\d+)?(px|pt|em|rem|deg)?$/;
        if (reg.test(val)) {
            val = parseFloat(val);
        }
        return val;
    }

    //设置样式
    function setCss(ele, attr, val) {
        if (attr == 'opacity') {
            ele.style.opacity = val;
            ele.style.filter = 'alpha(opacity=' + val * 100 + ")";
            return;

        }
        if (attr == 'float') {
            ele.style.cssFloat = val;
            ele.style.styleFloat = val;
            return;
        }
        var reg = /^(width|height|top|bottom|left|right|(margin|padding)(Left|Right|Top|Bottom)?)$/
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val += 'px'
            }
        }
        ele.style[attr] = val;
    }

    //获取为偏移量
    function offset(ele) {
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        var par = ele.offsetParent;
        while (par) {
            if (window.navigator.userAgent.indexOf("MSIE 8") == -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t}
    }

    //设置屏幕的scrollTop 等
    function win(attr, val) {
        if (typeof val != 'undefined') {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    }

    //////////////////////////////////////////////////////////////////////////////
    //获取上一个哥哥节点
    function prev(ele) {
        if (isStanderBrowser) {
            return ele.previousElementSibling
        }
            var prev = ele.previousSibling;
            while (prev && prev.nodeType != 1) {
                prev = prev.previousSibling;
            }
            return prev;

    }   //ok

    //获取所有哥哥节点
    function prevAll(ele) {
        var ary = [];
        var prev = this.prev(ele);
        while (prev) {
            ary.unshift(prev);
            prev = this.prev(prev);
        }

        return ary;

    }    //ok

    //获取下面所有元素弟弟节点
    function nextAll(ele) {
        var ary = [];
        var next = this.next(ele);
        while (next) {
            ary.push(next);
            next = this.next(next)
        }
        return ary;
    }     //ok

    //获取下一个元素弟弟节点
    function next(ele) {
        if (isStanderBrowser) {
            return ele.nextElementSibling;
        } else {
            var next = ele.previousSibling;
            while (next && next.nodeType != 1) {
                next = next.previousSibling;
            }
            return next;
        }

    }           //ok

    //获取相邻的两个兄弟元素节点
    function sibling(ele) {
        var ary = [];
        var prev = this.prev(ele);
        prev ? ary.push(prev) : void 0;
        var next = this.next(ele);
        next ? ary.push(next) : void 0;
        return ary;
    }          //ok

    //获取所有的兄弟节点
    function siblings(ele) {
        return this.prevAll(ele).concat(this.nextAll(ele))
    }          //ok

    //获取所有元素子节点
    function children(ele, tagName) {
        if (isStanderBrowser) {
            ary = listToArray(ele.children)
        } else {
            var nodes = ele.childNodes;
            var ary = [];
            for (var i = 0; i < nodes.length; i++) {
                var curNode = nodes[i];
                if (curNode.nodeType == 1) {
                    ary.push(curNode);
                }
            }
        }

        if (typeof  tagName == 'string') {
            for (var i = 0; i < ary.length; i++) {
                var curEle = ary[i];
                if (curEle.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(i, 1);
                    i--;
                }
            }
        }
        return ary;
    }              //ok

    //index 获取元素的对应索引
    function index(ele) {
        return this.prevAll(ele).length;
    }           //ok

    //获取第一个元素子节点
    function firstEleChild(ele) {
        var chs = this.children(ele)
        //孩子的length大于0说明至少有一个孩子
        return chs.length > 0 ? chs[0] : null;
    }   //ok

    //获取最后一个元素子节点
    function lastEleChild(ele) {
        var chs = this.children(ele)
        //孩子的length大于0说明至少有一个孩子
        return chs.length > 0 ? chs[chs.length - 1] : null;
    }       //ok

    ////////////////////////////////////////////////////////////////////////////////////
    //向容器末尾添加
    function append(newEle, container) {
        container.appendChild(newEle);
    }      //ok

    //向容器开头添加
    function prepend(newEle, container) {
        var firstChild = this.firstEleChild(container);

        // firstChild ?container.insertBefore(newEle,firstChild): container.appendChild(newEle);
        if (firstChild) {
            container.insertBefore(newEle, firstChild)
        } else {
            container.appendChild(newEle)
        }

    }    //ok

    //把一个新元素插到另一个前面
    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);//只有父级才能调用
    }    //ok

    //把一个新元素插到另一个前后面
    function insertAfter(newEle, oldEle) {
        var next = this.next(oldEle);
        //弟弟存在插入到它前面，不存在，直接插入到最后
        next ? oldEle.parentNode.insertBefore(newEle, next) : oldEle.parentNode.appendChild(newEle);
    }    // ok

    /////////////////////////////////////////////////////////////////////////////////////////
    // 判断ele是否有strClass这个类
    function hasClass(ele, strClass) {
        //判断ele是否含有stcClass这个类
        strClass = strClass.replace(/^\s+|\s+$/g, '');
        //var reg = new RegExp("(^|\\s+)" +strClass+"(\\s+|$)");
        var reg = new RegExp("(^| +)" + strClass + "( +|$)");
        return reg.test(ele.className)
    }   //ok

    //增加class     ele.classList.add()
    function addClass(ele, strClass) {
        strClass = strClass.replace(/^ +| +$/g, '');
        var strClassAry = strClass.split(/ +/);
        for (var i = 0; i < strClassAry.length; i++) {
            var curClass = strClassAry[i];
            if (!this.hasClass(ele, curClass)) {
                ele.className += ' ' + strClass;
            }
        }
    }     //ok

    //移除类class   ele.classList.remove()
    function removeClass(ele, strClass) {
        var strClassAry = strClass.replace(/^ +| +$/g, '').split(/ +/);
        for (var i = 0; i < strClassAry.length; i++) {
            var curClass = strClassAry[i];
            if (this.hasClass(ele, curClass)) {
                var reg = new RegExp("(^| +)" + curClass + "( +|$)", 'g');
                ele.className = ele.className.replace(reg, " ");
            }
        }
    }     //ok

    function getElesByClass(strClass, context) {
        context = context || document;
        var strClassAry = strClass.replace(/(^ +| +$)/g, "").split(/ +/);
        var tag = context.getElementsByTagName("*");
        var ary = [];
        for (var i = 0; i < tag.length; i++) {
            var flag = true;
            var curTag = tag[i];
            for (var j = 0; j < strClassAry.length; j++) {
                var curClass = strClassAry[j];
                var reg = new RegExp("(^| +)" + curClass + "( +|$)");
                if (!reg.test(curTag.className)) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                ary.push(curTag)
            }
        }
        return ary;
    }

    function setGroupCss(ele, options) {
        options = options || [];
        if (options.toString() == '[object Object]') {
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    setCss(ele, key, options[key])
                }
            }
        }
    }    //ok

    function css(ele) {
        var arg2 = arguments[1];
        if (typeof arg2 == "string") { //可能是获取字符串
            var arg3 = arguments[2];
            if (typeof arg3 == 'undefined') { //第三个参数不存在
                return getCss(ele, arg2)
            }
            this.setCss(ele, arg2, arg3);
            return;
        }
        arg2 = arg2 || 0;
        if (arg2.toString() === '[object Object]') {
            this.setGroupCss(ele, arg2);
        }
        //console.log(this)
    }     //ok

    return {
        listToArray: listToArray,
        jsonParse: jsonParse,
        getRandom: getRandom,
        getCss: getCss,
        setCss: setCss,
        offset: offset,
        win: win,
        prev: prev,
        prevAll: prevAll,
        nextAll: nextAll,
        next: next,
        sibling: sibling,
        siblings: siblings,
        children: children,
        index: index,
        firstEleChild: firstEleChild,
        lastEleChild: lastEleChild,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElesByClass: getElesByClass,
        setGroupCss: setGroupCss,
        css: css
    }
})();
