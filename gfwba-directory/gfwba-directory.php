<?php
/**
 * Plugin Name: GFWBA Directory
 * Plugin URI: https://gfwba.org
 * Description: Displays the Greater Fort Worth Builders Association member directory with modal member profiles
 * Version: 1.4.0
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
define('GFWBA_DIRECTORY_VERSION', '1.4.0');
define('GFWBA_DIRECTORY_LOG_FILE', GFWBA_DIRECTORY_PLUGIN_PATH . 'gfwba-error.log');

/**
 * Log errors to a file
 */
function gfwba_log($message, $level = 'error') {
    $timestamp = date('[Y-m-d H:i:s]');
    $formatted_message = "$timestamp [$level] $message" . PHP_EOL;
    
    // Append to log file
    file_put_contents(GFWBA_DIRECTORY_LOG_FILE, $formatted_message, FILE_APPEND);
}

class GFWBA_Directory {
    private $api_key;
    private $account_id = '191317';
    private $debug_mode = true;

    public function __construct() {
        // Register activation hook
        register_activation_hook(__FILE__, array($this, 'activate'));
        
        // Add settings page
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        
        // Register shortcodes
        add_shortcode('gfwba_directory', array($this, 'directory_shortcode'));
        add_shortcode('gfwba_member_profile', array($this, 'member_profile_shortcode'));
        
        // Register custom post type
        add_action('init', array($this, 'register_member_post_type'));
        
        // Enqueue scripts and styles
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        
        // Log plugin initialization
        gfwba_log('GFWBA Directory plugin initialized', 'info');
        
        // Register AJAX handlers
        add_action('wp_ajax_gfwba_get_member_data', array($this, 'ajax_get_member_data'));
        add_action('wp_ajax_nopriv_gfwba_get_member_data', array($this, 'ajax_get_member_data'));
    }
    
    /**
     * AJAX handler for getting member data
     */
    public function ajax_get_member_data() {
        // Check if member ID is provided
        if (!isset($_POST['member_id'])) {
            wp_send_json_error(array('message' => 'No member ID provided'));
            return;
        }
        
        $member_id = sanitize_text_field($_POST['member_id']);
        gfwba_log('AJAX request for member data: ' . $member_id, 'info');
        
        // Get access token
        $access_token = $this->get_access_token();
        if (!$access_token) {
            wp_send_json_error(array('message' => 'Could not get access token'));
            return;
        }
        
        // Get member details from Wild Apricot API
        $response = wp_remote_get(
            "https://api.wildapricot.org/v2.2/accounts/{$this->account_id}/contacts/{$member_id}",
            array(
                'headers' => array(
                    'User-Agent' => 'GFWBA Directory Plugin/1.4.0',
                    'Accept' => 'application/json',
                    'Authorization' => "Bearer {$access_token}"
                ),
                'timeout' => 30
            )
        );
        
        if (is_wp_error($response)) {
            $error_message = $response->get_error_message();
            gfwba_log('Error in API request: ' . $error_message, 'error');
            wp_send_json_error(array('message' => 'Error retrieving member profile: ' . $error_message));
            return;
        }
        
        $member = json_decode(wp_remote_retrieve_body($response), true);
        
        if (!isset($member['Id'])) {
            gfwba_log('No member found with ID: ' . $member_id, 'error');
            wp_send_json_error(array('message' => 'Member not found'));
            return;
        }
        
        // Extract member data
        $member_data = array(
            'id' => $member['Id'],
            'name' => isset($member['DisplayName']) ? $member['DisplayName'] : 'No Name',
            'organization' => isset($member['Organization']) ? $member['Organization'] : '',
            'email' => isset($member['Email']) ? $member['Email'] : ''
        );
        
        // Extract additional fields
        if (isset($member['FieldValues'])) {
            foreach ($member['FieldValues'] as $field) {
                if (isset($field['FieldName']) && isset($field['Value'])) {
                    // Handle different field types
                    if ($field['FieldName'] == 'Member Categories' && is_array($field['Value'])) {
                        $categories = array();
                        foreach ($field['Value'] as $value) {
                            if (isset($value['Label'])) {
                                $categories[] = $value['Label'];
                            }
                        }
                        $member_data['categories'] = $categories;
                    } else if ($field['FieldName'] == 'Job Title') {
                        $member_data['job_title'] = $field['Value'];
                    } else if ($field['FieldName'] == 'Phone') {
                        $member_data['phone'] = $field['Value'];
                    } else if ($field['FieldName'] == 'Cell Phone') {
                        $member_data['cell'] = $field['Value'];
                    } else if ($field['FieldName'] == 'Web Site') {
                        $website = $field['Value'];
                        if (!preg_match('/^https?:\/\//', $website)) {
                            $website = 'http://' . $website;
                        }
                        $member_data['website'] = $website;
                    }
                }
            }
        }
        
        // Build address
        $address_parts = array();
        if (isset($member['FieldValues'])) {
            foreach ($member['FieldValues'] as $field) {
                if (isset($field['FieldName']) && isset($field['Value'])) {
                    if ($field['FieldName'] == 'Street Address') {
                        $address_parts[] = $field['Value'];
                    } else if ($field['FieldName'] == 'City') {
                        $city = $field['Value'];
                        $state = '';
                        $zip = '';
                        
                        // Look for state and zip
                        foreach ($member['FieldValues'] as $subfield) {
                            if (isset($subfield['FieldName']) && isset($subfield['Value'])) {
                                if ($subfield['FieldName'] == 'State') {
                                    $state = $subfield['Value'];
                                } else if ($subfield['FieldName'] == 'Zip Code') {
                                    $zip = $subfield['Value'];
                                }
                            }
                        }
                        
                        $location = $city;
                        if ($state) {
                            $location .= ', ' . $state;
                        }
                        if ($zip) {
                            $location .= ' ' . $zip;
                        }
                        
                        $address_parts[] = $location;
                    }
                }
            }
        }
        
        if (!empty($address_parts)) {
            $member_data['address'] = implode('<br>', $address_parts);
        }
        
        // Return the member data
        wp_send_json_success($member_data);
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
        // Add settings page under Settings menu
        add_options_page(
            'GFWBA Directory Settings',
            'GFWBA Directory',
            'manage_options',
            'gfwba-directory',
            array($this, 'settings_page')
        );
        
        // Add logs page under Tools menu
        add_management_page(
            'GFWBA Directory Logs',
            'GFWBA Directory Logs',
            'manage_options',
            'gfwba-directory-logs',
            array($this, 'logs_page')
        );
        
        // Add sync page under Tools menu
        add_management_page(
            'GFWBA Member Sync',
            'GFWBA Member Sync',
            'manage_options',
            'gfwba-member-sync',
            array($this, 'sync_page')
        );
    }
    
    /**
     * Logs page callback
     */
    public function logs_page() {
        // Get the log file path
        $log_file = GFWBA_DIRECTORY_LOG_FILE;
        
        // Handle log clearing
        if (isset($_POST['clear_logs']) && $_POST['clear_logs'] === 'yes') {
            if (file_exists($log_file)) {
                file_put_contents($log_file, '');
                echo '<div class="notice notice-success is-dismissible"><p>Logs cleared successfully.</p></div>';
            }
        }
        
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            
            <div class="card">
                <h2>Plugin Error Logs</h2>
                
                <div style="margin: 10px 0;">
                    <form method="post" style="display: inline-block; margin-right: 10px;">
                        <?php wp_nonce_field('gfwba_clear_logs', 'gfwba_nonce'); ?>
                        <input type="hidden" name="clear_logs" value="yes">
                        <button type="submit" class="button button-secondary">Clear Logs</button>
                    </form>
                </div>
                
                <div style="background-color: #f5f5f5; padding: 10px; border: 1px solid #ddd; max-height: 400px; overflow: auto;">
                    <?php 
                    if (file_exists($log_file)) {
                        $logs = file_get_contents($log_file);
                        if (!empty($logs)) {
                            echo '<pre>' . esc_html($logs) . '</pre>';
                        } else {
                            echo '<p>No logs found.</p>';
                        }
                    } else {
                        echo '<p>Log file does not exist yet. It will be created when an error occurs.</p>';
                    }
                    ?>
                </div>
            </div>
        </div>
        <?php
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
                <p>Use the following shortcodes:</p>
                <ul>
                    <li><code>[gfwba_directory]</code> - Display the member directory</li>
                    <li><code>[gfwba_member_profile id="123456"]</code> - Display a specific member's profile</li>
                    <li>You can also create a page with just the <code>[gfwba_member_profile]</code> shortcode (no ID) and link to it with <code>?profile_id=123456</code> in the URL</li>
                </ul>
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
        
        // Check if we're in a post/page and if it contains our shortcodes
        if (is_a($post, 'WP_Post') && (has_shortcode($post->post_content, 'gfwba_directory') || has_shortcode($post->post_content, 'gfwba_member_profile'))) {
            // Always enqueue the CSS
            wp_enqueue_style(
                'gfwba-directory-style',
                GFWBA_DIRECTORY_PLUGIN_URL . 'assets/css/gfwba-directory.css',
                array(),
                GFWBA_DIRECTORY_VERSION
            );
            
            // Make sure jQuery is loaded
            wp_enqueue_script('jquery');
            
            // Enqueue main directory JavaScript
            wp_enqueue_script(
                'gfwba-directory-script',
                GFWBA_DIRECTORY_PLUGIN_URL . 'assets/js/gfwba-directory.js',
                array('jquery'),
                GFWBA_DIRECTORY_VERSION,
                true
            );
            
            // Enqueue modal JavaScript
            wp_enqueue_script(
                'gfwba-modal-script',
                GFWBA_DIRECTORY_PLUGIN_URL . 'assets/js/gfwba-modal.js',
                array('jquery', 'gfwba-directory-script'),
                GFWBA_DIRECTORY_VERSION,
                true
            );
            
            // Add inline script to debug
            wp_add_inline_script('gfwba-directory-script', 'console.log("GFWBA Directory script loaded");');
            wp_add_inline_script('gfwba-modal-script', 'console.log("GFWBA Modal script loaded");');
        }
    }
    
    /**
     * Get access token from Wild Apricot
     */
    private function get_access_token() {
        $api_key = get_option('gfwba_directory_api_key');
        
        if (empty($api_key)) {
            gfwba_log('API key is empty or not set');
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
                'body' => 'grant_type=client_credentials&scope=auto',
                'timeout' => 30
            )
        );
        
        if (is_wp_error($response)) {
            $error_message = $response->get_error_message();
            gfwba_log('Error getting access token: ' . $error_message);
            return false;
        }
        
        $body = json_decode(wp_remote_retrieve_body($response), true);
        
        if (isset($body['access_token'])) {
            gfwba_log('Successfully obtained access token', 'info');
            return $body['access_token'];
        } else {
            gfwba_log('No access token in response');
            return false;
        }
    }
    
    /**
     * Directory shortcode
     */
    public function directory_shortcode($atts) {
        gfwba_log('Directory shortcode called', 'info');
        
        // Get access token
        $access_token = $this->get_access_token();
        if (!$access_token) {
            return '<p>Could not connect to directory. Please check API settings.</p>';
        }
        
        // Get search parameters from URL
        $search_term = isset($_GET['gfwba_search']) ? sanitize_text_field($_GET['gfwba_search']) : '';
        $category = isset($_GET['gfwba_category']) ? sanitize_text_field($_GET['gfwba_category']) : '';
        
        // Log search parameters
        if (!empty($search_term) || !empty($category)) {
            gfwba_log('Search parameters - Term: ' . $search_term . ', Category: ' . $category, 'info');
        }
        
        // Get contacts - fetch all active and pending renewal members without limit
        $response = wp_remote_get(
            "https://api.wildapricot.org/v2.2/accounts/{$this->account_id}/contacts?%24async=false&%24filter=(Status%20eq%20'Active'%20or%20Status%20eq%20'PendingRenewal')",
            array(
                'headers' => array(
                    'User-Agent' => 'MySampleApplication/0.1',
                    'Accept' => 'application/json',
                    'Authorization' => "Bearer {$access_token}"
                ),
                'timeout' => 60 // Increased timeout for larger data
            )
        );
        
        if (is_wp_error($response)) {
            $error_message = $response->get_error_message();
            gfwba_log('Error in API request: ' . $error_message, 'error');
            return '<p>Error connecting to directory: ' . $error_message . '</p>';
        }
        
        $body = json_decode(wp_remote_retrieve_body($response), true);
        
        if (!isset($body['Contacts']) || empty($body['Contacts'])) {
            gfwba_log('No contacts in response', 'error');
            return '<p>No directory members found.</p>';
        }
        
        $all_contacts = $body['Contacts'];
        gfwba_log('Retrieved ' . count($all_contacts) . ' contacts', 'info');
        
        // Filter contacts based on search term and category
        $filtered_contacts = array();
        
        foreach ($all_contacts as $contact) {
            $include = true;
            
            // Filter by category if specified
            if (!empty($category)) {
                $include = false; // Default to excluding if category is specified
                
                // Check if contact has categories
                if (isset($contact['FieldValues'])) {
                    foreach ($contact['FieldValues'] as $field) {
                        if (isset($field['FieldName']) && $field['FieldName'] == 'Member Categories' && 
                            isset($field['Value']) && is_array($field['Value'])) {
                            
                            foreach ($field['Value'] as $value) {
                                if (isset($value['Label']) && stripos($value['Label'], $category) !== false) {
                                    $include = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            
            // Filter by search term if specified
            if ($include && !empty($search_term)) {
                $include = false; // Default to excluding if search term is specified
                
                // Check name
                if (isset($contact['DisplayName']) && stripos($contact['DisplayName'], $search_term) !== false) {
                    $include = true;
                }
                // Check organization
                else if (isset($contact['Organization']) && stripos($contact['Organization'], $search_term) !== false) {
                    $include = true;
                }
                // Check other fields
                else if (isset($contact['FieldValues'])) {
                    foreach ($contact['FieldValues'] as $field) {
                        if (isset($field['Value'])) {
                            if (is_string($field['Value']) && stripos($field['Value'], $search_term) !== false) {
                                $include = true;
                                break;
                            }
                        }
                    }
                }
            }
            
            // Add to filtered contacts if it passes all filters
            if ($include) {
                $filtered_contacts[] = $contact;
            }
        }
        
        $contacts = $filtered_contacts;
        gfwba_log('Filtered to ' . count($contacts) . ' contacts', 'info');
        
        // Build HTML output
        $html = '<div class="gfwba-directory-container">';
        $html .= '<h2>GFWBA Directory</h2>';
        $html .= '<p>Showing ' . count($contacts) . ' of ' . $body['ResultCount'] . ' total members</p>';
        
        // Create two-column layout
        $html .= '<div class="gfwba-directory-section">';
        
        // Categories
        $categories = array(
            'Associate', 'Builder', 'Developer', 'Remodeler', 'Supplier',
            'Affiliate', 'Architect', 'Building Material Supplier', 'Consultant',
            'Contractor', 'Custom Builder', 'Designer', 'Engineer', 'Financial Services',
            'Insurance', 'Interior Designer', 'Landscaper', 'Legal Services',
            'Manufacturer', 'Marketing', 'Mortgage Lender', 'Real Estate',
            'Specialty Contractor', 'Title Company', 'Utility Provider'
        );
        sort($categories);
        
        // Left column - categories
        $html .= '<div class="gfwba-directory-left">';
        $html .= '<div class="gfwba-clear-filters"><p>CLEAR FILTERS</p></div>';
        $html .= '<div class="gfwba-categories-container">';
        $html .= '<p class="gfwba-categories-title">CATEGORIES</p>';
        $html .= '<ul class="gfwba-categories-list">';
        
        foreach ($categories as $category) {
            $html .= '<li class="gfwba-category-item" data-category="' . $category . '">';
            $html .= '<span class="gfwba-checkbox">☐</span> ' . $category;
            $html .= '</li>';
        }
        
        $html .= '</ul>';
        $html .= '</div>';
        $html .= '</div>';
        
        // Right column - member list
        $html .= '<div class="gfwba-directory-right">';
        $html .= '<div class="gfwba-directory-header">';
        $html .= '<div class="gfwba-search-container">';
        $html .= '<input type="text" id="gfwba-search-input" name="gfwba-search-input" class="gfwba-search-input" placeholder="Search...">';
        $html .= '<button type="button" id="gfwba-search-button" class="gfwba-search-button">Search</button>';
        $html .= '</div>';
        $html .= '</div>';
        
        // Pagination setup
        $per_page = 10; // 10 members per page
        $total_pages = ceil(count($contacts) / $per_page);
        $current_page = isset($_GET['gfwba_page']) ? intval($_GET['gfwba_page']) : 1;
        $current_page = max(1, min($current_page, $total_pages)); // Ensure valid page number
        $offset = ($current_page - 1) * $per_page;
        
        // Get the current page's contacts
        $paged_contacts = array_slice($contacts, $offset, $per_page);
        
        // Hidden container for all members (for client-side filtering)
        $html .= '<div class="gfwba-all-members-container" style="display:none;">';
        
        // Add all contacts to hidden container
        foreach ($contacts as $contact) {
            $name = isset($contact['DisplayName']) ? $contact['DisplayName'] : 'No Name';
            $org = isset($contact['Organization']) ? $contact['Organization'] : 'No Organization';
            
            // Get more contact details if available
            $title = '';
            $city = '';
            $state = '';
            $website = '';
            $categories = '';
            
            // Extract fields if available
            if (isset($contact['FieldValues'])) {
                foreach ($contact['FieldValues'] as $field) {
                    if (isset($field['FieldName'])) {
                        if ($field['FieldName'] == 'Job Title' && isset($field['Value'])) {
                            $title = $field['Value'];
                        } else if ($field['FieldName'] == 'City' && isset($field['Value'])) {
                            $city = $field['Value'];
                        } else if ($field['FieldName'] == 'State' && isset($field['Value'])) {
                            $state = $field['Value'];
                        } else if ($field['FieldName'] == 'Web Site' && isset($field['Value'])) {
                            $website = $field['Value'];
                            if (!preg_match('/^https?:\/\//', $website)) {
                                $website = 'http://' . $website;
                            }
                        } else if ($field['FieldName'] == 'Member Categories' && isset($field['Value']) && is_array($field['Value'])) {
                            $memberCats = array();
                            foreach ($field['Value'] as $value) {
                                if (isset($value['Label'])) {
                                    $memberCats[] = $value['Label'];
                                }
                            }
                            $categories = implode(', ', $memberCats);
                            
                            // Also store categories as data attributes for easier JavaScript access
                            $categoryData = htmlspecialchars(json_encode($memberCats), ENT_QUOTES, 'UTF-8');
                        }
                    }
                }
            }
            
            $location = $city . ($state ? ", $state" : '');
            
            $html .= '<div class="gfwba-member-list-item" data-id="' . (isset($contact['Id']) ? $contact['Id'] : '') . '" data-categories="' . (isset($categoryData) ? $categoryData : '') . '">';
            $html .= '<div class="gfwba-member-image"><div class="gfwba-no-image"></div></div>';
            $html .= '<div class="gfwba-member-info">';
            
            // Name and company
            $html .= '<div class="gfwba-member-name-company">';
            $html .= '<h3 class="gfwba-member-name">' . $name . '</h3>';
            $html .= '<div class="gfwba-member-company">' . $org . '</div>';
            $html .= '</div>';
            
            // Details
            $html .= '<div class="gfwba-member-details">';
            $html .= '<ul class="gfwba-member-details-list">';
            if ($title) {
                $html .= '<li>' . $title . '</li>';
            }
            if ($location) {
                $html .= '<li>' . $location . '</li>';
            }
            if ($website) {
                $html .= '<li><a href="' . $website . '" target="_blank">' . $website . '</a></li>';
            }
            $html .= '</ul>';
            $html .= '</div>';
            
            // Categories
            if ($categories) {
                $html .= '<div class="gfwba-member-categories">';
                $html .= '<ul class="gfwba-member-categories-list">';
                $html .= '<li>' . $categories . '</li>';
                $html .= '</ul>';
                $html .= '</div>';
            }
            
            $html .= '</div>'; // Close member info
            
            // Add link to member post if it exists
            if (isset($contact['Id'])) {
                // Check if we have a member post for this contact
                $member_posts = get_posts(array(
                    'post_type' => 'gfwba_member',
                    'meta_key' => '_wildapricot_id',
                    'meta_value' => $contact['Id'],
                    'posts_per_page' => 1
                ));
                
                if (!empty($member_posts)) {
                    // Link to the member post
                    $html .= '<a href="' . get_permalink($member_posts[0]->ID) . '" class="gfwba-member-link">';
                    $html .= '<span class="gfwba-chevron-right">›</span>';
                    $html .= '</a>';
                } else {
                    // Fallback to profile_id parameter
                    $html .= '<a href="?profile_id=' . $contact['Id'] . '" class="gfwba-member-link">';
                    $html .= '<span class="gfwba-chevron-right">›</span>';
                    $html .= '</a>';
                }
            }
            
            $html .= '</div>'; // Close member list item
        }
        
        $html .= '</div>'; // Close hidden container
        
        // Debug info boxes removed as requested
        
        // Visible member list (paginated)
        $html .= '<div class="gfwba-directory-list">';
        
        foreach ($paged_contacts as $contact) {
            $name = isset($contact['DisplayName']) ? $contact['DisplayName'] : 'No Name';
            $org = isset($contact['Organization']) ? $contact['Organization'] : 'No Organization';
            
            // Get more contact details if available
            $title = '';
            $city = '';
            $state = '';
            $website = '';
            $categories = '';
            
            // Extract fields if available
            if (isset($contact['FieldValues'])) {
                foreach ($contact['FieldValues'] as $field) {
                    if (isset($field['FieldName'])) {
                        if ($field['FieldName'] == 'Job Title' && isset($field['Value'])) {
                            $title = $field['Value'];
                        } else if ($field['FieldName'] == 'City' && isset($field['Value'])) {
                            $city = $field['Value'];
                        } else if ($field['FieldName'] == 'State' && isset($field['Value'])) {
                            $state = $field['Value'];
                        } else if ($field['FieldName'] == 'Web Site' && isset($field['Value'])) {
                            $website = $field['Value'];
                            if (!preg_match('/^https?:\/\//', $website)) {
                                $website = 'http://' . $website;
                            }
                        } else if ($field['FieldName'] == 'Member Categories' && isset($field['Value']) && is_array($field['Value'])) {
                            $memberCats = array();
                            foreach ($field['Value'] as $value) {
                                if (isset($value['Label'])) {
                                    $memberCats[] = $value['Label'];
                                }
                            }
                            $categories = implode(', ', $memberCats);
                        }
                    }
                }
            }
            
            $location = $city . ($state ? ", $state" : '');
            
            $html .= '<div class="gfwba-member-list-item" data-categories="' . (isset($categoryData) ? $categoryData : '') . '">';
            $html .= '<div class="gfwba-member-image"><div class="gfwba-no-image"></div></div>';
            $html .= '<div class="gfwba-member-info">';
            
            // Name and company
            $html .= '<div class="gfwba-member-name-company">';
            $html .= '<h3 class="gfwba-member-name">' . $name . '</h3>';
            $html .= '<div class="gfwba-member-company">' . $org . '</div>';
            $html .= '</div>';
            
            // Details
            $html .= '<div class="gfwba-member-details">';
            $html .= '<ul class="gfwba-member-details-list">';
            if ($title) {
                $html .= '<li>' . $title . '</li>';
            }
            if ($location) {
                $html .= '<li>' . $location . '</li>';
            }
            if ($website) {
                $html .= '<li><a href="' . $website . '" target="_blank">' . $website . '</a></li>';
            }
            $html .= '</ul>';
            $html .= '</div>';
            
            // Categories
            if ($categories) {
                $html .= '<div class="gfwba-member-categories">';
                $html .= '<ul class="gfwba-member-categories-list">';
                $html .= '<li>' . $categories . '</li>';
                $html .= '</ul>';
                $html .= '</div>';
            }
            
            $html .= '</div>'; // Close member info
            
            // Add link to profile if ID exists
            if (isset($contact['Id'])) {
                $html .= '<a href="?profile_id=' . $contact['Id'] . '" class="gfwba-member-link">';
                $html .= '<span class="gfwba-chevron-right">›</span>';
                $html .= '</a>';
            }
            
            $html .= '</div>'; // Close member list item
        }
        
        $html .= '</div>'; // Close directory list
        
        // Add pagination controls
        if ($total_pages > 1) {
            $html .= '<div class="gfwba-pagination">';
            
            // Previous page button
            if ($current_page > 1) {
                $prev_url = add_query_arg('gfwba_page', $current_page - 1);
                $html .= '<a href="' . $prev_url . '" class="gfwba-prev-page">PREV PAGE</a>';
            } else {
                $html .= '<span class="gfwba-prev-page gfwba-disabled">PREV PAGE</span>';
            }
            
            // Page indicator
            $html .= '<span class="gfwba-page-indicator">Page ' . $current_page . ' of ' . $total_pages . '</span>';
            
            // Next page button
            if ($current_page < $total_pages) {
                $next_url = add_query_arg('gfwba_page', $current_page + 1);
                $html .= '<a href="' . $next_url . '" class="gfwba-next-page">NEXT PAGE</a>';
            } else {
                $html .= '<span class="gfwba-next-page gfwba-disabled">NEXT PAGE</span>';
            }
            
            $html .= '</div>'; // Close pagination
        }
        $html .= '</div>'; // Close right column
        $html .= '</div>'; // Close directory section
        $html .= '</div>'; // Close container
        
        return $html;
    }
    
    /**
     * Register the Member custom post type
     */
    public function register_member_post_type() {
        $labels = array(
            'name'               => 'Members',
            'singular_name'      => 'Member',
            'menu_name'          => 'Members',
            'name_admin_bar'     => 'Member',
            'add_new'            => 'Add New',
            'add_new_item'       => 'Add New Member',
            'new_item'           => 'New Member',
            'edit_item'          => 'Edit Member',
            'view_item'          => 'View Member',
            'all_items'          => 'All Members',
            'search_items'       => 'Search Members',
            'parent_item_colon'  => 'Parent Members:',
            'not_found'          => 'No members found.',
            'not_found_in_trash' => 'No members found in Trash.'
        );
        
        $args = array(
            'labels'              => $labels,
            'public'              => true,
            'publicly_queryable'  => true,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'query_var'           => true,
            'rewrite'             => array('slug' => 'member'),
            'capability_type'     => 'post',
            'has_archive'         => true,
            'hierarchical'        => false,
            'menu_position'       => null,
            'supports'            => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'show_in_rest'        => true, // Enable Gutenberg editor
            'menu_icon'           => 'dashicons-groups'
        );
        
        register_post_type('gfwba_member', $args);
        
        // Register custom taxonomy for member categories
        $taxonomy_labels = array(
            'name'              => 'Member Categories',
            'singular_name'     => 'Member Category',
            'search_items'      => 'Search Member Categories',
            'all_items'         => 'All Member Categories',
            'parent_item'       => 'Parent Member Category',
            'parent_item_colon' => 'Parent Member Category:',
            'edit_item'         => 'Edit Member Category',
            'update_item'       => 'Update Member Category',
            'add_new_item'      => 'Add New Member Category',
            'new_item_name'     => 'New Member Category Name',
            'menu_name'         => 'Categories'
        );
        
        $taxonomy_args = array(
            'hierarchical'      => true,
            'labels'            => $taxonomy_labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array('slug' => 'member-category'),
            'show_in_rest'      => true
        );
        
        register_taxonomy('gfwba_member_category', 'gfwba_member', $taxonomy_args);
        
        // Add a custom meta box for Wild Apricot ID
        add_action('add_meta_boxes', function() {
            add_meta_box(
                'gfwba_member_wildapricot_id',
                'Wild Apricot ID',
                function($post) {
                    $wildapricot_id = get_post_meta($post->ID, '_wildapricot_id', true);
                    echo '<input type="text" name="wildapricot_id" value="' . esc_attr($wildapricot_id) . '" style="width:100%">';
                    echo '<p class="description">The Wild Apricot contact ID for this member.</p>';
                },
                'gfwba_member',
                'side',
                'default'
            );
        });
        
        // Save the Wild Apricot ID when the post is saved
        add_action('save_post_gfwba_member', function($post_id) {
            if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
            if (!current_user_can('edit_post', $post_id)) return;
            
            if (isset($_POST['wildapricot_id'])) {
                update_post_meta($post_id, '_wildapricot_id', sanitize_text_field($_POST['wildapricot_id']));
            }
        });
    }
    
    /**
     * Sync page callback
     */
    public function sync_page() {
        // Check if sync was requested
        $sync_started = false;
        $sync_results = array(
            'total' => 0,
            'created' => 0,
            'updated' => 0,
            'skipped' => 0,
            'errors' => 0,
            'error_messages' => array()
        );
        
        if (isset($_POST['sync_members']) && $_POST['sync_members'] === 'yes') {
            // Verify nonce
            if (!isset($_POST['gfwba_sync_nonce']) || !wp_verify_nonce($_POST['gfwba_sync_nonce'], 'gfwba_sync_members')) {
                echo '<div class="notice notice-error is-dismissible"><p>Security check failed. Please try again.</p></div>';
            } else {
                $sync_started = true;
                $sync_results = $this->sync_members_from_wild_apricot();
            }
        }
        
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            
            <?php if ($sync_started): ?>
                <div class="notice notice-success is-dismissible">
                    <p>Member sync completed!</p>
                    <ul>
                        <li>Total members processed: <?php echo $sync_results['total']; ?></li>
                        <li>New members created: <?php echo $sync_results['created']; ?></li>
                        <li>Existing members updated: <?php echo $sync_results['updated']; ?></li>
                        <li>Members skipped: <?php echo $sync_results['skipped']; ?></li>
                        <li>Errors: <?php echo $sync_results['errors']; ?></li>
                    </ul>
                    <?php if (!empty($sync_results['error_messages'])): ?>
                        <p><strong>Error details:</strong></p>
                        <ul>
                            <?php foreach ($sync_results['error_messages'] as $error): ?>
                                <li><?php echo esc_html($error); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            
            <div class="card">
                <h2>Sync Members from Wild Apricot</h2>
                <p>This will fetch all active and pending renewal members from Wild Apricot and create or update WordPress member posts for each one.</p>
                <p><strong>Note:</strong> This process may take some time depending on the number of members.</p>
                
                <form method="post">
                    <?php wp_nonce_field('gfwba_sync_members', 'gfwba_sync_nonce'); ?>
                    <input type="hidden" name="sync_members" value="yes">
                    <button type="submit" class="button button-primary">Sync Members Now</button>
                </form>
            </div>
        </div>
        <?php
    }
    
    /**
     * Sync members from Wild Apricot to WordPress
     */
    private function sync_members_from_wild_apricot() {
        // Set time limit to prevent timeout
        set_time_limit(600); // 10 minutes
        
        // Disable output buffering to prevent memory issues
        if (ob_get_level()) {
            ob_end_clean();
        }
        
        $results = array(
            'total' => 0,
            'created' => 0,
            'updated' => 0,
            'skipped' => 0,
            'errors' => 0,
            'error_messages' => array()
        );
        
        // Get access token
        gfwba_log('Starting member sync process', 'info');
        $access_token = $this->get_access_token();
        if (!$access_token) {
            $results['errors']++;
            $results['error_messages'][] = 'Could not get access token from Wild Apricot.';
            gfwba_log('Failed to get access token', 'error');
            return $results;
        }
        
        gfwba_log('Successfully obtained access token', 'info');
        
        // Set batch size for processing - extremely small batch size to reduce server load
        $batch_size = 5; // Process only 5 members at a time
        $offset = 0;
        $total_processed = 0;
        $has_more = true;
        
        while ($has_more) {
            gfwba_log("Processing batch starting at offset $offset", 'info');
            
            // Get a batch of active and pending renewal members from Wild Apricot
            $filter = urlencode("(Status eq 'Active' or Status eq 'PendingRenewal')");
            $url = "https://api.wildapricot.org/v2.2/accounts/{$this->account_id}/contacts?%24async=false&%24filter={$filter}&%24top={$batch_size}&%24skip={$offset}";
            
            gfwba_log("API Request URL: $url", 'info');
            
            $response = wp_remote_get(
                $url,
                array(
                    'headers' => array(
                        'User-Agent' => 'GFWBA Directory Plugin/1.4.0',
                        'Accept' => 'application/json',
                        'Authorization' => "Bearer {$access_token}"
                    ),
                    'timeout' => 60 // Increased timeout for larger data
                )
            );
            
            if (is_wp_error($response)) {
                $error_message = $response->get_error_message();
                $results['errors']++;
                $results['error_messages'][] = "Error fetching members batch at offset $offset: $error_message";
                gfwba_log("Error fetching members batch: $error_message", 'error');
                return $results;
            }
            
            $status_code = wp_remote_retrieve_response_code($response);
            if ($status_code !== 200) {
                $results['errors']++;
                $results['error_messages'][] = "API returned status code $status_code for batch at offset $offset";
                gfwba_log("API returned status code $status_code", 'error');
                return $results;
            }
            
            $body = json_decode(wp_remote_retrieve_body($response), true);
            
            if (!isset($body['Contacts']) || !is_array($body['Contacts'])) {
                $results['errors']++;
                $results['error_messages'][] = "Invalid response format for batch at offset $offset";
                gfwba_log("Invalid response format: " . print_r($body, true), 'error');
                return $results;
            }
            
            $members = $body['Contacts'];
            $batch_count = count($members);
            
            gfwba_log("Received $batch_count members in current batch", 'info');
            
            if ($batch_count === 0) {
                $has_more = false;
                break;
            }
            
            // Update total count if this is the first batch
            if ($offset === 0 && isset($body['ResultCount'])) {
                $results['total'] = $body['ResultCount'];
                gfwba_log("Total members to process: {$results['total']}", 'info');
            }
            
            // Process each member in the batch
            foreach ($members as $member) {
                // Skip if no ID
                if (!isset($member['Id'])) {
                    $results['skipped']++;
                    continue;
                }
                
                $wildapricot_id = $member['Id'];
                $name = isset($member['DisplayName']) ? $member['DisplayName'] : 'No Name';
                $org = isset($member['Organization']) ? $member['Organization'] : '';
                
                gfwba_log("Processing member: $name (ID: $wildapricot_id)", 'info');
                
                // Check if member already exists
                $existing_posts = get_posts(array(
                    'post_type' => 'gfwba_member',
                    'meta_key' => '_wildapricot_id',
                    'meta_value' => $wildapricot_id,
                    'posts_per_page' => 1
                ));
                
                // Extract member details
                $member_data = array(
                    'post_title' => $name,
                    'post_status' => 'publish',
                    'post_type' => 'gfwba_member',
                    'meta_input' => array(
                        '_wildapricot_id' => $wildapricot_id,
                        '_member_organization' => $org
                    )
                );
                
                // Extract additional fields
                if (isset($member['FieldValues']) && is_array($member['FieldValues'])) {
                    foreach ($member['FieldValues'] as $field) {
                        if (isset($field['FieldName']) && isset($field['Value'])) {
                            $field_name = $field['FieldName'];
                            $field_value = $field['Value'];
                            
                            // Handle different field types
                            if ($field_name == 'Member Categories' && is_array($field_value)) {
                                $categories = array();
                                foreach ($field_value as $value) {
                                    if (isset($value['Label'])) {
                                        $categories[] = $value['Label'];
                                    }
                                }
                                
                                // Store categories as meta
                                $member_data['meta_input']['_member_categories'] = $categories;
                            } else if (!empty($field_value)) {
                                // Store other fields as meta
                                $meta_key = '_member_' . sanitize_title($field_name);
                                $member_data['meta_input'][$meta_key] = $field_value;
                            }
                        }
                    }
                }
                
                // Store email if available
                if (isset($member['Email'])) {
                    $member_data['meta_input']['_member_email'] = $member['Email'];
                }
                
                // Create or update post
                if (!empty($existing_posts)) {
                    // Update existing post
                    $post_id = $existing_posts[0]->ID;
                    $member_data['ID'] = $post_id;
                    
                    gfwba_log("Updating existing member post ID: $post_id", 'info');
                    
                    $result = wp_update_post($member_data, true);
                    
                    if (is_wp_error($result)) {
                        $results['errors']++;
                        $error_message = $result->get_error_message();
                        $results['error_messages'][] = "Error updating member $name: $error_message";
                        gfwba_log("Error updating member $name: $error_message", 'error');
                    } else {
                        $results['updated']++;
                        
                        // Update categories
                        if (isset($member_data['meta_input']['_member_categories'])) {
                            $this->update_member_categories($post_id, $member_data['meta_input']['_member_categories']);
                        }
                        
                        gfwba_log("Successfully updated member $name", 'info');
                    }
                } else {
                    // Create new post
                    gfwba_log("Creating new member post for $name", 'info');
                    
                    $post_id = wp_insert_post($member_data, true);
                    
                    if (is_wp_error($post_id)) {
                        $results['errors']++;
                        $error_message = $post_id->get_error_message();
                        $results['error_messages'][] = "Error creating member $name: $error_message";
                        gfwba_log("Error creating member $name: $error_message", 'error');
                    } else {
                        $results['created']++;
                        
                        // Set categories
                        if (isset($member_data['meta_input']['_member_categories'])) {
                            $this->update_member_categories($post_id, $member_data['meta_input']['_member_categories']);
                        }
                        
                        gfwba_log("Successfully created member $name with post ID: $post_id", 'info');
                    }
                }
                
                // Increment total processed count
                $total_processed++;
            }
            
            // Update offset for next batch
            $offset += $batch_size;
            
            // Check if we've processed all members
            if ($batch_count < $batch_size) {
                $has_more = false;
            }
            
            // Add a much longer delay between batches to avoid overwhelming the server
            sleep(5);
            
            gfwba_log("Completed batch. Total processed so far: $total_processed", 'info');
        }
        
        gfwba_log("Member sync process completed. Created: {$results['created']}, Updated: {$results['updated']}, Errors: {$results['errors']}", 'info');
        
        return $results;
    }
    
    /**
     * Update member categories
     */
    private function update_member_categories($post_id, $categories) {
        if (empty($categories) || !is_array($categories)) {
            return;
        }
        
        $term_ids = array();
        
        foreach ($categories as $category) {
            // Check if term exists
            $term = term_exists($category, 'gfwba_member_category');
            
            if (!$term) {
                // Create term if it doesn't exist
                $term = wp_insert_term($category, 'gfwba_member_category');
            }
            
            if (!is_wp_error($term)) {
                $term_id = is_array($term) ? $term['term_id'] : $term;
                $term_ids[] = (int) $term_id;
            }
        }
        
        // Set terms for the post
        if (!empty($term_ids)) {
            wp_set_object_terms($post_id, $term_ids, 'gfwba_member_category');
        }
    }
    
    /**
     * Member profile shortcode
     * 
     * Usage: [gfwba_member_profile id="123456"]
     */
    public function member_profile_shortcode($atts) {
        // Extract attributes
        $atts = shortcode_atts(
            array(
                'id' => '',
            ),
            $atts,
            'gfwba_member_profile'
        );
        
        // Check if ID is provided
        if (empty($atts['id'])) {
            // Check if ID is in URL parameter
            $member_id = isset($_GET['profile_id']) ? sanitize_text_field($_GET['profile_id']) : '';
            
            if (empty($member_id)) {
                return '<p>No member ID provided. Please specify a member ID using the shortcode attribute or URL parameter.</p>';
            }
            
            $atts['id'] = $member_id;
        }
        
        // Check if this is a modal request
        $is_modal = isset($_GET['modal']) && $_GET['modal'] == 1;
        
        gfwba_log('Member profile shortcode called for ID: ' . $atts['id'], 'info');
        
        // Get access token
        $access_token = $this->get_access_token();
        if (!$access_token) {
            return '<p>Could not connect to directory. Please check API settings.</p>';
        }
        
        // Get member details from Wild Apricot API
        $response = wp_remote_get(
            "https://api.wildapricot.org/v2.2/accounts/{$this->account_id}/contacts/{$atts['id']}",
            array(
                'headers' => array(
                    'User-Agent' => 'MySampleApplication/0.1',
                    'Accept' => 'application/json',
                    'Authorization' => "Bearer {$access_token}"
                ),
                'timeout' => 30
            )
        );
        
        if (is_wp_error($response)) {
            $error_message = $response->get_error_message();
            gfwba_log('Error in API request: ' . $error_message, 'error');
            return '<p>Error retrieving member profile: ' . $error_message . '</p>';
        }
        
        $member = json_decode(wp_remote_retrieve_body($response), true);
        
        if (!isset($member['Id'])) {
            gfwba_log('No member found with ID: ' . $atts['id'], 'error');
            return '<p>Member not found. Please check the member ID.</p>';
        }
        
        // Build HTML output
        $html = '<div class="gfwba-member-profile">';
        
        // Member header
        $html .= '<div class="gfwba-member-profile-header">';
        
        // Member name and company
        $name = isset($member['DisplayName']) ? $member['DisplayName'] : 'No Name';
        $org = isset($member['Organization']) ? $member['Organization'] : '';
        
        $html .= '<h1 class="gfwba-member-profile-name">' . $name . '</h1>';
        if (!empty($org)) {
            $html .= '<h2 class="gfwba-member-profile-company">' . $org . '</h2>';
        }
        
        $html .= '</div>'; // Close header
        
        // Member details
        $html .= '<div class="gfwba-member-profile-details">';
        
        // Extract fields
        $fields = array();
        $categories = array();
        
        if (isset($member['FieldValues'])) {
            foreach ($member['FieldValues'] as $field) {
                if (isset($field['FieldName'])) {
                    // Handle different field types
                    if ($field['FieldName'] == 'Member Categories' && isset($field['Value']) && is_array($field['Value'])) {
                        foreach ($field['Value'] as $value) {
                            if (isset($value['Label'])) {
                                $categories[] = $value['Label'];
                            }
                        }
                    } else if (isset($field['Value'])) {
                        // Skip empty values
                        if (empty($field['Value'])) {
                            continue;
                        }
                        
                        // Format value based on field type
                        $value = $field['Value'];
                        
                        // Handle URL fields
                        if ($field['FieldName'] == 'Web Site') {
                            if (!preg_match('/^https?:\/\//', $value)) {
                                $value = 'http://' . $value;
                            }
                            $value = '<a href="' . $value . '" target="_blank">' . $value . '</a>';
                        }
                        
                        // Add to fields array
                        $fields[$field['FieldName']] = $value;
                    }
                }
            }
        }
        
        // Contact information section
        $html .= '<div class="gfwba-member-profile-section">';
        $html .= '<h3 class="gfwba-member-profile-section-title">Contact Information</h3>';
        
        $html .= '<div class="gfwba-member-profile-contact">';
        
        // Contact details
        if (isset($fields['Job Title'])) {
            $html .= '<p class="gfwba-member-profile-job-title">' . $fields['Job Title'] . '</p>';
        }
        
        // Address
        $address = array();
        if (isset($fields['Street Address'])) {
            $address[] = $fields['Street Address'];
        }
        if (isset($fields['City'])) {
            $city_state = $fields['City'];
            if (isset($fields['State'])) {
                $city_state .= ', ' . $fields['State'];
            }
            if (isset($fields['Zip Code'])) {
                $city_state .= ' ' . $fields['Zip Code'];
            }
            $address[] = $city_state;
        }
        
        if (!empty($address)) {
            $html .= '<div class="gfwba-member-profile-address">';
            foreach ($address as $line) {
                $html .= '<p>' . $line . '</p>';
            }
            $html .= '</div>';
        }
        
        // Phone and email
        if (isset($fields['Phone'])) {
            $html .= '<p class="gfwba-member-profile-phone"><strong>Phone:</strong> ' . $fields['Phone'] . '</p>';
        }
        if (isset($fields['Cell Phone'])) {
            $html .= '<p class="gfwba-member-profile-cell"><strong>Cell:</strong> ' . $fields['Cell Phone'] . '</p>';
        }
        if (isset($member['Email'])) {
            $html .= '<p class="gfwba-member-profile-email"><strong>Email:</strong> <a href="mailto:' . $member['Email'] . '">' . $member['Email'] . '</a></p>';
        }
        if (isset($fields['Web Site'])) {
            $html .= '<p class="gfwba-member-profile-website"><strong>Website:</strong> ' . $fields['Web Site'] . '</p>';
        }
        
        $html .= '</div>'; // Close contact info
        $html .= '</div>'; // Close section
        
        // Categories section
        if (!empty($categories)) {
            $html .= '<div class="gfwba-member-profile-section">';
            $html .= '<h3 class="gfwba-member-profile-section-title">Categories</h3>';
            $html .= '<div class="gfwba-member-profile-categories">';
            $html .= '<ul>';
            foreach ($categories as $category) {
                $html .= '<li>' . $category . '</li>';
            }
            $html .= '</ul>';
            $html .= '</div>'; // Close categories
            $html .= '</div>'; // Close section
        }
        
        // Additional information section
        $additional_fields = array(
            'About' => 'About',
            'Description' => 'Description',
            'Services' => 'Services',
            'Products' => 'Products'
        );
        
        $has_additional = false;
        $additional_html = '<div class="gfwba-member-profile-section">';
        $additional_html .= '<h3 class="gfwba-member-profile-section-title">Additional Information</h3>';
        
        foreach ($additional_fields as $field_name => $display_name) {
            if (isset($fields[$field_name]) && !empty($fields[$field_name])) {
                $has_additional = true;
                $additional_html .= '<div class="gfwba-member-profile-additional-item">';
                $additional_html .= '<h4>' . $display_name . '</h4>';
                $additional_html .= '<div>' . $fields[$field_name] . '</div>';
                $additional_html .= '</div>';
            }
        }
        
        $additional_html .= '</div>'; // Close section
        
        if ($has_additional) {
            $html .= $additional_html;
        }
        
        // Back to directory link
        $html .= '<div class="gfwba-member-profile-back">';
        $html .= '<a href="javascript:history.back()" class="gfwba-back-button">« Back to Directory</a>';
        $html .= '</div>';
        
        $html .= '</div>'; // Close member profile
        
        return $html;
    }
}

// Initialize the plugin
$gfwba_directory = new GFWBA_Directory();
