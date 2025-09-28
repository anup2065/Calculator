let a=$("#num1");
let b=$("#num2");
let result=$("#result");
let add=$("#add");
let sub=$("#sub");
let mul=$("#mul");
let div=$("#div");
let mod=$("#mod");


$(document).ready(function()
{
 add.click(function(){
alert(a.val()+b.val());
 }) ;
});