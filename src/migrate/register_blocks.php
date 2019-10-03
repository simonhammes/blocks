<?php

function render_block_default($attributes) {

    return '<pre>' . print_r($attributes, true) . '</pre>';

}

function register_blocks() {

    register_block_type( 'dev/core', [
        'attributes' => [
            'media_upload' => [ 'type' => 'string', 'default' => '' ]
        ],
        'editor_script'   => 'editor_js',
        'render_callback' => 'render_block_default'
    ] );

    register_block_type('dev/autocomplete', [
        'attributes' => [
            'country_accessible_autocomplete' => [
                'type' => 'string',
                'default' => ''
            ],
            'country_react_select' => [
                'type' => 'string',
                'default' => NULL
            ]
        ],
        'editor_script' => 'editor_js',
        'render_callback' => 'render_block_default'
    ]);



}
add_action( 'init', 'register_blocks' );
