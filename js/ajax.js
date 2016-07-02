(function(){
   function ajax(options){
        var _default ={
            url: "",
            type: "get",
            async: true,
            data: null,
            success: null
        };
        for(var attr in options){
            if(options.hasOwnProperty(attr)){
                _default[attr] = options[attr];
            }
        }
        var xhr = new XMLHttpRequest;
        xhr.open(_default.type,_default.url,_default.async);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                var data = utils.jsonParse(xhr.responseText);
                if(typeof _default.success === "function"){
                    //console.log(_default.success);
                    _default.success.call(window,data);
                }
            }
        };
        xhr.send(_default.data)
    }
    this.ajax = ajax;
})();
