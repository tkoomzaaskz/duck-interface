define(['icanhaz', 'tools/logger'],
function(ich, logger) {

    'use strict';

    return {
        addTemplate: function(tpl) {
            $(tpl).each(function() {
                if (this.outerHTML) {
                    if (typeof ich[this.id] == 'undefined') {
                        ich.addTemplate(this.id, $(this).text());
                        logger.log('LOADED', this.id);
                    }
                }
            });
        }
    };
});
