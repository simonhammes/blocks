<?php

function render_core_block( $attributes ) {
    return '<pre>' . print_r( $attributes, true ) . '</pre>';
}

function register_core_block() {

    register_block_type( 'dev/core', [
        'attributes' => [
            'date' => [ 'type' => 'string', 'default' => '' ],
            'displayDate' => [ 'type' => 'string', 'default' => '' ],

            'number_of_columns' => [ 'type' => 'number', 'default' => 2 ],

            'isToggled' => [ 'type' => 'boolean', 'default' => False ]
        ],
        'editor_script'   => 'blocks_js',
        'render_callback' => 'render_core_block'
    ] );

}

add_action('init', 'register_core_block');

