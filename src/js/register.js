/* //获取操作对象
var foot1 = document.querySelector('.foot1');
var bth1 = document.querySelector('.but1')
//给windwo绑定滚动事件
window.onscroll = function() {
    //获取当前滚动距离
    top1 = document.documentElement.scrollTop
        //判断如果滚动距离大于100显示
    if (top1 > 100) {
        foot1.style.display = 'block'

    } else {
        foot1.style.display = 'none'

    }
}
//点击事件
bth1.onclick = function() {
    //设置定时器让定时器帮我们一点一点往上面退
    var dsq = setInterval(function() {
        //创建每次要走的步长
        var speed = Math.ceil(top1 / 10)
            //设置滚动距离，把滚动距离赋值给文档对象
            //当前滚动距离减去步长
        document.documentElement.scrollTop = (top1 - speed)
            //判断滚动距离小于等于的时候关闭定时器
        if (top1 <= 0) {
            clearInterval(dsq)
        }
    }, 20)
} */



//获取操作对象
/* var bth = document.querySelector('.but');
var check1 = document.querySelector('[ name="check"]'); */
var form = document.querySelector('form');

//获取表单元素
var user = form[0];  //账号
var pass = form[1];  //密码
var butt = form[2];  //注册按钮
var check = form[3]; //勾选

var span1 = document.querySelector('.span1');
var span2 = document.querySelector('.span2');
console.log(span1);


//给账号输入框绑定失去焦点事件,当光标离开时光标不在跳跃
var u1 = false; //开关
user.onblur = function(){
    //获取输入框的值
    var val = user.value;
    //开始写正则表达式
    var reg = /^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/;
    //判断如果输入框的值正确就后面加一个提示信息
    if (reg.test(val)) {
        span1.innerHTML = '! 账号格式正确'
        span1.style.color="blue";
        //console.log(span1);
        butt.disabled = false; //不禁用
        u1 = true;
    }else{
        span1.innerHTML = '! 账号格式错误'
        console.log(span1);
        //如果错误给表单元素绑定一个焦点事件提示他重新输入
        user.focus();
        butt.disabled = false; //不禁用
        u1 = false;
    }
}

//给密码输入框绑定失去焦点事件,当光标离开时光标不在跳跃
var p1 = false; //开关
pass.onblur = function() {
    //获取表单元素的输入框
    var val = pass.value;
        //开始写正则表达式
        console.log(val);
        var reg=/^[a-z]+.{8,16}$/i;
        //开始判断如果输入框的值正确的话就提示
    if (reg.test(val)) {
        span2.innerHTML = '! 密码格式正确';
        span2.style.color="blue";
        butt.disabled = false; //不禁用
        p1 = true;
    } else {
        span2.innerHTML = '! 字母开头，不区分大小写';
        //当密码错误时，给表单元素绑定一个光标焦点事件
        pass.focus();
        butt.disabled = true; //禁用
        p1 = false;
    }
}

/* //注册按钮默认提交
butt.onsubmit=function(e){
    e = e || window.event
    //用户名和密码至少一个不符合规则，阻止默认跳转
    if(!(u1 && u1)){
        //阻止默认的跳转动作
        //e.preventDefault?e.preventDefault():e.returnValue=false;
        e.preventDefault?e.preventDefault():e.returnValue=fales;
        console.log(11);
    }
    console.log(11);
} */


//给注册按钮绑定一个提交事件
butt.onsubmit = function() {
    if (p1 && ur) {
        return true;
    } else {
        usr.onblur()
        pass.onblur()
        return false;
    }
}

//给选中框对象绑定一个点击事件
check.onclick = function() {
    //判断选项框是否被选中
    if (this.checked) {
        //如果被选中就让注册按钮的禁用取消
        butt.disabled = false;
        butt.style.background = '#2b86b2';
    } else {
        butt.disabled = true
            //如果没有选中就提示 
            // bth.style.background.color = ''
        butt.style.background = '#ccc'
    }
}


//注册按钮点击提交并跳转
butt.onclick = function() {
    //获取输入框的值
    var u1 = document.querySelector('[name="user"]').value;
    var p1 = document.querySelector('[ name="pass"]').value;
    ajax({
        url: '../php/register.php',
        type: 'get',
        data: `user=${u1}&pass=${p1}`,
        success: function(data) {
            console.log(data);
            if (data === '1' && butt.disabled == false) {
                console.log(data);
                alert('该账户已经有人注册');
            } else {
                alert('注册成功');
                console.log(111);
                location.href = '../pages/login.html'; 
            }
        }
    })
}