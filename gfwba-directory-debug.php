<?php
/**
 * GFWBA Directory Debug Tool
 * 
 * This file helps diagnose issues with the GFWBA Directory plugin.
 * Upload this file to your WordPress plugins directory and access it via your browser.
 * 
 * IMPORTANT: Delete this file after debugging is complete as it may expose sensitive information.
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    define('ABSPATH', dirname(dirname(dirname(__FILE__))) . '/');
    require_once(ABSPATH . 'wp-config.php');
    require_once(ABSPATH . 'wp-includes/plugin.php');
}

// Check if user is logged in and is an admin
if (!function_exists('wp_get_current_user')) {
    include(ABSPATH . 'wp-includes/pluggable.php');
}

if (!current_user_can('manage_options')) {
    die('You do not have sufficient permissions to access this page.');
}

// Set headers to prevent caching
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>GFWBA Directory Debug</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            color: #333;
        }
        h1 {
            color: #102647;
            border-bottom: 2px solid #102647;
            padding-bottom: 10px;
        }
        h2 {
            color: #102647;
            margin-top: 30px;
        }
        .success {
            color: green;
        }
        .error {
            color: red;
        }
        .warning {
            color: orange;
        }
        pre {
            background-color: #f5f5f5;
            padding: 10px;
            border: 1px solid #ddd;
            overflow: auto;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .debug-section {
            margin-bottom: 30px;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>GFWBA Directory Plugin Debug</h1>
    
    <div class="debug-section">
        <h2>WordPress Environment</h2>
        <table>
            <tr>
                <th>WordPress Version</th>
                <td><?php echo get_bloginfo('version'); ?></td>
            </tr>
            <tr>
                <th>PHP Version</th>
                <td><?php echo phpversion(); ?></td>
            </tr>
            <tr>
                <th>Active Theme</th>
                <td><?php echo wp_get_theme()->get('Name'); ?> (<?php echo wp_get_theme()->get('Version'); ?>)</td>
            </tr>
            <tr>
                <th>Plugin Directory</th>
                <td><?php echo plugin_dir_path(__FILE__); ?></td>
            </tr>
            <tr>
                <th>Plugin URL</th>
                <td><?php echo plugin_dir_url(__FILE__); ?></td>
            </tr>
        </table>
    </div>
    
    <div class="debug-section">
        <h2>Plugin Status</h2>
        <?php
        $plugin_active = is_plugin_active('gfwba-directory/gfwba-directory.php');
        echo '<p>Plugin Active: <strong class="' . ($plugin_active ? 'success' : 'error') . '">' . ($plugin_active ? 'Yes' : 'No') . '</strong></p>';
        
        // Check if plugin files exist
        $plugin_dir = plugin_dir_path(__FILE__);
        $main_file = file_exists($plugin_dir . 'gfwba-directory.php');
        $css_file = file_exists($plugin_dir . 'assets/css/gfwba-directory.css');
        $js_file = file_exists($plugin_dir . 'assets/js/gfwba-directory.js');
        
        echo '<p>Main Plugin File: <strong class="' . ($main_file ? 'success' : 'error') . '">' . ($main_file ? 'Found' : 'Not Found') . '</strong></p>';
        echo '<p>CSS File: <strong class="' . ($css_file ? 'success' : 'error') . '">' . ($css_file ? 'Found' : 'Not Found') . '</strong></p>';
        echo '<p>JS File: <strong class="' . ($js_file ? 'success' : 'error') . '">' . ($js_file ? 'Found' : 'Not Found') . '</strong></p>';
        
        // Check API key
        $api_key = get_option('gfwba_directory_api_key');
        echo '<p>API Key: <strong class="' . (!empty($api_key) ? 'success' : 'warning') . '">' . (!empty($api_key) ? 'Set' : 'Not Set') . '</strong></p>';
        ?>
    </div>
    
    <div class="debug-section">
        <h2>Database Tables</h2>
        <?php
        global $wpdb;
        $table_name = $wpdb->prefix . 'gfwba_contact_images';
        $table_exists = $wpdb->get_var("SHOW TABLES LIKE '$table_name'") == $table_name;
        
        echo '<p>Contact Images Table: <strong class="' . ($table_exists ? 'success' : 'error') . '">' . ($table_exists ? 'Exists' : 'Does Not Exist') . '</strong></p>';
        
        if ($table_exists) {
            $count = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
            echo '<p>Number of Images: ' . $count . '</p>';
        }
        ?>
    </div>
    
    <div class="debug-section">
        <h2>API Connection Test</h2>
        <?php
        if (!empty($api_key)) {
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
                echo '<p class="error">Error: ' . $response->get_error_message() . '</p>';
            } else {
                $body = json_decode(wp_remote_retrieve_body($response), true);
                
                if (isset($body['access_token'])) {
                    echo '<p class="success">Successfully connected to Wild Apricot API</p>';
                    
                    // Test getting contacts
                    $access_token = $body['access_token'];
                    $account_id = '191317'; // From the plugin
                    
                    $contacts_response = wp_remote_get(
                        "https://api.wildapricot.org/v2.2/accounts/{$account_id}/contacts?%24async=false&%24filter=(Status%20eq%20'Active'%20or%20Status%20eq%20'PendingRenewal')&%24top=1",
                        array(
                            'headers' => array(
                                'User-Agent' => 'MySampleApplication/0.1',
                                'Accept' => 'application/json',
                                'Authorization' => "Bearer {$access_token}"
                            ),
                            'timeout' => 15
                        )
                    );
                    
                    if (is_wp_error($contacts_response)) {
                        echo '<p class="error">Error fetching contacts: ' . $contacts_response->get_error_message() . '</p>';
                    } else {
                        $contacts_body = json_decode(wp_remote_retrieve_body($contacts_response), true);
                        
                        if (isset($contacts_body['Contacts']) && is_array($contacts_body['Contacts'])) {
                            echo '<p class="success">Successfully fetched contacts from Wild Apricot</p>';
                            echo '<p>Total Contacts: ' . $contacts_body['ResultCount'] . '</p>';
                            
                            // Check field values
                            if (count($contacts_body['Contacts']) > 0) {
                                $contact = $contacts_body['Contacts'][0];
                                
                                echo '<h3>Field Check</h3>';
                                echo '<table>';
                                echo '<tr><th>Field ID</th><th>Status</th></tr>';
                                
                                $fields = array(39, 44, 45, 47, 48, 49);
                                foreach ($fields as $field_id) {
                                    $exists = isset($contact['FieldValues'][$field_id]);
                                    echo '<tr>';
                                    echo '<td>Field ' . $field_id . '</td>';
                                    echo '<td class="' . ($exists ? 'success' : 'error') . '">' . ($exists ? 'Found' : 'Not Found') . '</td>';
                                    echo '</tr>';
                                }
                                
                                echo '</table>';
                            }
                        } else {
                            echo '<p class="error">Error: Could not fetch contacts</p>';
                            echo '<pre>' . print_r($contacts_body, true) . '</pre>';
                        }
                    }
                } else {
                    echo '<p class="error">Error: Could not get access token</p>';
                    echo '<pre>' . print_r($body, true) . '</pre>';
                }
            }
        } else {
            echo '<p class="warning">API key not set. Please configure the plugin settings.</p>';
        }
        ?>
    </div>
    
    <div class="debug-section">
        <h2>Shortcode Test</h2>
        <?php
        if (shortcode_exists('gfwba_directory')) {
            echo '<p class="success">Shortcode [gfwba_directory] is registered</p>';
        } else {
            echo '<p class="error">Shortcode [gfwba_directory] is not registered</p>';
        }
        ?>
    </div>
    
    <p><strong>Note:</strong> Delete this file after debugging is complete as it may expose sensitive information.</p>
</body>
</html>
