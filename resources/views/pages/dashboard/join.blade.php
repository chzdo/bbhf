@extends('pages.dashboardAuth')
@section('title','login')
@section('style')
<style>
body{
    overflow: hidden;
}
    </style>
  @endsection

  @section('content')
  @error('message')
  <div id="toast" class='
      toastRed

      show'
      >

       <div class="toast-head">
           <span id="">    FAILURE </span>

           <span id="toast-close" class=" fa fa-times-circle" onclick="$( ()=> $('#toast').removeClass().addClass('hide') )"></span>
       </div>
       <div className="toastBody">
         
          {{ $message }}
        
                        
       </div>
   </div>
   @enderror
   <Join id="jointag"



  />@endsection