$(document).ready(function(){

	// correct heights for sub nav
	// get height of UL
	subMenuHeight = $("#submenu ul").height();
	$("#submenu ul li").each(function (i) {
		subMenuLIHeight = $(this).height(); // get height of LI
		liPadding = Math.round( (subMenuHeight - subMenuLIHeight) / 2 ) + 7;
		$(this).find("span").css({"padding-top": liPadding, "padding-bottom": liPadding});
	});

	// add 'alt' classes for tables/listings listing
	$('#content table tbody tr:odd').addClass("sys_alt");

	// insert spans for blockquote formatting
	//$('#internal #content blockquote, #internal #content div.sys_studentProfilesQuotes, #internal #content p.FauxBlockquote').wrapInner('<span><span><span></span></span></span>');

	// add divs for Student Profile Quote box
	$("div.sys_SPQmiddle").before("<div class='sys_SPQtop'></div>").after("<div class='sys_SPQbottom'></div>");

	// events show/hide
	$("#events ul.sys_events li").each(function (i) {
		$(this).find('.sys_more').hide().before('<div class=\"sys_expand\"><p><span><span><span><span>Expand</span></span></span></span></p></div>').after('<div class=\"sys_collapse\"><p><span><span><span><span>Collapse</span></span></span></span></p></div>');
		$(this).find('.sys_collapse').hide();
		$(this).find('.sys_expand p').click(function(){
			$(this).parent().hide();
			$(this).parent().parent().find('.sys_collapse').slideToggle();
			$(this).parent().parent().find('.sys_more').slideToggle();
		});
		$(this).find('.sys_collapse p').click(function(){
			$(this).parent().hide();
			$(this).parent().parent().find('.sys_expand').slideToggle();
			$(this).parent().parent().find('.sys_more').slideToggle();
		});
	});

	// nursing contact form
	$('#nursingSpecifics').hide();
	$('#preregCourse1').focus(function() {
		$('#nursingSpecifics').toggle();
	});
	

});