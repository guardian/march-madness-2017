var $ = require('../vendor/jquery.js');

module.exports =  {
    init: function() {
        this.bindings();
    },

    bindings: function() {
        $('.march-tabs__option').click(function(element) {
            this.selectTab(element.currentTarget);
        }.bind(this));
    },

    selectTab: function(element) {
        var selectedTab = $(element).attr('data-region');
        $('.march-tabs .is-selected').removeClass('is-selected');
        $(element).addClass('is-selected');

        $('.march').removeClass().addClass('march march--' + selectedTab);
        $('.march-scroll').scrollLeft(0);
    }
}