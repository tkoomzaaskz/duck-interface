var TemplateEngine = {
    path: 'js/template/',
    templates: ['categoryTotal', 'chooseUsers', 'formTemplate', 'homepage', 'modalsContainer', 'outcomeList', 'userCheckbox', 'categorySelect', 'chooseCategories', 'errorTemplate', 'incomeList', 'monthlyBalance', 'root', 'userSelect'],
    fetchTemplate: function(path) {
        $.ajax({
            type: 'GET',
            dataType: 'text',
            async: false,
            url: path
        }).done(function(response) {
            $('body').append(response);
        });
    },
    fetchAllTemplates: function() {
        var index;
        for (index = 0; index < this.templates.length; ++index) {
            this.fetchTemplate(this.path + this.templates[index] + '.ich');
        }
        ich.grabTemplates();
    },
    concatenated_templates: 'js/template/all.ich',
    fetchConcatenatedTemplates: function() {
        this.fetchTemplate(this.concatenated_templates);
        ich.grabTemplates();
    }
}
