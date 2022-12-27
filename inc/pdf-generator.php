<?php

$post_type = 'booking';

// Register the columns.
add_filter( "manage_edit-booking_columns", function ( $defaults ) {
	$defaults['custom-actions'] = 'Actions';
	return $defaults;
} );

// Handle the value for each of the new columns.
add_action( "manage_booking_posts_custom_column", function ( $column_name, $post_id ) {
	
	if ( $column_name == 'custom-actions' ) {
		$property_id      = get_post_meta( $post_id, 'rvr_property_id', true );
		$URL              = get_permalink( $property_id );
		
		echo '<div style="padding-top:10px;">
				<btn onclick="loadWindowFromURL(\'' . $URL . '\', \'' . $post_id . '\')" style="cursor: pointer !important; background-color: #2271b1; color: white; padding: 7px 10px; border-radius: 5px;">
					Generate PDF
				</btn>
			  </div>';
	}
	
}, 10, 2 );