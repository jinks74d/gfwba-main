<?php
/**
 * Plugin Name: GFWBA Directory
 * Plugin URI: https://gfwba.org
 * Description: Displays the Greater Fort Worth Builders Association member directory
 * Version: 1.2.0
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
define('GFWBA_DIRECTORY_VERSION', '1.2.0');
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
        
        // Register shortcode
        add_shortcode('gfwba_directory', array($this, 'directory_shortcode'));
        
        // Enqueue scripts and styles
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        
        // Log plugin initialization
        gfwba_log('GFWBA Directory plugin initialized', 'info');
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
        
        // Check if we're in a post/page and if it contains our shortcode
        if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'gfwba_directory')) {
            // Always enqueue the CSS
            wp_enqueue_style(
                'gfwba-directory-style',
                GFWBA_DIRECTORY_PLUGIN_URL . 'assets/css/gfwba-directory.css',
                array(),
                GFWBA_DIRECTORY_VERSION
            );
            
            // Make sure jQuery is loaded
            wp_enqueue_script('jquery');
            
            // Enqueue JavaScript with jQuery as dependency
            wp_enqueue_script(
                'gfwba-directory-script',
                GFWBA_DIRECTORY_PLUGIN_URL . 'assets/js/gfwba-directory.js',
                array('jquery'),
                GFWBA_DIRECTORY_VERSION,
                true
            );
            
            // Add inline script to debug
            wp_add_inline_script('gfwba-directory-script', 'console.log("GFWBA Directory script loaded");');
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
        
        // Get contacts - fetch more members (200 instead of 50)
        $response = wp_remote_get(
            "https://api.wildapricot.org/v2.2/accounts/{$this->account_id}/contacts?%24async=false&%24filter=(Status%20eq%20'Active')&%24top=200",
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
        $html .= '<input type="text" class="gfwba-search-input" placeholder="Search...">';
        $html .= '<button class="gfwba-search-button">Search</button>';
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
                        }
                    }
                }
            }
            
            $location = $city . ($state ? ", $state" : '');
            
            $html .= '<div class="gfwba-member-list-item" data-id="' . (isset($contact['Id']) ? $contact['Id'] : '') . '">';
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
            
            $html .= '<div class="gfwba-member-list-item">';
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
}

// Initialize the plugin
$gfwba_directory = new GFWBA_Directory();
