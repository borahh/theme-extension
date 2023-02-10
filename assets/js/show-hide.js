window.addEventListener('load', () =>{
    
   
    let pricePerNight = document.querySelector('.price-per-night').value
    const floatingBookWidget = `<div class = 'floating-booking-widget'> <div class = 'price'>From <br> <span>$${pricePerNight}</span></div><a class="rvr-booking-cta" href = "#rvr_booking_widget-1">Book now</a></div>`
    document.body.insertAdjacentHTML('beforeend',floatingBookWidget)
    const bookingform = document.querySelector('#rvr_booking_widget-1')
    const observer = new IntersectionObserver((entries) =>{
        entries.forEach(entry =>{
            const floatingWidget = document.querySelector('.floating-booking-widget')
            if(entry.isIntersecting){
                floatingWidget.style.transform = 'translateY(100%)'
            }else{
               floatingWidget.style.transform = 'translateY(0%)'
            }
        })
    })
    observer.observe(bookingform)
  })