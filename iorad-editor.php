<?php
/**
 * @package IORAD
 * @version 0.4
 */
/*
Plugin Name: iorad instant tutorial builder
Plugin URI: http://www.iorad.com/
Description: Build step-by-step application tutorials right from wordpress.
Author: iorad
Version: 0.4
Author URI: http://www.iorad.com/
*/
define('IORAD_VERSION', '0.4');
define('IORAD_PLUGIN_URL', plugin_dir_url( __FILE__ ));

add_action( 'admin_enqueue_scripts', 'load_js_and_css' );
function load_js_and_css() {
    global $hook_suffix;

    if ( in_array( $hook_suffix, array(
        'post.php',
        'post-new.php'
    ) ) ) {
        wp_register_style( 'iorad-editor.css', IORAD_PLUGIN_URL . 'editor.css', array(), IORAD_VERSION );
        wp_enqueue_style( 'iorad-editor.css');
        $iorad_js = '//www.iorad.com/server/assets/js/iorad.js';//IORAD_PLUGIN_URL . 'iorad.js';
        wp_register_script( 'iorad.js', $iorad_js,
                            array('jquery', 'backbone', 'underscore'), IORAD_VERSION );
        wp_enqueue_script( 'iorad.js' );

        wp_register_script( 'iorad-editor.js', IORAD_PLUGIN_URL . 'editor.js',
                            array('iorad.js'), IORAD_VERSION );
        wp_enqueue_script( 'iorad-editor.js' );

        /*wp_localize_script( 'iorad_handle.js', 'iorad_handle', array(
                'env' => 'prod'
            ) );*/
    }
}

add_action('media_buttons_context',  'add_button');

function add_button($context) {

    //append the icon
    $context .= "<a id='new-tutorial-btn' class='button iorad-btn' title='open IORAD editor' href='#'><span class='spinner'></span> Add Tutorial</a>";

    return $context;
}

function my_format_TinyMCE( $in ) {
    $in['extended_valid_elements'] = 'iframe[src|frameborder|style|scrolling|class|width|height|name|align|allowfullscreen]';
    return $in;
}
add_filter( 'tiny_mce_before_init', 'my_format_TinyMCE' );
