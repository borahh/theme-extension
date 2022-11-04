
jQuery(document).ready(function($) {
    $('body').on('keyup', '#rvr_seasonal_plans_2_rvr_seasonal_plans_group_1_rvr_plan_week_price', function() {
        var width = $('#rvr_seasonal_plans_2_rvr_seasonal_plans_group_1_rvr_plan_week_price').val();
        var square_meters = width;
        $('#rvr_seasonal_plans_2_rvr_seasonal_plans_group_1_rvr_plan_night_price').val(square_meters);
    });
});