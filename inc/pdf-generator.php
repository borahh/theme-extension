<?php

// Add the custom columns to the book post type:
add_filter( 'manage_booking_columns', 'set_custom_edit_book_columns' );
function set_custom_edit_book_columns($columns) {
    $columns['custom_actions'] = 'Actions';
    return $columns;
}

// Add the data to the custom columns for the book post type:
add_action( 'manage_booking_custom_column' , 'custom_book_column', 10, 2 );
function custom_book_column( $column, $post_id ) {
    switch ( $column ) {
        case 'custom_actions' :
            echo get_post_meta( $post_id , 'publisher' , true ); 
            break;

    }
}