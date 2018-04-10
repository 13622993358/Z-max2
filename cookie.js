/**
 * 作者：水君子
 */
var Z = function() {};
Z.prototype = {
	extend:function(tar,source) {
		for(var i in source){
			tar[i] = source[i];
		}
		return tar;
	}
}
Z = new Z();
Z.extend(Z,{
    // 获得url的某个参数值
	getUrl:function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]); return null;
    },
    // 返回删除特定名称的当前url
    delUrl:function(name){
        var loca = window.location;
        var baseUrl = loca.origin + loca.pathname + "?";
        var query = loca.search.substr(1);
        var url = '';
        var obj = {};
        var arr = query.split("&");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split("=");
                obj[arr[i][0]] = arr[i][1];
        };
        if (query.indexOf(name)>-1) {
            delete obj[name];
        }
        url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
        return url
    },
    // 删除指定cookie
    delCookie:function(name){
         var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    },
    //得到指定名称cookie
    getCookie:function(c_name){
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1){
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
    },
    // 设置cooike
    setCookie:function(c_name,value,expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/;";
    }
})