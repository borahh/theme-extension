jQuery(document).ready(function($) {
    $('body').on('keyup', function (e) {
       const id = $(e.target).attr('name');
      if (!id) return;
      const matches = id.match(/rvr_seasonal_plans_[(\d*)]_rvr_seasonal_plans_group_[(\d*)]_rvr_plan_week_price/);
      if (!matches) return;
      const num1 = parseInt(matches[1]), num2 = parseInt(matches[2]);
      if (isNaN(num1) || isNaN(num2)) return;
      const target = $(`[name="rvr_seasonal_plans_[${num1}]_rvr_seasonal_plans_group_[${num2}]_rvr_plan_night_price"]`);
      if (!target.length) return;
      const val = parseInt(e.target.value);
      target.eq(0).val(isNaN(val) ? 0 : val*val);
    })
  });