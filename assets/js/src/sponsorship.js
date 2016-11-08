"use strict";

$(function () {
    if (window.sponsorHtml && window.sponsorUrl) {
        var $post = $('.post-card'),
            $list = $('.posts');

        if ($post.length) {
            var postTemplate = $('<div class="sponsor"><p><a href="'
                + sponsorUrl
                + '" target="_blank"><strong>Sponsored&nbsp;By: </strong><span>'
                + sponsorHtml
                + '</span>&nbsp;<i class="fa fa-external-link"></i></a></p></div>');
            $post.prepend(postTemplate);
        }

        if ($list.length) {
            var listTemplate = $('<li class="card sponsor"><div class="card-container"><div class="card-body"><a href="'
                + sponsorUrl
                + '" target="_blank"><div class="card-content"><strong>Sponsored&nbsp;By: </strong><span>'
                + sponsorHtml
                + '</span></div></a></div></div></li>');
            $list.prepend(listTemplate);
        }
    }
});