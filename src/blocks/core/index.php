<?php

function render_core_block( $attributes ) {
    return '<pre>' . print_r( $attributes, true ) . '</pre>';
}

function register_core_block() {

    register_block_type( 'dev/core', [
        'attributes' => [
            'date' => [ 'type' => 'string', 'default' => '' ],
            'display_date' => [ 'type' => 'string', 'default' => '' ],

            'number_of_columns' => [ 'type' => 'number', 'default' => 2 ],

            'is_toggled' => [ 'type' => 'boolean', 'default' => False ],

            'image_url' => [ 'type' => 'string', 'default' => '' ]
        ],
        'editor_script'   => 'blocks_js',
        'render_callback' => 'render_core_block'
    ] );

}

add_action('init', 'register_core_block');

