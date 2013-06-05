define(
    ['icanhaz', 'tools/logger'],
    function(ich, logger) {
        return {
            loadTemplate: function(tpl) {
                $(tpl).each(function() {
                    if (this.outerHTML) {
                        ich.addTemplate(this.id, $(this).text());
                        logger.log('LOADED', this.id);
                    }
                });
            }	
        };
    });
