@extends('main')
@section('title',$news['title'])
@section('head')

@include('head')
@include('minislide')



@endsection

@section('body')
<link rel="stylesheet" href="{{Route::has('https')?  secure_asset('css/n.css') : asset('css/flicky.css')}}" />
<div class="home-container ">
    <section class="section-news">
    <div class="latest-news-cont">
     
      <div class="latest-news-main row">
  
        <div class="col-lg-8 col-md-8 col-sm-8">
            <div class="middle_content">
            
              <div class="single_page_area">
                <h1>{{ $news['title'] ?? ''}}</h1>
                 <div class="single_content">
                    <img src="{{$news['image'] ?? ''}}"  class='news-image'/>
                  
        {!!  $news['publication'] ?? '' !!}

     
                </div>
              </div>
            </div>
           
           
          </div>  
          <div class="col-lg-4 col-md-4 ">
            <div class="right_sidebar">
              <div class="single_widget">
                <h2>Apply</h2>
             
              <form method="post" action='/opportunities/apply' enctype="multipart/form-data">
                @csrf
                 <input class="input form-control m-1" id="fullname" name="fullname" placeholder="Full Name" type="text" value="{{old('fullname')}}" />
                 @error('fullname')
                     <span > {{$message}} </span>
                 @enderror
                 <input class="input form-control m-1" id="phone_number" name="phone_number" placeholder="Phone Number" value="{{old('phone_number')}}" type="number" minlength="11" maxlength="11"/>
                 @error('phone_number')
                 <span > {{$message}} </span>
             @enderror
                 <input class="input form-control m-1" id="email" name="email" placeholder="Email" type="email" value="{{old('email')}}" />
                 @error('email')
                 <span > {{$message}} </span>
             @enderror
                 <input class="input form-control m-1" id="file" name="file" placeholder="select file" type="file" value="{{old('file')}}" />
                 @error('file')
                 <span > {{$message}} </span>
             @enderror
              <input class="input form-control" id="grant" name="grant" placeholder="grant" type="hidden"  value='{{$news['id']}}'  /><br>
                 <button class="btn btn-success"> Apply </button>
              </form>
              @if (session('message'))
              <br>
            <span class="alert alert-info">{{session('message')}}</span>
              @endif
            </div>
          </div>         
                          
    </div>
      </div>
    </section>


</div>

@endsection
@push('headerJs')
<script src="{{Route::has('https')? secure_asset('js/header.js'): asset('js/header.js')}}" ></script>
<script src="{{Route::has('https')? secure_asset('js/body.js'): asset('js/body.js')}}" ></script>

@endpush