<?php

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

function register_accordion_blocks_and_assets() {

    wp_register_style('css_accordion', BLOCKS_PLUGIN_DIR . '/src/block_editor/accordion/accordion.css');
    wp_enqueue_style('css_accordion');

    register_block_type('dev/accordion', [
        'attributes' => [],
        'editor_script' => 'js_block_editor',
        'script' => 'js_frontend',
        'render_callback' => 'render_accordion_block'
    ]);

    register_block_type('dev/accordion-item', [
        'attributes' => [
            'title' => [ 'type' => 'string', 'default' => 'Add a title' ],
            'initially_open' => [ 'type' => 'boolean', 'default' => FALSE ]
        ],
        'editor_script' => 'js_block_editor',
        'script' => 'js_frontend',
        'render_callback' => 'render_accordion_item_block'
    ]);

}

add_action( 'init', 'register_accordion_blocks_and_assets' );
