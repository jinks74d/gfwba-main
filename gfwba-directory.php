<?php
/**
 * Plugin Name: GFWBA Directory
 * Plugin URI: https://gfwba.org
 * Description: Displays the Greater Fort Worth Builders Association member directory
 * Version: 1.0.0
 * Author: GFWBA
 * Author URI: https://gfwba.org
 * Text Domain: gfwba-directory
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('GFWBA_DIRECTORY_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('GFWBA_DIRECTORY_PLUGIN_URL', plugin_dir_url(__FILE__));
define('GFWBA_DIRECTORY_VERSION', '1.0.0');

class GFWBA_Directory {
    private $api_key;
    private $account_id = '191317'; // Based on the code, this appears to be the account ID

    public function __construct() {
        // Register activation hook
        register_activation_hook(__FILE__, array($this, 'activate'));
        
        // Add settings page
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        
        // Register shortcode
        add_shortcode('gfwba_directory', array($this, 'directory_shortcode'));
        
        // Enqueue scripts and styles
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        
        // Add error logging
        add_action('admin_notices', array($this, 'display_admin_notices'));
    }
    
    /**
     * Display admin notices for debugging
     */
    public function display_admin_notices() {
        if (isset($_GET['gfwba_debug']) && current_user_can('manage_options')) {
            echo '<div class="notice notice-info is-dismissible">';
            echo '<p>GFWBA Directory Plugin Path: ' . GFWBA_DIRECTORY_PLUGIN_PATH . '</p>';
            echo '<p>GFWBA Directory Plugin URL: ' . GFWBA_DIRECTORY_PLUGIN_URL . '</p>';
            echo '</div>';
        }
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Create database table for storing contact images if needed
        global $wpdb;
        $table_name = $wpdb->prefix . 'gfwba_contact_images';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            wildapricot_user_id varchar(255) NOT NULL,
            image_url text NOT NULL,
            wildapricot_url text NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY  (id),
            UNIQUE KEY wildapricot_user_id (wildapricot_user_id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_options_page(
            'GFWBA Directory Settings',
            'GFWBA Directory',
            'manage_options',
            'gfwba-directory',
            array($this, 'settings_page')
        );
    }
    
    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('gfwba_directory_settings', 'gfwba_directory_api_key');
        
        add_settings_section(
            'gfwba_directory_settings_section',
            'API Settings',
            array($this, 'settings_section_callback'),
            'gfwba-directory'
        );
        
        add_settings_field(
            'gfwba_directory_api_key',
            'Wild Apricot API Key',
            array($this, 'api_key_field_callback'),
            'gfwba-directory',
            'gfwba_directory_settings_section'
        );
    }
    
    /**
     * Settings section callback
     */
    public function settings_section_callback() {
        echo '<p>Enter your Wild Apricot API key to connect to the directory.</p>';
    }
    
    /**
     * API key field callback
     */
    public function api_key_field_callback() {
        $api_key = get_option('gfwba_directory_api_key');
        echo '<input type="text" name="gfwba_directory_api_key" value="' . esc_attr($api_key) . '" class="regular-text">';
    }
    
    /**
     * Settings page
     */
    public function settings_page() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('gfwba_directory_settings');
                do_settings_sections('gfwba-directory');
                submit_button();
                ?>
            </form>
            <div class="card">
                <h2>Shortcode Usage</h2>
                <p>Use the following shortcode to display the directory on any page:</p>
                <code>[gfwba_directory]</code>
            </div>
        </div>
        <?php
    }
    
    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts() {
        // Only enqueue on pages with our shortcode
        global $post;
        if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'gfwba_directory')) {
            wp_enqueue_style(
                'gfwba-directory-style',
                GFWBA_DIRECTORY_PLUGIN_URL . 'assets/css/gfwba-directory.css',
                array(),
                GFWBA_DIRECTORY_VERSION
            );
            
            wp_enqueue_script(
                'gfwba-directory-script',
                GFWBA_DIRECTORY_PLUGIN_URL . 'assets/js/gfwba-directory.js',
                array('jquery'),
                GFWBA_DIRECTORY_VERSION,
                true
            );
            
            wp_localize_script(
                'gfwba-directory-script',
                'gfwba_directory_params',
                array(
                    'ajax_url' => admin_url('admin-ajax.php'),
                    'nonce' => wp_create_nonce('gfwba_directory_nonce'),
                    'plugin_url' => GFWBA_DIRECTORY_PLUGIN_URL
                )
            );
        }
    }
    
    /**
     * Get access token from Wild Apricot
     */
    private function get_access_token() {
        $api_key = get_option('gfwba_directory_api_key');
        
        if (empty($api_key)) {
            return false;
        }
        
        $auth_header = 'Basic ' . base64_encode('APIKEY:' . $api_key);
        
        $response = wp_remote_post(
            'https://oauth.wildapricot.org/auth/token',
            array(
                'method' => 'POST',
                'headers' => array(
                    'Content-Type' => 'application/x-www-form-urlencoded',
                    'Authorization' => $auth_header
                ),
                'body' => 'grant_type=client_credentials&scope=auto'
            )
        );
        
        if (is_wp_error($response)) {
            return false;
        }
        
        $body = json_decode(wp_remote_retrieve_body($response), true);
        
        if (isset($body['access_token'])) {
            return $body['access_token'];
        }
        
        return false;
    }
    
    /**
     * Get contacts from Wild Apricot
     */
    private function get_contacts() {
        $access_token = $this->get_access_token();
        
        if (!$access_token) {
            return array();
        }
        
        $response = wp_remote_get(
            "https://api.wildapricot.org/v2.2/accounts/{$this->account_id}/contacts?%24async=false&%24filter=(Status%20eq%20'Active'%20or%20Status%20eq%20'PendingRenewal')",
            array(
                'headers' => array(
                    'User-Agent' => 'MySampleApplication/0.1',
                    'Accept' => 'application/json',
                    'Authorization' => "Bearer {$access_token}"
                ),
                'timeout' => 15
            )
        );
        
        if (is_wp_error($response)) {
            return array();
        }
        
        $body = json_decode(wp_remote_retrieve_body($response), true);
        
        if (isset($body['Contacts'])) {
            $contacts = $body['Contacts'];
            
            // Format contacts similar to the Next.js app
            foreach ($contacts as &$contact) {
                if (isset($contact['FieldValues'][48]['Value']) && !empty($contact['FieldValues'][48]['Value'])) {
                    if (!preg_match('/^https?:\/\//', $contact['FieldValues'][48]['Value'])) {
                        $contact['FieldValues'][48]['Value'] = 'http://' . $contact['FieldValues'][48]['Value'];
                    }
                }
                
                if ($contact['DisplayName'] !== 'Mattingley, Patrick') {
                    $contact['FullName'] = $contact['FirstName'] . ' ' . $contact['LastName'];
                } else {
                    $contact['DisplayName'] = $contact['Organization'];
                }
                
                // Process categories
                if (isset($contact['FieldValues'][47]['Value']) && is_array($contact['FieldValues'][47]['Value'])) {
                    $memberCat = array();
                    foreach ($contact['FieldValues'][47]['Value'] as $key => $value) {
                        if (isset($value['Label'])) {
                            $memberCat[] = ' ' . $value['Label'];
                        }
                    }
                    $contact['memberCat'] = $memberCat;
                } else {
                    $contact['memberCat'] = array();
                }
            }
            
            return $contacts;
        }
        
        return array();
    }
    
    /**
     * Get contact image
     */
    private function get_contact_image($contact_id) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'gfwba_contact_images';
        
        $image = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM $table_name WHERE wildapricot_user_id = %s",
                $contact_id
            )
        );
        
        if ($image) {
            return $image->image_url;
        }
        
        return '';
    }
    
    /**
     * Directory shortcode
     */
    public function directory_shortcode($atts) {
        try {
            $atts = shortcode_atts(array(
                'per_page' => 10
            ), $atts, 'gfwba_directory');
            
            $contacts = $this->get_contacts();
            
            if (empty($contacts)) {
                return '<p>No directory members found. Please check your API key in the plugin settings.</p>';
            }
        
        // Extract categories
        $categories = array();
        foreach ($contacts as $contact) {
            if (isset($contact['FieldValues'][47]['Value']) && is_array($contact['FieldValues'][47]['Value'])) {
                foreach ($contact['FieldValues'][47]['Value'] as $key => $value) {
                    if (isset($value['Label']) && !in_array($value['Label'], $categories)) {
                        $categories[] = $value['Label'];
                    }
                }
            }
        }
        sort($categories);
        
        // Paginate contacts
        $current_page = isset($_GET['gfwba_page']) ? intval($_GET['gfwba_page']) : 1;
        $per_page = intval($atts['per_page']);
        $offset = ($current_page - 1) * $per_page;
        $total_pages = ceil(count($contacts) / $per_page);
        $paged_contacts = array_slice($contacts, $offset, $per_page);
        
        ob_start();
        ?>
        <div class="gfwba-directory-container">
            <section class="gfwba-directory-section">
                <!-- Directory Left -->
                <div class="gfwba-directory-left">
                    <div class="gfwba-clear-filters" data-action="clear-filters">
                        <p>CLEAR FILTERS</p>
                    </div>
                    <div class="gfwba-categories-container">
                        <p class="gfwba-categories-title">CATEGORIES</p>
                        <ul class="gfwba-categories-list">
                            <?php foreach ($categories as $category) : ?>
                                <li class="gfwba-category-item" data-category="<?php echo esc_attr($category); ?>">
                                    <span class="gfwba-checkbox">☐</span>
                                    <?php echo esc_html($category); ?>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>

                <!-- Directory Right -->
                <div class="gfwba-directory-right">
                    <div class="gfwba-directory-header">
                        <h2>MEMBER DIRECTORY</h2>
                        <div class="gfwba-search-container">
                            <input type="text" class="gfwba-search-input" placeholder="Search...">
                            <button class="gfwba-search-button">Search</button>
                        </div>
                    </div>
                    
                    <div class="gfwba-active-filters"></div>
                    
                    <div class="gfwba-directory-list">
                        <?php foreach ($paged_contacts as $contact) : 
                            if (!isset($contact['MembershipEnabled']) || !$contact['MembershipEnabled']) {
                                continue;
                            }
                            
                            $image_url = '';
                            if (isset($contact['Id'])) {
                                $image_url = $this->get_contact_image($contact['Id']);
                            }
                            
                            $display_name = isset($contact['DisplayName']) ? $contact['DisplayName'] : '';
                            $organization = isset($contact['Organization']) ? $contact['Organization'] : '';
                            $title = isset($contact['FieldValues'][39]['Value']) ? $contact['FieldValues'][39]['Value'] : '';
                            $city = isset($contact['FieldValues'][44]['Value']) ? $contact['FieldValues'][44]['Value'] : '';
                            $state = isset($contact['FieldValues'][45]['Value']) ? $contact['FieldValues'][45]['Value'] : '';
                            $location = $city . ($state ? ", $state" : '');
                            $website = isset($contact['FieldValues'][48]['Value']) ? $contact['FieldValues'][48]['Value'] : '';
                            $categories = isset($contact['memberCat']) ? implode(', ', $contact['memberCat']) : '';
                        ?>
                            <div class="gfwba-member-list-item">
                                <div class="gfwba-member-image">
                                    <?php if ($image_url) : ?>
                                        <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($display_name); ?>">
                                    <?php else : ?>
                                        <div class="gfwba-no-image"></div>
                                    <?php endif; ?>
                                </div>
                                <div class="gfwba-member-info">
                                    <div class="gfwba-member-name-company">
                                        <h3 class="gfwba-member-name"><?php echo esc_html($display_name); ?></h3>
                                        <div class="gfwba-member-company"><?php echo esc_html($organization); ?></div>
                                    </div>
                                    <div class="gfwba-member-details">
                                        <ul class="gfwba-member-details-list">
                                            <?php if ($title) : ?>
                                                <li><?php echo esc_html($title); ?></li>
                                            <?php endif; ?>
                                            <?php if ($location) : ?>
                                                <li><?php echo esc_html($location); ?></li>
                                            <?php endif; ?>
                                            <?php if ($website) : ?>
                                                <li><a href="<?php echo esc_url($website); ?>" target="_blank"><?php echo esc_html($website); ?></a></li>
                                            <?php endif; ?>
                                        </ul>
                                    </div>
                                    <div class="gfwba-member-categories">
                                        <ul class="gfwba-member-categories-list">
                                            <li><?php echo esc_html($categories); ?></li>
                                        </ul>
                                    </div>
                                </div>
                                <?php if (isset($contact['Id'])) : ?>
                                    <a href="<?php echo esc_url(add_query_arg('profile_id', $contact['Id'], get_permalink())); ?>" class="gfwba-member-link">
                                        <span class="gfwba-chevron-right">›</span>
                                    </a>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    
                    <?php if ($total_pages > 1) : ?>
                        <div class="gfwba-pagination">
                            <?php if ($current_page > 1) : ?>
                                <a href="<?php echo esc_url(add_query_arg('gfwba_page', $current_page - 1)); ?>" class="gfwba-prev-page">PREV PAGE</a>
                            <?php endif; ?>
                            
                            <?php if ($current_page < $total_pages) : ?>
                                <a href="<?php echo esc_url(add_query_arg('gfwba_page', $current_page + 1)); ?>" class="gfwba-next-page">NEXT PAGE</a>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </section>
        </div>
        <?php
        return ob_get_clean();
        } catch (Exception $e) {
            // Log the error
            error_log('GFWBA Directory Error: ' . $e->getMessage());
            
            // Return error message if user is admin
            if (current_user_can('manage_options')) {
                return '<div class="gfwba-error">Error: ' . esc_html($e->getMessage()) . '</div>';
            } else {
                return '<div class="gfwba-error">There was an error loading the directory. Please try again later.</div>';
            }
        }
    }
}

// Initialize the plugin
$gfwba_directory = new GFWBA_Directory();
