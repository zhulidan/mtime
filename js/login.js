var login = (function () {
    function focus(curEle) {
        var error = utils.children(this.parentNode)[2],
            label = utils.next(this),
            value = label.innerHTML;
        if (curEle.value === "" || curEle.value === value) {
            curEle.value = "";
            utils.css(label, "display", "none");
        }
        utils.addClass(this.parentNode, "regEnrTxt_focus");
        utils.css(label, "display", "none");
        utils.css(error, "display", "none");
        utils.removeClass(this.parentNode, "regEnrTxt_false")

    }

    function blur(curEle, reg) {
        var label = utils.next(this),
            value = label.innerHTML,
            match = reg.test(this.value),
            error = utils.children(this.parentNode)[2];
        if (!match) {
            if (this.value == "" || this.value == value) {
                this.value = value;
            }
            utils.css(error, "display", "block");
            utils.addClass(this.parentNode, "regEnrTxt_false")
        } else if (match) {
            utils.css(error, "display", "none");
            utils.removeClass(this.parentNode, "regEnrTxt_false")
        }
        utils.removeClass(this.parentNode, "regEnrTxt_focus");

    }

    //registerPhone
    function registerPhone(curEle) {
        var aInp = document.getElementById(curEle),
            _this = this,
            reg = /^1\d{10}$/;
        aInp.onfocus = function () {
            _this.focus.call(this, this);
        };
        aInp.onblur = function () {
            _this.blur.call(this, this, reg)
        };
    }

    //registerPW-reginsterpassword
    function registerPW(curEle, safeArea) {
        var aInp = document.getElementById(curEle),
            _this = this,
            reg = /^([0-9A-Za-z_]|\W){6,20}$/;
        var pwSafe = document.getElementById(safeArea),
            oIEle = pwSafe.getElementsByTagName("p")[0];
        aInp.onfocus = function () {
            _this.focus.call(this, this);
            aInp.type = "password";
        };
        aInp.onblur = function () {
            _this.blur.call(this, this, reg);
        };
        aInp.onkeyup = function () {
            var curCon = this.value;
            if (curCon.match(/^[A-Z]+$/) || curCon.match(/^[a-z]+$/) || curCon.match(/^[0-9]+$/) || curCon.match(/^(\W|[_])+$/)) {
                utils.addClass(pwSafe, "lose");
                oIEle.innerHTML = "弱";
            } else {
                if (curCon.match(/^[A-Za-z]+$/) || curCon.match(/^[A-Z0-9]+$/) || curCon.match(/^([A-Z_]|\W)+$/) || curCon.match(/^[0-9a-z]+$/) || curCon.match(/^([a-z_]|\W)+$/) || curCon.match(/^([0-9_]|\W)+$/)) {
                    utils.addClass(pwSafe, "mid");
                    oIEle.innerHTML = "中";
                } else {
                    if (curCon.match(/^[0-9A-Za-z]+$/) || curCon.match(/^([A-Za-z_]|\W)+$/) || curCon.match(/^([0-9a-z_]|\W)+$/) || curCon.match(/^([0-9A-Za-z_]|\W)+$/)) {
                        utils.addClass(pwSafe, "str");
                        oIEle.innerHTML = "强";
                    }
                }
            }
        }
    }

    //confirmPW - confirmpassword
    function confirmPW(curEle, safeArea) {
        var aInp = document.getElementById(curEle),
            _this = this,
            reg = /^([0-9A-Za-z_]|\W)+$/,
            pwSafe = document.getElementById(safeArea),
            oIEle = pwSafe.getElementsByTagName("p")[0];
        aInp.onfocus = function () {
            _this.focus.call(this, this);
            aInp.type = "password"
        };
        aInp.onblur = function () {
            var regPW = document.getElementById("reg_pw1");
            var label = utils.next(this),
                value = label.innerHTML,
                match = reg.test(this.value),
                error = utils.children(this.parentNode)[2];
            if (this.value === regPW.value) {
                if (this.value == "") {
                    utils.css(label, "display", "block");
                    utils.css(error, "display", "block");
                    utils.addClass(this.parentNode, "regEnrTxt_false");
                    utils.removeClass(this.parentNode, "regEnrTxt_focus");
                }
                utils.removeClass(this.parentNode, "regEnrTxt_focus");
            } else {
                utils.css(error, "display", "block");
                utils.addClass(this.parentNode, "regEnrTxt_false");
                utils.removeClass(this.parentNode, "regEnrTxt_focus");
            }
        };
    }

    //message-short_messge
    function message(curEle) {
        var aInp = document.getElementById(curEle),
            _this = this,
            reg = /^\d{4}$/;
        aInp.onfocus = function () {
            _this.focus.call(this, this);
        };
        aInp.onblur = function () {
            _this.blur.call(this, this, reg)
        };
    }

    //registerSex
    function registerSex(curEle) {
        var oDiv = document.getElementById(curEle);
        var aSpan = oDiv.getElementsByTagName("span");
        for (var i = 0, len = aSpan.length; i < len; i++) {
            var curSpan = aSpan[i];
            curSpan.index = i;
            curSpan.onclick = function () {
                var errorSex = utils.lastChild(oDiv);
                utils.css(errorSex, "display", "none");
                for (var i = 0; i < aSpan.length; i++) {
                    utils.removeClass(aSpan[i], "regChecked");
                }
                utils.addClass(aSpan[this.index], "regChecked")
            }
        }
    }

    //toggleLight-protocol
    function lightOff(curEle) {
        var oDiv = document.getElementById(curEle),
            flag = true;
        oDiv.onclick = function () {
            if (flag) {
                utils.removeClass(this, "on");
                flag = false;
            } else {
                utils.addClass(this, "on");
                flag = true;
            }
        }
    }

    //register
    function register(curEle) {
        var aEle = document.getElementById(curEle),
            regBox = document.getElementById("regBox"),
            oInput = regBox.getElementsByTagName("input"),
            regSex = document.getElementById("regSex"),
            oSpan = regSex.getElementsByTagName("span");
        aEle.onclick = function () {
            var flag = 1;
            for (var i = 0, len = oInput.length; i < len; i++) {
                var curInp = oInput[i],
                    error = utils.children(curInp.parentNode)[2];
                if (curInp.value == "") {
                    utils.css(error, "display", "block");
                    utils.addClass(this.parentNode, "regEnrTxt_false");
                    utils.removeClass(this.parentNode, "regEnrTxt_false");
                    utils.removeClass(this.parentNode, "regEnrTxt_focus");
                }
            }
            for (var j = 0; j < oSpan.length; j++) {
                if(oSpan[j].className == ""){
                    flag++;
                }
            }
            if (flag>2) {
                var errorSex = utils.lastChild(regSex);
                utils.css(errorSex, "display", "block");

            }
        }
    }

    //registerEmail
    function registerEmail(curEle) {
        var aInp = document.getElementById(curEle),
            _this = this,
            reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        aInp.onfocus = function () {
            _this.focus.call(this, this);
        };
        aInp.onblur = function () {
            _this.blur.call(this, this, reg)
        };
    }

    //eMailCode
    function eMailCode(curEle) {
        var aInp = document.getElementById(curEle),
            eCode = document.getElementById("eCodeCon"),
            _this = this,
            reg = /^[A-Za-z0-9]{4}$/;
        aInp.onfocus = function () {
            _this.focus.call(this, this);
        };
        aInp.onblur = function () {
            var label = utils.next(this),
                value = label.innerHTML,
                match = reg.test(this.value),
                error = utils.children(this.parentNode)[2];
            if (this.value == eCode.innerHTML) {
                utils.removeClass(this.parentNode, "regEnrTxt_focus");
            } else if (this.value == "") {
                utils.css(label, "display", "block");
                utils.css(error, "display", "block");
                utils.addClass(this.parentNode, "regEnrTxt_false");
                utils.removeClass(this.parentNode, "regEnrTxt_focus");
            } else {
                utils.css(error, "display", "block");
                utils.addClass(this.parentNode, "regEnrTxt_false");
                utils.removeClass(this.parentNode, "regEnrTxt_focus");
            }
        };
    }

    //getCode - verification code
    function getCode(curEle) {
        var aEle = document.getElementById(curEle),
            eCode = document.getElementById("eCodeCon"),
            strCode = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        aEle.onclick = function () {
            var str = "";
            for (var i = 0; i < 4; i++) {
                var getRan = random(0, 61);
                str += strCode.charAt(getRan)
            }
            eCode.innerHTML = str;
        };
        function random(n, m) {
            n = Number(n);
            m = Number(m);
            if (isNaN(n) || isNaN(m)) {
                return Math.random();
            }
            if (n > m) {
                var tmp = n;
                n = m;
                m = tmp;
            }
            return Math.round(Math.random() * (m - n) + n);
        }
    }

    //eRegister - email register
    function eRegister(curEle,outer){
        var aEle = document.getElementById(curEle),
            regBox = document.getElementById(outer),
            oInput = regBox.getElementsByTagName("input"),
            flag = true;

        aEle.onclick = function () {
            for (var i = 0, len = oInput.length; i < len; i++) {
                var curInp = oInput[i],
                    error = utils.children(curInp.parentNode)[2];
                if (curInp.value == "") {
                    utils.css(error, "display", "block");
                    utils.addClass(this.parentNode, "regEnrTxt_false");
                    utils.removeClass(this.parentNode, "regEnrTxt_false");
                    utils.removeClass(this.parentNode, "regEnrTxt_focus");
                }
            }
        }
    }

    //loginName - login userName
    function loginName(curEle){
        var aInp = document.getElementById(curEle),
            _this = this,
            reg = /(^1\d{10}$)|(^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$)/;
        aInp.onfocus = function () {
            _this.focus.call(this, this);
        };
        aInp.onblur = function () {
            _this.blur.call(this, this, reg)
        };
    }

    //loginPW -login passWord
    function loginPW(curEle){
        var aInp = document.getElementById(curEle),
            _this = this,
            reg = /^([0-9A-Za-z_]|\W){6,20}$/;
        aInp.onfocus = function () {
            _this.focus.call(this, this);
        };
        aInp.onblur = function () {
            _this.blur.call(this, this, reg);
            aInp.type = "password";
        };
        aInp.onkeydown = function(){
            aInp.type = "password";
        };
    }

    //lightOpen - login button
    function lightOpen(curEle) {
        var oDiv = document.getElementById(curEle),
            flag = false;
        oDiv.onclick = function () {
            if (flag) {
                utils.removeClass(this, "on");
                flag = false;
            } else {
                utils.addClass(this, "on");
                flag = true;
            }
        }
    }

    //homeUser - index userName
    function homeUser(curEle){
        var aInp = document.getElementById(curEle),
            value = aInp.value,
            reg = /(^1\d{10}$)|(^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$)/,
            error = utils.next(aInp);
        aInp.onfocus = function () {
            utils.css(error, "display", "none");
            if (this.value === "" || this.value === value) {
                this.value = "";
            }
        };
        aInp.onblur = function () {
            var match = reg.test(this.value);
            if (!match) {
                if (this.value == "" || this.value == value) {
                    this.value = value;
                }
                utils.css(error, "display", "block");
            } else{
                utils.css(error, "display", "none");
            }
        };
    }

    //homePW - index password
    function homePW(curEle){
        var aInp = document.getElementById(curEle),
            reg = /^([0-9A-Za-z_]|\W){6,20}$/,
            error = utils.next(aInp);
        aInp.onfocus = function () {
            utils.css(error, "display", "none");
        };
        aInp.onblur = function () {
            var match = reg.test(this.value);
            if (!match) {
                utils.css(error, "display", "block");
            } else{
                utils.css(error, "display", "none");
            }
        };
    }

    function homeLogin(curEle,outer){
        var aEle = document.getElementById(curEle),
            regBox = document.getElementById(outer),
            oInput = regBox.getElementsByTagName("input");
        aEle.onclick = function () {
            for (var i = 0, len = oInput.length; i < len; i++) {
                var curInp = oInput[i],
                    error = utils.next(curInp),
                    value = curInp.value;
                if (curInp.value == "") {
                    utils.css(error, "display", "block");
                }
            }
        }
    }

    return {
        focus: focus,
        blur: blur,
        registerPhone: registerPhone,
        registerPW: registerPW,
        confirmPW: confirmPW,
        message: message,
        registerSex: registerSex,
        lightOff: lightOff,
        register: register,
        registerEmail: registerEmail,
        eMailCode: eMailCode,
        getCode: getCode,
        eRegister:eRegister,
        loginName:loginName,
        loginPW:loginPW,
        lightOpen:lightOpen,
        homeUser:homeUser,
        homePW:homePW,
        homeLogin:homeLogin
    }
})();





