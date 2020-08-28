@extends('pages.dashboardAuth')
@section('title','Reset Password')
@section('style')
<style>

    </style>
  @endsection

  @section('content')
   <Join id="reset"
  hash = {{$hash ?? ''}}
  
  />@endsection