define([
    'sinon', 'config',
    // mock data:
    'json!mock/users.json',
    'json!mock/income_categories.json',
    'json!mock/outcome_categories.json',
    'json!mock/incomes.json',
    'json!mock/outcomes.json'
], function(Sinon, config,
    usersMock, incomeCategoriesMock, outcomeCategoriesMock, incomesMock, outcomesMock) {

    var mockServer = {

        urlRoot: config.urlRoot,

        init: function() {
            this.fs = sinon.fakeServer.create();
            var urlRoot = this.urlRoot;

            this.fs.xhr.useFilters = true;
            this.fs.xhr.addFilter(function(method, url, async, username, password) {
                if (!(new RegExp(urlRoot)).test(url)) {
                    return true;
                }
            });

            this.configureModelResponses('user', usersMock);
            this.configureModelResponses('income_category', incomeCategoriesMock);
            this.configureModelResponses('outcome_category', outcomeCategoriesMock);
            this.fs.autoRespond = true;
            if (config.fakeServerDelay) {
                this.fs.autoRespondAfter = config.fakeServerDelay;
            }
        },

        configureModelResponses: function(resource, data) {
            // configure model list resource
            this.fs.respondWith("GET", this.urlRoot + '/' + resource + '/',
                [200, { "Content-Type": "application/json" },
                JSON.stringify(data) ]);

            // configure single model item resource
            this.fs.respondWith("GET", new RegExp(this.urlRoot + '/' + resource + '/(\d+)', 'i'),
                function (xhr, id) {
                    xhr.respond(200, { "Content-Type": "application/json" },
                    JSON.stringify(data.objects[id - 1]));
            });
        }
    }

    return mockServer;
});
