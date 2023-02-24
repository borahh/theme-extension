<?php
   /*
   Plugin Name: Theme Extension - Location SXM
   Plugin URI: NA
   description: NA
   Version: 1.2
   Author: H.Borah
   Author URI: NA
   License: GPL2
   */



// Plugin directory path
 if ( ! defined( 'BORAHH_PLUGIN_DIR' ) ) {
	define( 'BORAHH_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}


/**
 * Never worry about cache again!
 */
function my_load_scripts($hook) {

	

	$showJs_ver = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/custom.js' ));
	$custom_css_ver = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/custom.css' ));

		wp_enqueue_script( 'extension', plugins_url( 'assets/js/custom.js', __FILE__ ), NULL, $showJs_ver, true );	

	wp_enqueue_style( 'custom', 	plugins_url( 'assets/css/custom.css', 	 __FILE__ ), false, $custom_css_ver );

}
add_action('wp_enqueue_scripts', 'my_load_scripts');




?>