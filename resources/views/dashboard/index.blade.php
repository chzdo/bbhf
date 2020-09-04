<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
        <link rel="stylesheet" href="{{URL::asset('css/dist/css/bootstrap.min.css')}}" >
        <link rel="stylesheet" href="{{URL::asset('css/reactCSS.css')}}" >
        <link rel="stylesheet" href="{{URL::asset('css/dash.css')}}" >
        <link rel="stylesheet" href="{{URL::asset('css/chat.css')}}" >
           <link rel="icon" href="{{asset('images/icon-logo.png')}}" />
       <link rel="apple-touch-icon" href="{{asset('images/icon-logo.png')}}" />
       <link rel="dns-prefetch" href="//fonts.gstatic.com"> 

          <title>Dashboard</title>
    </head>
    <body>
     
     <div id="router"



     ></div>

     <script src="{{   mix('js/app.js')}}" ></script>
     
        <script src="{{URL::asset('css/dist/js/bootstrap.min.js')}}" ></script>
        <script src="{{URL::asset('js/jquery.min.js')}}" ></script>

        <script>
            window.Laravel = {
                csrfToken: "{{ csrf_token() }}"
            };
    </script>

    </body>

</html>
