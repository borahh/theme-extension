<?php
   /*
   Plugin Name: Theme Extension
   Plugin URI: NA
   description: NA
   Version: 1.2
   Author: H.Borah
   Author URI: NA
   License: GPL2
   */



/**
 * 
 * DO NOT EDIT THIS FILE 
 * For custom fields : http://imzbswh.cluster028.hosting.ovh.net/islandchic/wp-admin/plugin-editor.php?file=realhomes-vacation-rentals%2Fadmin%2Frvr-booking-post-type.php&plugin=realhomes-vacation-rentals%2Frealhomes-vacation-rentals.php
 * For availability calculator front-end : http://imzbswh.cluster028.hosting.ovh.net/islandchic/wp-admin/theme-editor.php?file=assets%2Fmodern%2Fpartials%2Fproperty%2Fsingle%2Frvr%2Favailability-calendar.php&theme=realhomes
 * Property meta fieds:  https://icvillastbarth.com/wp-admin/plugin-editor.php?file=realhomes-vacation-rentals%2Fadmin%2Frvr-property-metaboxes-config.php&plugin=realhomes-vacation-rentals%2Frealhomes-vacation-rentals.php
 * Seasonal Prices : https://icvillastbarth.com/wp-admin/theme-editor.php?file=assets%2Fmodern%2Fpartials%2Fproperty%2Fsingle%2Frvr%2Fseasonal-prices.php&theme=realhomes
 **/

/**
 * Never worry about cache again!
 */
function my_load_scripts($hook) {

	// create my own version codes
	$my_js_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/calendar.js' ));
	$my_jsq_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/jq.calendar.js' ));
	$my_css_ver = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/calendar.css' ));
	// $UNIQUE_VAR_HERE = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/calendar.css' ));
	
	wp_enqueue_script( 'calendar', plugins_url( 'assets/js/calendar.js', __FILE__ ), array(), $my_js_ver );
	wp_enqueue_script( 'calendarjq', plugins_url( 'assets/js/jq.calendar.js', __FILE__ ), array(), $my_jsq_ver );
	wp_enqueue_style( 'calendar', 	plugins_url( 'assets/css/calendar.css', 	 __FILE__ ), false,   $my_css_ver );
	// wp_enqueue_style( 'UNIQUE_NAME_HERE', 	plugins_url( 'assets/css/calendar.css', 	 __FILE__ ), false,   $UNIQUE_VAR_HERE );

}
add_action('wp_enqueue_scripts', 'my_load_scripts');

add_filter( 'rwmb_meta_boxes', 'your_prefix_register_meta_boxes' );

function your_prefix_register_meta_boxes( $meta_boxes ) {
    $prefix = '';

    $meta_boxes[] = [
      'title'  => 'Multi-level nested groups',
      'fields' => [
          [
              'id'     => 'group',
              'type'   => 'group',
              'fields' => [
                  [
                      'name' => 'Text',
                      'id'   => 'text',
                  ],
                  [
                      'name'   => 'Sub group',
                      'id'     => 'sub_group',
                      'type'   => 'group',
                      'fields' => [
                          // Normal field (cloned)
                          [
                              'name'  => 'Sub text',
                              'id'    => 'sub_text',
                          ],
                      ],
                  ],
              ],
          ],
      ],
  ];

    return $meta_boxes;
}
?>