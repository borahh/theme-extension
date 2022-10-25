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
        const calenderMonth = calender.querySelector('.month-name')
        console.log(calenderMonth)
    })
})