<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class admin
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
        $v = \App\login::find(Auth::user()->id)->user()->get()->first();
        if( $v->role_id != 4 && $request->expectsJson() ){
          
                return response()->json(['code'=>0,"message"=>"unauthorized access"]);
        }
        return $next($request);
    }
}
