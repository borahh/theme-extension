const monthNumber = ["january", "february", "march", "spril", "may", "june", "july", "august", "september", "october", "november", "december"]

function waitForElm(selector) {
    return new Promise(resolve => {
        if (selector) {
            return resolve(selector);
        }

        const observer = new MutationObserver(mutations => {
            if (selector) {
                resolve(selector);
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
function recreateNode(el, withChildren) {
    if (withChildren) {
      el.parentNode.replaceChild(el.cloneNode(true), el);
    }
    else {
      var newEl = el.cloneNode(false);
      while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
      el.parentNode.replaceChild(newEl, el);
    }
  }
const sortData = () =>{
   const InJSON = (dates) =>{
      const sortedDates = []
      dates.forEach(item =>{
        const [year, month, day] = item.split('-')
        if(sortedDates.length ===0){
            return sortedDates.push({year , month, dates: [parseInt(day)]})
        }
        if(sortedDates.at(-1).year === year && sortedDates.at(-1).month === month  ){
            return sortedDates.at(-1).dates.push(parseInt(day))
        }else{
            return sortedDates.push({year, month,dates: [parseInt(day)]})
        }
    })
     return sortedDates
   }

    // get optional date in json format
    const optionalDates = document.querySelector('#property-availability').getAttribute('data-option-dates').split(',')
    const sortedOptionalDates = InJSON(optionalDates)
 
    // get blocked dates in json format
    const blockedDates = document.querySelector('#property-availability').getAttribute('data-blocked-dates').split(',')
    const sortedBlockedDates = InJSON(blockedDates)


    //get checkOutDates 
    const checkOutDates = ['2022-12-06']
    const sortedCheckOutDates = InJSON(checkOutDates)
    // getCheckInDates
    const checkInDates = ['2022-12-11']
    const sortedCheckInDates = InJSON(checkInDates)


   return {sortedOptionalDates, sortedBlockedDates, sortedCheckOutDates, sortedCheckInDates}

}

const markOnCalendar = () =>{
    const calenders = document.querySelectorAll('.availability-calendar')
   const {sortedOptionalDates, sortedBlockedDates} = sortData()
 
    calenders.forEach(calender =>{
        const [month, year] = calender.querySelector('.month-name').innerText.split(',')

        sortedOptionalDates.forEach(item =>{
            if(item.year == year.replace(' ', '') && parseInt(item.month) == monthNumber.indexOf(month.toLowerCase()) + 1 ){
              calender.querySelectorAll('table tbody td').forEach(td =>{
                if(item.dates.includes(parseInt(td.innerText))) {
                    td.style.backgroundColor = 'rgba(255, 151, 82, 0.733)'
                }
              })
            }
        })

        sortedBlockedDates.forEach(item =>{
            if(item.year == year.replace(' ', '') && parseInt(item.month) == monthNumber.indexOf(month.toLowerCase()) + 1 ){
              calender.querySelectorAll('table tbody td').forEach(td =>{
                if(item.dates.includes(parseInt(td.innerText))){
                    td.classList.remove('available')
                    td.classList.add('unavailable')
                    td.style.color = 'white'
                }
              })
            }
        })
        
    })
}
const markOnDatePicker = () =>{
    const calenders = document.querySelectorAll('.daterangepicker .calendar-table')
    const {sortedOptionalDates, sortedBlockedDates, sortedCheckInDates, sortedCheckOutDates} = sortData()
    
    calenders.forEach(async calender =>{
        const ele =  await waitForElm(calender.querySelector('.month'))
        const [month, year] =ele.innerText.split(' ')

        sortedOptionalDates.forEach(item =>{
            if(item.year == year.replace(' ', '') && parseInt(item.month) == monthNumber.indexOf(month.toLowerCase()) + 1 ){
              calender.querySelectorAll('table tbody td').forEach(td =>{
                if(item.dates.includes(parseInt(td.innerText))) {

                    if(!td.classList.contains('ends')) {
                        td.classList.add('option-date')
                    }
                }
              })
            }
        })

        sortedBlockedDates.forEach(item =>{
            if(item.year == year.replace(' ', '') && parseInt(item.month) == monthNumber.indexOf(month.toLowerCase()) + 1 ){
              calender.querySelectorAll('table tbody td').forEach(td =>{
                if(item.dates.includes(parseInt(td.innerText))){
                    if(!td.classList.contains('ends')){
                        td.classList.remove('available')
                    td.classList.add('disabled')
                    td.classList.add('reserved')
                    td.style.color = 'white'
                    }
                }
              })
            }
        })
        sortedCheckOutDates.forEach(item =>{
            if(item.year == year.replace(' ', '') && parseInt(item.month) == monthNumber.indexOf(month.toLowerCase()) + 1 ){
              calender.querySelectorAll('table tbody td').forEach(td =>{
                if(item.dates.includes(parseInt(td.innerText))){
                    if(!td.classList.contains('ends')){
                       td.classList.add('checkOutDate') 
                    }
                }
              })
            }
        })
        sortedCheckInDates.forEach(item =>{
            if(item.year == year.replace(' ', '') && parseInt(item.month) == monthNumber.indexOf(month.toLowerCase()) + 1 ){
              calender.querySelectorAll('table tbody td').forEach(td =>{
                if(item.dates.includes(parseInt(td.innerText))){
                    if(!td.classList.contains('ends')){
                       td.classList.add('checkInDate')
                    }
                }
              })
            }
        })
        
    })
}


window.addEventListener('load', () =>{
    const observer = new MutationObserver(markOnCalendar)
    const observer2 = new MutationObserver(markOnDatePicker)
    const observeElement1 = document.querySelector('#property-availability')
    const observeElement2 = document.querySelector('body')
    markOnCalendar()
    markOnDatePicker()
    observer.observe(observeElement1, {childList: true, subtree: true })
    observer2.observe(observeElement2, {childList:true, subtree: true})
    document.querySelector('.daterangepicker .today').classList.remove('start-date')
    document.querySelector('.daterangepicker .today').classList.remove('end-date')

//    prices table
const perDayPrice = document.querySelectorAll('.per_day_price')
const perWeekPrice = document.querySelectorAll('.per_week_price')

 perDayPrice.forEach(item =>{
    const element = '<span class = "heavy">Per Day</span>'
    item.innerHTML += element
 })

 perWeekPrice.forEach(item =>{
    const element = '<span class = "heavy">Per Week</span>'
    item.innerHTML += element
 })



//  room filter
  const pricesTableRows = document.querySelectorAll('#prices > table> tbody > tr')
  const roomSelector = document.querySelector('select[name = "bedrooms"]')

  pricesTableRows.forEach(row =>{
     if(row.dataset.room != 1){
         row.style.display = 'none'
     }
  })

  roomSelector.addEventListener('change', () =>{
    pricesTableRows.forEach(row =>{
        if(row.dataset.room != roomSelector.value){
            row.style.display = 'none'
        }else{
            row.style.display = 'grid'
        }
     })
  })

//   NavBar
document.querySelector('.rh_rvr_optional_services_wrapper').setAttribute('id', 'servies')
document.querySelector('.property-detail-slider-wrapper').setAttribute('id', 'gallary')

const intersectionObserver = new IntersectionObserver((entries) =>{
     entries.forEach(entry =>{
        const id = entry.target.getAttribute('id')
        const link = document.querySelector(`a[href= "#${id}"]`)
        if(entry.isIntersecting){
            document.querySelectorAll('#page_nav a').forEach(item => item.classList.remove('active'))
            link.classList.add('active')

        }
     })
}, {rootMargin: '20% 20% 0% 0%'})

const navLinks = [
    {id:'#gallary', name: 'gallary'},
    {id:'#property-content-section-content', name: 'description'},
    {id:'#property-content-section-features', name: 'Features'},
    {id:'#servies', name: 'services'},
 {id:'#prices', name: 'prices'},
 {id:'#property-availability', name: 'availability'},
  {id:'#property_map', name: 'map'},
  {id:'#similar-properties-wrapper', name: 'similar'},
  {id:'#rvr_booking_widget-1', name: 'book'},
]
let navLinksHTML  = ' ';
navLinks.forEach(item =>{
    intersectionObserver.observe(document.querySelector(item.id))
    navLinksHTML += `<li><a href = '${item.id}' >${item.name}</a> `
})
const pageNav = `<nav id = 'page_nav' >
   <ul class = 'rh_wrap--padding'>
     ${navLinksHTML}
   </ul>
   <div class = "left">
   <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
</div>
<div class = "right">
<svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
</div>

</nav>`

const rhSection = document.querySelector('.rh_section')
rhSection.insertAdjacentHTML("beforebegin",pageNav)

window.addEventListener('scroll', () =>{
    const pageNaveBar= document.querySelector('#page_nav');
   const { top} =  pageNaveBar.getBoundingClientRect()

   if(!top){
      pageNaveBar.classList.add('shadow')
   }else{
     pageNaveBar.classList.remove('shadow')
   }
})


})

