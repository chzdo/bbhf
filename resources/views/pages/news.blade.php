@extends('main')
@section('title',"News")
@section('head')

@include('head')
@include('minislide')



@endsection

@section('body')
<div class="home-container ">
    <section class="section-news">
    <div class="latest-news-cont">
      <h3 class="lastest-news-head section-header pt-2">
          LATEST NEWS
      </h3>
      <div class="latest-news-main row">
  
                        <div class="col-md-8">
                            <img src="{{$latest['image_1']}}"  class='news-image'/>
                        </div>
                        <div class="latest-news-main-heading  col-md-4">
                            <div class="service-news">
                                @foreach($latest['author'] as $author)  by    {{ strtoupper($author['first_name'].' '.$author['last_name'] )}}@endforeach<br>
                                @foreach($latest['category'] as $cat)      {{$cat['category']}}  @endforeach<br>
                                <small>  {{ Carbon\Carbon::parse($latest['created_at'])->format('d-m-y') }}</small>
                            </div>
                            <div class="heading-news">
                                
                                {{strtoupper($latest['title']) }} 
                              </div>
                              <div class="brief-news">
                                {!! $latest['news'] !!}
                                </div>
                                  <a  class="continue-link mt-3" href="#">
                                      Read More
                                      </a>
                                      </div>

          </div>
      </div>
    </section>
<section class="section-news">
       <div class="sch_alert">

           <a class="continue-link sch-btn bg-danger" href="#"> Read More </a>
       </div>
</section>
<section class="section-news">
        
    <div class="news-holder">
        <div class="section-header-wrapper mb-5">
            <div class="section-header">
                More news
                
            </div></div>

            @foreach($more['data'] as $new)
         <a class="new-link " href='/news/full/{{$new['id']}}'>
        
                    <img src="{{$new['image_1']}}"  class='news-image-mini'/>
                   
                 
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

<div class="row">
    <div class="col-md-6 w-100 mx-auto flex-row">

        <a href={{$more['first_page_url']}} class='btn donate-btn m-1'> First Page </a>
        <a href={{$more['prev_page_url']}} class='btn donate-btn m-1'> prev page</a>
        
        <a href={{$more['next_page_url']}} class='btn donate-btn m-1'> next page</a>
        <a href={{$more['last_page_url']}} class='btn donate-btn m-1'> last page</a>
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