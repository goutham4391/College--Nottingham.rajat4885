window.$ = jQuery;

$.fn.hoverClass = function(c) {
	return this.each(function(){
		$(this).hover( 
			function() { $(this).addClass(c);  },
			function() { $(this).removeClass(c); }
		);
	});
};

$(document).ready(function() {

	// add class to body to show we have javascript
	$("body").addClass("js");

	// first/last item fixes (for IE)
	$("#header .sys_left ul li:last-child, #homepage #spotlights .sys_spotlight ul li:last-child, #internal #internalNav ul li:last-child, #internal #main #pageTools ul li:last-child, #footer ul li:last-child").addClass("sys_last");
	$("#internal #internalNav ul li:first-child, #internal #content .sys_relatedRight h2:first-child, #internal #content .sys_relatedRight ul li:first-child").addClass("sys_first");

	// rollover fix (for IE6)
	$("#menu ul li:not(li li), #peopleLookUp tr").hoverClass("sys_active");

	// clear default text from search boxes
	$("#header .sys_right fieldset input, #internal #main #pageTools fieldset input, #internal #main input#jobSearch, .sys_pressanykey input").focus(function (i) {
		if($(this).attr("value") == "keyword(s)") {
			$(this).attr("value", "");
		};
	}).blur(function (i) {
		if($(this).attr("value") == "") {
			$(this).attr("value", "keyword(s)");
		};
	});
	
  	// Job search clear text from input
  
  	$('#jobSearch').val("");
  
	// onfocus for general forms
	$(".sys_genForm :input[type=text], .sys_genForm textarea").focus(function() {
		$(this).addClass("sys_active");
		if(this.value == this.defaultValue) {
			this.value = "";
		};
	}).blur(function() {
		$(this).removeClass("sys_active");
		if(this.value == "") {
			this.value = this.defaultValue;
		};
	});

	

	// advanced search
	$(".sys_advancedSearchBox").css("display","none");							
		$("#advancedSearch").click(function(){	
			if($(".sys_advancedSearchBox").css("display") == "none") {
					$(".sys_advancedSearchBox").css("display", "block");
					$(".sys_searchBox").css("display", "none");
					$("#advancedSearch a").text("Simple Search");
					}
			else if($(".sys_advancedSearchBox").css("display") == "block") {
						$(".sys_advancedSearchBox").css("display", "none");
						$(".sys_searchBox").css("display", "block");
						$("#advancedSearch a").text("Advanced Search");
					};
	});

	// A to Z list of letters
	$(".sys_atoz-control ul").each(function (i) {
		$(this).find("a").wrapInner('<span><span></span></span>');
		$(this).find("li.sys_noresults span").wrap('<a href="#"><span></span></a>');
	});
	
	// A to Z Current Letter
	$(".sys_atoz-control-currentletter big").wrapInner('<span><span><span><span></span></span></span></span>');
	
});