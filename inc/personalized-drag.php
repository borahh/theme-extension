<?php
function qg_property_order_meta_box() {
    add_meta_box(
        'qg_property_order_meta_box_id', // Unique ID
        'Property Order',                // Box title
        'qg_property_order_meta_box_callback', // Content callback, must be of type callable
        'selection'                           // Post type
    );
}
add_action('add_meta_boxes', 'qg_property_order_meta_box');


function qg_save_property_order($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

    // Verify nonce (optional if you want to include a nonce in your meta box)
    // if (!isset($_POST['qg_property_order_nonce']) || !wp_verify_nonce($_POST['qg_property_order_nonce'], 'qg_property_order_nonce_action')) return;

    // Check user permissions
    if (!current_user_can('edit_post', $post_id)) return;

    // Update the post meta field with the sorted order
    if (isset($_POST['qg_property_order'])) {
        update_post_meta($post_id, 'qg_property_order', sanitize_text_field($_POST['qg_property_order']));
    }
}
add_action('save_post', 'qg_save_property_order');



function qg_property_order_meta_box_callback($post) {
    $property_order = get_post_meta($post->ID, 'qg_property_order', true);
    $property_order = $property_order ? explode(',', $property_order) : array();

    $items = qg_populate_and_sort_properties($post->ID);

    // Sort items according to saved order
    usort($items, function ($a, $b) use ($property_order) {
        $a_index = array_search($a['sorting_key'], $property_order);
        $b_index = array_search($b['sorting_key'], $property_order);
        return $a_index - $b_index;
    });

    $total_items = count($items);

    echo '<div style="padding: 10px; background: #f1f1f1; border-radius: 5px;">';
    echo '<h3>Total Items: ' . $total_items . '</h3>';
    echo '<ul id="qg-property-order-list" style="cursor: move; padding: 10px; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 5px; list-style: none;">';
    foreach ($items as $item) {
        echo '<li data-sorting-key="' . $item['sorting_key'] . '" style="padding: 5px; margin: 5px 0; border-bottom: 1px solid #e0e0e0;">';
        echo '<a href="' . $item['url'] . '" style="font-weight: bold;">' . $item['title'] . '</a><br>';
        echo '<span style="color: #888;">' . $item['address'] . '</span><br>';
        echo 'Rooms: ' . $item['rooms'] . '<br>';
        echo 'Cost: ' . $item['cost'];
        echo '</li>';
    }
    echo '</ul>';
    echo '<input type="hidden" name="qg_property_order" id="qg_property_order" value="' . implode(',', $property_order) . '">';
    echo '</div>';
    ?>
    <style>
        #qg-property-order-list li.ui-sortable-helper {
            background-color: #f0f0f0;
            border: 2px dashed #ccc;
            color: #333;
        }
        #qg-property-order-list .ui-state-highlight {
            height: 50px;
            line-height: 50px;
            background-color: #e0f7fa;
            border: 1px solid #80cbc4;
            color: #333;
        }
    </style>
    <script>
        jQuery(document).ready(function ($) {
            $("#qg-property-order-list").sortable({
                placeholder: "ui-state-highlight",
                helper: "clone",
                update: function (event, ui) {
                    var propertyOrder = $(this).sortable("toArray", {attribute: "data-sorting-key"});
                    $("#qg_property_order").val(propertyOrder.join(","));
                }
            });
            $("#qg-property-order-list").disableSelection();
        });
    </script>
    <?php
}




function qg_populate_and_sort_properties($page_id) {
    $items = array(); // Array to store the items for sorting

    $excludes = get_post_meta($page_id, 'exclude', true);
    $available_rooms = get_post_meta($page_id, 'rooms', true);
    $budget = intval(get_post_meta($page_id, 'budget', true));
    $check_in = get_post_meta($page_id, 'check-in', true);
    $check_out = get_post_meta($page_id, 'check-out', true);
    $dates_limit = borah_get_dates_range($check_in, $check_out);
    
    $selected_cities = get_post_meta($page_id, 'qg_property_cities', true);

    
        $q = new WP_Query(array(
            'post_type' => array('property'),
            'posts_per_page' => -1,
            'post__not_in' => $excludes,
            'post_status' => 'publish',
            'tax_query' => array(
                array(
                    'taxonomy' => 'property-city',
                    'field'    => 'term_id',
                    'terms'    => $selected_cities,
                    'operator' => 'IN',
                ),
            ),
        ));
    
    

    while ($q->have_posts()) {
        $q->the_post();
        $d = get_the_ID();

        $plans = get_post_meta($d, 'rvr_seasonal_plans', true);
        $availability_table = get_post_meta($d, 'rvr_property_availability_table', true);
        $data_dates = array();
        if (!empty($availability_table) && is_array($availability_table)) {
            foreach ($availability_table as $dates) {
                $begin = new DateTime($dates[0]);
                $end = new DateTime($dates[1]);
                $end = $end->modify('+1 day');

                $interval = new DateInterval('P1D');
                $daterange = new DatePeriod($begin, $interval, $end);

                foreach ($daterange as $date) {
                    $data_dates[] = $date->format("Y-m-d");
                }
            }
        }
        $new_array = array();
        foreach ($plans as $season) {
            $season_data = array(
                'name' => $season['rvr_season_name'],
                'start' => $season['rvr_price_start_date'],
                'end' => $season['rvr_price_end_date']
            );

            foreach ($season['rvr_seasonal_plans_group'] as $plan) {
                $rooms = $plan['rvr_plan_rooms'];
                $week_price = array($plan['rvr_plan_week_price']);
                $night_price = array($plan['rvr_plan_night_price']);

                if (isset($new_array[$rooms])) {
                    $new_array[$rooms]['seasons'][] = $season_data;
                    $new_array[$rooms]['week_price'][] = $plan['rvr_plan_week_price'];
                    $new_array[$rooms]['night_price'][] = $plan['rvr_plan_night_price'];
                } else {
                    $new_array[$rooms] = array(
                        'rooms' => $rooms,
                        'seasons' => array($season_data),
                        'week_price' => $week_price,
                        'night_price' => $night_price
                    );
                }
            }
        }

        $new_array = array_values($new_array);
        $new_array = array_filter($new_array, function ($item) use ($available_rooms) {
            return in_array($item['rooms'], $available_rooms);
        });

        $new_array = array_map(function ($item) use ($check_in, $check_out) {
            $item['estimated'] = borahh_obtain_cost($item, $check_in, $check_out);
            return $item;
        }, $new_array);

        foreach ($new_array as $item) {
            $url = get_the_permalink() . '?check-in=' . $check_in . '&check-out=' . $check_out . '&adult=' . $item['rooms'];
            $cost = ere_format_amount($item['estimated']);

            if ($budget && floatval($budget) < $estimated) {
                break;
            }

            if (!empty(array_intersect($data_dates, borah_get_dates_range($check_in, $check_out)))) {
                break;
            }

            // Combine property ID and room number into a single sorting key
            $sorting_key = $d . '-' . $item['rooms'];

            // Populate the items array with property ID, room number, and other details
            $items[] = array(
                'sorting_key' => $sorting_key,
                'property_id' => $d,
                'rooms' => $item['rooms'],
                'estimated' => $item['estimated'],
                'url' => $url,
                'title' => get_the_title(),
                'address' => get_post_meta($d, 'REAL_HOMES_property_address', true),
                'cost' => $cost
            );
        }
    }

    wp_reset_postdata();

    // Sort the items array by property ID and room numbers
    usort($items, function ($a, $b) {
        if ($a['property_id'] == $b['property_id']) {
            return $a['rooms'] - $b['rooms'];
        }
        return $a['property_id'] - $b['property_id'];
    });

    return $items; // Return the sorted array of items
}


