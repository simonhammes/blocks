<?php

function render_autocomplete_block( $attributes ) {
    return '<pre>' . print_r( $attributes, true ) . '</pre>';
}

function register_autocomplete_block() {

    register_block_type( 'dev/autocomplete', [
        'attributes'      => [
            'country' => [
                'type' => 'string',
                'default' => ''
            ]
        ],
        'editor_script'   => 'blocks_js',
        'render_callback' => 'render_autocomplete_block'
    ] );

}

add_action( 'init', 'register_autocomplete_block' );
