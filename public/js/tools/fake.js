define(['config', 'tools/logger', 'sinon'],
function(config, logger) {

    var users = {"objects": [
        {"username": "pmc", "first_name": "Paul", "last_name": "McCartney", "id": 1, "email": "paul.mccartney@beatles.com"},
        {"username": "jl", "first_name": "John", "last_name": "Lennon", "id": 2, "email": "john.lennon@beatles.com"},
        {"username": "gh", "first_name": "George", "last_name": "Harrison", "id": 3, "email": "george.harrison@beatles.com"},
        {"username": "rs", "first_name": "Ringo", "last_name": "Starr", "id": 4, "email": "ringo.starr@beatles.com"}
    ]};

    var income_categories = {"objects": [ {"parent_id": null, "id": 35, "name": "arms trade"}, {"parent_id": 35, "id": 36, "name": "trips"}, {"parent_id": null, "id": 37, "name": "tribute"}, {"parent_id": null, "id": 38, "name": "music"}, {"parent_id": 38, "id": 39, "name": "recordings"}, {"parent_id": 38, "id": 40, "name": "live shows"}, {"parent_id": 35, "id": 41, "name": "nuclear weapons"}, {"parent_id": null, "id": 42, "name": "investments"}, {"parent_id": 42, "id": 43, "name": "gold & silver"}, {"parent_id": 42, "id": 44, "name": "debentures"}, {"parent_id": 35, "id": 46, "name": "production"}, {"parent_id": 42, "id": 54, "name": "real estate"}]};

    var outcome_categories = {"objects": [{"parent_id": null, "id": 1, "name": "food"}, {"parent_id": null, "id": 2, "name": "bills"}, {"parent_id": null, "id": 3, "name": "electronics"}, {"parent_id": null, "id": 4, "name": "entertainment"}, {"parent_id": 4, "id": 5, "name": "travels"}, {"parent_id": 1, "id": 6, "name": "bread"}, {"parent_id": 4, "id": 7, "name": "bar"}, {"parent_id": 1, "id": 8, "name": "fruits & vegs"}, {"parent_id": 4, "id": 9, "name": "press"}, {"parent_id": null, "id": 10, "name": "transport"}, {"parent_id": 1, "id": 11, "name": "lunch"}, {"parent_id": null, "id": 12, "name": "books"}, {"parent_id": 16, "id": 13, "name": "chemistry"}, {"parent_id": null, "id": 14, "name": "hygiene"}, {"parent_id": 16, "id": 15, "name": "household goods"}, {"parent_id": null, "id": 16, "name": "house"}, {"parent_id": 2, "id": 17, "name": "rent"}, {"parent_id": 2, "id": 18, "name": "internet"}, {"parent_id": 16, "id": 19, "name": "repairs"}, {"parent_id": null, "id": 20, "name": "presents"}, {"parent_id": 16, "id": 21, "name": "tools"}, {"parent_id": 4, "id": 22, "name": "cinema"}, {"parent_id": null, "id": 23, "name": "footwear"}, {"parent_id": null, "id": 24, "name": "clothing"}, {"parent_id": 2, "id": 25, "name": "water"}, {"parent_id": 16, "id": 26, "name": "flowers"}, {"parent_id": 2, "id": 27, "name": "gas"}, {"parent_id": 2, "id": 28, "name": "electricity"}, {"parent_id": 2, "id": 29, "name": "phones"}, {"parent_id": 49, "id": 30, "name": "meds"}, {"parent_id": 1, "id": 31, "name": "meat"}, {"parent_id": 1, "id": 32, "name": "takeaway"}, {"parent_id": 14, "id": 33, "name": "cosmetics"}, {"parent_id": null, "id": 34, "name": "education"}, {"parent_id": 4, "id": 45, "name": "theatre"}, {"parent_id": 1, "id": 47, "name": "alcohol"}, {"parent_id": 14, "id": 48, "name": "barber"}, {"parent_id": null, "id": 49, "name": "health"}, {"parent_id": 49, "id": 50, "name": "doctor"}, {"parent_id": 4, "id": 51, "name": "collectibles"}, {"parent_id": 1, "id": 52, "name": "fish"}, {"parent_id": 20, "id": 53, "name": "handout"}, {"parent_id": 20, "id": 55, "name": "souvenirs"}]}

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
