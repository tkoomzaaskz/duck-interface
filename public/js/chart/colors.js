define(['underscore'],
function(_) {

    'use strict';

    var rgbs = {
        grey: [140, 140, 140],
        red: [220, 80, 80],
        green: [80, 220, 80],
        blue: [80, 80, 220]
    };

    var opacities = {
        fillColor: 0.5,
        strokeColor: 0.8,
        highlightFill: 0.75,
        highlightStroke: 1,
    };

    function generate(rgb, opacity) {
        var tmp = _.clone(rgb);
        tmp.push(opacity);
        return "rgba(" + tmp.join() + ")";
    };

    var result = _.clone(rgbs),
        subresult, color, opacity, value;
    for (color in rgbs) {
        subresult = _.clone(opacities);
        for (opacity in opacities) {
            value = opacities[opacity];
            subresult[opacity] = generate(result[color], value);
        }
        result[color] = subresult;
    }

    return result;
});
