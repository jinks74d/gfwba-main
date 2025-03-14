/**
 * GFWBA Directory JavaScript
 */
(function($) {
    'use strict';

    // Store the original list of members for filtering
    let allMembers = [];
    
    // Store active filters
    let activeFilters = [];

    /**
     * Initialize the directory
     */
    function initDirectory() {
        // Cache DOM elements
        const $directoryContainer = $('.gfwba-directory-container');
        const $memberItems = $('.gfwba-member-list-item');
        const $categoryItems = $('.gfwba-category-item');
        const $clearFilters = $('.gfwba-clear-filters');
        const $searchInput = $('.gfwba-search-input');
        const $searchButton = $('.gfwba-search-button');
        const $activeFiltersContainer = $('.gfwba-active-filters');

        // Store all members for filtering
        $memberItems.each(function() {
            allMembers.push({
                element: $(this),
                name: $(this).find('.gfwba-member-name').text().toUpperCase(),
                company: $(this).find('.gfwba-member-company').text().toUpperCase(),
                categories: $(this).find('.gfwba-member-categories-list li').text().toUpperCase(),
                location: $(this).find('.gfwba-member-details-list li:nth-child(2)').text().toUpperCase() || '',
                visible: true
            });
        });

        // Category click handler
        $categoryItems.on('click', function() {
            const category = $(this).data('category');
            const $checkbox = $(this).find('.gfwba-checkbox');
            
            if (activeFilters.includes(category)) {
                // Remove from filters
                activeFilters = activeFilters.filter(filter => filter !== category);
                $checkbox.text('☐');
            } else {
                // Add to filters
                activeFilters.push(category);
                $checkbox.text('☒');
            }
            
            updateActiveFiltersDisplay();
            filterMembers();
        });

        // Clear filters click handler
        $clearFilters.on('click', function() {
            activeFilters = [];
            $categoryItems.find('.gfwba-checkbox').text('☐');
            $searchInput.val('');
            updateActiveFiltersDisplay();
            resetFilters();
        });

        // Search button click handler
        $searchButton.on('click', function() {
            const searchTerm = $searchInput.val().trim();
            if (searchTerm !== '') {
                performSearch(searchTerm);
            }
        });

        // Search input enter key handler
        $searchInput.on('keypress', function(e) {
            if (e.which === 13) {
                const searchTerm = $(this).val().trim();
                if (searchTerm !== '') {
                    performSearch(searchTerm);
                }
                e.preventDefault();
            }
        });

        // Active filter click handler (delegated)
        $activeFiltersContainer.on('click', '.gfwba-filter-tag', function() {
            const filter = $(this).data('filter');
            
            // Remove from active filters
            activeFilters = activeFilters.filter(item => item !== filter);
            
            // Update category checkboxes
            $categoryItems.each(function() {
                if ($(this).data('category') === filter) {
                    $(this).find('.gfwba-checkbox').text('☐');
                }
            });
            
            updateActiveFiltersDisplay();
            filterMembers();
        });
    }

    /**
     * Update the active filters display
     */
    function updateActiveFiltersDisplay() {
        const $container = $('.gfwba-active-filters');
        $container.empty();
        
        activeFilters.forEach(filter => {
            $container.append(
                $('<p class="gfwba-filter-tag" data-filter="' + filter + '">' + filter + ' X</p>')
            );
        });
    }

    /**
     * Filter members based on active filters
     */
    function filterMembers() {
        if (activeFilters.length === 0) {
            // Show all members if no filters are active
            resetFilters();
            return;
        }
        
        // Hide all members first
        $('.gfwba-member-list-item').hide();
        
        // Filter members
        allMembers.forEach(member => {
            let shouldShow = false;
            
            // Check if member matches any active filter
            activeFilters.forEach(filter => {
                // Check categories
                if (member.categories.includes(filter.toUpperCase())) {
                    shouldShow = true;
                }
                
                // Check name
                if (member.name.includes(filter.toUpperCase())) {
                    shouldShow = true;
                }
                
                // Check company
                if (member.company.includes(filter.toUpperCase())) {
                    shouldShow = true;
                }
                
                // Check location
                if (member.location.includes(filter.toUpperCase())) {
                    shouldShow = true;
                }
            });
            
            // Show member if it matches any filter
            if (shouldShow) {
                member.element.show();
                member.visible = true;
            } else {
                member.element.hide();
                member.visible = false;
            }
        });
    }

    /**
     * Reset filters and show all members
     */
    function resetFilters() {
        $('.gfwba-member-list-item').show();
        allMembers.forEach(member => {
            member.visible = true;
        });
    }

    /**
     * Perform search
     */
    function performSearch(searchTerm) {
        // Add search term to active filters
        if (!activeFilters.includes(searchTerm)) {
            activeFilters.push(searchTerm);
            updateActiveFiltersDisplay();
        }
        
        filterMembers();
    }

    // Initialize when document is ready
    $(document).ready(function() {
        initDirectory();
    });

})(jQuery);
