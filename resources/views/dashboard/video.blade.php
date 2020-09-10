<!DOCTYPE html>

<head>
    <title>Zoom WebSDK</title>
    <meta charset="utf-8" />
    <link type="text/css" rel="stylesheet" href="https://source.zoom.us/1.8.0/css/bootstrap.css" />
    <link type="text/css" rel="stylesheet" href="https://source.zoom.us/1.8.0/css/react-select.css" />
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="origin-trial" content="">
</head>

<body>
    <script src="https://source.zoom.us/1.8.0/lib/vendor/react.min.js"></script>
    <script src="https://source.zoom.us/1.8.0/lib/vendor/react-dom.min.js"></script>
    <script src="https://source.zoom.us/1.8.0/lib/vendor/redux.min.js"></script>
    <script src="https://source.zoom.us/1.8.0/lib/vendor/redux-thunk.min.js"></script>
    <script src="https://source.zoom.us/1.8.0/lib/vendor/jquery.min.js"></script>
    <script src="https://source.zoom.us/1.8.0/lib/vendor/lodash.min.js"></script>
    <script src="https://source.zoom.us/zoom-meeting-1.8.0.min.js"></script>
  
    <script src="{{Route::has('https')?  secure_asset('js/tool.js'):asset('js/tool.js')}}" ></script>
    <script src="{{Route::has('https')?  secure_asset('js/vconsole.min.js'):asset('js/vconsole.min.js')}}" ></script>
    <script src="{{Route::has('https')?  secure_asset('js/meeting.js'):asset('js/meeting.js')}}" ></script>
    <script>
        const simd = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 9, 1, 7, 0, 65, 0, 253, 15, 26, 11]))
        simd().then((res) => {
          console.log("simd check", res);
        });
    </script>
</body>

</html>