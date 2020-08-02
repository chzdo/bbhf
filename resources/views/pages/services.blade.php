@extends('main')
@section('title',"About us")
@section('head')

@include('head')
@include('minislide')



@endsection

@section('body')



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