window.addEventListener('load', () =>{
    
   
    let value = document.querySelector('.vrc_price').value
    const floatingBookWidget = `<div class = 'floating-booking-widget'> <div class = 'price'>From <br> <span>$${value}</span></div><a class="rvr-booking-cta" href = "#scrollTo">Book now</a></div>`
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