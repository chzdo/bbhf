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
                  
                  <div class="card-item-image" style="  background: url('../images/youth.jpg') ;  background-position: center;
                  background-size: cover;
                  background-repeat: no-repeat;">
                  </div>
                  <div class="card-item-body">
                      <p class="card-item-body-header">
                         empowerment
                      </p>
                      <p class="card-item-body-article">
                        We provide youths who are already empowered with skills but lack the start up capital to establish  a small and/ or  medium enterprises in the area they have undergone trainings with start up capital needed to start their own businesses.     </p>
                </div>
              </div>
              
              <div class="card-item">
                  
                <div class="card-item-image" style="  background: url('../images/training.jpg') ;  background-position: center;
                background-size: cover;
                background-repeat: no-repeat;">
                </div>
                <div class="card-item-body">
                    <p class="card-item-body-header">
                       Trainings
                    </p>
                    <p class="card-item-body-article">
                      We offer free entrepreneurship trainings to youths and provide some of the participants the start up capital to own and manage their own business thereby ensuring they are meaningful engaged and empowered to be productive for self, families and the society at large.    </p>
              </div>
            </div>
            
            <div class="card-item">
                  
              <div class="card-item-image" style="  background: url('../images/school2.jpg') ;  background-position: center;
              background-size: cover;
              background-repeat: no-repeat;">
                </div>
                <div class="card-item-body">
                    <p class="card-item-body-header">
                     rehabilitation
                    </p>
                    <p class="card-item-body-article">
                      We identify primary and high schools needing structural rehabilitation and renovate such thus making for an enabling atmosphere for learning.    </p>
              </div>
            </div>
            
            <div class="card-item">
              <div class="card-item-image" style="  background: url('../images/school.jpg') ;  background-position: center;
              background-size: cover;
              background-repeat: no-repeat;">
                </div>
                <div class="card-item-body">
                    <p class="card-item-body-header">
                       DEVELOPMENT
                    </p>
                    <p class="card-item-body-article">
                      We contruct free potable water supply to identified communities in  rural areas without such basic amenities which help make water accessible to the people  thereby improving their health and  preventing outbreak and/ or spread of communicable diseases.
                    </p>
              </div>
            </div>
            
            <div class="card-item">
                  
              <div class="card-item-image" style="  background: url('../images/medical2.jpg') ;  background-position: center;
              background-size: cover;
              background-repeat: no-repeat;">
                </div>
                <div class="card-item-body">
                    <p class="card-item-body-header">
                        Medical outreach
                    </p>
                    <p class="card-item-body-article">
                      We organise free medical mission outreaches for rural communities where there is no health facility or distance to available ones is a huge barrier to accessing them by the people.   </p>
              </div>
            </div>
            <div class="card-item">
                  
              <div class="card-item-image" style="  background: url('../images/vol.jpg') ;  background-position: center;
              background-size: cover;
              background-repeat: no-repeat;">
                </div>
                <div class="card-item-body">
                    <p class="card-item-body-header">
                       volunteering
                    </p>
                    <p class="card-item-body-article">
                      We run a volunteering community  programmes which affords young people who are residents  of a community the opportunity to offer social services to their communities of residence. </div>
            </div>
            <div class="card-item">
                  
              <div class="card-item-image" style="  background: url('../images/mission.jpg') ;  background-position: center;
              background-size: cover;
              background-repeat: no-repeat;">
                </div>
                <div class="card-item-body">
                    <p class="card-item-body-header">
                       Missions outreach
                    </p>
                    <p class="card-item-body-article">
                      We organise evangelical outreaches with permission from leaders of a community in conjunction with the local church in the community where we share the message of the goodness of Jesus Christ leading them to salvation in Jesus Christ name.</div>
    </div>
    
    </div>
    

  </section>
  <section class="section up" style="margin:0 !important; padding: 0 !important">


    <div class="">
       <div class="section-header-wrapper">
         <div class="section-header">
        URGENT PROJECT(S)
         </div>
        
   </div>
 
   @foreach($list as $alist)
  
  
   <div style="height:500px;" class="mb-5">
    
   <div class="urgent-project" style='background-image: url({{$alist->image}})'>
          
   </div>
   <div class="project-container">
   
  
   
  <div class="project-description">
  <p class="project-description-header">
    {{$alist->project}}
</p>
<p class="project-description-article">
  {{$alist->description}}
</p>
<?php 
$am = $alist->amount_raised;
 if($alist->amount_raised == null){
   $am = 0;
 }
 $per = round(((float)$am/(float)$alist->amount) * 100, 2) ;

?>
<div class="raised-amount">
  <div class="progress-cont">
    <div class="progress-flo" style='width:{{$per}}%'>
    </div>
  </div>
<div class="raised">
  <p> Goal - N {{number_format($alist->amount,2)}}</p> <p> {{$per}}% </p> <p> Raised - N{{number_format($am,2)}}</p>
</div>
</div>
<a href="/donate/{{$alist->category}}/{{$alist->id}}" class="donate-btn"> Donate </a>
</div>
</div>
</div>
@endforeach
   
       
       </div>
       

     </section>
     <section class="section " >
      <div class="section-wrapper ">
         <div class="section-header-wrapper">
           <div class="section-header">
          GET INVOLVED
           </div>
           <p class="card-item-body-article">
             Join us as we impact and add values to lives through giving
           </p>
     </div>
  
     <div class="member-card-holder">
          <div class="member-card">
          <img class="round-icon" src={{URL::asset('images/volunteer.png')}}>
            <p class="member-card-header"> VOLUNTEER </p>
            <p class="member-card-article">
              Are you passionate about impact and rendering services to your immediate community?
         </p>
         <a class="donate-btn donate-btn-orange" href="/dashboard/register"> JOIN NOW </a>
          </div>
          <div class="member-card">
            <img class="round-icon" src={{URL::asset('images/member.png')}}>
            <p class="member-card-header"> BECOME A MEMBER</p>
            <p class="member-card-article">
                 Join the BBHF team to changing lives through giving.
            </p>
            <a class="donate-btn donate-btn-orange" href="/dashboard/register"> JOIN NOW </a>
          </div>
     
          <div class="member-card">
            <img class="round-icon" src={{URL::asset('images/donate2.png')}}>
            <p class="member-card-header"> BECOME A SPONSOR</p>
            <p class="member-card-article">
              Join the BBHF team to changing lives through giving.
         </p>
         <a class="donate-btn donate-btn-orange" href="/dashboard/register"> JOIN NOW </a>
          </div>
  </div>
  
  </div>
     
         
     
       </section>

       <section class="section  " >
        <div class="section-wrapper ">
           <div class="section-header-wrapper">
             <div class="section-header">
           LASTEST NEWS
             </div>
             <p class="card-item-body-article">
          Reports from volunteers and members
             </p>
       </div>
       <div class="news-card-holder  ">
       @foreach($news as $rep)
  <?php   

      ?> 
            <div class="news-card">
            <img class="news-icon" src={{$rep['image_1']}}>
              <p class="news-date"> 
         @foreach($rep['author'] as $author)  <h6 class='text-bold text-black-50'>  {{ strtoupper($author['first_name'].' '.$author['last_name'] )}}</h4> @endforeach
                <small>  {{ Carbon\Carbon::parse($rep['created_at'])->format('d-m-y') }}</small>
              </p>
              <p class="news-title">
                <h6 class='text-bold text-black-50'>   {{strtoupper($rep['title']) }} </h6>
               @foreach($rep['category'] as $cat)    <small class=" text-bold"> <?=  $cat['category'] ?></small>  @endforeach
           </p>
           <p class="news-desc">
       {!! $rep['news'] !!}
       </p>
           <a class="continue-link" href="/news/{{$rep['id']}}"> READ MORE </a>
            </div>

            @endforeach
           
               </div>
    
    </div>
       
           
       
         </section>
</div>



@endsection

@push('headerJs')
<script src="{{Route::has('https')? secure_asset('js/header.js'): asset('js/header.js')}}" ></script>
<script src="{{Route::has('https')? secure_asset('js/body.js'): asset('js/body.js')}}" ></script>
@endpush