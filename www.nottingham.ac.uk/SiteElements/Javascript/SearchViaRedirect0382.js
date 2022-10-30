function goTo(targetUrl, searchString)
{
    location.href = targetUrl + searchString.replace(/\s+/g, '+');
}

function onEvent(event, targetUrl) {
    if (event.key === "Enter") {
        goTo(targetUrl, document.getElementById('rSearch').value);
        return false;
    }
};