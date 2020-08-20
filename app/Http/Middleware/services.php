<?php

namespace App\Http\Middleware;

use Closure;
use App\category;
class services
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
      if ($request->section != null){
       $find = category::where('category',base64_decode($request->section))->firstorFail();
      }
        return $next($request);
    }
}
