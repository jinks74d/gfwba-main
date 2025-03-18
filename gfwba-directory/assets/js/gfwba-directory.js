/**
 * GFWBA Directory JavaScript
 *
 * Handles filtering, search, and other interactive functionality for the GFWBA directory.
 */

jQuery(document).ready(function ($) {
  "use strict";

  console.log("=== GFWBA Directory Initialization ===");
  console.log("Script loaded and jQuery ready");

  // Get the directory container
  const $container = $(".gfwba-directory-container");
  if ($container.length === 0) {
    console.error("ERROR: Directory container not found!");
    console.log(
      "Make sure the shortcode [gfwba_directory] is properly placed on the page"
    );
    return;
  }

  console.log("SUCCESS: Directory container found");
  console.log("Container:", $container);

  // Function to log to console only (debug box removed as requested)
  function logInfo(message, type = "info") {
    const timestamp = new Date().toLocaleTimeString();
    const formattedMessage = `[${timestamp}] ${message}`;

    // Log to console only
    if (type === "error") {
      console.error(formattedMessage);
    } else if (type === "warn") {
      console.warn(formattedMessage);
    } else {
      console.log(formattedMessage);
    }
  }

  // Get all member items from the hidden container
  const $allMembers = $container.find(
    ".gfwba-all-members-container .gfwba-member-list-item"
  );
  logInfo(`Found ${$allMembers.length} total member items in hidden container`);

  // Get visible member items
  const $visibleMembers = $container.find(
    ".gfwba-directory-list .gfwba-member-list-item"
  );
  logInfo(
    `Found ${$visibleMembers.length} visible member items on current page`
  );

  // Initialize active filters
  let activeCategories = [];
  let searchTerm = "";

  // Initialize category filters
  const $categoryItems = $container.find(".gfwba-category-item");
  logInfo(`Found ${$categoryItems.length} category items`);

  if ($categoryItems.length === 0) {
    logInfo("No category items found. Check HTML structure.", "warn");
  }

  // Handle category item click
  $categoryItems.on("click", function () {
    const $this = $(this);
    const category = $this.attr("data-category");

    logInfo(`Category clicked: "${category}"`);

    // Toggle checkbox
    const $checkbox = $this.find(".gfwba-checkbox");
    const isChecked = $checkbox.text() === "☑";

    if (isChecked) {
      // Uncheck
      $checkbox.text("☐");
      logInfo(`Unchecked category: "${category}"`);

      // Remove from active categories
      const index = activeCategories.indexOf(category);
      if (index > -1) {
        activeCategories.splice(index, 1);
      }
    } else {
      // Check
      $checkbox.text("☑");
      logInfo(`Checked category: "${category}"`);

      // Add to active categories
      if (!activeCategories.includes(category)) {
        activeCategories.push(category);
      }
    }

    logInfo(`Active categories: ${activeCategories.join(", ")}`);

    // Apply filters
    applyFilters();
  });

  // Initialize search
  const $searchInput = $container.find(".gfwba-search-input");
  const $searchButton = $container.find(".gfwba-search-button");

  logInfo(`Search input found: ${$searchInput.length > 0}`);
  logInfo(`Search button found: ${$searchButton.length > 0}`);

  if (!$searchInput.length || !$searchButton.length) {
    logInfo("Search elements not found. Check HTML structure.", "warn");
  }

  // Handle search button click
  $searchButton.on("click", function () {
    searchTerm = $searchInput.val().toLowerCase();
    logInfo(`Search button clicked. Search term: "${searchTerm}"`);
    applyFilters();
  });

  // Handle enter key in search input
  $searchInput.on("keypress", function (e) {
    if (e.which === 13) {
      searchTerm = $searchInput.val().toLowerCase();
      logInfo(
        `Enter key pressed in search input. Search term: "${searchTerm}"`
      );
      applyFilters();
      e.preventDefault();
    }
  });

  // Initialize clear filters
  const $clearFilters = $container.find(".gfwba-clear-filters");
  logInfo(`Clear filters button found: ${$clearFilters.length > 0}`);

  if (!$clearFilters.length) {
    logInfo("Clear filters button not found. Check HTML structure.", "warn");
  }

  // Handle clear filters click
  $clearFilters.on("click", function () {
    logInfo("Clear filters button clicked");

    // Clear active categories
    activeCategories = [];
    logInfo("Active categories cleared");

    // Reset checkboxes
    $categoryItems.find(".gfwba-checkbox").text("☐");
    logInfo("Checkboxes reset");

    // Clear search
    searchTerm = "";
    $searchInput.val("");
    logInfo("Search input cleared");

    // Reset the directory list by showing all members from the hidden container
    const $directoryList = $container.find(".gfwba-directory-list");
    $directoryList.empty();

    // Get the first 10 members from the hidden container
    const membersToShow = [];
    $allMembers.each(function (index) {
      if (index < 10) {
        membersToShow.push($(this).clone());
      }
    });

    // Add the first 10 members to the visible list
    for (let i = 0; i < membersToShow.length; i++) {
      $directoryList.append(membersToShow[i]);
    }

    // Update pagination
    updatePagination($allMembers.length);

    // Hide filter summary
    const $filterSummary = $container.find(".gfwba-filter-summary");
    $filterSummary.hide();

    logInfo("Directory list reset to show first 10 members");
  });

  // Apply filters function
  function applyFilters() {
    logInfo("=== Applying Filters ===");
    logInfo(
      `Categories: ${
        activeCategories.length > 0 ? activeCategories.join(", ") : "None"
      }`
    );
    logInfo(`Search term: "${searchTerm || "None"}"`);

    // Debug member content
    if ($allMembers.length > 0) {
      const $firstMember = $allMembers.first();
      logInfo("=== Member Content Debug ===");
      logInfo(`First member HTML: ${$firstMember.html()}`);
      logInfo(`First member text: ${$firstMember.text()}`);

      // Debug member parts
      logInfo(`Member name: ${$firstMember.find(".gfwba-member-name").text()}`);
      logInfo(
        `Member company: ${$firstMember.find(".gfwba-member-company").text()}`
      );
      logInfo(
        `Member categories: ${$firstMember
          .find(".gfwba-member-categories")
          .text()}`
      );
      logInfo(
        `Member details: ${$firstMember.find(".gfwba-member-details").text()}`
      );
    }

    // Array to hold filtered members
    const filteredMembers = [];

    // Filter all members
    $allMembers.each(function (index) {
      const $member = $(this);

      // Get all searchable text from the member
      const name = $member.find(".gfwba-member-name").text().toLowerCase();
      const company = $member
        .find(".gfwba-member-company")
        .text()
        .toLowerCase();
      const details = $member
        .find(".gfwba-member-details")
        .text()
        .toLowerCase();
      const memberCategories = $member
        .find(".gfwba-member-categories")
        .text()
        .toLowerCase();

      // Combine all text for searching
      const memberText = `${name} ${company} ${details} ${memberCategories}`;

      // Debug first few members
      if (index < 3 && searchTerm) {
        logInfo(`Member #${index + 1} search text: "${memberText}"`);
        logInfo(
          `Contains search term "${searchTerm}": ${
            memberText.indexOf(searchTerm) !== -1
          }`
        );
      }

      let includeMember = true;

      // Filter by categories - completely rewritten to match original application
      if (activeCategories.length > 0) {
        includeMember = false;

        // Try to get categories from data attribute first (new approach)
        let memberCategoryArray = [];
        const categoriesData = $member.attr('data-categories');
        
        if (categoriesData) {
          try {
            // Parse the JSON data attribute
            memberCategoryArray = JSON.parse(categoriesData).map(cat => cat.toLowerCase());
            logInfo(`Member #${index+1} categories from data attribute: [${memberCategoryArray.join(', ')}]`);
          } catch (e) {
            logInfo(`Error parsing categories data attribute: ${e.message}`, 'error');
            // Fall back to text parsing if JSON parsing fails
            memberCategoryArray = memberCategories.split(',').map(cat => cat.trim().toLowerCase());
          }
        } else {
          // Fall back to text parsing if data attribute is not available
          logInfo(`Member #${index+1} categories from text: "${memberCategories}"`);
          memberCategoryArray = memberCategories.split(',').map(cat => cat.trim().toLowerCase());
        }

        // Use the same approach as the original application: check if any active category is in the member's categories
        const hasMatchingCategory = activeCategories.some(activeCategory => {
          const lowerActiveCategory = activeCategory.toLowerCase();
          return memberCategoryArray.some(memberCategory => memberCategory === lowerActiveCategory);
        });

        if (hasMatchingCategory) {
          includeMember = true;
          logInfo(`Member #${index + 1} has a matching category`);
        }

        // Debug category filtering for first few members
        if (index < 3) {
          logInfo(
            `Member #${index + 1} category check: ${
              includeMember ? "MATCH" : "NO MATCH"
            }`
          );
          logInfo(
            `Member categories array: [${memberCategoryArray.join(", ")}]`
          );
          logInfo(
            `Active categories: [${activeCategories
              .map((c) => c.toLowerCase())
              .join(", ")}]`
          );
        }
      }

      // Filter by search term
      if (includeMember && searchTerm) {
        const hasMatch = memberText.indexOf(searchTerm) !== -1;
        includeMember = hasMatch;

        // Debug search filtering for first few members
        if (index < 3) {
          logInfo(
            `Member #${index + 1} search check: ${
              hasMatch ? "MATCH" : "NO MATCH"
            }`
          );
        }
      }

      // Add to filtered members if it passes all filters
      if (includeMember) {
        filteredMembers.push($member.clone());
      }
    });

    logInfo(
      `Filter results: ${filteredMembers.length} matching members out of ${$allMembers.length} total`
    );

    // Update the visible member list
    const $directoryList = $container.find(".gfwba-directory-list");
    $directoryList.empty();

    // Show first 10 filtered members
    const membersToShow = filteredMembers.slice(0, 10);
    for (let i = 0; i < membersToShow.length; i++) {
      $directoryList.append(membersToShow[i]);
    }

    // Update pagination if needed
    updatePagination(filteredMembers.length);

    // Add filter summary to the page
    const $filterSummary = $container.find(".gfwba-filter-summary");
    if ($filterSummary.length === 0) {
      $container
        .find(".gfwba-directory-header")
        .append('<div class="gfwba-filter-summary"></div>');
    }

    const $summary = $container.find(".gfwba-filter-summary");
    if (activeCategories.length > 0 || searchTerm) {
      $summary.html(
        `<p>Showing ${Math.min(filteredMembers.length, 10)} of ${
          filteredMembers.length
        } matching members (${$allMembers.length} total)</p>`
      );
      $summary.show();
    } else {
      $summary.hide();
    }

    // Update debug boxes
    updateDebugBoxes(filteredMembers.length);
    
    // Re-attach modal click handlers after filtering
    attachModalHandlers();
  }

  /**
   * Update pagination controls based on filtered results
   */
  function updatePagination(totalFilteredMembers) {
    const $pagination = $container.find(".gfwba-pagination");

    if (totalFilteredMembers <= 10) {
      // Hide pagination if 10 or fewer results
      $pagination.hide();
      return;
    }

    // Show pagination
    $pagination.show();

    // Calculate total pages
    const totalPages = Math.ceil(totalFilteredMembers / 10);

    // Update page indicator
    $pagination.find(".gfwba-page-indicator").text(`Page 1 of ${totalPages}`);

    // Disable prev button on first page
    $pagination
      .find(".gfwba-prev-page")
      .addClass("gfwba-disabled")
      .text("PREV PAGE");

    // Enable next button if more than one page
    if (totalPages > 1) {
      $pagination
        .find(".gfwba-next-page")
        .removeClass("gfwba-disabled")
        .text("NEXT PAGE");
    } else {
      $pagination
        .find(".gfwba-next-page")
        .addClass("gfwba-disabled")
        .text("NEXT PAGE");
    }

    logInfo(
      `Pagination updated: ${totalPages} pages for ${totalFilteredMembers} members`
    );
  }

  /**
   * Update debug boxes with current filter information - removed as requested
   */
  function updateDebugBoxes(filteredCount) {
    // Debug boxes removed as requested
    logInfo("Debug boxes removed as requested");
  }
  
  /**
   * Modal functionality for member profiles
   */
  
  // Create modal container if it doesn't exist
  console.log("Checking for existing modal container");
  if ($('#gfwba-member-modal').length === 0) {
    console.log("Modal container not found, creating it");
    
    // Create the modal HTML
    const modalHtml = `
      <div id="gfwba-member-modal" class="gfwba-modal" style="display: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4);">
        <div class="gfwba-modal-content" style="background-color: #fefefe; margin: 5% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 800px; position: relative; border-radius: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
          <span class="gfwba-modal-close" style="color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; position: absolute; right: 20px; top: 10px;">&times;</span>
          <div class="gfwba-modal-body">
            <div class="gfwba-modal-loading" style="text-align: center; padding: 40px; font-size: 18px; color: #666;">Loading...</div>
          </div>
        </div>
      </div>
    `;
    
    // Append the modal to the body
    $('body').append(modalHtml);
    console.log("Modal container created and appended to body");
    
    // Close modal when clicking the close button
    $('.gfwba-modal-close').on('click', function() {
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
  } else {
    console.log("Modal container already exists");
  }
  
  // Function to attach modal click handlers
  function attachModalHandlers() {
    console.log("Attaching modal click handlers");
    
    // Log all member links found
    const $memberLinks = $('.gfwba-member-link');
    console.log(`Found ${$memberLinks.length} member links to attach handlers to`);
    
    // Remove any existing click handlers
    $memberLinks.off('click.modal');
    
    // Add click handler to member links
    $memberLinks.on('click.modal', function(e) {
      console.log("Member link clicked");
      e.preventDefault();
      
      // Get the member ID
      const $memberItem = $(this).closest('.gfwba-member-list-item');
      console.log("Member item:", $memberItem);
      
      const memberId = $memberItem.data('id');
      console.log("Member ID:", memberId);
      
      if (!memberId) {
        console.error('No member ID found');
        return;
      }
      
      logInfo(`Opening modal for member ID: ${memberId}`);
      
      // Show modal with loading indicator
      const $modal = $('#gfwba-member-modal');
      console.log("Modal element:", $modal);
      
      const $modalBody = $modal.find('.gfwba-modal-body');
      console.log("Modal body element:", $modalBody);
      
      $modalBody.html('<div class="gfwba-modal-loading" style="text-align: center; padding: 40px; font-size: 18px; color: #666;">Loading member profile...</div>');
      
      // Make sure the modal is visible
      $modal.css('display', 'block');
      console.log("Modal should now be visible");
      
      // For testing, let's just show a static message instead of making an AJAX call
      setTimeout(function() {
        $modalBody.html(`<div style="padding: 20px;"><h2>Member Profile for ID: ${memberId}</h2><p>This is a test profile to verify the modal is working correctly.</p></div>`);
      }, 1000);
      
      /* Commented out for testing
      // Fetch member profile data
      $.ajax({
        url: window.location.href,
        data: { profile_id: memberId, modal: 1 },
        method: 'GET',
        success: function(response) {
          console.log("AJAX success");
          // Extract the member profile HTML from the response
          const $response = $(response);
          const $profileContent = $response.find('.gfwba-member-profile');
          
          console.log("Profile content found:", $profileContent.length > 0);
          
          if ($profileContent.length) {
            $modalBody.html($profileContent);
          } else {
            $modalBody.html('<p>Error: Could not load member profile.</p>');
          }
        },
        error: function(xhr, status, error) {
          console.error("AJAX error:", status, error);
          $modalBody.html('<p>Error: Could not load member profile. Please try again later.</p>');
        }
      });
      */
    });
    
    console.log("Modal click handlers attached");
  }
  
  // Initial attachment of modal handlers
  attachModalHandlers();

  logInfo("GFWBA Directory initialization complete");
});
