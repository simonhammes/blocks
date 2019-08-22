<?php

function render_rangecontrol_block( $attributes ) {
    return '<pre>' . print_r( $attributes, true ) . '</pre>';
}

function register_rangecontrol_block() {

    register_block_type( 'dev/rangecontrol', [
        'attributes'      => [
            'columns' => [
                'type' => 'number',
                'default' => 2
            ]
        ],
        'editor_script'   => 'block_editor_script',
        'render_callback' => 'render_rangecontrol_block'
    ] );

}

add_action( 'init', 'register_rangecontrol_block' );
