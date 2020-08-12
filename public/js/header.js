



window.onscroll = ()=>{
$height = $(".jk-slider").height() + $(".navigator").height() -100;
$height2 = $(".mini-slide-overlay").height() + $(".navigator").height() -100;
//console.log($height2)
$img = $("#logo-icon");
  //console.log($height);
  $curScrollHeight = window.pageYOffset;
 // console.log($curScrollHeight);
  if ($curScrollHeight > $height || $curScrollHeight > $height2){
      //console.log("gretaer")
    $(".navigator").addClass('nav-fixed');
    $("#logo-icon").attr("src","../images/nav-icon.png")
  }else{
    $(".navigator").removeClass('nav-fixed');
    $("#logo-icon").attr("src","../images/nav-icon-200.png")
  }

}
$("#contact").click((e)=>{
  e.preventDefault();
  $('html, body').animate({
scrollTop: $('.footer-holder').offset().top
  },600)
})
$(".mobile-nav").append($('.navigator .nav-link-holder').html())
console.log($(".navigator").height())
$(".donate-container").css({
  //top:  parseInt($(".navigator").height()) 
       } )

   //   $donatecontainer = $(".donate-container").offset().top +  $(".donate-container").height();
    //  $dbg = $(".d-b").offset().top +  $(".donate-container").height();
    const dgb =  $("#d-bg").height();
    function dbgHeight(){
    let height = 0;
    if ($(window).height() >  $("#d-bg").height()){
      height = $(window).height()
    }else{
      height =  dgb + 10
    }
    $("#d-bg").css({
      height: height
    })
  }
   
  dbgHeight();
    var $window = $(window) ;
    $window.on('resize', dbgHeight);
     //  $window.trigger('scroll');