$(document).ready(function(){
    $(".icon").hover(function(){
      $(".temperature-description-daily").css("opacity", "0.8").css("transition-delay", "600ms");
      $(".humidity-section").css("opacity", "0.8");
      $(".wind-section").css("opacity", "0.8");
    },
    function(){
        $(".temperature-description-daily").css("opacity", "0").css("transition-delay", "0ms");
        $(".humidity-section").css("opacity", "0");
        $(".wind-section").css("opacity", "0");
    });

    //$(".location-timezone").click(function(){
      //  document.getElementById('snap').classList.toggle('icon-move');
     //});


    
});