



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


