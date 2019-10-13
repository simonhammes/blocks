<?php

function render_datepicker_block($attributes) {
    return 'Date: ' . $attributes['date'];
}

function register_datepicker_block_and_assets() {

    register_block_type( 'dev/datepicker', [
        'attributes' => [
            'date' => [
                'type' => 'string',
                'default' => '',
            ]
        ],
        'editor_script'   => 'js_backend',
        'render_callback' => 'render_datepicker_block'
    ] );

    wp_register_style('css_datepicker', plugins_url('datepicker.css', __FILE__));
    wp_enqueue_style('css_datepicker');

}

add_action('init', 'register_datepicker_block_and_assets');