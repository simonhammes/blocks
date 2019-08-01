<?php

/*
 Plugin Name: My Plugin
*/

function shortcode_handler($attributes) {

	// TODO https://richjenks.com/unnamed-wordpress-shortcode-attributes/
	$a = shortcode_atts(['id' => '', 'flag' => ''], $attributes);

	return 'here: block is rendered';
}

add_shortcode('person', 'shortcode_handler');

function register_block() {

	wp_register_script(
		'block_script',
		plugins_url('build/app.js', __FILE__ ),
		['wp-blocks', 'wp-editor', 'wp-element', 'wp-components', 'wp-compose', 'wp-date']
	);

	register_block_type('namespace/person', [
		'attributes' => [
			'id' => [
				'type' => 'string',
				'default' => ''
			],
			'flag' => [
				'type' => 'string',
				'default' => ''
			]
		],
		'editor_script' => 'block_script',
		'render_callback' => 'shortcode_handler'
	]);

}

add_action('init', 'register_block');

