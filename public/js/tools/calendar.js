define(['underscore'],
function(_) {

    'use strict';

    return {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'October', 'December'],

        compare: function(a, b) {
            // comparing from.year with to.year
            if (a[0] > b[0]) {
                return 1;
            } else if (a[0] === b[0]) {
                // comparing from.month with to.month
                return (a[1] - b[1]);
            } else {
                return -1;
            }
        },

        periodName: function(year, month) {
            return this.months[month-1] + " " + year;
        },

        labels: function(from, to) {
            var dfrom = from.split('-'), dto = to.split('-'),
                res = [this.periodName(dfrom[0], dfrom[1])];
            if (!this.compare(dto, dfrom)) {
                throw new Error('`from` should be <= `to`');
            }
            for (var y = dfrom[0], m = dfrom[1]; y != dto[0] || m != dto[1]; ) {
                m++;
                if (m > 12) {
                    m = 1;
                    y++;
                }
                res.push(this.periodName(y, m));
            }
            return res;
        }
    };
});
