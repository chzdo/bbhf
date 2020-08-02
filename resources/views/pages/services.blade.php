@extends('main')
@section('title',"About us")
@section('head')

@include('head')
@include('minislide')



@endsection

@section('body')
<nav id="scrollspy" class="scrollspy">
  <ul class="scrollspy-menu">
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[0]}}" href="#{{ Config::get('constants.services_route')[0]}}" class="dot active">
        <span>Community Development Projects</span>
      </a>
    </li>
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[1]}}" href="#{{ Config::get('constants.services_route')[1]}}" class="dot">
        <span>Entreprenuership and Grants</span>
      </a>
    </li>
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[2]}}" href="#{{ Config::get('constants.services_route')[2]}}"  class="dot">
        <span> Competitions and Scholarships</span>
      </a>
    </li>
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[3]}}" href="#{{ Config::get('constants.services_route')[3]}}"  class="dot">
        <span>Medical Mission Outreach</span>
      </a>
    </li>
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[4]}}" href="#{{ Config::get('constants.services_route')[4]}}"  class="dot">
        <span>Evangelical Outreach</span>
      </a>
    </li>
  
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[5]}}" href="#{{ Config::get('constants.services_route')[5]}}" class="dot">
        <span>Education</span>
      </a>
    </li>
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[6]}}" href="#{{ Config::get('constants.services_route')[6]}}"  class="dot">
        <span>Social Schemes</span>
      </a>
    </li>
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[7]}}" href="#{{ Config::get('constants.services_route')[7]}}"  class="dot">
        <span>Volunteering Programme</span>
      </a>
    </li>
  </ul>
</nav>
<div class="home-container">
  <section class="section " >
      <div class="section-wrapper ">
         <div class="section-header-wrapper ">
           <div class="section-header ">
          SERVICES  
           </div>        
         </div>
            

  
  </div>

</section>
</div>

@endsection
@push('headerJs')
<script  src="{{ asset('js/header.js')}}"></script>
<script  src="{{ asset('js/body.js')}}"></script>
@if($scroll)
<script>
  $(document).ready(()=>{
  let element = {!! json_encode($section) !!}
  $element = '#'+element
 console.log('top',element )
 link = $('.section-wrapper ');

 index = link.find($element).index()
 console.log(index);
  var target = link.children().eq(index-1)
//  alert(immediate.text())
console.log('target',target)

 console.log($('.navigator').height() );
   $value = (target.offset().top - (target.height()/2 ) ) - $('.navigator').height() 
   $scrolltype = (index == 1)? 0 :$value;

    $('html, body').animate({
      scrollTop: $scrolltype
    }, 600);
    console.log($value,'value',$scrolltype);
   // $(this).addClass('active');
});
</script>

@endif
@endpush