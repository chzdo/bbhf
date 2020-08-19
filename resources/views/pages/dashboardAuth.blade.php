<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
        <link rel="stylesheet" href="{{URL::asset('css/dist/css/bootstrap.min.css')}}" >
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

   <title>@yield('title')</title>
       <link rel="stylesheet" href="{{URL::asset('css/header.css')}}" />
       <link rel="stylesheet" href="{{URL::asset('css/reactCSS.css')}}" />
       <link rel="icon" href="{{asset('images/icon-logo.png')}}" />
       <link rel="apple-touch-icon" href="{{asset('images/icon-logo.png')}}" />
      
       <link rel="dns-prefetch" href="//fonts.gstatic.com">
       <link href='https://fonts.googleapis.com/css?family=Felipa' rel='stylesheet'>
       <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
      
          @yield('style')
          
    </head>
    <body>
    
      
<?php 

?>

<div class="join-container">

      <div class="side-image">
      <img class="logo-rotate" src="{{ asset('images/main-logo.png')}}" style="width:100px; height:100px"/>
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
              <img class="logo-rotate" src="{{ asset('images/main-logo.png')}}" style="width:80px; height:80px"/>
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
        <script src="{{   asset('js/header.js')}}" ></script>
    </body>
    </html>
    
