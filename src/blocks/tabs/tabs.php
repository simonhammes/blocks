<?php

function render_tabs_block($attributes, $content = '') {
    return '<p>Tabs</p><br><br><div>' . $content . '</div>';
    return '<div class="accordion">' . $content .'</div>';
}

function render_tab_block($attributes, $content) {

    $visibility = $attributes['initially_open'] ? '' : ' hidden';

    return '<div class="tab">Tab</div>';
}

function register_tabs_blocks_and_assets() {

    //wp_register_style('css_accordion', plugins_url('accordion.css', __FILE__));
    //wp_enqueue_style('css_accordion');

    register_block_type('dev/tabs', [
        'attributes' => [
            'visibleTabIndex' => [
                'type' => 'number',
                'default' => 0,
            ]
        ],
        'editor_script' => 'js_backend',
        'script' => 'js_frontend',
        'editor_styles' => 'css_bootstrap',
        'render_callback' => 'render_tabs_block'
    ]);

    register_block_type('dev/tab', [
        'attributes' => [
            'title' => [
                'type' => 'string',
                'default' => 'Tab',
            ],
            'isVisible' => [
                'type' => 'boolean',
                'default' => FALSE
            ]
        ],
        'editor_script' => 'js_backend',
        'script' => 'js_frontend',
        'render_callback' => 'render_tab_block'
    ]);

    wp_enqueue_style( 'css_bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' );

}

add_action( 'init', 'register_tabs_blocks_and_assets' );
