function getAbsoluteHeight(el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el; 
  
    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']) +
                 parseFloat(styles['marginBottom']);
  
    return Math.ceil(el.offsetHeight + margin);
}
  
function borahh_get_height() {
    var parent = document.getElementById('contentToggle');
    var children = parent.querySelectorAll('p');
    var height = getAbsoluteHeight(children[0]) + getAbsoluteHeight(children[1]);
    return height;
}
document.getElementById('contentToggle').style.maxHeight = borahh_get_height() + "px";
document.getElementById('toggleElement').onclick = function () {
    var element = document.getElementById('contentToggle');

    var toggle = document.getElementById('toggleElement');
    var span = toggle.querySelector('span');
    if (element.classList.contains("descHide")) {
        element.classList.remove("descHide")
        element.style.maxHeight = "inherit";
        span.textContent = "Show less";
    } else {
        element.style.maxHeight = borahh_get_height() + "px";
        element.classList.add("descHide");
        span.textContent = "Show more";


    }
  }


 const toggleAccordian = () =>{
  
 }


  window.addEventListener('load', () =>{
     const accs = document.querySelectorAll('.accordion-container')
    accs.forEach(acc => {
        const btn = acc.querySelector('.accordion-btn')
        const container = acc.querySelector('.accordion-content')
        btn.addEventListener('click', () =>{
            if(!container.style.height){
                container.style.height = container.scrollHeight + 'px'
            }else{
                container.style.height = null
            }
        })
    })
   
    let pricePerNight = document.querySelector('.price-per-night').value
    const floatingBookWidget = `<div class = 'floating-booking-widget'> <div class = 'price'>Starting from <br> <span>${pricePerNight}</span></div><a href = "#rvr_booking_widget-1">Book now</a></div>`
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