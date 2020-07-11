

console.log("i eneterd")

window.onscroll = ()=>{
$height = $(".jk-slider").height() + $(".navigator").height() -100;
  console.log($height);
  $curScrollHeight = window.pageYOffset;
  console.log($curScrollHeight);
  if ($curScrollHeight > $height){
      console.log("gretaer")
    $(".navigator").addClass('nav-fixed');
  }else{
    $(".navigator").removeClass('nav-fixed');
  }

}