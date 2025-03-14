# GFWBA Directory WordPress Plugin

This WordPress plugin allows you to display the Greater Fort Worth Builders Association member directory on your WordPress website, pulling data directly from the Wild Apricot API.

## Features

- Displays member directory with the same look and feel as the original website
- Allows filtering by categories
- Includes search functionality
- Responsive design for mobile and desktop
- Pagination for large directories

## Installation

1. Upload the `gfwba-directory` folder to your `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Go to Settings > GFWBA Directory to configure your Wild Apricot API key
4. Add the shortcode `[gfwba_directory]` to any page where you want to display the directory

## Configuration

1. You'll need a Wild Apricot API key to use this plugin. To get your API key:
   - Log in to your Wild Apricot admin account
   - Go to Settings > API keys
   - Create a new API key with appropriate permissions
   - Copy the API key

2. In your WordPress admin, go to Settings > GFWBA Directory
3. Paste your Wild Apricot API key in the field provided
4. Save changes

## Usage

Simply add the shortcode `[gfwba_directory]` to any page or post where you want the directory to appear.

You can customize the number of members per page by using the `per_page` attribute:

```
[gfwba_directory per_page="20"]
```

## Styling

The plugin includes CSS that matches the styling of the original GFWBA website. If you need to customize the appearance, you can add custom CSS to your theme.

## Requirements

- WordPress 5.0 or higher
- PHP 7.2 or higher
- Active Wild Apricot account with API access

## Additional Notes

- The plugin creates a database table to store member images for better performance
- Member profiles are linked using query parameters (e.g., `?profile_id=123`)

## Troubleshooting

If the directory doesn't display properly:

1. Make sure your Wild Apricot API key is valid and has the correct permissions
2. Check that your Wild Apricot account ID is correct in the plugin code
3. Verify that your Wild Apricot members have the correct field values (the plugin expects specific field IDs)
4. Check your browser console for any JavaScript errors
5. Use the included debug file (`gfwba-directory-debug.php`) to diagnose issues:
   - Access it via your browser at `/wp-content/plugins/gfwba-directory/gfwba-directory-debug.php`
   - You must be logged in as an admin to view the debug information
   - The debug page will check your API connection, field mappings, and more
   - **Important:** Delete this file after debugging is complete as it may expose sensitive information
