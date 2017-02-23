var $ = require('../vendor/jquery.js');
var passcode = require('../modules/passcode.js');

var init = true;

module.exports =  {
    init: function() {
        this.restoreProgress();
        this.bindings();
    },

    bindings: function() {
        $('.march-bracket__team').click(function(e) {
            this.selectTeam(e.currentTarget)
        }.bind(this));
    },

    restoreProgress: function() {
        var id = document.location.href.split('#')[1];
        if (id) {
            var data = passcode.parseData(id);
            $(passcode.orderMatchups()).each(function(i, matchup) {
                if (data[i] == '1') {
                    this.selectTeam($(matchup).find('.march-bracket__team:first-of-type'));
                } else if (data[i] == '2') {
                    this.selectTeam($(matchup).find('.march-bracket__team:last-of-type'));
                }
            }.bind(this));
        }
        init = false;
    },

    selectTeam: function(team) {
        if (!$(team).is(':empty')) {
            this.highlightWinner(team);
        }
    },

    highlightWinner: function(team) {
        if ($(team).hasClass('is-winner')) {
            $(team).removeClass('is-winner');
            this.stopProgress(team, true);
        } else {
            if ($(team).parent().find('.is-winner').length) {
                this.stopProgress($(team).parent().find('.is-winner'), false);
            }
            $(team).parent().find('.is-winner').removeClass('is-winner');
            $(team).addClass('is-winner');
            this.progressWinner(team);
        }
        if (init === false) {
            passcode.updateUrl();
        }
    },

    progressWinner: function(team) {
        var html = $(team).html(),
            matchNumber = $(team).parent().data('match-number'),
            isFirst = (matchNumber % 2) == 1,
            region = $(team).parent().parent().data('region'),
            round = $(team).parent().parent().data('round'),
            teamName = $(team).attr('data-team');

        if (round === 6) {
            $('.march-round--winner .march-bracket__team').attr('data-team', teamName).html(html).addClass('is-filled');
        } else if (round === 5) {
            var isFirst = region === 'east midwest';
            $('.march-round--final .march-bracket__team:' + (isFirst ? 'first-of-type' : 'last-of-type')).attr('data-team', teamName).html(html).addClass('is-filled');
        } else if (round === 4) {
            var isTop = region === 'east' || region === 'midwest';
            var isFirst = region === 'east' || region === 'south';
            $('.march-round--semis:' + (isTop ? 'first-of-type' : 'last-of-type') + ' .march-bracket__matchup .march-bracket__team:' + (isFirst ? 'first-of-type' : 'last-of-type')).attr('data-team', teamName).html(html).addClass('is-filled');
        } else {
            $('.march-round[data-region="' + region + '"][data-round="' + (round + 1) + '"] .march-bracket__matchup[data-match-number="' + Math.ceil(matchNumber / 2)  + '"] .march-bracket__team:' + (isFirst ? 'first-of-type' : 'last-of-type')).attr('data-team', teamName).html(html).addClass('is-filled');
        }
    },

    stopProgress: function(team, isDirect) {
        var round = $(team).parent().parent().data('round'),
            teamName = $(team).attr('data-team');
        round = isDirect ? round : round + 1;

        for (var i = 7; i >= round; i--) {
            if (i === 1) {
                return;
            }
            $('.march-round[data-round="' + i + '"] .march-bracket__team[data-team="' + teamName + '"]').removeClass('is-winner is-filled').empty().removeAttr('data-team');
        }

        if (round > 1) {
            $('.march-round[data-round="' + (round - 1) + '"] .march-bracket__team[data-team="' + teamName + '"]').removeClass('is-winner');
        }
    },
};