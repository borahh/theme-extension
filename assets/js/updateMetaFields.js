jQuery(document).ready(function($) {
  // Get all input fields matching the pattern
  const inputs = $('input[name^="rvr_seasonal_plans"][name$="[rvr_plan_week_price]"]');
  // Loop through each input field
  inputs.each(function() {
    // Extract the numbers from the input field's "name" attribute
    const matches = this.name.match(/rvr_seasonal_plans\[(\d*)\]\[rvr_seasonal_plans_group\]\[(\d*)\]\[rvr_plan_week_price\]/);
    if (!matches) return;
    const num1 = parseInt(matches[1]), num2 = parseInt(matches[2]);
    if (isNaN(num1) || isNaN(num2)) return;
    // Find the corresponding "rvr_plan_night_price" input field
    const target = $(`[name="rvr_seasonal_plans\\[${num1}\\]\\[rvr_seasonal_plans_group\\]\\[${num2}\\]\\[rvr_plan_night_price\\]"]`);
    if (!target.length) return;
    // Perform the calculation and update the "rvr_plan_night_price" input field
    const val = parseInt(this.value);
    const perDay = (val / 7);
    target.eq(0).val(isNaN(val) ? 0 : perDay.toFixed(7));
  });
});
