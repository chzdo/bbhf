<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="font-size: 12px">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
        <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/dist/css/bootstrap.min.css'): asset('css/dist/css/bootstrap.min.css')}}" >
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
     <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/reactCSS.css') : asset('css/reactCSS.css')}}" />
     <link rel="stylesheet" href="{{Route::has('https')?  secure_asset('css/header.css') : asset('css/header.css')}}" />
     <link rel="stylesheet" href="{{Route::has('https')?  secure_asset('css/styles.css') : asset('css/styles.css')}}" />
     <link rel="stylesheet" href="{{Route::has('https')?  secure_asset('css/flicky.css') : asset('css/flicky.css')}}" />
     <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/owl.carousel.min.css'): asset('css/owl.carousel.min.css') }}" />
     <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/owl.theme.default.css') : asset('css/owl.theme.default.css')}}" />
       
        <link rel="icon" href="{{Route::has('https')? secure_asset('images/main-logo.png') : asset('images/main-logo.png')}}" />
        <link rel="apple-touch-icon" href="{{Route::has('https')? secure_asset('images/main-logo.png') : asset('images/main-logo.png')}}" />
      
       <link rel="dns-prefetch" href="//fonts.gstatic.com">
       <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro&family=Literata" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet">
       <style>
         body,html{
           font-size:12px;
         }
         </style>
         <title> Grants </title>
    </head>
    <body>
    
      
<?php 

?>
  <div id="d-bg" style='width:100%; height:100%'>
    <div id="d-bg-overlay">
        @include('head')
        <div class="w-100 d-flex flex-column justify-content-center align-items-center text-bold text-white text-capitalize">
  <h2> Slide to check out more opportunities </h2>
  <span class="text-orange"> Scholarship, Grants, Competitions </span>
        </div>
        <section class="section" style="height:fit-content">
            <div class="section-wrapper" style='height:fit-content'>
        <div class="card-holder our_cuauses_single owl-carousel owl-theme"   >
          @foreach ($opp as $item)
          <div class="col-md-4 m-1 card-item" style="background: none">
              <a href='/opportunities/{{$item['id']}}'  > <img src={{$item['image']}}  style='width:300px ; height:300px' /> </a>
          </div>
          @endforeach
        </div>
  </div>
</div>
</section>


{{--

      <div class="donate-background">
          <div class="donate-background-overlay">
            @include('head')
  
      
        <Donate id="donateBG" 
        @if($project ?? '' != null)
        project={{ $project ?? ''}}
        @endif
        @if($category ?? '' != null)
        category={{ $category ?? ''}}
        @endif
        
        path = {{ asset('images/')}}
        
        />
          </div>
    </div>
    --}}
 
        <script src="{{Route::has('https')? secure_asset('js/header.js'): asset('js/header.js')}}" ></script>
        <script src="{{Route::has('https')? secure_asset('js/jquery.min.js'): asset('js/jquery.min.js')}}" ></script>
   <script src="{{Route::has('https')?  secure_asset('css/dist/js/bootstrap.min.js') : asset('css/dist/js/bootstrap.min.js')}}" ></script>
     

        <script src="{{Route::has('https')? secure_asset('js/flicky.js') : asset('js/flicky.js')}}" ></script>
        <script src="{{Route::has('https')? secure_asset('js/animationCounter.js') : asset('js/animationCounter.js')}}" ></script>
        <script src="{{Route::has('https')? secure_asset('js/owl.carousel.min.js') :asset('js/owl.carousel.min.js')}}" ></script>
        <script src="{{Route::has('https')?  secure_asset('js/active.js'):asset('js/active.js')}}" ></script>
    </body>
    </html>
    
