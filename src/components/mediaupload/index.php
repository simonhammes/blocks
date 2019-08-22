<?php

function render_mediaupload_block( $attributes ) {
    return '<pre>' . print_r( $attributes, true ) . '</pre>';
}

function register_mediaupload_block() {

    register_block_type( 'dev/mediaupload', [
        'attributes'      => [
            'imgUrl' => [
                'type' => 'string',
                'default' => ''
            ]
        ],
        'editor_script'   => 'block_editor_script',
        'render_callback' => 'render_mediaupload_block'
    ] );

}

add_action( 'init', 'register_mediaupload_block' );
