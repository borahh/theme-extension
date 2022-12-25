<?php
add_filter( 'manage_edit-booking_columns', function ( $columns ){
	$columns['actions'] = "Actions";
	return $columns;
} );


add_action( 'manage_booking_custom_column', function ( $column_name, $post_id ) {
    if ($column_name == 'Actions') {
        echo $post_id;
    }
}, 10, 2);
