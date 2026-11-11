<?php
/**
 * Plugin Name: A-Z Sarl — Contenus et blocs
 * Description: Réalisations, références, partenaires et coordonnées d'A-Z Sarl, et blocs dynamiques du site (carte des zones, liste des références, partenaires, formulaires…). Fonctionne avec le thème Astra et Polylang.
 * Version: 1.0.0
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Author: Modena
 * License: Propriétaire — A-Z Sarl
 * Text Domain: az-sarl
 *
 * inc/data.php        données, coordonnées, fiches (repris du thème d'origine)
 * inc/lang.php        langue courante (Polylang) et adresses des pages du site
 * inc/render.php      repères [[az:…]] des fragments, textes communs, typographie
 * inc/components.php  rendu des composants (repris du thème d'origine)
 * inc/types.php       types de contenus, formulaires de saisie, page « Coordonnées » (repris du thème d'origine)
 * inc/blocks.php      blocs dynamiques Gutenberg
 * inc/import.php      import des contenus et des images de départ (outil d'installation)
 */

if (!defined('ABSPATH')) exit;

if (!defined('AZ_DIR')) define('AZ_DIR', __DIR__);
if (!defined('AZ_URI')) define('AZ_URI', plugins_url('', __FILE__));
define('AZ_PLUGIN_VERSION', '1.0.0');

require AZ_DIR . '/inc/data.php';
require AZ_DIR . '/inc/lang.php';
require AZ_DIR . '/inc/render.php';
require AZ_DIR . '/inc/components.php';
require AZ_DIR . '/inc/types.php';
require AZ_DIR . '/inc/blocks.php';
require AZ_DIR . '/inc/import.php';
