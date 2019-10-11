<?php

// Plugin Name: Blocks
// Author: Simon Hammes

define('BLOCKS_PLUGIN_DIR', '/wp-content/plugins/blocks');

function register_template_for_pages() {
    $page = get_post_type_object('page');
    $page->template = [
        [
            'core/columns', [],
            [
                [
                    'core/column', [ 'width' => 70 ],
                    [
                        [
                            'core/cover', [ 'overlayColor' => 'light-gray' ],
                            [
                                [
                                    'core/paragraph', [ 'content' => 'Inhalt', 'fontSize' => 'large' ]
                                ]
                            ]
                        ],
                        [
                            'core/paragraph', [ 'content' => 'Hier folgt der Inhalt!' ]
                        ]
                    ]
                ],
                [
                    'core/column', [],
                    [
                        [
                            'core/cover', [ 'overlayColor' => 'primary' ],
                            [
                                [
                                    'core/paragraph', [ 'content' => 'Sidebar', 'fontSize' => 'large' ]
                                ]
                            ]
                        ],
                        [
                            'core/paragraph', [ 'content' => 'Das ist die rechte Spalte!' ]
                        ]
                    ]
                ]
            ]
        ]
    ];

    $page->template_lock = 'all'; // Prevent inserting, moving and deleting
    $page->template_lock = 'insert'; // Prevent inserting and deleting, allow moving
}
//add_action('init', 'register_template_for_pages');

/* Blocks */

$blocks = ['accordion', 'autocomplete', 'box', 'datepicker', 'media_upload', 'person'];

//foreach ($blocks as $block) require 'src/blocks/' . $block . '/' . $block . '.php';

require 'src/blocks/accordion/accordion.php';
require 'src/blocks/autocomplete/autocomplete.php';

/**
 * Actions & Filters
 */

add_action('init', 'register_assets');

function register_assets() {

    $dependencies = [
        'wp-autop',
        'wp-blocks',
        'wp-components',
        'wp-compose',
        'wp-data',
        'wp-date',
        'wp-edit-post',
        'wp-editor',
        'wp-element',
        'wp-plugins'
    ];

    wp_register_script( 'js_backend', BLOCKS_PLUGIN_DIR . '/build/backend.build.js', $dependencies );
    wp_register_script( 'js_frontend', BLOCKS_PLUGIN_DIR . '/build/frontend.build.js', [ 'jquery' ] );

}

add_filter('block_categories', 'add_block_category');
function add_block_category($categories) {
    return array_merge(
        [
            [
                'slug' => 'blocks-by-simon-hammes',
                'title' => 'Blocks by Simon Hammes',
                'icon' => 'universal-access'
            ],
        ],
        $categories
    );
}

add_filter('site_transient_update_plugins', 'remove_update_notifications');
function remove_update_notifications($value) {
    unset($value->response['blocks/blocks.php']);
    return $value;
}
