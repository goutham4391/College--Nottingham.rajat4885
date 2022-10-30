// add google tracking to static files Google Universal Analytics version
$(document).ready(function() {
	var filetypes = /\.(zip|exe|pdf|doc|docx|xls|xlsx|ppt|pptx|mp3)$/i;
	$('a').each(function(){
		var href = $(this).attr('href');
		var rel = $(this).attr('rel');
		
		var relRegExp = /^ga\s([^\s]+)/i
		if (rel != undefined && (relRegExp.test(rel))) {
			$(this).click(function() {
				var cid = relRegExp.exec(rel);
				ga('send', 'event', 'AdWords', 'Conversion', cid[1]);
			});
		}

		if (href != undefined && (href.match(/^https?\:/i)) && (!href.match(document.domain))) {
			$(this).click(function() {
				var extLink = href.replace(/^https?\:\/\//i, '');
				ga('send', 'event', 'Link', 'External', extLink);
			});
		}
		else if (href != undefined && href.match(/^mailto\:/i)){
			$(this).click(function() {
				var mailLink = href.replace(/^mailto\:/i, '');
				ga('send', 'event', 'Link', 'Email', mailLink);
			});
		}
		else if (href != undefined && href.match(filetypes)){
			$(this).click(function() {
				var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
				var filePath = href.replace(/^https?\:\/\/(www.)nottingham\.ac\.uk\//i, '');
				ga('send', 'event', 'Link', 'Download-' + extension, filePath);
			});
		}
	});
});