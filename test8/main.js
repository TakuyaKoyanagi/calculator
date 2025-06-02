$(function(){
    $('.humberger').on("click",function(){
        if ($('.stick').css('opacity')==1){
            $('.stick').animate({'opacity':'0'},500);
            $('.batu').animate({'opacity':'1'},500);
            $('.humberger-menu').animate({'opacity':'1'},500);
            $('.head-logo').animate({'color':'#ffffff'},500)
        }
        else{
            $('.stick').animate({'opacity':'1'},500);
            $('.batu').animate({'opacity':'0'},500);
            $('.humberger-menu').animate({'opacity':'0'},500);
            $('.head-logo').animate({'color':'red'},500);
        }
    })
})