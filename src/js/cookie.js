//获取cookie
function getCookie(key){
    //获取所有cookie内容
    var cookies=document.cookie
    //分割字符串，转为数组存储
    var ar1=cookies.split('; ')
    var str1=''
    // console.log(ar1)
    //遍历数组中每个元素
    ar1.forEach(function(item,index){
        //再次分割数组元素
        var ar2=item.split('=')
        //判断传入的键名是否存在与保存好的cookie中
        if(key==ar2[0]){
            str1=ar2[1]
        }
    })
    return str1

}
//设置cookie
function setCookie(key,value,t1){
    //获取当前时间
    var d1=new Date()
    //设置保存时间
    var exp=d1.getTime()-1000*60*60*8+1000*t1
    console.log(exp)
    document.cookie=`${key}=${value};expires=${new Date(exp)}`
}
//删除cookie
function deleteCookie(key){
    setCookie(key,1,-1)
}