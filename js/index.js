var homePage = (function () {
    //Download client
    function appShow(curEle) {
        var oALabel = document.getElementById(curEle);
        oALabel.onmouseenter = function (e) {
            var code = utils.lastChild(this),
                oA = utils.prev(code);
            oA = utils.firstChild(oA);
            utils.addClass(oA, "on");
            utils.css(code, "display", "block");
        };
        oALabel.onmouseleave = function (e) {
            var code = utils.lastChild(this),
                oA = utils.prev(code);
            oA = utils.firstChild(oA);
            utils.removeClass(oA, "on");
            utils.css(code, "display", "none");
        };
    }

    //header login
    function headLogin(curEle, loginShow) {
        var oA = document.getElementById(curEle),
            oDiv = document.getElementById(loginShow),
            oI = oA.getElementsByTagName("i")[0],
            oDivEle = oDiv.getElementsByTagName("*");
        document.body.onclick = function (e) {
            e = e || window.event;
            var tar = e.target || e.srcElement,
                tarName = tar.tagName.toUpperCase();
            if (tarName === "A" && (tar.id == curEle)) {
                var par = tar.parentNode,
                    isOk = utils.getCss(oDiv, "display");
                if (isOk === "block") {
                    utils.setCss(oDiv, "display", "none");
                    utils.setCss(oI, "display", "none");
                } else {
                    utils.setCss(oDiv, "display", "block");
                    utils.setCss(oI, "display", "block");
                }
                return;
            }
            if (tarName && tools.has(tar, oDiv)) {
                return;
            }
            utils.setCss(oDiv, "display", "none");
            utils.setCss(oI, "display", "none");
        }
    }

    //Shopping Cart
    function shopCar(curEle) {
        var oDiv = document.getElementById(curEle);
        oDiv.onmouseenter = function (e) {
            var cur = utils.lastChild(this);
            utils.css(cur, "display", "block");
        };
        oDiv.onmouseleave = function (e) {
            var cur = utils.lastChild(this);
            utils.css(cur, "display", "none");
        };
    }

    //searType
    function searType(curEle, input) {
        this.shopCar(curEle);
        var oDiv = document.getElementById(curEle),
            oInput = document.getElementById(input),
            osearList = utils.lastChild(oDiv),
            aLi = osearList.getElementsByTagName("li"),
            oEm = oDiv.getElementsByTagName("em")[0];
        for (var i = 0, len = aLi.length; i < len; i++) {
            var curLi = aLi[i];
            curLi.index = i;
            curLi.onclick = function () {
                oInput.value = this.getAttribute("searValue");
                oEm.innerHTML = this.innerHTML;
                utils.css(osearList, "display", "none");
            }
        }
    }

    //searInput
    function searFocus(curEle) {
        var oDiv = document.getElementById(curEle),
            con = oDiv.value;
        oDiv.onfocus = function (e) {
            var par = this.parentNode.parentNode,
                oA = par.getElementsByTagName("a")[0];
            this.value = "";
            utils.addClass(oA, "on");
        };
        oDiv.onblur = function (e) {
            var par = this.parentNode.parentNode,
                oA = par.getElementsByTagName("a")[0];
            if (this.value == "") {
                this.value = con;
            }
            utils.removeClass(oA, "on");
        }
    }

    //banner
    function autoBanner(curEle, interval) {
        var oBox = document.getElementById(curEle),
            oImgWrap = oBox.getElementsByTagName("div")[0],
            oDiv = oImgWrap.getElementsByTagName("div"),
            aImg = oImgWrap.getElementsByTagName('img'),
            oUl = oBox.getElementsByTagName("ul")[0],
            aLi = oUl.getElementsByTagName("li"),
            oButLeft = oBox.getElementsByTagName("a")[0],
            oButRight = oBox.getElementsByTagName("a")[1],
            autoTimer = null,
            step = 0,
            data = null;

        ajax({
            url: "json/data.json",
            async: false,
            success: function (jsonData) {
                jsonData = jsonData["banner"];
                var str = '';
                var str2 = '';
                for (var i = 0; i < jsonData.length; i++) {
                    var curData = jsonData[i];
                    str += '<div><img src="" realImg="' + curData.imgSrc + '" alt=""/></div>';
                    str2 += i == 0 ? '<li class="bg"></li>' : '<li></li>';
                }
                oImgWrap.innerHTML += str;
                oUl.innerHTML += str2;

            }
        });


        lazyImg();
        function lazyImg() {
            for (var i = 0; i < aImg.length; i++) {
                (function (index) {
                    var curImg = aImg[index];
                    var oImg = new Image;
                    oImg.src = curImg.getAttribute('realImg');
                    oImg.onload = function () {
                        curImg.src = this.src;
                        oImg = null;

                    }
                })(i);
            }
        }

        utils.css(oDiv[0], "zIndex", 1);
        zhufengAnimate(oDiv[0], {"opacity": 1}, 500);
        clearInterval(autoTimer);
        autoTimer = window.setInterval(autoMove, interval);
        function autoMove() {
            if (step >= oDiv.length - 1) {
                step = -1;
            }
            step++;
            setBanner();
        }

        function setBanner() {
            for (var i = 0, len = oDiv.length; i < len; i++) {
                var curDiv = oDiv[i];
                if (i === step) {
                    utils.css(curDiv, "zIndex", 1);
                    zhufengAnimate(curDiv, {"opacity": 1}, 500, function () {
                        var siblings = utils.siblings(this);
                        for (var j = 0, len = siblings.length; j < len; j++) {
                            utils.css(siblings[j], "opacity", 0);
                        }
                    });
                    continue;
                }
                utils.css(curDiv, "zIndex", 0);
            }
            bannerTip();
        }

        function bannerTip() {
            for (var i = 0, len = aLi.length; i < len; i++) {
                var curLi = aLi[i];
                i === step ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");
            }
        }

        stopStart();
        function stopStart() {
            oBox.onmouseover = function () {
                clearInterval(autoTimer);
            };
            oBox.onmouseout = function () {
                autoTimer = window.setInterval(autoMove, interval);
            };
        }

        handleChange();
        function handleChange() {
            for (var i = 0, len = aLi.length; i < len; i++) {
                var curLi = aLi[i];
                curLi.index = i;
                curLi.onclick = function () {
                    step = this.index;
                    setBanner();
                }
            }
        }

        oButRight.onclick = autoMove;
        oButLeft.onclick = function () {
            if (step <= 0) {
                step = aLi.length;
            }
            step--;
            setBanner();
        };
    }

    //tabchange
    function tabChange(curEle, className, eventType) {
        var aDiv = document.getElementById(curEle),
            aSpan = utils.children(aDiv),
            changeBox = utils.next(aDiv),
            changeDiv = utils.children(changeBox);
        for (var i = 0, len = aSpan.length; i < len; i++) {
            var cur = aSpan[i];
            cur.index = i;
            if (eventType == "mouseover") {
                cur.onmouseover = change;
            } else if (eventType == "click") {
                cur.onclick = change;
            }
        }
        function change() {
            for (var i = 0, len = changeDiv.length; i < len; i++) {
                utils.removeClass(aSpan[i], className);
                utils.css(changeDiv[i], "display", "none");
            }
            utils.addClass(aSpan[this.index], className);
            utils.css(changeDiv[this.index], "display", "block");
        }
    }

    //showHide-movieDec
    function showHide(curEle) {
        var oDiv = document.getElementById(curEle),
            oDd = oDiv.getElementsByTagName("dd");
        for (var i = 0, len = oDd.length; i < len; i++) {
            var cur = oDd[i];
            cur.index = i;
            cur.onmouseenter = function () {
                var aEle = this.getElementsByTagName("a")[0];
                var decDiv = utils.next(aEle);
                utils.css(decDiv, "display", "block");
            };
            cur.onmouseleave = function () {
                var aEle = this.getElementsByTagName("a")[0];
                var decDiv = utils.next(aEle);
                utils.css(decDiv, "display", "none");
            }
        }
    }

    //leftRightChange-ticketLeftChange
    function leftRightChange(curEle, dtWidth) {
        var oBox = document.getElementById(curEle),
            leftLine = oBox.getElementsByTagName("div")[0],
            rightLine = oBox.getElementsByTagName("div")[1],
            leftBut = oBox.getElementsByTagName("a")[0],
            rightBut = oBox.getElementsByTagName("a")[1],
            movieList = utils.lastChild(oBox),
            oDl = movieList.getElementsByTagName("dl")[0],
            oDd = oDl.getElementsByTagName("dd");

        var interval = 10,
            step = 0;
        rightBut.onclick = function () {
            var left = utils.css(oDl, "left"),
                oDivWidth = oBox.offsetWidth,
                maxWidth = oDd[0].offsetWidth * oDd.length + dtWidth;
            oDl.style.width = maxWidth + "px";
            step++;
            var boundary = maxWidth - step * 1200;
            if (boundary <= 1200) {
                zhufengAnimate(oDl, {"left": -maxWidth + 1200}, 600, 2, function () {
                    utils.css(leftLine, "display", "block");
                    utils.css(leftBut, "display", "block");
                });
                utils.css(rightLine, "display", "none");
                utils.css(rightBut, "display", "none");
                return;
            }
            zhufengAnimate(oDl, {"left": oDivWidth * (-step)}, 600, 2, function () {
                utils.css(leftLine, "display", "block");
                utils.css(leftBut, "display", "block");
            });
        };
        leftBut.onclick = function () {
            var left = utils.css(oDl, "left"),
                oDivWidth = oBox.offsetWidth,
                maxWidth = oDd[0].offsetWidth * oDd.length + dtWidth;
            oDl.style.width = maxWidth + "px";
            step--;
            if (step <= 0) {
                utils.css(leftLine, "display", "none");
                utils.css(leftBut, "display", "none");
            }
            zhufengAnimate(oDl, {"left": oDivWidth * (-step)}, 600, 2, function () {
                utils.css(rightLine, "display", "block");
                utils.css(rightBut, "display", "block");
            });

        };

    }

    //loadingMore
    function loadingMore(curEle) {
        var aEle = document.getElementById(curEle),
            prev = utils.prev(aEle.parentNode),
            oLi = prev.getElementsByTagName("li"),
            ceil = Math.ceil(oLi.length / 4),
            oLiHeight = prev.offsetHeight / 3,
            count = Math.ceil((ceil - 3) / 3),
            height = null;
        aEle.onclick = function () {
            height = prev.offsetHeight;
            var showHeight = null; //alert(count);
            if ((ceil % 3) != 0 && count === 1) {
                showHeight = prev.offsetHeight + oLiHeight * (ceil % 3);
                this.style.display = "none";
            } else {
                if (ceil % 3 == 0 && count == 1) {
                    this.style.display = "none";
                }
                showHeight = height + oLiHeight * 3;
            }
            zhufengAnimate(prev, {"height": showHeight}, 100);
            count--;
        }
    }

    //inpFocusBlur  footer subscribe
    function inpFocusBlur(curEle) {
        var oInput = document.getElementById(curEle),
            value = oInput.value,
            reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        oInput.onfocus = function () {
            utils.css(this,"color","#a5a5a5");
            if (this.value === "" || this.value === value) {
                this.value = "";
            }
        };
        oInput.onblur = function () {
            var match = reg.test(this.value);
            if (!match) {
                if (this.value == "" || this.value == value) {
                    this.value = value;
                }else{
                    alert("请输入有效的邮箱地址");
                    utils.css(this,"color","red");
                }
            }
        };
    }

    //subscribe  footer subscribeBut
    function subscribe(curEle){
        var aEle = document.getElementById(curEle),
            oInp = document.getElementById("subscribe"),
            reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        aEle.onclick= function(){
            var match = reg.test(oInp.value);
            if (!match) {
                alert("请输入有效的邮箱地址");
                utils.css(oInp,"color","red");
            }
        }
    }


    return {
        appShow: appShow,
        headLogin: headLogin,
        shopCar: shopCar,
        searType: searType,
        searFocus: searFocus,
        autoBanner: autoBanner,
        tabChange: tabChange,
        showHide: showHide,
        leftRightChange: leftRightChange,
        loadingMore: loadingMore,
        inpFocusBlur:inpFocusBlur,
        subscribe:subscribe
    }
})();


var tools = (function () {
    //->判断当前的元素是否为某个容器中的子元素或者后代元素
    function has(curEle, context) {
        var ary = [],
            par = curEle.parentNode,
            flag = false;
        while (par) {
            ary.push(par);
            par = par.parentNode;
        }
        for (var i = 0, len = ary.length; i < len; i++) {
            if (ary[i] === context) {
                flag = true;
                break;
            }
        }
        return flag
    }

    function lazyLoad(img, winB) {
        if (img.load) {
            return;
        }
        var curT = utils.offset(img).top + img.offsetHeight;
        if (curT <= winB) {
            var realImg = img.getAttribute("realImg"),
                newImg = new Image;
            newImg.src = realImg;
            newImg.onload = function () {
                img.setAttribute("src", realImg);
                img.load = true;
            };
            newImg.onerror = function () {
                console.log('图片加载失败');
                img.loaded = true;
            }
        }
    }

    return {
        has: has,
        lazyLoad: lazyLoad
    }
})();


var bindData = (function () {
    //todayHot
    function todayHot(curEle) {
        var oBox = document.getElementById(curEle),
            oUl = oBox.getElementsByTagName("ul")[0],
            str = "";
        ajax({
            url: "json/data.json",
            success: function (jsonData) {
                jsonData = jsonData["todayHot"];
                for (var i = 0; i < jsonData.length; i++) {
                    var curData = jsonData[i];
                    str += "<li>";
                    str += i == jsonData.length - 1 ? '<a href="#"><img src="images/autoBg.png" realImg = "' + curData.imgSrc + '"><i></i></a>' : '<a href="#"><img src="images/autoBg.png" realImg="' + curData.imgSrc + '" width="285" height="140""></a>';
                    str += '<h3><a href="#">' + curData.title + '</a></h3>';
                    str += '<p><a href="#">' + curData.content + '</a></p>';
                    str += "</li>";
                }
                oUl.innerHTML += str;
            }
        });
    }

    return {
        todayHot: todayHot
    }
})();




