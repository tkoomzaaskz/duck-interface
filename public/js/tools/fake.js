define(['config', 'tools/logger', 'sinon'],
function(config, logger) {

    var users = {"objects": [
        {"username": "pmc", "first_name": "Paul", "last_name": "McCartney", "id": 1, "email": "paul.mccartney@beatles.com"},
        {"username": "jl", "first_name": "John", "last_name": "Lennon", "id": 2, "email": "john.lennon@beatles.com"},
        {"username": "gh", "first_name": "George", "last_name": "Harrison", "id": 3, "email": "george.harrison@beatles.com"},
        {"username": "rs", "first_name": "Ringo", "last_name": "Starr", "id": 4, "email": "ringo.starr@beatles.com"}
    ]};

    var income_categories = {"objects": [{"parentId": null, "id": 35, "name": "arms trade"}, {"parentId": 35, "id": 36, "name": "trips"}, {"parentId": null, "id": 37, "name": "tribute"}, {"parentId": null, "id": 38, "name": "music"}, {"parentId": 38, "id": 39, "name": "recordings"}, {"parentId": 38, "id": 40, "name": "live shows"}, {"parentId": 35, "id": 41, "name": "nuclear weapons"}, {"parentId": null, "id": 42, "name": "investments"}, {"parentId": 42, "id": 43, "name": "gold & silver"}, {"parentId": 42, "id": 44, "name": "debentures"}, {"parentId": 35, "id": 46, "name": "production"}, {"parentId": 42, "id": 54, "name": "real estate"}]};

    var outcome_categories = {"objects": [{"parentId": null, "id": 1, "name": "food"}, {"parentId": null, "id": 2, "name": "bills"}, {"parentId": null, "id": 3, "name": "electronics"}, {"parentId": null, "id": 4, "name": "entertainment"}, {"parentId": 4, "id": 5, "name": "travels"}, {"parentId": 1, "id": 6, "name": "bread"}, {"parentId": 4, "id": 7, "name": "bar"}, {"parentId": 1, "id": 8, "name": "fruits & vegs"}, {"parentId": 4, "id": 9, "name": "press"}, {"parentId": null, "id": 10, "name": "transport"}, {"parentId": 1, "id": 11, "name": "lunch"}, {"parentId": null, "id": 12, "name": "books"}, {"parentId": 16, "id": 13, "name": "chemistry"}, {"parentId": null, "id": 14, "name": "hygiene"}, {"parentId": 16, "id": 15, "name": "household goods"}, {"parentId": null, "id": 16, "name": "house"}, {"parentId": 2, "id": 17, "name": "rent"}, {"parentId": 2, "id": 18, "name": "internet"}, {"parentId": 16, "id": 19, "name": "repairs"}, {"parentId": null, "id": 20, "name": "presents"}, {"parentId": 16, "id": 21, "name": "tools"}, {"parentId": 4, "id": 22, "name": "cinema"}, {"parentId": null, "id": 23, "name": "footwear"}, {"parentId": null, "id": 24, "name": "clothing"}, {"parentId": 2, "id": 25, "name": "water"}, {"parentId": 16, "id": 26, "name": "flowers"}, {"parentId": 2, "id": 27, "name": "gas"}, {"parentId": 2, "id": 28, "name": "electricity"}, {"parentId": 2, "id": 29, "name": "phones"}, {"parentId": 49, "id": 30, "name": "meds"}, {"parentId": 1, "id": 31, "name": "meat"}, {"parentId": 1, "id": 32, "name": "takeaway"}, {"parentId": 14, "id": 33, "name": "cosmetics"}, {"parentId": null, "id": 34, "name": "education"}, {"parentId": 4, "id": 45, "name": "theatre"}, {"parentId": 1, "id": 47, "name": "alcohol"}, {"parentId": 14, "id": 48, "name": "barber"}, {"parentId": null, "id": 49, "name": "health"}, {"parentId": 49, "id": 50, "name": "doctor"}, {"parentId": 4, "id": 51, "name": "collectibles"}, {"parentId": 1, "id": 52, "name": "fish"}, {"parentId": 20, "id": 53, "name": "handout"}, {"parentId": 20, "id": 55, "name": "souvenirs"}]}

    var fakeServerWrapper = {

        urlRoot: config.urlRoot,

        init: function() {
            // don't initialize fake server if disabled in configuration
            if (!config.useFakeServer) {
                return;
            }

            this.fs = sinon.fakeServer.create();
            var urlRoot = this.urlRoot;

            this.fs.xhr.useFilters = true;
            this.fs.xhr.addFilter(function(method, url, async, username, password) {
                if (!(new RegExp(urlRoot)).test(url)) {
                    return true;
                }
            });

            this.configureModelResponses('user', users);
            this.configureModelResponses('income_category', income_categories);
            this.configureModelResponses('outcome_category', outcome_categories);
            this.fs.autoRespond = true;
            logger.log('fake server initialized');
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

    return fakeServerWrapper;
});
