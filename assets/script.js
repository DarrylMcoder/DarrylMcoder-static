function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

$(function() {
  $(".morebtn").click(function() {
    $(this).siblings( ".morecontent" ).slideDown( "fast" );
  });
});