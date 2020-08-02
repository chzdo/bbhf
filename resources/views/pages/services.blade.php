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
    <li>
      <a data-scroll="{{ Config::get('constants.services_route')[7]}}" href="#{{ Config::get('constants.services_route')[7]}}"  class="dot">
        <span>Volunteering Programme</span>
      </a>
    </li>
  </ul>
</nav>
<div class="home-container">
  <section class="section " >
      <div class="section-wrapper ">
         <div class="section-header-wrapper ">
           <div class="section-header ">
          SERVICES  
           </div>        
         </div>
            

         <div class="write-up " id="#">
           <div class="section-sub-header">       
               Community Development Projects 
            </div>
          <div class="row p-3">
              <div class="col-md-3">
                <img src="#"  class='service-image'/>
               </div>
            <div class="col-md-9">
                 <div class="main-write-up">
               We are Blessed to Bless Hands Foundation(BBHF), and we exist to;  through effective partnerships with individuals and corporate organisations meet the health, social, economic, educational, communal and spiritual needs of all people, especially in Africa. 
           
               We believe in the ability of individuals and corporate organisations, to through proactive commitments, birth impactful and productive change in the lives of all people especially in African communities. 
               
               At BBHF, we are committed to providing enabling opportunities, platforms and systems for all people, particularly the youths and young people, to lead a self-sustaining and productive life for self, and be able to contribute to the family, Community and society sustainability and development. 
               
               
               We are dedicated to supporting ministers of the gospel, particularly missionaries with aids to help in their works of ministry and we work with local churches to share the goodness of Jesus Christ, calling many to eternal life.
               
               
               We daily nurture, train and build social change makers through our Volunteering programmes and the BBHF School of Social Change, with these individuals going on to be Agents of Change, all over the World, especially in Africa.
               We have a network of skilled Volunteers and members across the world who drive our vision and bring their very best to the frontiers of attaining the BBHF vision.
           
                  Our leadership is made up of an amazing team of passionate and dedicated individuals, who are the best at driving the BBHF vision and always providing  a dynamic, transparent, accountable and innovative leadership.
             </div>
             <div class="btn-holder">
              <a class=" btn btn-bbhf bbhf-orange " href='/donate/{{ Config::get('constants.service_routes')[0] }}'> Donate for this cause </a>
            
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
@if($scroll)
<script>
  $(document).ready(()=>{
  let element = {!! json_encode($section) !!}
  $element = '#'+element
 console.log('top',element )
 link = $('.section-wrapper ');

 index = link.find($element).index()
 console.log(index);
  var target = link.children().eq(index-1)
//  alert(immediate.text())
console.log('target',target)

 console.log($('.navigator').height() );
   $value = (target.offset().top - (target.height()/2 ) ) - $('.navigator').height() 
   $scrolltype = (index == 1)? 0 :$value;

    $('html, body').animate({
      scrollTop: $scrolltype
    }, 600);
    console.log($value,'value',$scrolltype);
   // $(this).addClass('active');
});
</script>

@endif
@endpush