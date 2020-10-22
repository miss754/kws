// 一打开购物车页面,展示购物车里面的商品
showTbody();
function showTbody(){
    $.ajax({
        url:'http://localhost/kewosi/src/php/showlist.php',
        success:function(res){
            if(res.code){
                var arr = res.data;
                if(res.data){
                    //如果有商品,table显示,div隐藏
                    $('table').show();
                    $('div').hide();
                    //在table里面展示商品信息
                    $('tbody').empty();
                    $.each(arr,function(index,item){
                        $('tbody').append(`<tr id="${item.product_id}">
                            <td>${item.product_name}</td>
                            <td>
                                <img src="${item.product_img}" alt="">
                            </td>
                            <td>${item.product_price}</td>
                            <td>
                                <span class='add'>+</span>
                                <span>${item.product_num}</span>
                                <span class="jian">-</span>
                            </td>
                            <td class="del">删除</td>
                        </tr>`)
                    })
                }              

                
            }else{
                //如果没有商品,table隐藏,div显示
                $('table').hide();
                $('div').show();                       
            } 
        },
        dataType:'json',
        cache:false
    })
}

// 点击+增加一个商品数量,点击-减少一个商品数量
$('tbody').click(function(e){
    var target = e.target;
    // target是一个dom节点
    if((target.className=='add')||(target.className=='jian')){
        // 点击+增加一个商品数量,点击-减少一个商品数量
        $.ajax({
            url:'http://localhost/kewosi/src/php/updatewq.php',
            data:{
                type:target.className,
                id:$(target).parents('tr').attr('id')
            },
            success:function(res){
                if(res.code){
                    showTbody()
                }
            },
            dataType:'json'
        })

    }else if(target.className=='del'){
        // 点击删除按钮删除一个商品
        $.ajax({
            url:'http://localhost/kewosi/src/php/delwq.php',
            data:{
                id:$(target).parents('tr').attr('id')
            },
            success:function(res){
                if(res.code){
                    showTbody()
                }
            },
            dataType:'json'
        })
    }
})