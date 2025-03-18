/**
 * GFWBA Directory Modal JavaScript
 *
 * Handles the modal functionality for member profiles
 */

jQuery(document).ready(function($) {
  "use strict";
  
  console.log("=== GFWBA Modal Initialization ===");
  
  // Create modal container if it doesn't exist
  if ($('#gfwba-member-modal').length === 0) {
    console.log("Creating modal container");
    
    // Create the modal HTML with inline styles
    const modalHtml = `
      <div id="gfwba-member-modal" style="display: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4);">
        <div style="background-color: #fefefe; margin: 5% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 800px; position: relative; border-radius: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
          <span id="gfwba-modal-close" style="color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; position: absolute; right: 20px; top: 10px;">&times;</span>
          <div id="gfwba-modal-body">
            <div style="text-align: center; padding: 40px; font-size: 18px; color: #666;">Loading...</div>
          </div>
        </div>
      </div>
    `;
    
    // Append the modal to the body
    $('body').append(modalHtml);
    console.log("Modal container created and appended to body");
    
    // Close modal when clicking the close button
    $('#gfwba-modal-close').on('click', function() {
      console.log("Close button clicked");
      $('#gfwba-member-modal').hide();
    });
    
    // Close modal when clicking outside the modal content
    $(window).on('click', function(event) {
      if ($(event.target).is('#gfwba-member-modal')) {
        console.log("Clicked outside modal content");
        $('#gfwba-member-modal').hide();
      }
    });
  }
  
  // Function to open the modal with a member profile
  function openMemberModal(memberId) {
    console.log("Opening modal for member ID:", memberId);
    
    // Get the modal elements
    const $modal = $('#gfwba-member-modal');
    const $modalBody = $('#gfwba-modal-body');
    
    // Show loading message
    $modalBody.html('<div style="text-align: center; padding: 40px; font-size: 18px; color: #666;">Loading member profile...</div>');
    
    // Display the modal
    $modal.show();
    
    // Display static content - no AJAX
    console.log("Using static content for member ID:", memberId);
    
    // Show static content based on member ID
    $modalBody.html(`
      <div style="padding: 20px;">
        <h2 style="color: #003366; margin-bottom: 15px;">Member Profile</h2>
        <p style="margin-bottom: 10px;">Member ID: ${memberId}</p>
        
        <div style="margin-bottom: 20px; border-top: 1px solid #e0e0e0; padding-top: 15px;">
          <h3 style="color: #003366; font-size: 18px; margin-bottom: 10px;">Contact Information</h3>
          <p>To view complete member details, please visit the full profile page.</p>
          <p><a href="?profile_id=${memberId}" style="color: #003366; text-decoration: underline; font-weight: bold;">View Full Profile</a></p>
        </div>
        
        <div style="font-size: 12px; color: #666; margin-top: 20px;">
          <p>Note: This is a preview of the member profile. For complete information, please use the link above.</p>
        </div>
      </div>
    `);
  }
  
  // Attach click handlers to member links
  function attachModalHandlers() {
    console.log("Attaching modal click handlers");
    
    // Find all member links
    const $memberLinks = $('.gfwba-member-link');
    console.log(`Found ${$memberLinks.length} member links`);
    
    // Remove any existing click handlers
    $memberLinks.off('click.modal');
    
    // Add click handler to member links
    $memberLinks.on('click.modal', function(e) {
      console.log("Member link clicked");
      e.preventDefault();
      
      // Get the member ID from the href parameter
      const href = $(this).attr('href');
      console.log("Link href:", href);
      
      let memberId;
      
      // Try to get ID from data attribute first
      const $memberItem = $(this).closest('.gfwba-member-list-item');
      if ($memberItem.length && $memberItem.data('id')) {
        memberId = $memberItem.data('id');
        console.log("Found member ID from data attribute:", memberId);
      } 
      // If not found, try to extract from URL
      else if (href && href.indexOf('profile_id=') !== -1) {
        const matches = href.match(/profile_id=([^&]+)/);
        if (matches && matches[1]) {
          memberId = matches[1];
          console.log("Extracted member ID from URL:", memberId);
        }
      }
      
      if (!memberId) {
        console.error('No member ID found in data attribute or URL');
        return;
      }
      
      // Open the modal
      openMemberModal(memberId);
    });
    
    console.log("Modal click handlers attached");
  }
  
  // Initial attachment of modal handlers
  attachModalHandlers();
  
  // Re-attach handlers when the directory is filtered or updated
  $(document).on('gfwba_directory_updated', function() {
    console.log("Directory updated event detected");
    attachModalHandlers();
  });
  
  // Add a test button for debugging
  $('<button>')
    .text('Test Modal')
    .css({
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9000,
      padding: '10px',
      backgroundColor: '#003366',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    })
    .on('click', function() {
      console.log("Test button clicked");
      openMemberModal('test-id-123');
    })
    .appendTo('body');
  
  console.log("GFWBA Modal initialization complete");
});
