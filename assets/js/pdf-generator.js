function fnprint() {
    document.getElementById("iframeid").contentWindow.print();

}


function loadWindowFromURL(URL, booking_id) {
    let windowName = 'w_' + Date.now() + Math.floor(Math.random() * 100000).toString();
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", URL);

    form.setAttribute("target", windowName);

    var bookingID = document.createElement("input"); 
    bookingID.setAttribute("type", "hidden");
    bookingID.setAttribute("name", "booking_id");
    bookingID.setAttribute("value", booking_id);


    form.appendChild(bookingID);


    document.body.appendChild(form);

    window.open('', windowName);

    form.submit();
}