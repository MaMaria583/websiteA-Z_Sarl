<?php
/**
 * Thème A-Z Sarl.
 *
 * inc/data.php        données du thème, coordonnées, contenus gérés dans l'administration
 * inc/setup.php       réglages WordPress, adresses des pages, langue, redirections, référencement
 * inc/render.php      affichage des pages (repères [[az:…]]), typographie française
 * inc/components.php  composants dynamiques (références, réalisations, partenaires, coordonnées)
 * inc/admin.php       types de contenus, formulaires de saisie, page « Coordonnées »
 * inc/import.php      import des contenus de départ à l'activation du thème
 */

if (!defined('ABSPATH')) exit;

define('AZ_DIR', get_template_directory());
define('AZ_URI', get_template_directory_uri());

require AZ_DIR . '/inc/data.php';
require AZ_DIR . '/inc/setup.php';
require AZ_DIR . '/inc/render.php';
require AZ_DIR . '/inc/components.php';
require AZ_DIR . '/inc/admin.php';
require AZ_DIR . '/inc/import.php';
