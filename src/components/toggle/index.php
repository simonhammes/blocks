<?php

function render_toggle_block( $attributes ) {
    return '<pre>' . print_r( $attributes, true ) . '</pre>';
}

function register_toggle_block() {

    register_block_type( 'dev/toggle', [
        'attributes'      => [
            'isToggled' => [
                'type' => 'boolean',
                'default' => False
            ]
        ],
        'editor_script'   => 'block_editor_script',
        'render_callback' => 'render_toggle_block'
    ] );

}

add_action( 'init', 'register_toggle_block' );
