@extends('main')
@section('title',"News")
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
                <h1>{{ $news['title']}}</h1>
              <div class="post_commentbox"><a ><i class="fa fa-user"></i> {{$news['author'][0]['first_name'].' '.$news['author'][0]['last_name']}}</a> <span><i class="fa fa-calendar"></i> {{ Carbon\Carbon::parse($news['created_at'])->format('d-m-y') }}</span> <a href="#"><i class="fa fa-tags"></i>{{$news['category'][0]['category']}}</a></div>
                <div class="single_content">
                    <img src="{{$news['image_1']}}"  class='news-image'/>
                  
        {!!  $news['news'] !!}

        <img src="{{$news['image_2']}}"  class='news-image'/>
                </div>
              </div>
            </div>
           
           
          </div>  
          <div class="col-lg-4 col-md-4 ">
            <div class="right_sidebar">
              <div class="single_widget">
                <h2>More Post</h2>
             
            @foreach($more as $new)
            <a class="new-link " href='/news/{{$new['id']}}'>
           
                       <img src="{{$new['image_1']}}"  class='news-image-mini' style='height:100px'/>
                      
                    
                   <div class="holder-headline">
                       <div class="service-news">
                           
                                   @foreach($new['category'] as $cat)      {{$cat['category']}}  @endforeach<br>
                               
                               
                           </div>
                           <div class="mini">
                            {{$new['title']}}
                             </div>
                             <div class="time">
                               @foreach($new['author'] as $author)  by    {{ strtoupper($author['first_name'].' '.$author['last_name'] )}}@endforeach<br>
                               <small>  {{ Carbon\Carbon::parse($new['created_at'])->format('d-m-y') }}</small>
                               </div>
                
   
                </div>
   
            </a>
   
       @endforeach
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