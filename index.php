<?php

// Plugin Name: wp-gb-plugin-template

require 'src/blocks/core/index.php';

require 'src/blocks/autocomplete/index.php';
require 'src/blocks/mediaupload/index.php';

function register_assets() {

    wp_register_script(
        'blocks_js',
        plugins_url('build/index.js', __FILE__ ),
        ['wp-blocks', 'wp-editor', 'wp-element', 'wp-components', 'wp-compose', 'wp-date']
    );

    wp_register_style(
        'autocomplete_block_css',
        plugins_url('src/blocks/autocomplete/accessible-autocomplete.min.css', __FILE__)
    );
    wp_enqueue_style('autocomplete_block_css');

}
add_action('init', 'register_assets');

function add_custom_block_category( $categories, $post ) {
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
add_filter( 'block_categories', 'add_custom_block_category', 10, 2);
