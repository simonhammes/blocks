<?php

// Plugin Name: Blocks
// Author: Simon Hammes


require 'src/blocks/core/index.php';
require 'src/blocks/autocomplete/index.php';


function register_block_assets() {

    wp_register_script(
        'blocks_js',
        plugins_url('build/index.js', __FILE__ ),
        ['wp-blocks', 'wp-editor', 'wp-element', 'wp-components', 'wp-compose', 'wp-date', 'wp-data']
    );

    wp_register_style(
        'autocomplete_block_css',
        plugins_url('src/blocks/autocomplete/accessible-autocomplete.min.css', __FILE__)
    );
    wp_enqueue_style('autocomplete_block_css');

}
add_action('init', 'register_block_assets');

function add_custom_block_category($categories, $post) {
    return array_merge(
        array(
            array(
                'slug' => 'blocks-by-simon-hammes',
                'title' => 'Blocks by Simon Hammes',
            ),
        ),
        $categories
    );
}
add_filter('block_categories', 'add_custom_block_category', 10, 2);

function remove_update_notifications($value) {
    unset($value->response['blocks/blocks.php']);
    return $value;
}
add_filter('site_transient_update_plugins', 'remove_update_notifications');

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
add_action('init', 'register_template_for_pages');

