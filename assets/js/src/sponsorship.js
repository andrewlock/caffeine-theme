"use strict";

$(function () {
    if (window.sponsorHtml && window.sponsorUrl) {
        var $post = $('.post-card'),
            $list = $('.posts');
        window.sponsoredByHeader = window.sponsoredByHeader || '<strong>Sponsored&nbsp;By: </strong>';

        if ($post.length) {
            var postTemplate = '<div class="sponsor"><p><a href="'
                + sponsorUrl
                + '" target="_blank"';

            //only add outbound link tracking if we are using google analytics
            //see https://support.google.com/analytics/answer/1136920?hl=en
            if (window.ga_id) {
                postTemplate += ' onclick="window.trackOutLink(\'' + sponsorUrl + '\');"'
            }

            postTemplate +=
                '>' + window.sponsoredByHeader + '<span>'
                + sponsorHtml
                + '</span>&nbsp;<i class="fa fa-external-link"></i></a></p></div>';

            $post.prepend(postTemplate);
        }

        if ($list.length) {
            var listTemplate = '<li class="card sponsor"><div class="card-container"><div class="card-body"><a href="'
                + sponsorUrl
                + '" target="_blank"';

            //only add outbound link tracking if we are using google analytics
            //see https://support.google.com/analytics/answer/1136920?hl=en
            if (window.ga_id) {
                listTemplate += ' onclick="window.trackOutLink(\'' + sponsorUrl + '\');"'
            }

            listTemplate +=
                '><div class="card-content">' + window.sponsoredByHeader + '<span>'
                + sponsorHtml
                + '</span></div></a></div></div></li>';
            $list.prepend(listTemplate);
        }
    }
});