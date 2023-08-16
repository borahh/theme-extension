<?php

// Add Meta Box for 'property-city' taxonomy
function qg_add_property_city_meta_box() {
    add_meta_box(
        'qg_property_city',
        'Select Property Cities',
        'qg_property_city_meta_box_callback',
        'selection' // Change this to the post type where you want to add the meta box
    );
}
add_action('add_meta_boxes', 'qg_add_property_city_meta_box');

function qg_property_city_meta_box_callback($post) {
    // Fetch terms from 'property-city' taxonomy
    $property_cities = get_terms([
        'taxonomy' => 'property-city',
        'hide_empty' => false,
    ]);

    // Fetch saved values
    $selected_cities = get_post_meta($post->ID, 'qg_property_cities', true);

    // Nonce field for security
    wp_nonce_field('qg_property_city_nonce', 'qg_property_city_nonce_field');

    if (!is_wp_error($property_cities) && !empty($property_cities)) {
        ?>
        <select name="qg_property_cities[]" id="qg_property_cities" multiple="multiple" style="width: 100%;">
            <?php
            foreach ($property_cities as $city) {
                $selected = in_array($city->term_id, (array) $selected_cities) ? ' selected="selected"' : '';
                echo '<option value="' . esc_attr($city->term_id) . '"' . $selected . '>' . esc_html($city->name) . '</option>';
            }
            ?>
        </select>
        <script>
            jQuery(document).ready(function($) {
                $('#qg_property_cities').select2();
            });
        </script>
        <?php
    } else {
        echo '<p>No cities found.</p>';
    }
}


// Save the Meta Field
function qg_save_property_city_meta_box_data($post_id) {
    // Verify nonce
    if (!isset($_POST['qg_property_city_nonce_field']) || !wp_verify_nonce($_POST['qg_property_city_nonce_field'], 'qg_property_city_nonce')) {
        return;
    }

    // Check if not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check user permissions
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Save the data
    $selected_cities = isset($_POST['qg_property_cities']) ? $_POST['qg_property_cities'] : [];
    update_post_meta($post_id, 'qg_property_cities', $selected_cities);
}
add_action('save_post', 'qg_save_property_city_meta_box_data');
