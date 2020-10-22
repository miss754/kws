<?php
header('content-type:text/html;charset=utf-8');
$uname=$_GET['user'];
$upass=$_GET['pass'];

//连接数据库
$link=mysqli_connect('localhost','root','root','goods');
//设置编码
mysqli_set_charset($link,'utf8');

//SQL语句
$sql="SELECT * FROM `input` WHERE `username`='$uname' AND `password`='$upass'";

//执行SQL
$result=mysqli_query($link,$sql); 

//查询操作的结果需要解析
$row=mysqli_fetch_assoc($result);

//判断结果集中是否有数据
if($row){
    //如果有值，就返回1和用户名
    $arr = array('code'=>1,'un'=>$uname);
    //echo '1';
}else{
    //如果没有值，就返回0和用户名密码错误
    $arr = array('code'=>0,'msg'=>'用户名密码错误');
    //echo '0';
};

echo json_encode($arr); //把php的数据格式(关联型数组)转换成json字符串

//断开数据库链接
mysqli_close($link);
?>