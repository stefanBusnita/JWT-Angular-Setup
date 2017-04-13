'use strict';


angular.module('jwtApp').filter('staticOptions', function(constants) {

    var labels = {
        CUSTOM_SERVER_ERRS: {
            2: 'AUTH_RIGHTS_CHANGED',
            3: 'JWT_EXPIRED'
        },
        MONTH: {
            1: 'JANUARY',
            2: 'FEBRUARY',
            3: 'MARCH',
            4: 'APRIL',
            5: 'MAI',
            6: 'JUNE',
            7: 'JULY',
            8: 'AUGUST',
            9: 'SEPTEMBER',
            10: 'OCTOBER',
            11: 'NOVEMBER',
            12: 'DECEMBER'
        }
    };
    return function(input, flag) {
        if (labels[flag].hasOwnProperty(input)) {
            return labels[flag][input];
        } else {
            return '-';
        }
    };

});