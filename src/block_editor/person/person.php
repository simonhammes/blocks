<?php

function render_person_block($attributes) {
    return '<div style="border: 3px solid #ACACAC; padding: 20px;">' .
        '<p>ID: ' . $attributes['id'] . '<br>' . 'Name: ' . $attributes['name'] . '</p>' .
    '</div>';
}

function register_person_block() {

    register_block_type( 'dev/person', [
        'attributes' => [
            'id' => [
                'type' => 'number',
                'default' => 1
            ],
            'name' => [
                'type' => 'string',
                'default' => 'Max Mustermann'
            ]
        ],
        'editor_script'   => 'js_block_editor',
        'render_callback' => 'render_person_block'
    ] );

}

add_action('init', 'register_person_block');