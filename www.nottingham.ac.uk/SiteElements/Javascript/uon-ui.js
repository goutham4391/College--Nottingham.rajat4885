$(document).ready(function() {

  const toggleMenu = document.querySelectorAll('.sys_menu-toggle');
  for(let i = 0; i < toggleMenu.length; i++) {
      toggleMenu[i].tabIndex = 0;
  }

	// clear default text from search boxes
	$("#header .sys_right fieldset input, #internal #main #pageTools fieldset input, #internal #main input#jobSearch, .sys_pressanykey input, #header #search input").focus(function (i) {
		if($(this).attr("value") == "keyword(s)") {
			$(this).attr("value", "");
		};
	}).blur(function (i) {
		if($(this).attr("value") == "") {
			$(this).attr("value", "keyword(s)");
		};
	});
	
});

/*Add a DIV to tables for responsive views*/
$(function() {  
$("table").wrap( "<div class='responsivetable'></div>" );
});

/*GLOBAL VARIABLES*/
var menuToggleDataAttr = "data-text-swap";
var menuToggleCloseText = "Close Menu";

var mobileSearchWarpperClass = "sys_mobile-search";
var mobileSearchToggleClass = "sys_mobile-search-toggle";

$(function () {

  /*Mobile Menu Toggle*/
  $(".sys_menu-toggle").each(function(){
    $(this).attr(menuToggleDataAttr, menuToggleCloseText);
    $(this).click(function(){
      menuToggle($(this));
    });

    $(this).on('keypress', function(e) {
      if(e.which == 13) {
        menuToggle($(this));
      }
    })

  });

  /*Colour Overlays*/
  $(".sys_imageWithHeading").hover(function(e){
    var overlayWidth = $(this).find("img").width() + "px";
    var overlayHeight = $(this).find("img").height() - $(this).find("h2").outerHeight() + "px";

    $(this).find("a::has(img)").append("<span class='sys_imageWithHeading-overlay' style='width: "+ overlayWidth +"; height: "+ overlayHeight +";'>&nbsp;</span>");
  },function(){
    $(this).find("a:has(img)").children().remove(".sys_imageWithHeading-overlay");
  });

  /*Course Detail HTML Fix*/
  //$(".sys_factfile").unwrap();
  //$(".sys_factfileUcas").unwrap();



  /*Make rotating banners responsive*/
  $(".sys_banner img:first-child").load(function(){
    setRotatingBannerHeight($(this));
  });



});

$(window).resize(function() {
    setRotatingBannerHeight( $(".sys_banner img:first-child"));
});

/*Functions*/
function menuToggle(element) {
  var currentText = element.text();
  element.parent().find('ul ul').hide();
  element.parent().find("ul:eq(0)").slideToggle("fast");
  element.text(element.attr(menuToggleDataAttr));
  $(element).attr(menuToggleDataAttr, currentText);
}

function setRotatingBannerHeight(img){
  var imageHeight = img.height();
  $(".sys_banner").css("height", imageHeight);
  

}
