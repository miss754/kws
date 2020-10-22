<?php
header('content-type:text/html;charset=utf-8');
//连接数据库
$link=mysqli_connect('localhost','root','root','goods');
//设置编码
mysqli_set_charset($link,'utf8');
//获取表单中的提交信息
$uname=$_GET['user'];
$upass=$_GET['pass'];

//先查询这账号是否被注册过
//sql语句
$sql="SELECT * FROM `input` WHERE `username`='$uname'";
//执行sql语句

$result=mysqli_query($link,$sql);

//判断result结果集中有没有数据
if(mysqli_fetch_row($result)){
    echo '1';
}else{
    //没有注册的话那就注册，那就是向数据表中添加内容
    //sql语句2
    $sql2="INSERT INTO `input` (`username`,`password`) VALUES ('$uname','$upass')";
    //执行sql2语句
    mysqli_query($link,$sql2);
    echo '0';
}
// mysqli_close($link);
?>
