const monthNumber = ["january", "february", "march", "spril", "may", "june", "july", "august", "september", "october", "november", "december"]


const myFunc = () =>{
    const calenders = document.querySelectorAll('.availability-calendar')

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
        const [day, month, year] = item.split('-')
        if(sortedBlockedDates.length ===0){
            return sortedBlockedDates.push({year , month, dates: [parseInt(day)]})
        }
        if(sortedBlockedDates.at(-1).year === year && sortedBlockedDates.at(-1).month === month  ){
            return sortedBlockedDates.at(-1).dates.push(parseInt(day))
        }else{
            return sortedBlockedDates.push({year, month,dates: [parseInt(day)]})
        }
    })
   
 

    calenders.forEach(calender =>{
        const [month, year] = calender.querySelector('.month-name').innerText.split(',')

        sortedOptionalDates.forEach(item =>{
            if(item.year == year.replace(' ', '') && parseInt(item.month) == monthNumber.indexOf(month.toLowerCase()) + 1 ){
              calender.querySelectorAll('table tbody td').forEach(td =>{
                if(item.dates.includes(parseInt(td.innerText))) {
                    td.style.backgroundColor = 'rgba(128, 128, 128, 0.2)'
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
    const calenders = document.querySelectorAll('.calendar-table')

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
        const [day, month, year] = item.split('-')
        if(sortedBlockedDates.length ===0){
            return sortedBlockedDates.push({year , month, dates: [parseInt(day)]})
        }
        if(sortedBlockedDates.at(-1).year === year && sortedBlockedDates.at(-1).month === month  ){
            return sortedBlockedDates.at(-1).dates.push(parseInt(day))
        }else{
            return sortedBlockedDates.push({year, month,dates: [parseInt(day)]})
        }
    })
   
   
 

    calenders.forEach(calender =>{
        console.log(calender.querySelector('.month'))
        const [month, year] = calender.querySelector('.month').innerText.split(' ')

        sortedOptionalDates.forEach(item =>{
            if(item.year == year.replace(' ', '') && parseInt(item.month) == monthNumber.indexOf(month.toLowerCase()) + 1 ){
              calender.querySelectorAll('table tbody td').forEach(td =>{
                if(item.dates.includes(parseInt(td.innerText))) {
                    td.style.backgroundColor = 'rgba(128, 128, 128, 0.2)'
                }
              })
            }
        })

        sortedBlockedDates.forEach(item =>{
            if(item.year == year.replace(' ', '') && parseInt(item.month) == monthNumber.indexOf(month.toLowerCase()) + 1 ){
              calender.querySelectorAll('table tbody td').forEach(td =>{
                if(item.dates.includes(parseInt(td.innerText))){
                    td.classList.remove('available')
                    td.classList.add('disabled')
                    td.classList.add('off')
                    td.classList.add('reserved')
                    td.style.color = 'white'
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
    observer.observe(observeElement1, {childList: true, subtree: true })
    observer2.observe(observeElement2, {childList:true, subtree: true})

})
