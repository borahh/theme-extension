<?php

add_filter('manage_edit-booking_columns', function($columns) {
    $columns['custom_actions'] = 'Actions';
    return $columns;
});


add_filter( 'manage_edit-booking_custom_column', function ( $output, $column_name, $id ) {

	if( $column_name == 'custom_actions' ) { 
		$output = $id;
	}
	return $output;
}, 10, 3);

