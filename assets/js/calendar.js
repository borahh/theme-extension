const monthNumber = ["january", "february", "march", "spril", "may", "june", "july", "august", "september", "october", "november", "december"]

window.addEventListener('load', () =>{
    const calenders = document.querySelectorAll('.availability-calendar')
    const optionalDates = document.querySelector('#property-availability').getAttribute('data-option-dates').split(',')
    const jsonOptionalDates = optionalDates.map(item =>{
        const [year, month, day] = item.split('-')
        return {year, month, day}
    })
    const blockedDates = document.querySelector('#property-availability').getAttribute('data-blocked-dates').split(',')
    const jsonBlockedDates = blockedDates.map(item =>{
        const [day,month, year] = item.split('-')
        return {year, month, day}
    })
    calenders.forEach(calender =>{
        const [month, year] = calender.querySelector('.month-name').innerText.split(',')
        console.log(monthNumber.indexOf(month.toLowerCase()) + 1, year.replace(" ", ''))
    })
})