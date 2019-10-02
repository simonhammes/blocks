<?php

function render_block_default($attributes) {

    return '<pre>' . print_r($attributes, true) . '</pre>';

}

function render_accordion_block($attributes, $content = '') {
    return '<div class="accordion">' . $content .'</div>';
}

function render_accordion_item_block($attributes, $content) {

    $visibility = $attributes['initially_open'] ? '' : ' hidden';

    $arrow_down = '<svg xmlns="http://www.w3.org/2000/svg" class="accordion-item-title-arrow" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path d="M5 6l5 5 5-5 2 1-7 7-7-7z" fill="white"/></svg>';

    return '<div class="accordion-item">
        <p class="accordion-item-title">' . $attributes['title'] . $arrow_down . '</p>
        <div class="accordion-item-content' . $visibility .'">' . $content . '</div>
    </div>';
}

function register_blocks() {

    register_block_type( 'dev/core', [
        'attributes' => [
            'datepicker' => [ 'type' => 'string', 'default' => '' ],
            'range_control' => [ 'type' => 'number', 'default' => 2 ],
            'toggle_control' => [ 'type' => 'boolean', 'default' => False ],
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

    register_block_type('dev/accordion', [
        'attributes' => [],
        'editor_script' => 'js_editor',
        'script' => 'frontend',
        'render_callback' => 'render_accordion_block'
    ]);

    register_block_type('dev/accordion-item', [
        'attributes' => [
            'title' => [ 'type' => 'string', 'default' => 'Add a title' ],
            'initially_open' => [ 'type' => 'boolean', 'default' => FALSE ]
        ],
        'editor_script' => 'js_editor',
        'render_callback' => 'render_accordion_item_block'
    ]);

}
add_action( 'init', 'register_blocks' );

function register_box_block() {

    register_block_type( 'dev/box', [
        'attributes' => [
            'color' => [ 'type' => 'string' ]
        ],
        'editor_script'   => 'editor_js',
        'render_callback' => 'render_block_default'
    ] );

}
add_action('init', 'register_box_block');

function register_person_block() {

    register_block_type( 'dev/person', [
        'attributes' => [
            'id' => [ 'type' => 'number', 'default' => 0 ],
            'name' => [ 'type' => 'string', 'default' => '' ]
        ],
        'editor_script'   => 'editor_js',
        'render_callback' => 'render_block_default'
    ] );

}
add_action('init', 'register_person_block');
