<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    
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



        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

        <script src="{{URL::asset('js/flicky.js')}}" ></script>
        <script src="{{URL::asset('js/animationCounter.js')}}" ></script>
        <script src="{{URL::asset('js/owl.carousel.min.js')}}" ></script>
        <script src="{{URL::asset('js/active.js')}}" ></script>
      
      
        @stack('headerJs')

    </body>

</html>
