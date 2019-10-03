<?php

function render_box_block($attributes, $content) {
    return '<div style="border: 3px solid ' . $attributes['color'] . '; min-height: 100px; padding: 20px;">' .
        $content .
    '</div>';
}

function register_box_block() {

    register_block_type( 'dev/box', [
        'attributes' => [
            'color' => [
                'type' => 'string'
            ]
        ],
        'editor_script'   => 'js_backend',
        'render_callback' => 'render_box_block'
    ] );

}
add_action('init', 'register_box_block');