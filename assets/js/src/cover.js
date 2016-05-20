"use strict";

$(function() {
    var _expandCover,
        _isTagsOverlayOpen,
        _toggleTagsOverlay,
        _defaultLogoNavEvent,
        $navHeader,
        $tagsButton,
        $homeButton,
        $cover,
        $tagsOverlay;

    $cover = $(".cover");
    $navHeader = $("#default-nav-header");
    $tagsButton = $(".tags-button");
    $homeButton = $navHeader.find("#home-button");
    $tagsOverlay = $(".tags-overlay");

    _expandCover = function() {
        $cover.toggleClass("expanded");

        // Toggles the current page between the cover and the current page
        if ($cover.hasClass("expanded")) {
            CaffeineTheme.close();
            $(window).on('scroll.cover', function(){
                _expandCover();
            })
        } else {
            CaffeineTheme.open();
            $(window).off('scroll.cover');
        }
    };

    // Toggles the search/tags overlay
    _toggleTagsOverlay = function() {
        $tagsOverlay.toggleClass("show");
        $tagsButton.find("i").toggleClass("fa-search fa-close");
    };

    // Checks if the search/tags overlay is visible
    _isTagsOverlayOpen = function() {
        return $tagsOverlay.hasClass("show");
    };

    _defaultLogoNavEvent = function (event) {
        event.preventDefault();
        CaffeineTheme.showIndexPage();

        if (_isTagsOverlayOpen()) {
            _toggleTagsOverlay();
        }

        if (CaffeineTheme.is("page", "home")) {
            CaffeineTheme.showNotification();
        }

        return _expandCover();
    };

    $tagsButton.click(function() {
        _toggleTagsOverlay();
    });

    $(".home-link").click(function(event) {
        if (CaffeineTheme.is("page", "home")) {
            event.preventDefault();
            CaffeineTheme.showIndexPage();
            CaffeineTheme.showNotification();

            // Only toggle the cover if it wasn't already open
            if (!CaffeineTheme.isOpen()) {
                return _expandCover();
            }
        }
    });

    $(".subscribe-link").click(function(event) {
        event.preventDefault();

        if (window.toastr) {
            window.toastr.remove();
        }

        if (window.mailchimpOptions && window.mailchimpOptions.url) {
            var options = window.mailchimpOptions;

            $("body").subbscribe({
                title: options.title || "Never miss a post!",
                text: options.text || "Stay up to the date with the latest posts!",
                name: options.name || "<a href='https://www.facebook.com/caffeinecoding' target='_blank'>@caffeinecoding</a>",
                color: options.color || "#56817A",
                thumbnail: options.thumbnail || "http://i.imgur.com/39erIwp.png",
                list: "MailChimp",
                url : options.url
            });
        }
    });

    $homeButton.click(_defaultLogoNavEvent);
    $(".open-link").click(_defaultLogoNavEvent);

    if (CaffeineTheme.is("page", "home")) {
        
        event.preventDefault();
        CaffeineTheme.showIndexPage();
        
        if (!CaffeineTheme.isOpen()) {
            return _expandCover();
        }
    }
});
