<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
      
           <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/dist/css/bootstrap.min.css'): asset('css/dist/css/bootstrap.min.css')}}" >
    
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

       <link rel="stylesheet" href="{{Route::has('https')? secure_asset('css/reactCSS.css') : asset('css/reactCSS.css')}}" />
     <link rel="stylesheet" href="{{Route::has('https')?  secure_asset('css/dash.css') : asset('css/dash.css')}}" />
     <link rel="stylesheet" href="{{Route::has('https')?  secure_asset('css/chat.css') : asset('css/chat.css')}}" />
       
        <link rel="icon" href="{{Route::has('https')? secure_asset('images/main-logo.png') : asset('images/main-logo.png')}}" />
        <link rel="apple-touch-icon" href="{{Route::has('https')? secure_asset('images/main-logo.png') : asset('images/main-logo.png')}}" />
       <link rel="dns-prefetch" href="//fonts.gstatic.com"> 

          <title>Dashboard</title>
    </head>
    <body>
     
     <div id="router"



     ></div>

     <script src="{{   mix('js/app.js')}}" ></script>
     
     <script src="{{Route::has('https')? secure_asset('js/jquery.min.js'): asset('js/jquery.min.js')}}" ></script>
     <script src="{{Route::has('https')?  secure_asset('css/dist/js/bootstrap.min.js') : asset('css/dist/js/bootstrap.min.js')}}" ></script>

        <script>
            window.Laravel = {
                csrfToken: "{{ csrf_token() }}"
            };
    </script>

    </body>

</html>
