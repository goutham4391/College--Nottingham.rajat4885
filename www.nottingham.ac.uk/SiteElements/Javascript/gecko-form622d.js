window.updateIframeURL = function (iframe_id, field_map) {
    window.addEventListener('load', function () {
        if (!iframe_id || typeof iframe_id !== 'string') return console.error('iFrame ID needs to be a string');
        if (!field_map || ({}).constructor !== field_map.constructor) return console.error('Field Mappings needs to be an object');
        var iframe = document.querySelector('#' + iframe_id);
        var base_url = iframe.src;
        var data = {};
        if (window.localStorage) {
            data = localStorage;
        } else {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                data[parts[0].trim()] = parts[1].trim();
            }
        }
        var qs_parts = [];
        for (var key in data) {
            if (field_map.hasOwnProperty(key)) {
                qs_parts.push(field_map[key] + '=' + data[key]);
            }
        }
        if (qs_parts.length > 0) {
            if (base_url.slice(-1) !== '/') base_url += '/';
            var init_char; 
            if (base_url.indexOf('?') !== -1 ) { 
                init_char = '&';
            } else {
                init_char = '?';
            }
            var query_string = init_char + qs_parts.join('&');
            iframe.src = base_url + query_string;
        }
    });
}
