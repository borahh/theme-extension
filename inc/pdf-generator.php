<?php
add_filter( 'manage_edit-{post type or taxonomy}_columns', function ( $columns ){
	$columns['abc'] = "ABC";
	return $columns;
} );
