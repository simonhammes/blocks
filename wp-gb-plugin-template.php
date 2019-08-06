<?php

// Plugin Name: wp-gb-plugin-template

function handle_shortcode($attributes) {

	// $a = shortcode_atts(['id' => '', 'flag' => ''], $attributes);

	return 'here: block is rendered';
}

add_shortcode('person', 'handle_shortcode');

function register_block() {

	wp_register_script(
		'block_script',
		plugins_url('build/app.js', __FILE__ ),
		['wp-blocks', 'wp-editor', 'wp-element', 'wp-components', 'wp-compose', 'wp-date']
	);

	register_block_type('wp-gb-plugin-template/person', [
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
		'render_callback' => 'handle_shortcode'
	]);

}

add_action('init', 'register_block');

