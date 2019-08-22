<?php

// Plugin Name: wp-gb-plugin-template

require 'src/components/datepicker/index.php';
require 'src/components/mediaupload/index.php';
require 'src/components/rangecontrol/index.php';
require 'src/components/toggle/index.php';

// Register the main .js file for all components
function register_script() {

    return wp_register_script(
        'block_editor_script',
        plugins_url('build/index.js', __FILE__ ),
        ['wp-blocks', 'wp-editor', 'wp-element', 'wp-components', 'wp-compose', 'wp-date']
    );

}

add_action('init', 'register_script');
