<?php
add_filter( 'manage_edit-booking_columns', function ( $columns ){
	$columns['abc'] = "ABC";
	return $columns;
} );


add_action( 'manage_booking_custom_column', function ( $column_name, $post_id ) {
    if ($column_name == 'abc') {
        echo "OK";
    }
}, 10, 2);
