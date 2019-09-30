<?php

function add_block_category($categories) {
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
add_filter('block_categories', 'add_block_category');