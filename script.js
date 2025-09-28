$(document).ready(function(){
let a=$("#num1");
let b=$("#num2");
let result=$("#result");
$("#add").click(function(){
result.val(parseFloat(a.val())+parseFloat(b.val()));
});
}); 