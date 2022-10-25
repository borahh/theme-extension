const monthNumber = ["january", "february", "march", "spril", "may", "june", "july", "august", "september", "october", "november", "december"]

window.addEventListener('load', () =>{
    const calenders = document.querySelectorAll('.availability-calendar')

    // get optional date in json format
    const optionalDates = document.querySelector('#property-availability').getAttribute('data-option-dates').split(',')
    const sortedOptionalDates = []
    optionalDates.forEach(item =>{
        const [year, month, day] = item.split('-')
        if(sortedOptionalDates.length ===0){
            return sortedOptionalDates.push({year , month, dates: [day]})
        }
        if(sortedOptionalDates.at(-1).year === year && sortedOptionalDates.at(-1).month === month  ){
            return sortedOptionalDates.at(-1).dates.push(day)
        }else{
            return sortedOptionalDates.push({year, month,day})
        }
    })
    console.log(sortedOptionalDates)

    // get blocked dates in json format
    const blockedDates = document.querySelector('#property-availability').getAttribute('data-blocked-dates').split(',')
    const jsonBlockedDates = blockedDates.map(item =>{
        const [day,month, year] = item.split('-')
        return {year, month, day}
    })

    calenders.forEach(calender =>{
        const [month, year] = calender.querySelector('.month-name').innerText.split(',')
        // console.log(monthNumber.indexOf(month.toLowerCase()) + 1, year.replace(" ", ''))
    })
})