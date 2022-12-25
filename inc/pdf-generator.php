<?php
add_filter( 'manage_edit-booking_columns', function ( $columns ){
	$columns['abc'] = "ABC";
	return $columns;
} );


// add_action( 'manage_booking_custom_column', 'c3m_custom_column', 10, 2);
// function c3m_custom_column( $column_name, $post_id ) {
//     if ($column_name == 'abc') {
//         if ( has_post_thumbnail() ) {
//             $img_url = wp_get_attachment_image_src( get_post_thumbnail_id() );
//             echo '<img src="'. esc_url( $img_url[0] ).'" />';
//         } else { echo 'No Post Thumbnail Set'; }
//     }