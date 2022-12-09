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
    const checkOutDates = document.querySelector('#property-availability').getAttribute('data-out-dates').split(',')
    const sortedCheckOutDates = InJSON(checkOutDates)
    // getCheckInDates
    const checkInDates = document.querySelector('#property-availability').getAttribute('data-in-dates').split(',')
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

async function calculateCost(startDate, endDate, flag) {

    // Setting the Check-In and Check-Out dates in their fields.
    const checkIn = document.querySelector('input[name="check_in"]')
    const checkOut = document.querySelector('input[name="check_out"]')
    let pricePerNight = document.querySelector('.price-per-night').value
    const propertyPricingType = document.querySelector('.property-pricing').value; // Seasonal / flat.
    const propertyID = document.querySelector('.property-id').value;
    checkIn.value = startDate
    checkOut.value = endDate
    let bulkPrices;
            try {
                bulkPrices = JSON.parse(document.querySelector('.bulk-prices').value);
            } catch (error) {
                bulkPrices = {};
            }
   
        // Do nothing and return if Price Per Night is not available.
        if (0 === parseInt(pricePerNight)) {
            return;
        }

        let days = parseInt((endDate.split('-')[2]- startDate.split('-')[2]) / 1000 / 60 / 60 / 24);
        days = (days === 0) ? 1 : days; // Total days for booking.

        // Change default per night price if bulk pricing is applicable.
        var defaultPricePerNight = null;
        Object.entries(bulkPrices).forEach((obj) =>{
          if (days >= parseInt(obj[0])) {
            defaultPricePerNight = parseInt(obj[1]);
        }
        })

       if (null === defaultPricePerNight) {
            defaultPricePerNight = pricePerNight
        }


        // Set basic cost of staying nights. Also apply seasonal pricing if applicable.
        var costStayingNights = null;

        if ('seasonal' === propertyPricingType) {

            var fetchStayingNightsCost = {
                method: 'POST',
                body: JSON.stringify({
                  action: 'fetch_staying_nights_cost',
                  property_id: propertyID,
  adult:  parseInt(document.querySelector('select.rvr-adult').value),
                  default_price: defaultPricePerNight,
                  check_in: startDate,
                  check_out: endDate,
              }),
              headers: {
                "Content-Type": 'application/json'
              }
                
            };
           fetch('https://icvillastbarth.com/wp-admin/admin-ajax.php', fetchStayingNightsCost).then(res => res.json).then( function (response) {
            costStayingNights = parseInt(response.body);
        })


        } else {
            costStayingNights = defaultPricePerNight * days;
        }



        // Average price per night as different per night prices are may applied.
        var avgPricePerNight = Math.round(costStayingNights / days);

        // Calculate service charges.
        var costServiceCharges = (costStayingNights * serviceCharges) / 100;
        costServiceCharges = (isNaN(costServiceCharges)) ? 0 : costServiceCharges;

        // Guests data.
        const book_child_as = document.querySelector('.book-child-as').value;
        const children = document.querySelector('select.rvr-child');
        const adults = document.querySelector('select.rvr-adult');
        const adultsNum = parseInt(adults.val());
        let guestsNum = 0;

        if ('adult' === book_child_as) { // Check if child needs to be booked as an adult.
            const childrenNum = parseInt(children.value);
            guestsNum = adultsNum + childrenNum;
        } else {
            guestsNum = adultsNum;
        }

        const guestsCapacity = document.querySelector('.guests-capacity').value;
        const extraGuestsNum = ((guestsNum - guestsCapacity) > 0) ? guestsNum - guestsCapacity : 0;
        const extraGuests = document.querySelector('.extra-guests').value;
        const perExtraGuestPrice = parseInt(document.querySelector('.per-extra-guest-price').value);
        var costExtraGuests = 0;

        // Extra guests cost calculation
        if ('allowed' === extraGuests && Number.isInteger(perExtraGuestPrice)) {
            costExtraGuests = perExtraGuestPrice * (extraGuestsNum * days);
        }

        // Calculate additional fees.
        var additionalFeesFields = document.querySelector('.rvr-additional-fees');
        var additionalFeesAmount = 0; // Total amount of all additional fees.
        var additionalFees = []; // Array of all additional fees fields data.
        var additionalFeesPrices = []; // Array of names as keys and prices as values for the price format and then display purpose.

        // Prepare additional fees data if it's available.
        if (additionalFeesFields) {
            // Number of guests information.
            adults.off('change.calculation');
            adults.on('change.calculation', function () { // Redo the calculations on adults change.
                calculateCost(startDate, endDate, null);
            });

            if ('adult' === book_child_as) { // Check if child will be booked as an adult.
                children.off('change.calculation');
                children.on('change.calculation', function () { // Redo the calculations on children change.
                    calculateCost(startDate, endDate, null);
                });
            }

            additionalFeesFields = additionalFeesFields.children; // Assign all additional fees fields to the fields variable if exists.

            // Loop through all additional fees fields and build an array from their data.
            additionalFeesFields.forEach(function(item) {

                // Fee data gathering from its field.
                let fee = [];
                fee['name'] = item.getAttribute('name');
                fee['label'] = item.dataset.label;
                fee['type'] = item.dataset.type;
                fee['calc'] = item.dataset.calculation;
                fee['amount'] = parseInt(item.dataset.amount);

                if ('per_stay' !== fee['calc']) {
                    switch (fee['calc']) {
                        case 'per_guest':
                            fee['amount'] = fee['amount'] * guestsNum; // Per guest fee.
                            break;
                        case 'per_night':
                            fee['amount'] = fee['amount'] * days; // Per night fee.
                            break;
                        case 'per_night_guest':
                            fee['amount'] = fee['amount'] * (guestsNum * days); // Per guest per night fee.
                    }
                }

                // Apply the percentage of staying nights cost if fee type is percentage.
                if ('percentage' === fee['type']) {
                    fee['amount'] = (costStayingNights * fee['amount']) / 100;
                }

                item.value = fee['amount'];
                additionalFeesAmount += fee['amount']; // Add current fee to the total amount of the fees.
                additionalFeesPrices[fee['name']] = fee['amount']; // Add to the pricing array for the price formation and display in calculation table purpose.

                additionalFees.push(fee); // Push current fee data to the fees data array.
            });
        }

        // Calculate sub total.
        var costSubTotal = costStayingNights + costServiceCharges + additionalFeesAmount + costExtraGuests;

        // Calculate Govt. taxes.
        var costGovtTax = (costSubTotal * govtTax) / 100;
        costGovtTax = (isNaN(costGovtTax)) ? 0 : costGovtTax;

        // Prepare total cost of current booking.
        var costTotal = costSubTotal + costGovtTax;

          const data =  {
            action: 'rvr_format_prices',
            prices: {
                avgPricePerNight,
                costStayingNights,
                costExtraGuests,
                costServiceCharges,
                ...additionalFeesPrices,
                costGovtTax,
                costSubTotal,
                costTotal,
            }
        }
        // Format prices to display in the calculation table.
        fetch(document.querySelector('.rvr-booking-form').getAttribute('action'),
            {
              method: 'POST',
                body:JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
            }
        ).then(res => res.json()).then(function (response) { // Set prices with their other relevant data to the calculation table and then display the table.
          var responseJson = response.body;
          var prices = responseJson.formatted_prices; // Formatted prices.

          // Set data and values for the default booking calculation fields.
          const snField = document.querySelector('.staying-nights-count-field .cost-value');
          const psnField = document.querySelector('.staying-nights-field .cost-value');
          const scField = document.querySelector('.services-charges-field .cost-value');
          const stField = document.querySelector('.subtotal-price-field .cost-value');
          const gtField = document.querySelector('.govt-tax-field .cost-value');
          const tpField = document.querySelector('.total-price-field .cost-value');

          snField.innerText =Math.round(days) + ' x ' + prices.avgPricePerNight;
          psnField.innerText =prices.costStayingNights;
          scField.innerText =prices.costServiceCharges;
          stField.innerText =prices.costSubTotal;
          gtField.innerText =prices.costGovtTax;
          tpField.innerText =prices.costTotal;

          snField.dataset['avg-price-per-night'] =  Math.round(avgPricePerNight);
          snField.dataset['total-nights'] =  Math.round(days);
          psnField.dataset['staying-nights'] =  Math.round(costStayingNights);
          scField.dataset['service-charges'] =  Math.round(costServiceCharges);
          stField.dataset['subtotal'] =  Math.round(costSubTotal);
          gtField.dataset['govt-tax'] =  Math.round(costGovtTax);
          tpField.dataset['total'] =  Math.round(costTotal);

          // Additional guest details display.
          const egField = document.querySelector('.extra-guests-field');
          if (extraGuestsNum) {
              const egFieldVal = egField.querySelector('.cost-value');

              egField.style.display = 'block';
              egField.querySelector('span').innerText = extraGuestsNum ;
              egFieldVal.innerText = prices.costExtraGuests;
              egFieldVal.dataset['extra-guests'] = Math.round(costExtraGuests);
          } else {
              egField.style.display= 'none'
          }

          // Set additional fees fields data and values in the calculation table.
          if (additionalFees) {
              additionalFees.forEach(function (field) {
                  let feeCalcField = document.querySelector('.' + field['name'] + '-fee-field').querySelector('.cost-value');
                  feeCalcField.innerText = prices[field['name']];
                  feeCalcField.data(prices[field['name']].match(/\d/g).join(''));
              });
          }
      });



    

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

//  make request when page loads
calculateCost('2023-01-16', '2023-01-17')
})

