<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
        <link rel="stylesheet" href="{{URL::asset('css/dist/css/bootstrap.min.css')}}" >
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

       <link rel="stylesheet" href="{{URL::asset('css/styles.css')}}" />
       <link rel="stylesheet" href="{{URL::asset('css/email.css')}}" />

     
       <link rel="dns-prefetch" href="//fonts.gstatic.com"> 
       <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro&family=Literata" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet">
          <title>@yield('title')</title>
    </head>
    <body>
     
<div class="main-holder">
     <div class="inner-holder">
              <img src={{ asset('images/main-logo.png')}} />
              <h2> BLESSED TO BLESS HANDS FOUNDATION </h2>
              <div class="message">
                 <p> Dear Stanley, </p>
                 <p>
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                  Thank you for registrating with us. You profile link is 12909
                 </p>
              </div>
     </div>
     <hr>
     copyright BBHF 2020
</div>



        <script src="{{URL::asset('css/dist/js/jquery-3.3.1.min.js')}}" ></script>
        <script src="{{URL::asset('css/dist/js/bootstrap.min.js')}}" ></script>
     

        <script src="{{URL::asset('js/flicky.js')}}" ></script>
        <script src="{{URL::asset('js/animationCounter.js')}}" ></script>
        <script src="{{URL::asset('js/owl.carousel.min.js')}}" ></script>
        <script src="{{URL::asset('js/active.js')}}" ></script>
      
      
        @stack('headerJs')

    </body>

</html>
