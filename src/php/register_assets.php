<?php

function register_assets() {

    $dependencies = ['wp-blocks', 'wp-editor', 'wp-element', 'wp-components', 'wp-compose', 'wp-date', 'wp-data', 'wp-plugins', 'wp-edit-post'];

    wp_register_script('js_editor', BLOCKS_PLUGIN_DIR . '/build/editor.js', $dependencies);

    wp_register_script('select2_js', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js');

    wp_register_script('frontend', BLOCKS_PLUGIN_DIR . '/build/frontend.js', ['jquery']);

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

    wp_register_style('css_accordion', BLOCKS_PLUGIN_DIR . '/src/css/accordion.css');
    wp_enqueue_style('css_accordion');

}

add_action('init', 'register_assets');
