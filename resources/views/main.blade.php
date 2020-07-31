<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
        <link rel="stylesheet" href="{{URL::asset('css/dist/css/bootstrap.min.css')}}" >
        <link rel="stylesheet" href="{{URL::asset('fontawesome/css/all.css')}}" >
        <link rel="stylesheet" href="{{URL::asset('fontawesome/css/fontawesome.css')}}" >
        <link rel="stylesheet" href="{{URL::asset('fontawesome/css/all.min.css')}}" >
       <link rel="stylesheet" href="{{URL::asset('css/styles.css')}}" />
       <link rel="stylesheet" href="{{URL::asset('css/header.css')}}" />
       <link rel="stylesheet" href="{{URL::asset('css/flicky.css')}}" />
          <link rel="stylesheet" href="{{URL::asset('css/owl.carousel.min.css')}}" />
          <link rel="stylesheet" href="{{URL::asset('css/owl.theme.default.css')}}" />
       <link rel="icon" href="{{asset('images/icon.jpg')}}" />
       <link rel="apple-touch-icon" href="{{asset('images/icon.jpg')}}" />
       <link rel="dns-prefetch" href="//fonts.gstatic.com">
       <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro&family=Literata" rel="stylesheet">
          <title>@yield('title')</title>
    </head>
    <body>
     @yield('head')

@yield('body')


@include('footer')



        <script src="{{URL::asset('css/dist/js/jquery-3.3.1.min.js')}}" ></script>
        <script src="{{URL::asset('css/dist/js/bootstrap.min.js')}}" ></script>
        <script src="{{URL::asset('fontawesome/js/brands.js')}}" ></script>
        <script src="{{URL::asset('fontawesome/js/all.js')}}" ></script>

        <script src="{{URL::asset('js/flicky.js')}}" ></script>
        <script src="{{URL::asset('js/animationCounter.js')}}" ></script>
        <script src="{{URL::asset('js/owl.carousel.min.js')}}" ></script>
        <script src="{{URL::asset('js/active.js')}}" ></script>
      
      
        @stack('headerJs')

    </body>

</html>
