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

		$total            = get_post_meta( $post_id, 'rvr_total_price_eur', true );
		$nights           = get_post_meta( $post_id, 'rvr_staying_nights', true );
		$nights_price     = get_post_meta( $post_id, 'rvr_price_per_night_eur', true );
		$booking_username = get_post_meta( $post_id, 'rvr_renter_name', true );
		$check_in_date    = get_post_meta( $post_id, 'rvr_check_in', true );
		$URL              = get_permalink( $property_id );
		
		echo '<div style="padding-top:10px;">
				<btn onclick="loadWindowFromURL(\'' . $URL . '\', \'' . $booking_username . '\', \'' . $check_in_date . '\', \'' . $nights . '\',\'' . $nights_price . '\', \'' . $total . '\')" style="cursor: pointer !important; background-color: #2271b1; color: white; padding: 7px 10px; border-radius: 5px;">
					Generate PDF
				</btn>
			  </div>';
	}
	
}, 10, 2 );