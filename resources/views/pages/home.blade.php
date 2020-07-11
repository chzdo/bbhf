@extends('main')

@section('title','Home')

@section('head')

@include('head')
@include('slide')


@endsection

@section('body')

<div class="home-container">
hello

</div>



@endsection

@push('headerJs')
<script  src="{{ asset('js/header.js')}}"></script>
@endpush