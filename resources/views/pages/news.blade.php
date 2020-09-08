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
                            <img src="{{asset('images/people-children-slippers.jpg')}}"  class='news-image'/>
                        </div>
                        <div class="latest-news-main-heading  col-md-4">
                            <div class="service-news">
                            Community development
                            </div>
                            <div class="heading-news">
                              Bore Hole For Borno Community
                              </div>
                              <div class="brief-news">
                                  Six thousand powered air-purifying respirators, or PAPRs, donated by 3M, equip health workers across the U.S. California’s Imperial County, hard-hit by Covid-19, receives the largest industries and so on
                                   </div>
                                  <a  class="continue-link" href="#">
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
         <a class="new-link " href="#">
        
                    <img src="{{asset('images/people-children-slippers.jpg')}}"  class='news-image-mini'/>
                   
                 
                <div class="holder-headline">
                    <div class="service-news">
                        Community development
                        </div>
                        <div class="mini">
                          Bore Hole For Borno Community     Bore Hole For Borno Community
                          </div>
                          <div class="time">
                           27 Aug 2020
                            </div>
             

             </div>

         </a>

         <a class="new-link " href="#">
        
            <img src="{{asset('images/people-children-slippers.jpg')}}"  class='news-image-mini'/>
           
         
        <div class="holder-headline">
            <div class="service-news">
                Community development
                </div>
                <div class="mini">
                  Bore Hole For Borno Community     Bore Hole For Borno Community
                  </div>
                  <div class="time">
                   27 Aug 2020
                    </div>
     

     </div>

 </a>
 <a class="new-link " href="#">
        
    <img src="{{asset('images/people-children-slippers.jpg')}}"  class='news-image-mini'/>
   
 
<div class="holder-headline">
    <div class="service-news">
        Community development
        </div>
        <div class="mini">
          Bore Hole For Borno Community     Bore Hole For Borno Community
          </div>
          <div class="time">
           27 Aug 2020
            </div>


</div>

</a>
    </div>
 </section>
</div>

@endsection
@push('headerJs')
<script src="{{Route::has('https')? secure_asset('js/header.js'): asset('js/header.js')}}" ></script>
<script src="{{Route::has('https')? secure_asset('js/body.js'): asset('js/body.js')}}" ></script>

@endpush