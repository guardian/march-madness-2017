var $ = require('../vendor/jquery.js');

module.exports =  {
    init: function() {
        this.bindings();
        console.log('bracket');
    },

    bindings: function() {
        $('.march-bracket__team').click(function(e) {
            this.selectTeam(e.currentTarget)
        }.bind(this));
    },

    selectTeam: function(team) {
        this.highlightWinner(team);
        this.progressWinner(team);
    },

    highlightWinner: function(team) {
        if ($(team).hasClass('is-winner')) {
            $(team).removeClass('is-winner');
        } else {
            $(team).parent().find('.is-winner').removeClass('is-winner');
            $(team).addClass('is-winner');
        }
    },

    progressWinner: function(team) {
        var html = $(team).html(),
            matchNumber = $(team).parent().data('match-number'),
            isFirst = (matchNumber % 2) == 1,
            region = $(team).parent().parent().data('region'),
            round = $(team).parent().parent().data('round');

        if (round === 4) {
            console.log('progress to final four');
        } else {
            $('.march-round[data-region="' + region + '"][data-round="' + (round + 1) + '"] .march-bracket__matchup[data-match-number="' + Math.ceil(matchNumber / 2)  + '"] .march-bracket__team:' + (isFirst ? 'first-of-type' : 'last-of-type')).html(html);
        }
    }
};