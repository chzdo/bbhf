@extends('main')

@section('title','Home')

@section('head')

@include('head')
@include('slide')


@endsection

@section('body')


<div class="home-container">
<section class="section">
 <div class="section-wrapper">
    <div class="section-header-wrapper">
      <div class="section-header">
          OUR ACTIVITIES
      </div>
      <div class="section-description">
          Blessed to Bless Hands Foundation (BBHF) exist to through effective partnerships with individuals and corporate organisations meet health, social, educational, communal and 
          spiritual needs of all people especially Africa.
    </div>
</div>


    <div class="card-holder our_cuauses_single owl-carousel owl-theme"   >
        
              <div class="card-item ">
                  
                  <div class="card-item-image">
                  </div>
                  <div class="card-item-body">
                      <p class="card-item-body-header">
                          SCHOLARSHIPS
                      </p>
                      <p class="card-item-body-article">
                        We organise evangelical outreaches with permission from leaders of a community in conjunction with the local church in the community where we share the message of the goodness of Jesus Christ leading them to salvation in Jesus Christ name.
                      </p>
                </div>
              </div>
              
              <div class="card-item">
                  
                <div class="card-item-image">
                </div>
                <div class="card-item-body">
                    <p class="card-item-body-header">
                        SCHOLARSHIPS
                    </p>
                    <p class="card-item-body-article">
                      We organise evangelical outreaches with permission from leaders of a community in conjunction with the local church in the community where we share the message of the goodness of Jesus Christ leading them to salvation in Jesus Christ name.
                    </p>
              </div>
            </div>
            
            <div class="card-item">
                  
                <div class="card-item-image">
                </div>
                <div class="card-item-body">
                    <p class="card-item-body-header">
                        SCHOLARSHIPS
                    </p>
                    <p class="card-item-body-article">
                      We organise evangelical outreaches with permission from leaders of a community in conjunction with the local church in the community where we share the message of the goodness of Jesus Christ leading them to salvation in Jesus Christ name.
                    </p>
              </div>
            </div>
            
            <div class="card-item">
                  
                <div class="card-item-image">
                </div>
                <div class="card-item-body">
                    <p class="card-item-body-header">
                        SCHOLARSHIPS
                    </p>
                    <p class="card-item-body-article">
                      We organise evangelical outreaches with permission from leaders of a community in conjunction with the local church in the community where we share the message of the goodness of Jesus Christ leading them to salvation in Jesus Christ name.
                    </p>
              </div>
            </div>
            
            <div class="card-item">
                  
                <div class="card-item-image">
                </div>
                <div class="card-item-body">
                    <p class="card-item-body-header">
                        SCHOLARSHIPS
                    </p>
                    <p class="card-item-body-article">
                      We organise evangelical outreaches with permission from leaders of a community in conjunction with the local church in the community where we share the message of the goodness of Jesus Christ leading them to salvation in Jesus Christ name.
                    </p>
              </div>
            </div>
    </div>
    
    </div>
    

  </section>
  <section class="section up" style="margin:0 !important; padding: 0 !important">
    <div class="">
       <div class="section-header-wrapper">
         <div class="section-header">
        URGENT PROJECT
         </div>
        
   </div>
   <div style="height:500px;">
    
   <div class="urgent-project">
          
   </div>
   <div class="project-container">
   
  
   
  <div class="project-description">
  <p class="project-description-header">
    Bore Hole for Gombe
</p>
<p class="project-description-article">
 We are commited to constructing a bore hole water supply for <strong> Gombe Community </strong>
</p>

<div class="raised-amount">
  <div class="progress-cont">
    <div class="progress-flo">
    </div>
  </div>
<div class="raised">
  <p> Goal - N6000 </p> <p> 50% </p> <p> Raised - N3000</p>
</div>
</div>
<a href="" class="donate-btn"> Donate </a>
</div>
</div>
</div>
   
       
       </div>
       
   </div>
     </section>
</div>



@endsection

@push('headerJs')
<script  src="{{ asset('js/header.js')}}"></script>
<script  src="{{ asset('js/body.js')}}"></script>
@endpush