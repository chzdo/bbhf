<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class checkrole
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
      
        if(!Auth::user()->user->validRole()){
            Auth::logout();
         return redirect()->route('login')->withErrors(['message'=>'Unauthorized Access']);
        }
        return $next($request);
    }
}
