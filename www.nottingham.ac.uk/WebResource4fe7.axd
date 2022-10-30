$(document).ready(function () {
    // Setup the popup functionality
    var profiles =
    {
        simple:
        {
            width: 626,
            height: 436
        }
    };
    $("a.social-button-popup").popupwindow(profiles);

    $("a.social-button").click(function () {
        var data = $(this).metadata();
        _gaq.push(['_trackSocial', data.name, data.verb]);
    });
});