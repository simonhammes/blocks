<?php

// Plugin Name: wp-gb-plugin-template

require 'src/components/autocomplete/index.php';
require 'src/components/datepicker/index.php';
require 'src/components/mediaupload/index.php';
require 'src/components/rangecontrol/index.php';
require 'src/components/toggle/index.php';

// Register the main .js file for all components
function register_script() {

    wp_register_script(
        'block_editor_script',
        plugins_url('build/index.js', __FILE__ ),
        ['wp-blocks', 'wp-editor', 'wp-element', 'wp-components', 'wp-compose', 'wp-date']
    );

    wp_register_style(
        'block_editor_styles_1',
        plugins_url('wp-gb-plugin-template/src/css/accessible-autocomplete.min.css')
    );
    wp_enqueue_style('block_editor_styles_1');

}

add_action('init', 'register_script');
