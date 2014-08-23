define([
    'sinon', 'config',
    // mock data:
    'json!mock/user.json',
    'json!mock/income_category.json',
    'json!mock/outcome_category.json',
    'json!mock/income.json',
    'json!mock/outcome.json'
], function(Sinon, config,
    userMock, incomeCategoryMock, outcomeCategoryMock, incomeMock, outcomeMock) {

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

            this.configureModelResponses('user', userMock);
            this.configureModelResponses('income_category', incomeCategoryMock);
            this.configureModelResponses('outcome_category', outcomeCategoryMock);
            this.fs.autoRespond = true;
            if (config.fakeServerDelay) {
                this.fs.autoRespondAfter = config.fakeServerDelay;
            }
        },

        configureModelResponses: function(resource, mockData) {
            // configure model list resource
            this.fs.respondWith("GET", this.urlRoot + '/' + resource + '/',
                function(xhr) {
                    xhr.respond(200, { "Content-Type": "application/json" },
                        JSON.stringify(mockData));
                });

            // configure single model item resource
            var url = _.escapeRegExp(this.urlRoot + '/' + resource + '/') + '(\\d+)';
            this.fs.respondWith("GET", new RegExp(url, 'i'),
                function (xhr, id) {
                    xhr.respond(200,
                        { "Content-Type": "application/json" },
                        JSON.stringify(mockData.objects[id - 1])
                    );
            });
        }
    }

    return mockServer;
});
