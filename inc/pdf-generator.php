<?php

$post_type = 'booking';

// Register the columns.
add_filter( "manage_{$post_type}_posts_columns", function ( $defaults ) {
	
	$defaults['custom-one'] = 'Custom One';
	$defaults['custom-two'] = 'Custom Two';

	return $defaults;
} );

// Handle the value for each of the new columns.
add_action( "manage_{$post_type}_posts_custom_column", function ( $column_name, $post_id ) {
	
	if ( $column_name == 'custom-one' ) {
		echo 'Some value here';
	}
	
	if ( $column_name == 'custom-two' ) {
		// Display an ACF field
		echo get_field( 'my_acf_field', $post_id );
	}
	
}, 10, 2 );