<header>
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
 <a class="link-button" href="/donate" > join us </a>
</div>
<a href="javascript:void(0)" data-role="mobile-nav" onclick="$( ()=>{ $('#scrollspy').hide(); $('.mobile-nav').css('display','flex'); $('html,body').css({overflow:'hidden', width: '100%'})})"  > MENU  &nbsp; <i class="fa fa-bars" ></i></a>
</nav>

<nav class="mobile-nav"  >
<a href="javascript::void(0)" data-role="mobile-nav-close" onclick="$( ()=>{ $('#scrollspy').show(); $('.mobile-nav').css('display','none'); $('html,body').css({overflow:'auto', width: '100%'})})"  > CLOSE &nbsp; <i class="fa fa-times" ></i></a>

</nav>

</header>
