console.log('I am here');

function fnprint() {
    document.getElementById("iframeid").contentWindow.print();

}


function loadWindowFromURL(URL) {
    let windowName = 'w_' + Date.now() + Math.floor(Math.random() * 100000).toString();
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", URL);

    form.setAttribute("target", windowName);

    var hiddenField = document.createElement("input"); 
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "message");
    hiddenField.setAttribute("value", "val");
    form.appendChild(hiddenField);
    document.body.appendChild(form);

    window.open('', windowName);

    form.submit();
}