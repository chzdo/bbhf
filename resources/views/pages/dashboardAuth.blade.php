<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
        <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/dist/css/bootstrap.min.css'): asset('css/dist/css/bootstrap.min.css')}}" >
    
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

   <title>@yield('title')</title>
   <link rel="stylesheet" href="{{Route::has('https')?  secure_asset('css/header.css') : asset('css/header.css')}}" />
   <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/reactCSS.css') : asset('css/reactCSS.css')}}" />
      
     
      <link rel="icon" href="{{Route::has('https')? secure_asset('images/main-logo.png') : asset('images/main-logo.png')}}" />
      <link rel="apple-touch-icon" href="{{Route::has('https')? secure_asset('images/main-logo.png') : asset('images/main-logo.png')}}" />





       <link rel="dns-prefetch" href="//fonts.gstatic.com">
       <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro&family=Literata" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet">
      
          @yield('style')
          
    </head>
    <body>
    
      
<?php 

?>

<div class="join-container">

      <div class="side-image">
      <img class="logo-rotate" src="{{Route::has('https')? secure_asset('images/main-logo.png') : asset('images/main-logo.png')}}" style="width:100px; height:100px"/>
      <h6><strong>BLESSED TO BLESS HANDS FOUNDATION </strong></h6>
          <blockquote>
              Join us as we transform the world through Entrepenuership, Scholarships, Community Projecrs
          </blockquote>
          
      </div>
      <div class="react-dom">
          <div class="nav-holder">
              <a href="/" ><i class="fa fa-home float-right mr-5"></i></a>
          </div>
          <div 
              class="login-holder"
              >
              <div class="w-100" id="m-intro">
              <img class="logo-rotate" src="{{Route::has('https')? secure_asset('images/main-logo.png') : asset('images/main-logo.png')}}" style="width:80px; height:80px"/>
              <h6><strong>BLESSED TO BLESS HANDS FOUNDATION </strong></h6>
                  <blockquote>
                      Join us as we transform the world through Entrepenuership, Scholarships, Community Projecrs
                  </blockquote>
                </div> 
                @yield('content')
       
        </div>
      </div>

</div>
  



{{--

      <div class="donate-background">
          <div class="donate-background-overlay">
            @include('head')
  
      
        <Donate id="donateBG" 
        @if($project != null)
        project={{ $project}}
        @endif
        @if($category != null)
        category={{ $category}}
        @endif
        
        path = {{ asset('images/')}}
        
        />
          </div>
    </div>
    --}}
        <script src="{{   mix('js/app.js')}}" ></script>
        <script src="{{Route::has('https')? secure_asset('js/jquery.min.js'): asset('js/jquery.min.js')}}" ></script>
        <script src="{{Route::has('https')? secure_asset('js/header.js'): asset('js/header.js')}}" ></script>
    </body>
    </html>
    
