<?php

function remove_update_notifications($value) {
    unset($value->response['blocks/blocks.php']);
    return $value;
}

add_filter('site_transient_update_plugins', 'remove_update_notifications');
