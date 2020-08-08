<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
        <link rel="stylesheet" href="{{URL::asset('css/dist/css/bootstrap.min.css')}}" >
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />


       <link rel="stylesheet" href="{{URL::asset('css/header.css')}}" />
       <link rel="stylesheet" href="{{URL::asset('css/reactCSS.css')}}" />
       <link rel="icon" href="{{asset('images/icon-logo.png')}}" />
       <link rel="apple-touch-icon" href="{{asset('images/icon-logo.png')}}" />
      
       <link rel="dns-prefetch" href="//fonts.gstatic.com">
       <link href='https://fonts.googleapis.com/css?family=Felipa' rel='stylesheet'>
       <link href='https://fonts.googleapis.com/css?family=Alegreya Sans SC' rel='stylesheet'>     <title>Donate</title>
    </head>
    <body>
    
      
<?php 

?>

        <div class="react-head">
            @include('head')
        </div>
      
        <Donate id="donateBG" 
        @if($project != null)
        project={{ $project}}
        @endif
        @if($category != null)
        category={{ $category}}
        @endif
        
        path = {{ asset('images/')}}
        
        />
    
        <script src="{{   mix('js/app.js')}}" ></script>
        <script src="{{   asset('js/header.js')}}" ></script>
    </body>
    </html>
    
