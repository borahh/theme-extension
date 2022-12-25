<?php
add_filter( 'manage_edit-booking_columns', function ( $columns ){
	$columns['abc'] = "ABC";
	return $columns;
} );
