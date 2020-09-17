<header>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" >
      
<nav class="navigator">
<div class="icon-holder">
<img id="logo-icon" src="{{URL::asset('images/nav-icon-200.png')}}" />
</div>
<div class="nav-link-holder" >
<a class="nav-link active" href="/" > Home </a>
<a class="nav-link active" href="{{ route('about')}}" > About </a>
 <div class="drpdwn">
 <a class="nav-link  " href="#" > Services <i class="fa fa-chevron-down"></i>



 </a>
@inject('category','App\category')
<?php 

$temp = \App\category::all() ?>
 <ul class="sub-menu">
@foreach ($temp as $item)
<li class="sub-menu-item">
<a href="/services/{{ base64_encode($item->category)}}" >{{ $item->category }}</a>
 </li>
@endforeach
 </ul>

</div>

 <a class="nav-link active" href="/news" > News </a>
 <a class="nav-link active" href="#" id="contact"> Contact </a>
 @if (Auth::check())
 <a class="link-button" href="/dashboard/login/in/" >{{ Auth::user()->user->first_name}}  </a>
 @else
 <a class="link-button" href="/dashboard/login" >join us </a>
 @endif
</div>
<a href="javascript:void(0)" data-role="mobile-nav" onclick="$( ()=>{ $('#scrollspy').hide(); $('.mobile-nav').css('display','flex'); $('html,body').css({overflow:'hidden', width: '100%'})})"  ><i style='font-size:1.2em' class="zmdi zmdi-menu " ></i></a>
</nav>

<nav class="mobile-nav"  >
<a href="javascript:void(0)" data-role="mobile-nav-close" onclick="$( ()=>{ $('#scrollspy').show(); $('.mobile-nav').css('display','none'); $('html,body').css({overflow:'auto', width: '100%'})})"  >  <i style='font-size:1.2em'class="zmdi zmdi-close-circle" ></i></a>

</nav>

</header>
