console.log('Script Loaded');
window.addEventListener('load', () => {
    
   const allowPaths = ['/', '/location-voiture/']
   if(!allowPaths.includes(window.location.pathname)) return

    let value = document.querySelector('.vrc_price').value
    const floatingBookWidget = `<div class = 'floating-booking-widget'><a class="rvr-booking-cta" href = "#scrollTo">Book now</a></div>`
    document.body.insertAdjacentHTML('beforeend',floatingBookWidget)
    const bookingform = document.querySelector('#scrollTo')
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