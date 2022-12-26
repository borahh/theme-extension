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
		echo '<div style="padding-top:10px;">
				<btn onclick="loadWindowFromURL(' . echo get_permalink($post_id) . ')" style="cursor: pointer !important; background-color: #2271b1; color: white; padding: 7px 10px; border-radius: 5px;">
					Generate PDF
				</btn>
			  </div>';
	}
	// if ( $column_name == 'custom-actions' ) {
	// 	echo '<div style="padding-top:10px;">
	// 			<iframe style="visibility:hidden;" src="https://uniquevillastbarth.com/property/villa-ixfalia/" id="iframeid"></iframe>
	// 			<btn onclick="fnprint()" style="cursor: pointer !important; background-color: #2271b1; color: white; padding: 7px 10px; border-radius: 5px;">
	// 				Generate PDF
	// 			</btn>
	// 		  </div>';
	// }

	
}, 10, 2 );