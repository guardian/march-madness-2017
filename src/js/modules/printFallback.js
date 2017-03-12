var $ = require('../vendor/jquery.js');

module.exports =  {
    init: function() {
        this.showLink();
        this.showPrintButtons();
    },

    showPrintButtons: function() {
        $('.march-header__print-button, .march-bar__print-button').addClass('is-printable').attr('href', '@@assetPath@@/assets/fallback.pdf');
    },

    showLink: function() {
        $('.march-bar').addClass('is-mobile-unprintable')
    }
};