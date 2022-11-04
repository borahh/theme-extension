jQuery(document).ready(function($) {
    $('body').on('keyup', function (e) {
       const id = $(e.target).attr('id');
      if (!id) return;
      const matches = id.match(/rvr_seasonal_plans_(\d*)_rvr_seasonal_plans_group_(\d*)_rvr_plan_night_price/);
      if (!matches) return;
      const num = parseInt(matches[1]);
      if (isNaN(num)) return;
      const target = $(`#rvr_seasonal_plans_${num}__rvr_seasonal_plans_group_${num}_rvr_plan_night_price`);
      if (!target.length) return;
      const val = parseInt(e.target.value);
      target.eq(0).val(isNaN(val) ? 0 : val*val);
    })
  });