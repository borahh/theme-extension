jQuery(document).ready(function($) {
  $('body').on('keyup', function (e) {
     const id = $(e.target).attr('name');
    if (!id) return;
    const matches = id.match(/rvr_seasonal_plans\[(\d*)\]\[rvr_seasonal_plans_group\]\[(\d*)\]\[rvr_plan_week_price\]/);
    if (!matches) return;
    const num1 = parseInt(matches[1]), num2 = parseInt(matches[2]);
    if (isNaN(num1) || isNaN(num2)) return;
    const target = $(`[name="rvr_seasonal_plans\\[${num1}\\]\\[rvr_seasonal_plans_group\\]\\[${num2}\\]\\[rvr_plan_night_price\\]"]`);
    if (!target.length) return;
    const val = parseInt(e.target.value);
	const perDay = (val / 7);
    console.log(perDay);
    target.eq(0).val(isNaN(val) ? 0 : perDay.toFixed(2));
  })
});