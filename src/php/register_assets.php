<?php

function register_assets() {

    // JavaScript file for all blocks
    wp_register_script(
        'blocks_js',
        BLOCKS_PLUGIN_DIR . '/build/index.js',
        ['wp-blocks', 'wp-editor', 'wp-element', 'wp-components',
            'wp-compose', 'wp-date', 'wp-data', 'wp-plugins', 'wp-edit-post']
    );

    wp_register_script('select2_js', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js');

    // CSS file for accessibleautocomplete-Block
    wp_register_style(
        'accessibleautocomplete_css',
        BLOCKS_PLUGIN_DIR . '/src/css/accessibleautocomplete.min.css'
    );
    wp_enqueue_style('accessibleautocomplete_css');

    // CSS file for all blocks
    wp_register_style('blocks_css', BLOCKS_PLUGIN_DIR . '/src/css/blocks.css');
    wp_enqueue_style('blocks_css');

    wp_register_style('select2_css', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css');
    wp_enqueue_style('select2_css');

}

add_action('init', 'register_assets');