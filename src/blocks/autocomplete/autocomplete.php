<?php

function render_autocomplete_block($attributes, $content) {
    return $attributes['country'];
}

function register_autocomplete_block_and_assets() {

    register_block_type( 'dev/autocomplete', [
        'attributes' => [
            'country' => [
                'type' => 'string'
            ]
        ],
        'editor_script'   => 'js_backend',
        'render_callback' => 'render_autocomplete_block'
    ] );

    wp_register_style('css_autocomplete', 'https://cdn.jsdelivr.net/npm/accessible-autocomplete@2.0.1/dist/accessible-autocomplete.min.css');
    wp_enqueue_style('css_autocomplete');

}

add_action('init', 'register_autocomplete_block_and_assets');