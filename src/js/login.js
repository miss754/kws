var button = document.querySelector('.but');
//绑定点击事件
button.onclick = function(){
    
    //获取输入框内容
    var user = document.querySelector('[name="user"]').value;
    var pass = document.querySelector('[name="pass"]').value;
    //使用ajax发送请求，并获取响应结果
    console.log(user);
    ajax({
        url:"../php/login.php",
        type: 'get',
        data:`user=${user}&pass=${pass}`,
        success:function(data){
           
            console.log(JSON.parse(data).code);
            if(JSON.parse(data).code=="1"){
                alert('登录成功')
                //登入成功之后，保存cookie账号，然后跳转到指定的页面
                setCookie('login', user, 2800) //n1是data里面传进来的账号
                location.href = "../pages/index1.html"
                var seaech = location.search
                //判断该地址参数是否存在

            }else{
                alert("账号密码错误")
            }
        }
    })
}