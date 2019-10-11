<?php

function render_media_upload_block($attributes, $content) {
    return '<img src="' . $attributes['url'] . '" style="max-height: 300px;"/>';
}

function register_media_upload_block() {

    register_block_type( 'dev/media-upload', [
        'attributes' => [
            'url' => [
                'type' => 'string',
                'default' => ''
            ]
        ],
        'editor_script'   => 'js_backend',
        'render_callback' => 'render_media_upload_block'
    ] );

}

add_action('init', 'register_media_upload_block');
