<?php

function render_datepicker_block( $attributes ) {
    return '<pre>' . print_r( $attributes, true ) . '</pre>';
}

function register_datepicker_block() {

    register_block_type( 'dev/datepicker', [
        'attributes' => [
            'date' => [
                'type' => 'string',
                'default' => ''
            ],
            'displayDate' => [
                'type' => 'string',
                'default' => ''
            ]
        ],
        'editor_script'   => 'block_editor_script',
        'render_callback' => 'render_datepicker_block'
    ] );

}

add_action('init', 'register_datepicker_block');
