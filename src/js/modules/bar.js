var $ = require('../vendor/jquery.js');
var share = require('../modules/share.js');

module.exports =  {
    show: function() {
        $('.march-bar').addClass('is-visible');
    },

    update: function() {
        share.setLinks('.march-bar', true);
        $('.march-bar__url-input').val(document.location.href);
    }
}