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
 * For availability calculator front-end : https://icvillastbarth.com/wp-admin/theme-editor.php?file=assets%2Fmodern%2Fpartials%2Fproperty%2Fsingle%2Frvr%2Favailability-calendar.php&theme=realhomes
 * Property meta fieds:  https://icvillastbarth.com/wp-admin/plugin-editor.php?file=realhomes-vacation-rentals%2Fadmin%2Frvr-property-metaboxes-config.php&plugin=realhomes-vacation-rentals%2Frealhomes-vacation-rentals.php
 * Booking Widget: https://icvillastbarth.com/wp-admin/plugin-editor.php?file=realhomes-vacation-rentals%2Fassets%2Frvr-booking-widget.php&plugin=realhomes-vacation-rentals%2Frealhomes-vacation-rentals.php
 * Booking CF : https://icvillastbarth.com/wp-admin/plugin-editor.php?file=realhomes-vacation-rentals%2Fadmin%2Frvr-booking-post-type.php&plugin=realhomes-vacation-rentals%2Frealhomes-vacation-rentals.php
 * Booking JS: https://icvillastbarth.com/wp-admin/plugin-editor.php?file=realhomes-vacation-rentals%2Fassets%2Fjs%2Frvr-booking-public.js&plugin=realhomes-vacation-rentals%2Frealhomes-vacation-rentals.php
 * Seasonal Prices : https://icvillastbarth.com/wp-admin/theme-editor.php?file=assets%2Fmodern%2Fpartials%2Fproperty%2Fsingle%2Frvr%2Fseasonal-prices.php&theme=realhomes
 **/


// Plugin directory path
 if ( ! defined( 'BORAHH_PLUGIN_DIR' ) ) {
	define( 'BORAHH_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}

require_once BORAHH_PLUGIN_DIR . 'inc/pdf-generator.php';

/**
 * Never worry about cache again!
 */
function my_load_scripts($hook) {

	// create my own version codes
	$my_js_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/calendar.js' ));
	$my_css_ver = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/calendar.css' ));
	// $UNIQUE_VAR_HERE = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/calendar.css' ));
	
	// PDF content
	$pdfContent_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/pdf-downloader.js' ));
	$customJs_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/custom.js' ));

	$showJs_ver = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/show-hide.js' ));
	$custom_css_ver = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/custom.css' ));
	$singleProperty_css_ver = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/single-property.css' ));

	// Run code only for Single post page
	if ( is_single() && 'property' == get_post_type() ) {
		wp_enqueue_script( 'pdfGenrator', plugins_url( 'assets/js/pdf-downloader.js', __FILE__ ), NULL, $pdfContent_ver );	
		wp_enqueue_script( 'showHide', plugins_url( 'assets/js/show-hide.js', __FILE__ ), NULL, $showJs_ver, true );	
		wp_enqueue_style( 'single-property', 	plugins_url( 'assets/css/single-property.css', 	 __FILE__ ), false, $singleProperty_css_ver );

	}
	wp_enqueue_style( 'custom', 	plugins_url( 'assets/css/custom.css', 	 __FILE__ ), false, $custom_css_ver );
	wp_enqueue_script( 'calendar', plugins_url( 'assets/js/calendar.js', __FILE__ ), array(), $my_js_ver );
	wp_enqueue_script( 'theme-extension', plugins_url( 'assets/js/custom.js', __FILE__ ), array(), $customJs_ver );
	wp_enqueue_style( 'calendar', 	plugins_url( 'assets/css/calendar.css', 	 __FILE__ ), false, $my_css_ver );
	// wp_enqueue_style( 'UNIQUE_NAME_HERE', 	plugins_url( 'assets/css/calendar.css', 	 __FILE__ ), false,   $UNIQUE_VAR_HERE );

}
add_action('wp_enqueue_scripts', 'my_load_scripts');



function admin_load_scripts($hook) {

	// create my own version codes
	$my_umf_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/updateMetaFields.js' ));
	// $UNIQUE_VAR_HERE = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/calendar.css' ));
	
	// PDF generator
	$pdfGenrator_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/pdf-generator.js' ));

	wp_enqueue_script( 'updateMetaFields', plugins_url( 'assets/js/updateMetaFields.js', __FILE__ ), array('jquery'), $my_umf_ver );
	// wp_enqueue_style( 'UNIQUE_NAME_HERE', 	plugins_url( 'assets/css/calendar.css', 	 __FILE__ ), false,   $UNIQUE_VAR_HERE );

	wp_enqueue_script( 'pdfGenrator', plugins_url( 'assets/js/pdf-generator.js', __FILE__ ), NULL, $pdfGenrator_ver );

}
add_action('admin_enqueue_scripts', 'admin_load_scripts');




?>