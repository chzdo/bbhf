<?php

namespace App\Exceptions;
use Throwable;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
      //  if($exception  instanceof ValidationException && $request->wantsJson()) {
          // return response()->json(['code'=> 0, 'message' => $exception->validator->errors()], 210);

    //   }
       if ( $exception instanceof MethodNotAllowedHttpException && $request->wantsJson()){
        return response()->json(['code'=> 0, 'message' => $exception->getMessage()], 215);
       }
        if ($exception instanceof ModelNotFoundException && $request->wantsJson()) {
            return response()->json(['code'=> 0, 'message' => 'Not Found!'], 404);
        }
        return parent::render($request, $exception);
    }
}
