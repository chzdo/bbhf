@extends('main')
@section('title',"Services")
@section('head')

@include('head')
@include('minislide')



@endsection

@section('body')
<nav id="scrollspy" class="scrollspy">
  <ul class="scrollspy-menu">
    <?php 

$temp = \App\category::all() ?>
    @foreach ($temp as $item)
    
    <li>
      <a data-scroll="{{ implode("_",explode(" ",$item->category))}}" href="#{{ implode("_",explode(" ",$item->category))}}" class="dot active">
        <span>{{ $item->category}}</span>
      </a>
    </li>
    @endforeach
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
            
@foreach ($temp as $item)
<div class="write-up " id="{{ implode("_",explode(" ",$item->category))}}">
  <div class="section-sub-header">       
  {{  $item->category }}
   </div>
 <div class="row p-3">
     <div class="col-md-3">
       <img src="{{asset($item->image)}}"  class='service-image'/>
      </div>
   <div class="col-md-9">
        <div class="main-write-up">
     {{ $item->write_up}}
    </div>
    <div class="btn-holder">
     <a class=" btn btn-bbhf bbhf-orange "  href='/donate/{{ base64_encode($item->category)}}'> Donate for this cause </a>
   
    </div>
   </div>
 </div>         
</div>
@endforeach
         
  



     




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