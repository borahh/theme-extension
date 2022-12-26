function fnprint() {
    document.getElementById("iframeid").contentWindow.print();

}


function loadWindowFromURL(URL, booking_user_name, booking_date, booking_nights, booking_per_night, booking_total) {
    let windowName = 'w_' + Date.now() + Math.floor(Math.random() * 100000).toString();
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", URL);

    form.setAttribute("target", windowName);

    var bookingUserName = document.createElement("input"); 
    bookingUserName.setAttribute("type", "hidden");
    bookingUserName.setAttribute("name", "booking_user_name");
    bookingUserName.setAttribute("value", booking_user_name);

    var bookingDate = document.createElement("input"); 
    bookingDate.setAttribute("type", "hidden");
    bookingDate.setAttribute("name", "booking_date");
    bookingDate.setAttribute("value", booking_date);

    
    var bookingNights = document.createElement("input"); 
    bookingNights.setAttribute("type", "hidden");
    bookingNights.setAttribute("name", "booking_nights");
    bookingNights.setAttribute("value", booking_nights);


    var bookingPerNight = document.createElement("input"); 
    bookingPerNight.setAttribute("type", "hidden");
    bookingPerNight.setAttribute("name", "booking_per_night");
    bookingPerNight.setAttribute("value", booking_per_night);


    var bookingTotal = document.createElement("input"); 
    bookingTotal.setAttribute("type", "hidden");
    bookingTotal.setAttribute("name", "booking_total");
    bookingTotal.setAttribute("value", booking_total);


    form.appendChild(bookingUserName);
    form.appendChild(bookingDate);
    form.appendChild(bookingNights);
    form.appendChild(bookingPerNight);
    form.appendChild(bookingTotal);


    document.body.appendChild(form);

    window.open('', windowName);

    form.submit();
}