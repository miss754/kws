
//获取操作对象
var small = document.querySelector('.small');//小图片盒子
var imgs = small.querySelectorAll('img')
var mask = document.querySelector('.mask');//遮藏层
var middel = document.querySelector('.middel');//左边图片框
var large = document.querySelector('.large');//右边放大图框
console.log(middel)
/*
        鼠标移入mask box 显现
        mask随鼠标移动 鼠标在中心
        显示右边的放大图
        鼠标移出mask box 隐藏
         */

//鼠标移入middle显现
middel.onmouseenter=function(){
    mask.style.display='block';
    large.style.display='block';
    console.log(111);
}

//鼠标移出middle消失
middel.onmouseleave=function(){
    mask.style.display='none';
    large.style.display='none';
}

//鼠标在middle里移动
middel.onmousemove=function(e){
    e = e || wiondow.event;
    //鼠标相对middle的位置
    var left1=e.pageX-middel.offsetLeft;
    /* console.log(left1)
    console.log(e.pageX)
    console.log(middel.offsetLeft) */
    var top1=e.pageY-middel.offsetTop;
    //为了让鼠标在mask中间
    left1=left1-mask.offsetWidth/2;
    top1=top1-mask.offsetHeight/2;
    //边界检测
    if(left1<0){
        left1=0;
    }
    if(left1>middel.offsetWidth-mask.offsetWidth){
        left1=middel.offsetWidth-mask.offsetWidth;
    }
    if(top1<0){
        top1=0;
    }
    if(top1>middel.offsetWidth-mask.offsetWidth){
        top1=middel.offsetWidth-mask.offsetWidth;
    }

    //赋值给mask使其在middle里面移动
    mask.style.left=left1+'px';
    mask.style.top=top1+'px';

     //显示右边的放大图
     // mask距离middle左边的距离/middel的总宽度 = maxImg距离large左边的距离/maxImg的总宽度
     //获取右边的大图对象
    var largeImg=large.querySelector('img');
    
    console.log(222)
    largeImg.style.left=-(left1*largeImg.offsetWidth/middel.offsetWidth)+'px';
    largeImg.style.top=-(top1*largeImg.offsetHeight/middel.offsetHeight)+'px';
}
console.log($('input').eq(2).val())

//点击购物车,把商品加入数据库
        $('button').eq(2).click(function(){
            $.ajax({
                url:'http://localhost/kewosi/src/php/addwq.php',
                data:{
                    id: '134324369',
                    name: $('h3').text(),
                    price: $('.box-right i').eq(0).text(),
                    img: '../images/img.3.jpg',
                    num: $('input').eq(2).val()
                },
                success:function(res){
                    console.log(res.code)
                    if(res.code){
                        alert('商品加入成功')
                    }    
                },
                dataType:'json'
            })
        })
        //点击查看购物车,进入购物车页面
        $('button').eq(3).click(function(){
            location.href="./shopping.html"
        })


/* //点击＋,改变数量
$('button').eq(1).click(function(){
    $.ajax({
        url:'http://localhost/kewosi/src/php/updatewq.php',
        data:{
            type:$(this).className,
            id:$(this).siblings('span').attr('id')
        },
        success:function(res){
            if(res.code){
                alert("商品加1")
            }
        },
        dataType:'json'
    })
})


//详情展示
function show(){

} */