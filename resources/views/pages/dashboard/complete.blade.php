<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
        <link rel="stylesheet" href="{{URL::asset('css/dist/css/bootstrap.min.css')}}" >
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
     <meta name="csrf-token" content="{{ csrf_token() }}">
   <title>@yield('title')</title>
       <link rel="stylesheet" href="{{URL::asset('css/header.css')}}" />
       <link rel="stylesheet" href="{{URL::asset('css/reactCSS.css')}}" />
       <link rel="icon" href="{{asset('images/icon-logo.png')}}" />
       <link rel="apple-touch-icon" href="{{asset('images/icon-logo.png')}}" />
      
       <link rel="dns-prefetch" href="//fonts.gstatic.com">
       <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro&family=Literata" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet">
      
        
                  
    </head>
    <body>
    
      
<?php 

?>

<div class="join-container">

      
      <div class="react-dom">
          
          <div 

              class="login-holder bg-purple "
              >
              <div class=" d-flex  flex-column justify-content-center align-items-center">
              <img class="logo-rotate" src="{{ asset('images/main-logo.png')}}" style="width:80px; height:80px"/>
              <h6><strong>BLESSED TO BLESS HANDS FOUNDATION </strong></h6>
                  <blockquote>
                      Join us as we transform the world through Entrepenuership, Scholarships, Community Projecrs
                  </blockquote>
                      <hr>
                  <form action="/dashboard/continue" method="post" class="w-100 m-2" onsubmit="$($('#btn').prop('disabled',true) ;return true)" >
                    @if(session('result'))
                    <div id="toast" class='
                        toastGreen

                        show'
                        >

                         <div class="toast-head">
                             <span id="">    SUCCESS </span>
                 
                             <span id="toast-close" class=" fa fa-times-circle" onclick="$( ()=> $('#toast').removeClass().addClass('hide') )"></span>
                         </div>
                         <div className="toastBody">
                 
                            {{ session('result') }}
                 
                                          
                         </div>
                     </div>
                     @endif
                    @csrf
                    <label class="h5 text-warning"> Enter the information below truthfully </label>
                    <hr>
                    <input type="hidden" name="email" value={{$email}} />
                    @error('email')
                    <span class="invalid" id=""  >
                    <span>{{ $message }}</span> <span className="fa fa-times "></span>
                    </span> 
                @enderror
                         <div class="form_group">
                            <div class="bbhf_input_holder bg-white">
            
                                <textarea
                                    id="reason"
                                    name="reason"
                                  
                                    maxLength=250
                                   
                                    required ="true"                     
                                    
                                    class="bbhf_input "
                                > {{old('reason')}} </textarea>
                                <span class="bbhf_input_label">
                                    Why Do you want to join BBHF?( max 250 words)
                                </span>
            
                            </div>
                            @error('reason')
                                <span class="invalid" id=""  >
                                <span>{{ $message }}</span> <span className="fa fa-times "></span>
                                </span> 
                            @enderror
                        </div>
                        <div class="form_group">
                            <div class="bbhf_input_holder bg-white">
            
                                <textarea
                                    id="about"
                                    name="about"
                                  
                                    maxLength=250
                                    required ="true"  
                                                                     
                                    
                                    class="bbhf_input "
                                > {{old('about')}}</textarea>
                                <span class="bbhf_input_label">
                                    Can you tell us about yourself?( max 250 words)
                                </span>
            
                            </div>
                            @error('about')
                                <span class="invalid" id=""  >
                                <span>{{ $message }}</span> <span className="fa fa-times "></span>
                                </span> 
                            @enderror
                        </div>

                        <div class="form_group">
                            <div class="bbhf_input_holder bg-white">
            
                                <textarea
                                    id="contribute"
                                    name="contribute"
                                  
                                    maxLength=250
                                   
                                    required ="true"                            
                                    
                                    class="bbhf_input "
                                >{{old('contribute')}} </textarea>
                                <span class="bbhf_input_label">
                                    What do you think you can bring if given the opportunity?( max 250 words)
                                </span>
            
                            </div>
                            @error('contribute')
                                <span class="invalid" id=""  >
                                <span>{{ $message }}</span> <span className="fa fa-times "></span>
                                </span> 
                            @enderror
                        </div>
                        <div class="form_group">
                            <div class="bbhf_input_holder bg-white">
            
                                <textarea
                                    id="strength"
                                    name="strength"
                                  
                                    maxLength=250
                                   
                                    required ="true"                               
                                    
                                    class="bbhf_input "
                                > {{old('strength')}}</textarea>
                                <span class="bbhf_input_label">
                                    Can you tell us about Strength as an individual?( max 250 words)
                                </span>
            
                            </div>
                            @error('strength')
                                <span class="invalid" id=""  >
                                <span>{{ $message }}</span> <span className="fa fa-times "></span>
                                </span> 
                            @enderror
                        </div>
                      
                        <div class="form_group">
                            
                            <div class="bbhf_input_holder bg-white">            
                                <textarea
                                    id="leadership"
                                    name="leadership"                                  
                                    maxLength=250                                   
                                    required ="true"                    
                                    class="bbhf_input"
                                > {{old('leadership')}}</textarea>                            
                               <span class="bbhf_input_label">
                               Wil you be willing and ready to accept any leadership 
                                responsibility when given such opportuinity to serve?
                            </span>
            
                            </div>
                            @error('leadership')
                                <span class="invalid" id=""  >
                                <span>{{ $message }}</span> <span className="fa fa-times "></span>
                                </span> 
                            @enderror
                        </div>
                        <button class="bbhf_btn bbhf_btn_orange" id="btn"> Submit </button>
                  </form>
                </div> 
             
       
        </div>
      </div>

</div>
  



{{--

      <div class="donate-background">
          <div class="donate-background-overlay">
            @include('head')
  
      
        <Donate id="donateBG" 
        @if($project != null)
        project={{ $project}}
        @endif
        @if($category != null)
        category={{ $category}}
        @endif
        
        path = {{ asset('images/')}}
        
        />
          </div>
    </div>
    --}}
        <script src="{{   mix('js/app.js')}}" ></script>
        <script src="{{   asset('js/header.js')}}" ></script>
    </body>
    </html>
    
