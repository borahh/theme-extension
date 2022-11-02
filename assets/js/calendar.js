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

const sortData = () =>{
    // get optional date in json format
    const optionalDates = document.querySelector('#property-availability').getAttribute('data-option-dates').split(',')
    const sortedOptionalDates = []
    optionalDates.forEach(item =>{
        const [year, month, day] = item.split('-')
        if(sortedOptionalDates.length ===0){
            return sortedOptionalDates.push({year , month, dates: [parseInt(day)]})
        }
        if(sortedOptionalDates.at(-1).year === year && sortedOptionalDates.at(-1).month === month  ){
            return sortedOptionalDates.at(-1).dates.push(parseInt(day))
        }else{
            return sortedOptionalDates.push({year, month,dates: [parseInt(day)]})
        }
    })

    // get blocked dates in json format
    const blockedDates = document.querySelector('#property-availability').getAttribute('data-blocked-dates').split(',')
    const sortedBlockedDates = []
    blockedDates.forEach(item =>{
        const [year, month, day] = item.split('-')
        if(sortedBlockedDates.length ===0){
            return sortedBlockedDates.push({year , month, dates: [parseInt(day)]})
        }
        if(sortedBlockedDates.at(-1).year === year && sortedBlockedDates.at(-1).month === month  ){
            return sortedBlockedDates.at(-1).dates.push(parseInt(day))
        }else{
            return sortedBlockedDates.push({year, month,dates: [parseInt(day)]})
        }
    })
   return {sortedOptionalDates, sortedBlockedDates}

}

const myFunc = () =>{
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
const myFunc2 = () =>{
    const calenders = document.querySelectorAll('.daterangepicker .calendar-table')
    const {sortedOptionalDates, sortedBlockedDates} = sortData()
    
    calenders.forEach(async calender =>{
        const ele =  await waitForElm(calender.querySelector('.month'))
        const [month, year] =ele.innerText.split(' ')

        sortedOptionalDates.forEach(item =>{
            if(item.year == year.replace(' ', '') && parseInt(item.month) == monthNumber.indexOf(month.toLowerCase()) + 1 ){
              calender.querySelectorAll('table tbody td').forEach(td =>{
                if(item.dates.includes(parseInt(td.innerText))) {

                    if(!td.classList.contains('ends')) {
                        td.classList.add('option-date')
                        td.classList.remove('available')
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
        
    })
}
window.addEventListener('load', () =>{
    const observer = new MutationObserver(myFunc)
    const observer2 = new MutationObserver(myFunc2)
    const observeElement1 = document.querySelector('#property-availability')
    const observeElement2 = document.querySelector('body')
    myFunc()
    myFunc2()
    observer.observe(observeElement1, {childList: true, subtree: true })
    observer2.observe(observeElement2, {childList:true, subtree: true})

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

//  currency change
 const currencySelector = document.querySelector('select[name = "currencyType"]')
 const currencySwitcherList = document.querySelectorAll("#currency-switcher-list > li")

 currencySelector.value = 'USD'

 currencySelector.addEventListener('change', () =>{
     currencySwitcherList.forEach(li=>{
       if(li.dataset.currencyCode === currencySelector.value){
          li.click()
       }
     })
 })

//  room filter
  const pricesTableRows = document.querySelectorAll('#prices > table> tbody > tr')

  pricesTableRows.forEach(row =>{
     if(row.dataset.room != 1){
         row.style.display = 'none'
     }
  })
})

