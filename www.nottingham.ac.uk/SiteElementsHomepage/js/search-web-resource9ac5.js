function killEvent(eventObject) {
    if (eventObject && eventObject.stopPropagation) {
        eventObject.stopPropagation();
    }
    if (window.event && window.event.cancelBubble) {
        window.event.cancelBubble = true;
    }
    if (eventObject && eventObject.preventDefault) {
        eventObject.preventDefault();
    }
    if (window.event) {
        window.event.returnValue = false;
    }
}

//General
function ContensisSubmitFromTextbox(event, SubmitButton) {
    var btn = document.getElementById(SubmitButton)
    if (document.all) {
        if (event.keyCode == 13) {
            event.returnValue = false;
            event.cancel = true;
            killEvent(event); // [Added BJ 30/01/2012 for IE9]
            btn.click();
        }
    }
    else if (document.getElementById) {
        if (event.which == 13) {
            event.returnValue = false;
            event.cancel = true;
            killEvent(event); // [Added iG 18/01/2012]
            btn.click();
        } else {
            // Do nothing
        }
    }
    else if (document.layers) {
        if (event.which == 13) {
            event.returnValue = false;
            event.cancel = true;
            btn.click();
        } else {
            // do nothing
        }
    }
}

