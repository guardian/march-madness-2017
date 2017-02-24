var $ = require('../vendor/jquery.js');

var tabsPosition;

module.exports =  {
    init: function() {
        this.bindings();
        this.getValues();
    },

    bindings: function() {
        $('.march-tabs__option').click(function(element) {
            this.selectTab(element.currentTarget);
        }.bind(this));

        $(window).scroll(function() {
            this.onScroll();
        }.bind(this));

        $(window).resize(function() {
            this.getValues();
        }.bind(this));
    },

    getValues: function() {
        tabsPosition = $('.march-tabs').offset().top;
    },

    selectTab: function(element) {
        var selectedTab = $(element).attr('data-region');
        $('.march-tabs .is-selected').removeClass('is-selected');
        $(element).addClass('is-selected');

        $('.march').removeClass().addClass('march march--' + selectedTab);
        $('.march-scroll').scrollLeft(0);
    },

    onScroll: function() {
        if ($(window).scrollTop() > tabsPosition) {
            $('.march-tabs').addClass('is-sticky');
        } else {
            $('.march-tabs').removeClass('is-sticky');
        }
    }
}