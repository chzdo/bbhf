<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="font-size: 12px">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
        <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/dist/css/bootstrap.min.css'): asset('css/dist/css/bootstrap.min.css')}}" >
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

     <link rel="stylesheet" href="{{Route::has('https')?  secure_asset('css/header.css') : asset('css/header.css')}}" />
     <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/reactCSS.css') : asset('css/reactCSS.css')}}" />
        
       
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
    </head>
    <body>
    
      
<?php 

?>
  <div id="d-bg">
    <div id="d-bg-overlay">
        @include('head')
  
  
    <Donate id="donateBG" 
    @if($project ?? '' != null)
    project={{ $project ?? ''}}
    @endif
    @if($category ?? '' != null)
    category={{ $category ?? ''}}
    @endif
    
    path = {{ asset('images/')  }}
    
    />
</div>
  </div>



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
        <script src="{{   mix('js/app.js')}}" ></script>
        <script src="{{Route::has('https')? secure_asset('js/header.js'): asset('js/header.js')}}" ></script>
    </body>
    </html>
    
