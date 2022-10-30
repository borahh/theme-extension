window.addEventListener("load", () => {
  const perDayPrice = document.querySelectorAll(".per_day_price");
  const perWeekPrice = document.querySelectorAll(".per_week_price");

  perDayPrice.forEach(item => {
    const element = '<span class = "heavy">Per Day</span>';
    item.innerHTML += element;
  });

  perWeekPrice.forEach(item => {
    const element = '<span class = "heavy">Per Week</span>';
    item.innerHTML += element;
  });
});
