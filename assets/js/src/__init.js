"use strict";

$(function() {
    var CaffeineTheme,
        openHash = "#open";

    window.CaffeineTheme = CaffeineTheme = {
        version: "3.0.0",
        search: {
            container: function() {
                return $("#results");
            },
            form: function(action) {
                return $("#search-container")[action]();
            }
        },
        context: function() {
            var className;
            className = document.body.className.split(" ")[0].split("-")[0];
            if (className === "") {
                return "error";
            } else {
                return className;
            }
        },
        app: (function() {
            return document.body;
        })(),
        is: function(property, value) {
            if (this.app.dataset) {
                return this.app.dataset[property] === value;
            } else {
                return this.app.getAttribute("data-" + property) === value;
            }

        },
        isOpen: function () {
            return location.hash === openHash;
        },
        getOpenHashFragment: function() {
            return openHash;
        },
        open: function() {
             window.history.replaceState(null, null, openHash);
        },
        close: function() {
             window.history.replaceState(null, null, "#");
        },
        readTime: function() {
            var DateInDays;
            DateInDays = function(selector) {
                return $(selector).each(function() {
                    var publishDate,
                        timeAgo;

                    publishDate = $(this).attr("datetime");
                    timeAgo = $(this).html();

                    $(this).mouseover(function() {
                        return $(this).html(publishDate);
                    });

                    return $(this).mouseout(function() {
                        return $(this).html(timeAgo);
                    });
                });
            };

            return new DateInDays(".meta > time");
        },
        device: function() {
            var h, w;
            w = window.innerWidth;
            h = window.innerHeight;
            if (w <= 480) {
                return "mobile";
            }
            if (w <= 1024) {
                return "tablet";
            }
            return "desktop";
        },
        hideIndexPage: function () {
            $("#default-nav-header, .blog-header, .material-cover, .page-index").addClass("transparent");
        },
        showIndexPage: function () {
            $("#default-nav-header, .blog-header, .material-cover, .page-index").removeClass("transparent");
        },
        showNotification: function() {
            if (window.notificationOptions && window.toastr) {
                var message = window.notificationOptions.message || "",
                    type = window.notificationOptions.type || "info",
                    isShownOnce = window.notificationOptions.isShownOnce || true,
                    notificationCookie = "notification",
                    cookieValue = window.Cookies.get(notificationCookie),
                    setNotificationCookie;

                setNotificationCookie = function () {
                    if (cookieValue) {
                        window.Cookies.remove(notificationCookie);
                    }

                    if (isShownOnce) {
                        window.Cookies.set(notificationCookie, message);
                    }
                };

                window.toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-bottom-right",
                    "preventDuplicates": true,
                    "onclick": null,
                    "escapeHtml": window.notificationOptions.escapeHtml || false,
                    "timeOut": window.notificationOptions.timeOut || "20000",
                    "extendedTimeOut": window.notificationOptions.extendedTimeOut ||  "5000",
                    "onHidden": setNotificationCookie
                  };

                if (cookieValue === undefined || cookieValue !== encodeURI(message)) {
                    window.toastr[type](message);
                }
            }
        }
    };
});
