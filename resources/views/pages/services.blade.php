@extends('main')
@section('title',"About us")
@section('head')

@include('head')
@include('minislide')



@endsection

@section('body')


<nav id="scrollspy" class="scrollspy">
  <ul class="scrollspy-menu">
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[0]}}" href="#{{ Config::get('constants.services_route')[0]}}" class="dot active">
        <span>Community Development Projects</span>
      </a>
    </li>
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[1]}}" href="#{{ Config::get('constants.services_route')[1]}}" class="dot">
        <span>Entreprenuership and Grants</span>
      </a>
    </li>
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[2]}}" href="#{{ Config::get('constants.services_route')[2]}}"  class="dot">
        <span> Competitions and Scholarships</span>
      </a>
    </li>
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[3]}}" href="#{{ Config::get('constants.services_route')[3]}}"  class="dot">
        <span>Medical Mission Outreach</span>
      </a>
    </li>
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[4]}}" href="#{{ Config::get('constants.services_route')[4]}}"  class="dot">
        <span>Evangelical Outreach</span>
      </a>
    </li>
  
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[5]}}" href="#{{ Config::get('constants.services_route')[5]}}" class="dot">
        <span>Education</span>
      </a>
    </li>
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[6]}}" href="#{{ Config::get('constants.services_route')[6]}}"  class="dot">
        <span>Social Schemes</span>
      </a>
    </li>
  </ul>
</nav>
<div class="home-container">
<section class="section p-5" >
    <div class="section-wrapper ">
       <div class="section-header-wrapper ">
         <div class="section-header ">
        SERVICES  
         </div>   
      
   </div>
  <div class="write-up " id="{{ Config::get('constants.services_route')[0]}}">
   <div class="section-sub-header">

    Community Development Projects 
   </div>
   <div class="main-write-up">
    We are Blessed to Bless Hands Foundation(BBHF), and we exist to;  through effective partnerships with individuals and corporate organisations meet the health, social, economic, educational, communal and spiritual needs of all people, especially in Africa. 

    We believe in the ability of individuals and corporate organisations, to through proactive commitments, birth impactful and productive change in the lives of all people especially in African communities. 
    
    At BBHF, we are committed to providing enabling opportunities, platforms and systems for all people, particularly the youths and young people, to lead a self-sustaining and productive life for self, and be able to contribute to the family, Community and society sustainability and development. 
    
    
    We are dedicated to supporting ministers of the gospel, particularly missionaries with aids to help in their works of ministry and we work with local churches to share the goodness of Jesus Christ, calling many to eternal life.
    
    
    We daily nurture, train and build social change makers through our Volunteering programmes and the BBHF School of Social Change, with these individuals going on to be Agents of Change, all over the World, especially in Africa.
    We have a network of skilled Volunteers and members across the world who drive our vision and bring their very best to the frontiers of attaining the BBHF vision.

Our leadership is made up of an amazing team of passionate and dedicated individuals, who are the best at driving the BBHF vision and always providing  a dynamic, transparent, accountable and innovative leadership.
   </div>
  </div>
  <div class="write-up" id="{{ Config::get('constants.services_route')[1]}}">
    <div class="section-sub-header">
 
      Entreprenuership and Empowerment Grants
    </div>
    <div class="main-write-up">
     We are Blessed to Bless Hands Foundation(BBHF), and we exist to;  through effective partnerships with individuals and corporate organisations meet the health, social, economic, educational, communal and spiritual needs of all people, especially in Africa. 
 
     We believe in the ability of individuals and corporate organisations, to through proactive commitments, birth impactful and productive change in the lives of all people especially in African communities. 
     
     At BBHF, we are committed to providing enabling opportunities, platforms and systems for all people, particularly the youths and young people, to lead a self-sustaining and productive life for self, and be able to contribute to the family, Community and society sustainability and development. 
     
     
     We are dedicated to supporting ministers of the gospel, particularly missionaries with aids to help in their works of ministry and we work with local churches to share the goodness of Jesus Christ, calling many to eternal life.
     
     
     We daily nurture, train and build social change makers through our Volunteering programmes and the BBHF School of Social Change, with these individuals going on to be Agents of Change, all over the World, especially in Africa.
     We have a network of skilled Volunteers and members across the world who drive our vision and bring their very best to the frontiers of attaining the BBHF vision.
 
 Our leadership is made up of an amazing team of passionate and dedicated individuals, who are the best at driving the BBHF vision and always providing  a dynamic, transparent, accountable and innovative leadership.
    </div>
   </div>
   <div class="write-up" id="{{ Config::get('constants.services_route')[2]}}">
    <div class="section-sub-header">
 
      Competitions and Scholarships
    </div>
    <div class="main-write-up">
     We are Blessed to Bless Hands Foundation(BBHF), and we exist to;  through effective partnerships with individuals and corporate organisations meet the health, social, economic, educational, communal and spiritual needs of all people, especially in Africa. 
 
     We believe in the ability of individuals and corporate organisations, to through proactive commitments, birth impactful and productive change in the lives of all people especially in African communities. 
     
     At BBHF, we are committed to providing enabling opportunities, platforms and systems for all people, particularly the youths and young people, to lead a self-sustaining and productive life for self, and be able to contribute to the family, Community and society sustainability and development. 
     
     
     We are dedicated to supporting ministers of the gospel, particularly missionaries with aids to help in their works of ministry and we work with local churches to share the goodness of Jesus Christ, calling many to eternal life.
     
     
     We daily nurture, train and build social change makers through our Volunteering programmes and the BBHF School of Social Change, with these individuals going on to be Agents of Change, all over the World, especially in Africa.
     We have a network of skilled Volunteers and members across the world who drive our vision and bring their very best to the frontiers of attaining the BBHF vision.
 
 Our leadership is made up of an amazing team of passionate and dedicated individuals, who are the best at driving the BBHF vision and always providing  a dynamic, transparent, accountable and innovative leadership.
    </div>
   </div>
   <div class="write-up" id="{{ Config::get('constants.services_route')[3]}}">
    <div class="section-sub-header">
 
    Medical Mission Outreach  
    <div class="btn-holder">
    <a class=" btn btn-danger " href="/projects/"> View Projects </a>
    <a class=" btn btn-success " href="/donate/"> Donate </a>
    </div>
    </div>
    <div class="main-write-up">
      The Medical mission outreaches of the Blessed to Bless Hands Foundation(BBHF) is a community based free health services targeted at the rural communities. We screen and test for but not limited to the following; Human Immunodeficiency Virus (HIV), Hepatitis B surface   Antigen( HbsAg), Hepatitis C Virus ( HCV), Diabetics Mellitus and Hypertension etc, with Status disclosure and counselling, linkage services to the nearest health centre for individuals needing treatments.
      Free pharmacological and non- pharmacological treatments are also offered to individual patients with diagnosed illnesses on spot, with free surgical services done as is feasible. These services are rendered by our foundation's pool of health care personnels, Volunteers, associates and funded by our sponsors in collaboration with individuals and/ or corporate organisations.
    </div>
     
   </div>
   <div class="write-up" id="{{ Config::get('constants.services_route')[4]}}">
    <div class="section-sub-header">
 
      Evangelical Outreaches
    </div>
    <div class="main-write-up">
     We are Blessed to Bless Hands Foundation(BBHF), and we exist to;  through effective partnerships with individuals and corporate organisations meet the health, social, economic, educational, communal and spiritual needs of all people, especially in Africa. 
 
     We believe in the ability of individuals and corporate organisations, to through proactive commitments, birth impactful and productive change in the lives of all people especially in African communities. 
     
     At BBHF, we are committed to providing enabling opportunities, platforms and systems for all people, particularly the youths and young people, to lead a self-sustaining and productive life for self, and be able to contribute to the family, Community and society sustainability and development. 
     
     
     We are dedicated to supporting ministers of the gospel, particularly missionaries with aids to help in their works of ministry and we work with local churches to share the goodness of Jesus Christ, calling many to eternal life.
     
     
     We daily nurture, train and build social change makers through our Volunteering programmes and the BBHF School of Social Change, with these individuals going on to be Agents of Change, all over the World, especially in Africa.
     We have a network of skilled Volunteers and members across the world who drive our vision and bring their very best to the frontiers of attaining the BBHF vision.
 
 Our leadership is made up of an amazing team of passionate and dedicated individuals, who are the best at driving the BBHF vision and always providing  a dynamic, transparent, accountable and innovative leadership.
    </div>
   </div>
   <div class="write-up" id="{{ Config::get('constants.services_route')[5]}}">
    <div class="section-sub-header">
 
      Education
    </div>
    <div class="main-write-up">
     We are Blessed to Bless Hands Foundation(BBHF), and we exist to;  through effective partnerships with individuals and corporate organisations meet the health, social, economic, educational, communal and spiritual needs of all people, especially in Africa. 
 
     We believe in the ability of individuals and corporate organisations, to through proactive commitments, birth impactful and productive change in the lives of all people especially in African communities. 
     
     At BBHF, we are committed to providing enabling opportunities, platforms and systems for all people, particularly the youths and young people, to lead a self-sustaining and productive life for self, and be able to contribute to the family, Community and society sustainability and development. 
     
     
     We are dedicated to supporting ministers of the gospel, particularly missionaries with aids to help in their works of ministry and we work with local churches to share the goodness of Jesus Christ, calling many to eternal life.
     
     
     We daily nurture, train and build social change makers through our Volunteering programmes and the BBHF School of Social Change, with these individuals going on to be Agents of Change, all over the World, especially in Africa.
     We have a network of skilled Volunteers and members across the world who drive our vision and bring their very best to the frontiers of attaining the BBHF vision.
 
 Our leadership is made up of an amazing team of passionate and dedicated individuals, who are the best at driving the BBHF vision and always providing  a dynamic, transparent, accountable and innovative leadership.
    </div>
   </div>
   <div class="write-up" id="{{ Config::get('constants.services_route')[6]}}">
    <div class="section-sub-header">
 
      Social Schemes
    </div>
    <div class="main-write-up">
     We are Blessed to Bless Hands Foundation(BBHF), and we exist to;  through effective partnerships with individuals and corporate organisations meet the health, social, economic, educational, communal and spiritual needs of all people, especially in Africa. 
 
     We believe in the ability of individuals and corporate organisations, to through proactive commitments, birth impactful and productive change in the lives of all people especially in African communities. 
     
     At BBHF, we are committed to providing enabling opportunities, platforms and systems for all people, particularly the youths and young people, to lead a self-sustaining and productive life for self, and be able to contribute to the family, Community and society sustainability and development. 
     
     
     We are dedicated to supporting ministers of the gospel, particularly missionaries with aids to help in their works of ministry and we work with local churches to share the goodness of Jesus Christ, calling many to eternal life.
     
     
     We daily nurture, train and build social change makers through our Volunteering programmes and the BBHF School of Social Change, with these individuals going on to be Agents of Change, all over the World, especially in Africa.
     We have a network of skilled Volunteers and members across the world who drive our vision and bring their very best to the frontiers of attaining the BBHF vision.
 
 Our leadership is made up of an amazing team of passionate and dedicated individuals, who are the best at driving the BBHF vision and always providing  a dynamic, transparent, accountable and innovative leadership.
    </div>
   </div>
   

    </div>
</section>
</div>
@endsection
@push('headerJs')
<script  src="{{ asset('js/header.js')}}"></script>
<script  src="{{ asset('js/body.js')}}"></script>
@if($scroll)
<script>
  $(document).ready(()=>{
  let element = {!! json_encode($section) !!}
 console.log('top',$('#'+element).offset().top )
$('html, body').animate({

    scrollTop: $('#'+element).offset().top -$('#'+element).outerHeight() -100
}, 'slow');
});
</script>
@endif
@endpush