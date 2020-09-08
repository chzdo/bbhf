<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">

        <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/dist/css/bootstrap.min.css'): asset('css/dist/css/bootstrap.min.css')}}" >
        
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
       <link rel="stylesheet" href="{{Route::has('https')?  secure_asset('css/styles.css') : asset('css/styles.css')}}" />
       <link rel="stylesheet" href="{{Route::has('https')?  secure_asset('css/header.css') : asset('css/header.css')}}" />
       <link rel="stylesheet" href="{{Route::has('https')?  secure_asset('css/flicky.css') : asset('css/flicky.css')}}" />
          <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/owl.carousel.min.css'): asset('css/owl.carousel.min.css') }}" />
          <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/owl.theme.default.css') : asset('css/owl.theme.default.css')}}" />
       <link rel="icon" href="{{Route::has('https')? secure_asset('images/icon-logo.png') : asset('images/icon-logo.png')}}" />
       <link rel="apple-touch-icon" href="{{Route::has('https')? secure_asset('images/icon-logo.png') : asset('images/icon-logo.png')}}" />
       <link rel="dns-prefetch" href="//fonts.gstatic.com"> 
       <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro&family=Literata" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet">
          <title>@yield('title')</title>
    </head>
    <body>
     
     @yield('head')
     
@yield('body')


@include('footer')



<script src="{{Route::has('https')? secure_asset('js/jquery.min.js'): asset('js/jquery.min.js')}}" ></script>
   <script src="{{Route::has('https')?  secure_asset('css/dist/js/bootstrap.min.js') : asset('css/dist/js/bootstrap.min.js')}}" ></script>
     

        <script src="{{Route::has('https')? secure_asset('js/flicky.js') : asset('js/flicky.js')}}" ></script>
        <script src="{{Route::has('https')? secure_asset('js/animationCounter.js') : asset('js/animationCounter.js')}}" ></script>
        <script src="{{Route::has('https')? secure_asset('js/owl.carousel.min.js') :asset('js/owl.carousel.min.js')}}" ></script>
        <script src="{{Route::has('https')?  secure_asset('js/active.js'):asset('js/active.js')}}" ></script>
      
      
        @stack('headerJs')

    </body>

</html>
