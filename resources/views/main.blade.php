<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
        <link rel="stylesheet" href="{{URL::asset('css/dist/css/bootstrap.min.css')}}" >
        <script src="https://use.fontawesome.com/b684480b9d.js"></script>

       <link rel="stylesheet" href="{{URL::asset('css/styles.css')}}" />
       <link rel="stylesheet" href="{{URL::asset('css/header.css')}}" />

       <link rel="icon" href="{{asset('images/icon.jpg')}}" />
       <link rel="apple-touch-icon" href="{{asset('images/icon-logo.png')}}" />
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



        <script src="{{URL::asset('css/dist/js/jquery-3.3.1.min.js')}}" ></script>
        <script src="{{URL::asset('css/dist/js/bootstrap.min.js')}}" ></script>
     

 
      
      
        @stack('headerJs')

    </body>

</html>
