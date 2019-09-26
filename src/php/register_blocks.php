<?php

function render_block_default( $attributes ) {

    if(!isset($attributes['country_react_select'])) $attributes['country_react_select'] = 'null (this is a string)';

    return '<pre>' . print_r( $attributes, true ) . '</pre>';
}

function register_core_block() {

    register_block_type( 'dev/core', [
        'attributes' => [
            'datepicker' => [ 'type' => 'string', 'default' => '' ],
            'range_control' => [ 'type' => 'number', 'default' => 2 ],
            'toggle_control' => [ 'type' => 'boolean', 'default' => False ],
            'media_upload' => [ 'type' => 'string', 'default' => '' ]
        ],
        'editor_script'   => 'blocks_js',
        'render_callback' => 'render_block_default'
    ] );

}
add_action('init', 'register_core_block');

function register_accessibleautocomplete_block() {

    register_block_type( 'dev/autocomplete', [
        'attributes'      => [
            'country_accessible_autocomplete' => [
                'type' => 'string',
                'default' => ''
            ],
            'country_react_select' => [
                'type' => 'string',
                'default' => NULL
            ]
        ],
        'editor_script'   => 'blocks_js',
        'render_callback' => 'render_block_default'
    ] );

}
add_action( 'init', 'register_accessibleautocomplete_block' );