

<?php 


$list =   DB::table('projects')->select('projects.id')->leftJoin('donation','donation.donation_project','=','projects.id')

->selectRaw('sum(donation.donation_amount) as amount_raised, projects.*') ->groupBy('projects.id')->orderByDESC('id')->first();



?>

<div class="mini-slide" style="height:400px">
    
    <div class="urgent-project mini-slide-overlay" style='background-image: url({{$list->image}})'>
           
    </div>
    <div class="project-container mini-slide-cont" >
    
   
    
   <div class="project-description">
   <p class="project-description-header">
    {{$list->project}}
 </p>
 <p class="project-description-article">
  {{$list->description}}
 </p>
 <?php 
$am = $list->amount_raised;
 if($list->amount_raised == null){
   $am = 0;
 }
 $per = round(((float)$am/(float)$list->amount) * 100, 2) ;

?>
 <div class="raised-amount">
   <div class="progress-cont">
     <div class="progress-flo" style='width:{{$per}}%' >
     </div>
   </div>
 <div class="raised">
  <p> Goal - N {{number_format($list->amount,2)}}</p> <p> {{$per}}% </p> <p> Raised - N{{number_format($am,2)}}</p>
 </div>
 </div>
 <a href="/donate/{{$list->category}}/{{$list->id}}" class="donate-btn"> Donate </a>
 </div>
 </div>
 </div>