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
         <a class="donate-btn" href="#"> JOIN NOW </a>
          </div>
          <div class="member-card">
            <img class="round-icon" src={{URL::asset('images/member.png')}}>
            <p class="member-card-header"> BECOME A MEMBER</p>
            <p class="member-card-article">
                 Join the BBHF team to changing lives through giving.
            </p>
            <a class="donate-btn" href="#"> JOIN NOW </a>
          </div>
     
          <div class="member-card">
            <img class="round-icon" src={{URL::asset('images/donate2.png')}}>
            <p class="member-card-header"> BECOME A SPONSOR</p>
            <p class="member-card-article">
              Join the BBHF team to changing lives through giving.
         </p>
         <a class="donate-btn" href="#"> JOIN NOW </a>
          </div>
  </div>
  
  </div>
     
         
     
       </section>

       <section class="section  " style="margin-top: -50px !important;">
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
            <div class="news-card">
            <img class="news-icon" src={{URL::asset('images/ti.jpg')}}>
              <p class="news-date"> 27-11-1990 </p>
              <p class="news-title">
               Medical Outreach
           </p>
           <p class="news-desc">
            Are you passionate about impact and rendering services to your immediate community?
       </p>
           <a class="donate-btn" href="#"> READ MORE </a>
            </div>
            <div class="news-card">
              <img class="news-icon" src={{URL::asset('images/ti.jpg')}}>
                <p class="news-date"> 27-11-1990 </p>
                <p class="news-title">
                 Medical Outreach
             </p>
             <p class="news-desc">
              Are you passionate about impact and rendering services to your immediate community?
         </p>
             <a class="donate-btn" href="#"> READ MORE </a>
              </div>
              <div class="news-card">
                <img class="news-icon" src={{URL::asset('images/ti.jpg')}}>
                  <p class="news-date"> 27-11-1990 </p>
                  <p class="news-title">
                   Medical Outreach
               </p>
               <p class="news-desc">
                Are you passionate about impact and rendering services to your immediate community?
           </p>
               <a class="donate-btn" href="#"> READ MORE </a>
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