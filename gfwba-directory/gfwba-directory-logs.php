<?php
/**
 * GFWBA Directory Error Logs
 * 
 * This file provides access to error logs for the GFWBA Directory plugin.
 * 
 * IMPORTANT: Delete this file after debugging is complete as it may expose sensitive information.
 */

// Simple authentication - this is a basic security measure
// You should delete this file after debugging
$auth_key = 'gfwba-debug-2025'; // Simple auth key
$is_authenticated = false;

// Check if auth key is provided
if (isset($_GET['auth']) && $_GET['auth'] === $auth_key) {
    $is_authenticated = true;
    // Store in session for convenience
    session_start();
    $_SESSION['gfwba_auth'] = true;
} elseif (isset($_SESSION['gfwba_auth']) && $_SESSION['gfwba_auth'] === true) {
    $is_authenticated = true;
}

// If not authenticated, show login form
if (!$is_authenticated) {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>GFWBA Directory Logs - Authentication</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 20px;
                color: #333;
                max-width: 500px;
                margin: 50px auto;
            }
            h1 {
                color: #102647;
                border-bottom: 2px solid #102647;
                padding-bottom: 10px;
            }
            .auth-form {
                background-color: #f5f5f5;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            .auth-form input[type="text"] {
                width: 100%;
                padding: 8px;
                margin-bottom: 10px;
            }
            .auth-form button {
                background-color: #102647;
                color: white;
                border: none;
                padding: 10px 15px;
                cursor: pointer;
            }
            .warning {
                background-color: #fcf8e3;
                border: 1px solid #faebcc;
                color: #8a6d3b;
                padding: 15px;
                margin-bottom: 20px;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <h1>GFWBA Directory Logs</h1>
        
        <div class="warning">
            <p><strong>Warning:</strong> This page contains sensitive debugging information. It should only be accessed by authorized personnel.</p>
        </div>
        
        <div class="auth-form">
            <h2>Authentication Required</h2>
            <p>Please enter the authentication key to access the logs:</p>
            <form method="get">
                <input type="text" name="auth" placeholder="Authentication Key">
                <button type="submit">Access Logs</button>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit;
}

// Set headers to prevent caching
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

// Define log file path
$log_file = dirname(__FILE__) . '/gfwba-error.log';

// Handle log clearing
if (isset($_POST['clear_logs']) && $_POST['clear_logs'] === 'yes') {
    if (file_exists($log_file)) {
        file_put_contents($log_file, '');
    }
    echo '<div style="background-color: #dff0d8; color: #3c763d; padding: 10px; margin-bottom: 20px; border: 1px solid #d6e9c6; border-radius: 4px;">Logs cleared successfully.</div>';
}

// Handle log downloading
if (isset($_GET['download_logs']) && $_GET['download_logs'] === 'yes') {
    if (file_exists($log_file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="gfwba-error.log"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($log_file));
        readfile($log_file);
        exit;
    }
}

// Define log file path
$log_file = dirname(__FILE__) . '/gfwba-error.log';

// Try to get PHP error log path
$php_error_log = ini_get('error_log');
if (empty($php_error_log)) {
    // Try common locations
    $possible_locations = array(
        '/var/log/php-errors.log',
        '/var/log/apache2/error.log',
        '/var/log/httpd/error_log',
        '/var/log/nginx/error.log'
    );
    
    foreach ($possible_locations as $location) {
        if (file_exists($location) && is_readable($location)) {
            $php_error_log = $location;
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>GFWBA Directory Error Logs</title>
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
        pre {
            background-color: #f5f5f5;
            padding: 10px;
            border: 1px solid #ddd;
            overflow: auto;
            max-height: 500px;
            white-space: pre-wrap;
        }
        .log-actions {
            margin: 20px 0;
        }
        .log-actions form {
            display: inline-block;
            margin-right: 10px;
        }
        .button {
            display: inline-block;
            background-color: #102647;
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            border: none;
            cursor: pointer;
            font-size: 14px;
        }
        .button:hover {
            background-color: #0a1a30;
        }
        .button-danger {
            background-color: #d9534f;
        }
        .button-danger:hover {
            background-color: #c9302c;
        }
        .info-box {
            background-color: #d9edf7;
            border: 1px solid #bce8f1;
            color: #31708f;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .warning-box {
            background-color: #fcf8e3;
            border: 1px solid #faebcc;
            color: #8a6d3b;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>GFWBA Directory Error Logs</h1>
    
    <div class="info-box">
        <p><strong>How to use this page:</strong></p>
        <ol>
            <li>Review the plugin-specific error logs below to identify issues with the GFWBA Directory plugin.</li>
            <li>Check the WordPress debug log for more general errors that might be affecting the plugin.</li>
            <li>You can download or clear the logs using the buttons below each log section.</li>
        </ol>
        <p><strong>Note:</strong> If you're seeing a 500 Internal Server Error, it's likely that PHP is encountering a fatal error. Look for PHP fatal errors in the logs below.</p>
    </div>
    
    <h2>GFWBA Directory Plugin Logs</h2>
    
    <div class="log-actions">
        <form method="post">
            <input type="hidden" name="clear_logs" value="yes">
            <button type="submit" class="button button-danger" onclick="return confirm('Are you sure you want to clear the logs?');">Clear Logs</button>
        </form>
        <a href="?download_logs=yes" class="button">Download Logs</a>
    </div>
    
    <pre><?php 
    if (file_exists($log_file)) {
        $logs = file_get_contents($log_file);
        echo !empty($logs) ? htmlspecialchars($logs) : 'No logs found.';
    } else {
        echo 'Log file does not exist yet. It will be created when an error occurs.';
    }
    ?></pre>
    
    <h2>PHP Error Log</h2>
    
    <div class="warning-box">
        <p><strong>Note:</strong> The PHP error log may contain sensitive information. Be careful when sharing this information.</p>
    </div>
    
    <?php if (!empty($php_error_log)): ?>
        <p>PHP error log path: <code><?php echo htmlspecialchars($php_error_log); ?></code></p>
        
        <?php if (file_exists($php_error_log) && is_readable($php_error_log)): ?>
            <pre><?php 
            // Try to get the last 100 lines of the PHP error log
            if (function_exists('shell_exec')) {
                $php_logs = shell_exec('tail -n 100 ' . escapeshellarg($php_error_log));
                echo !empty($php_logs) ? htmlspecialchars($php_logs) : 'No recent PHP errors found.';
            } else {
                // Fallback if shell_exec is not available
                $php_logs = file_exists($php_error_log) ? file_get_contents($php_error_log) : '';
                // Get the last 100 lines
                $lines = explode("\n", $php_logs);
                $lines = array_slice($lines, max(0, count($lines) - 100));
                echo !empty($lines) ? htmlspecialchars(implode("\n", $lines)) : 'No recent PHP errors found.';
            }
            ?></pre>
        <?php else: ?>
            <p>PHP error log is not accessible or does not exist at the specified location.</p>
        <?php endif; ?>
    <?php else: ?>
        <p>Could not determine PHP error log location.</p>
        
        <div class="info-box">
            <p><strong>Alternative ways to check errors:</strong></p>
            <ol>
                <li>Check your hosting control panel for error logs</li>
                <li>Contact your hosting provider for assistance with accessing error logs</li>
                <li>Try adding this code to a PHP file to see the error log location:</li>
                <pre>&lt;?php echo ini_get('error_log'); ?&gt;</pre>
            </ol>
        </div>
    <?php endif; ?>
    
    <h2>Server Information</h2>
    
    <pre><?php
    // Display PHP version and loaded extensions
    echo "PHP Version: " . phpversion() . "\n\n";
    
    // Check for required extensions
    $required_extensions = array('curl', 'json', 'mysqli', 'mbstring');
    echo "Required Extensions:\n";
    foreach ($required_extensions as $ext) {
        echo "- $ext: " . (extension_loaded($ext) ? "Loaded" : "Not Loaded") . "\n";
    }
    
    // Display memory limits
    echo "\nMemory Limits:\n";
    echo "- PHP Memory Limit: " . ini_get('memory_limit') . "\n";
    echo "- Max Execution Time: " . ini_get('max_execution_time') . " seconds\n";
    
    // Try to get WordPress version without using WordPress functions
    $wp_version = 'Unknown';
    $version_file = dirname(dirname(dirname(dirname(__FILE__)))) . '/wp-includes/version.php';
    if (file_exists($version_file)) {
        $version_content = file_get_contents($version_file);
        if (preg_match('/\$wp_version\s*=\s*\'([^\']+)\'/', $version_content, $matches)) {
            $wp_version = $matches[1];
        }
    }
    echo "\nWordPress Version: " . $wp_version . "\n";
    ?></pre>
    
    <p><strong>Note:</strong> Delete this file after debugging is complete as it may expose sensitive information.</p>
</body>
</html>
