<?php
header('content-type:text/html;charset=utf-8');
$u=$_GET['user'];
$p=$_GET['pass'];

//连接数据库
$link=mysqli_connect('localhost','root','','goods');
//设置编码
mysqli_set_charset($link,'utf8');

//SQL语句
$sql="select * from input where username='$u' and password='$p'";

//执行SQL
$result=mysqli_query($link,$sql);
//判断结果集中是否有数据
if(mysqli_fetch_row($result)){
    echo '1';
}else{
    echo '0';
}

mysqli_close($link);
?>