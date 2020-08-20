

var footer = $('.footer-holder');
var $animation_elements = $('.section');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
 
  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
       //  console.log('viewport',element_top_position,window_top_position)
      $element.addClass('animate');
    } else {
 //       console.log('out viewport')
      $element.removeClass('animate');
    }
  });
  scrNav();
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

  
   link2 = $('#scrollspy li ');
 // console.log('helo')
  // Move to specific section when click on menu link
  link2.on('click', function(e) {
    link = $('#scrollspy li');
   index = $($(this)).index();
  var immediate = link.children().eq(index-1)
//  alert(immediate.text())

 var me = $($(this).children(0).attr('href'));
    var target = $(immediate.attr('href'));
 console.log($('.navigator').height() );
   $value = (target.offset().top - (target.outerHeight()/2 ) ) - $('.navigator').height() 
   $scrolltype = (index == 0)? 0 :$value;

    $('html, body').animate({
      scrollTop: $scrolltype
    }, 600);
  
    $(this).addClass('active');
    e.preventDefault();
  });
  
  // Run the scrNav when scroll
 
  
  // scrNav function 
  // Change active dot according to the active section in the window
  function scrNav() {
 
    link = $('#scrollspy a.dot');
    $('.write-up').each(function() {
      var id = $(this).attr('id')
      var $element = $(this);
      var height = element_height = $element.height();
      var offset = element_top_position = $element.offset().top  ;
      var element_bottom_position = ((element_top_position + element_height ));

      var window_height = $window.height();
      var sTop = window_top_position = $window.scrollTop();
      var window_bottom_position = (window_top_position + window_height)-100;
    //  console.log("window" ,window_height,window_top_position)
      if(footer.offset().top <= window_bottom_position ){
      
           $("#scrollspy").hide(1000);
         }else{
          $("#scrollspy").show(200);
         }
        //  console.log(id,"top",offset,"stop",sTop)
        //  console.log(id,offset,height,sTop)
      //  console.log(sTop >= offset && sTop < (offset + height))
      if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
    
         //  console.log(id ,element_height,element_top_position,element_top_position+element_height)
         
            $('.write-up').find('.section-sub-header').css({
    
          color: "rgba(100, 100, 100, 1)",

    
        })
       
        $element.find('.section-sub-header')
        .css({
          color: "rgba(250, 119, 11, 0.75)",
    
        })
        link.removeClass('active');
        $('#scrollspy').find('[data-scroll="' + id + '"]').addClass('active');
      }
    });
  }
  scrNav();
