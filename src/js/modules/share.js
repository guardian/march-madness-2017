var $ = require('../vendor/jquery.js');

var pageUrl = window.location.href.split('#')[0],
    title = 'March madness 2017 bracket',
    id;

module.exports =  {
    init: function() {
        this.setLinks('.march-header');
    },

    setLinks: function(parent, withID = false) {
        if (withID) {
            id = window.location.href.split('#')[1];
        }
        $(parent + ' .march-share__button--twitter a').attr('href', this.getTwitterLink(withID));
        $(parent + ' .march-share__button--facebook a').attr('href', this.getFacebookLink(withID));
        $(parent + ' .march-share__button--email a').attr('href', this.getEmailLink(withID));
    },

    getTwitterLink: function(withId) {
        return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + 
                '&url=' + encodeURIComponent(pageUrl + (withId ? '#' + id : '') + '?CMP=share_btn_tw');
    },

    getFacebookLink: function(withId) {
        return 'https://www.facebook.com/dialog/share?app_id=180444840287&href=' + encodeURIComponent(pageUrl + (withId ? '#' + id : '') + '?CMP=share_btn_fb');
    },

    getEmailLink: function(withId) {
        return 'mailto:?subject=' + encodeURIComponent(title) +
                '&body=' + encodeURIComponent(pageUrl + (withId ? '#' + id : '') + '?CMP=share_btn_link');
    }
};