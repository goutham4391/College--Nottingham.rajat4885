window.$ = jQuery;
jQuery.fn.fadeToggle = function (speed, easing, callback) {
    return this.animate({
        opacity: 'toggle'
    }, speed, easing, callback);
};
$(document).ready(function () {
    $('div.sys_GenericAnswerShowHide').hide();
    $('div.sys_GenericQuestionShowHide').addClass("showhideIsClosed");
    const showHide = document.querySelectorAll('div.sys_GenericQuestionShowHide');
    for(let i = 0; i < showHide.length; i++) {
        showHide[i].tabIndex = 0;
    }
    
    $('div.sys_GenericQuestionShowHide').click(function () {
        $(this).next().fadeToggle('slow');
		$(this).closest('div.sys_GenericQuestionShowHide').toggleClass("showhideIsClosed").toggleClass("showhideIsOpen");
    });
    $('div.sys_GenericQuestionShowHide').on('keypress',function(e) {
        if(e.which == 13) {
            $(this).next().fadeToggle('slow');
		    $(this).closest('div.sys_GenericQuestionShowHide').toggleClass("showhideIsClosed").toggleClass("showhideIsOpen");
        }
    });


    $('div.sys_GenericQuestionShowHide920').click(function () {
        $(this).next().fadeToggle('slow');
		$('div.sys_GenericQuestionShowHide').toggleClass("showhideIsClosed").toggleClass("showhideIsOpen");
    });
    $('div.sys_GenericQuestionShowHide920').on('keypress',function(e) {
        if(e.which == 13) {
            $(this).next().fadeToggle('slow');
		    $('div.sys_GenericQuestionShowHide').toggleClass("showhideIsClosed").toggleClass("showhideIsOpen");
        }
    });


    // Initial state open
    $('div.sys_GenericQuestionShowHideInitialOpen').click(function () {
        $(this).next().fadeToggle('slow');
		$(this).closest('div.sys_GenericQuestionShowHideInitialOpen').toggleClass("showhideIsClosed").toggleClass("showhideIsOpen");
    });
});