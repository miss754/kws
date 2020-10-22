function ajax(options){
    var default1={
        url:'', //请求地址
        type:'get',//请求方式
        data:'',//所传参数
        async:true,//是否异步
        success:function(){}, //请求成功的回调函数
        error1:function(){}//请求失败的回调函数
    }

    //使用所传参数替换默认参数
    for(var attr in options){
        default1[attr]=options[attr]
    }

    //创建ajax对象
    if(window.XMLHttpRequest){
        var xhr=new XMLHttpRequest()
    }else{
        var xhr=new ActiveXObject('Microsoft.XMLHTTP')
    }
    //判断是否有传递的参数
    if(default1.data){
        //判断请求方式
        if(default1.type.toLowerCase()=='get'){
            //配置请求信息
            xhr.open(default1.type,default1.url+'?'+default1.data,default1.async)
            //发送请求
            xhr.send()
        }else if(default1.type.toLowerCase()=='post'){
            //配置请求信息
            xhr.open(default1.type,default1.url,default1.async)
            //设置请求头
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
            //发送请求
            xhr.send(default1.data)
        }
    }else{
        //配置请求信息
        xhr.open(default1.type,default1.url,default1.async)
        //发送请求
        xhr.send()
    }
    //接收响应结果，并解析
    xhr.onreadystatechange=function(){
        //判断ajax状态是否结束
        if(xhr.readyState==4 && xhr.status==200){
            //调用请求成功的函数
            default1.success(xhr.responseText)
        }else{
            default1.error1(xhr.status)
        }
    }
}


//把ajax封装在promise中
function promiseAjax(options){
    //创建promise对象
    return new Promise(function(resolve,reject){
        var default1={
            url:'', //请求地址
            type:'get',//请求方式
            data:'',//所传参数
            async:true,//是否异步
            success:function(){}, //请求成功的回调函数
            error1:function(){}//请求失败的回调函数
        }
    
        //使用所传参数替换默认参数
        for(var attr in options){
            default1[attr]=options[attr]
        }
    
        //创建ajax对象
        if(window.XMLHttpRequest){
            var xhr=new XMLHttpRequest()
        }else{
            var xhr=new ActiveXObject('Microsoft.XMLHTTP')
        }
        //判断是否有传递的参数
        if(default1.data){
            //判断请求方式
            if(default1.type.toLowerCase()=='get'){
                //配置请求信息
                xhr.open(default1.type,default1.url+'?'+default1.data,default1.async)
                //发送请求
                xhr.send()
            }else if(default1.type.toLowerCase()=='post'){
                //配置请求信息
                xhr.open(default1.type,default1.url,default1.async)
                //设置请求头
                xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
                //发送请求
                xhr.send(default1.data)
            }
        }else{
            //配置请求信息
            xhr.open(default1.type,default1.url,default1.async)
            //发送请求
            xhr.send()
        }
        //接收响应结果，并解析
        xhr.onreadystatechange=function(){
            //判断ajax状态是否结束
            if(xhr.readyState==4){
                if(xhr.status==200){
                    //调用请求成功的函数
                    resolve(xhr.responseText)
                }else{
                    reject(xhr.status)
                }
            }
        }
    })
}