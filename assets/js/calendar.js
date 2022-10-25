window.addEventListener('load', () =>{
    const optionalDates = document.querySelector('#property-availability').getAttribute('data-option-dates').split(',')
    const jsonOptionalDates = optionalDates.map(item =>{
        const [year, month, day] = item.split('-')
        return {year, month, day}
    })
    console.log(jsonOptionalDates)
})