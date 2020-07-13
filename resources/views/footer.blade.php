




<div class="footer-holder">

 
    <div class="footer-item-holder">
        
        <div class="feedback-holder">
              <img src={{URL::asset('images/nav-icon-200.png')}} />
            <p class="bbhf-desc">
                Blessed to Bless Hands Foundation (BBHF) exist to through effective partnerships with individuals and corporate organisations meet health, social, educational, communal and 
                spiritual needs of all people especially Africa.
            </p>
            <div class="socials">
                <a href="#" class="social-item">
                    <i class="fa fa-facebook"></i>
                </a>
                <a href="#" class="social-item">
                    <i class="fa fa-instagram"></i>
                </a>
                <a href="#" class="social-item">
                    <i class="fa fa-twitter"></i>
                </a>
            </div>
            
        </div>
<div class="feedback-holder">
    <div class="feedback-header">
        FEED BACK
               
    </div>
    <div class="feedback-text">
    
               Want to give us a feed back? We would love to hear from you.
    </div>
        <form action='/feedback' method='post' class="form-cont" enctype="application/x-www-form-urlencoded">
           @csrf
           
           <input  name="name" placeholder="Enter Name" class="form-control mb-1" />
           <input  name="name" placeholder="Enter Email" class="form-control mb-1" />
           <textarea  name="name" class="form-control mb-1" placeholder="Enter Message" ></textarea>
           <button class="btn donate-btn" > SEND </button>
        </form>
    
</div>
<div class="feedback-holder">
    <div class="feedback-header">
               CONTACT US
    </div>
 
        <ul class="contact">
            <li> <i class="fa fa-map-marker"></i>&nbsp;No 1 place and street </li>
            <li> <i class="fa fa-envelope"></i>&nbsp;  bbhf@email.com</li>
            <li> <i class="fa fa-phone"></i>&nbsp;  bbhf@email.com</li>
        </ul>
    
</div>



</div>


<div class="copyright">
    <p> © BBHF 2020. All rights reserved. Designed by <b>Cisoft Inc. </b>
    </p>
</div>

</div>





