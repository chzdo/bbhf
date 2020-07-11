



window.onscroll = ()=>{
$height = $(".jk-slider").height() + $(".navigator").height() -100;
$img = $("#logo-icon");
  console.log($height);
  $curScrollHeight = window.pageYOffset;
  console.log($curScrollHeight);
  if ($curScrollHeight > $height){
      console.log("gretaer")
    $(".navigator").addClass('nav-fixed');
    $("#logo-icon").attr("src","../images/nav-icon.png")
  }else{
    $(".navigator").removeClass('nav-fixed');
    $("#logo-icon").attr("src","../images/nav-icon-200.png")
  }

}
