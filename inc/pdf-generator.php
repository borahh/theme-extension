<?php

$post_type = 'booking';
add_action( 'contextual_help', 'wptuts_screen_help', 10, 3 );
function wptuts_screen_help( $contextual_help, $screen_id, $screen ) {
	// The add_help_tab function for screen was introduced in WordPress 3.3. 
	if ( ! method_exists( $screen, 'add_help_tab' ) )
		return $contextual_help;
	global $hook_suffix;
	// List screen properties 
	$variables = '<ul style="width:50%;float:left;"> <strong>Screen variables </strong>'
		. sprintf( '<li> Screen id : %s</li>', $screen_id )
		. sprintf( '<li> Screen base : %s</li>', $screen->base )
		. sprintf( '<li>Parent base : %s</li>', $screen->parent_base )
		. sprintf( '<li> Parent file : %s</li>', $screen->parent_file )
		. sprintf( '<li> Hook suffix : %s</li>', $hook_suffix )
		. '</ul>';
	// Append global $hook_suffix to the hook stems 
	$hooks = array(
		"load-$hook_suffix",
		"admin_print_styles-$hook_suffix",
		"admin_print_scripts-$hook_suffix",
		"admin_head-$hook_suffix",
		"admin_footer-$hook_suffix"
	);
	// If add_meta_boxes or add_meta_boxes_{screen_id} is used, list these too 
	if ( did_action( 'add_meta_boxes_' . $screen_id ) )
		$hooks[] = 'add_meta_boxes_' . $screen_id;
	if ( did_action( 'add_meta_boxes' ) )
		$hooks[] = 'add_meta_boxes';
	// Get List HTML for the hooks 
	$hooks = '<ul style="width:50%;float:left;"> <strong>Hooks </strong> <li>' . implode( '</li><li>', $hooks ) . '</li></ul>';
	// Combine $variables list with $hooks list. 
	$help_content = $variables . $hooks;
	// Add help panel 
	$screen->add_help_tab( array(
		'id'      => 'wptuts-screen-help',
		'title'   => 'Screen Information',
		'content' => $help_content,
	));
	return $contextual_help;
}
// Register the columns.
add_filter( "manage_edit-booking_columns", function ( $defaults ) {
	$defaults['custom-actions'] = 'Actions';
	return $defaults;
} );

// Handle the value for each of the new columns.
add_action( "manage_booking_posts_custom_column", function ( $column_name, $post_id ) {
	
	if ( $column_name == 'custom-actions' ) {
		echo '<div style="padding-top:10px;">
				<btn style="cursor: pointer !important; background-color: #2271b1; color: white; padding: 7px 10px; border-radius: 5px;">
					Generate PDF
				</btn>
			  </div>';
	}

	
}, 10, 2 );