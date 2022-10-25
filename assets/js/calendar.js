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
    const jsonBlockedDates = blockedDates.map(item =>{
        const [day,month, year] = item.split('-')
        return {year, month, day}
    })

    calenders.forEach(calender =>{
        const [month, year] = calender.querySelector('.month-name').innerText.split(',')
        // console.log(monthNumber.indexOf(month.toLowerCase()) + 1, year.replace(" ", ''))

        sortedOptionalDates.forEach(item =>{
            if(item.year == year.replace(' ', '') && parseInt(item.month) == monthNumber.indexOf(month.toLowerCase()) + 1 ){
                console.log(item.dates)
              calender.querySelectorAll('table tbody td').forEach(td =>{
                if(item.dates.includes(parseInt(td.innerText))) {
                    td.style.backgroundColor = '#ff7ff0'
                }
              })
            }
        })
        
    })
}
window.addEventListener('load', () =>{
    const observer = new MutationObserver(myFunc)
    const observeElement = document.querySelector('#property-availability')
    myFunc()
    observer.observe(observeElement, { attributes: true, childList: true, subtree: true })

})
