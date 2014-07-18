define(['config', 'tools/logger', 'sinon'],
function(config, logger) {

    var users = {"objects": [{"username": "pmc", "fullname": "Paul McCartney", "id": 1, "email": "paul.mccartney@beatles.com"}, {"username": "jl", "fullname": "John Lennon", "id": 2, "email": "john.lennon@beatles.com"}, {"username": "gh", "fullname": "George Harrison", "id": 3, "email": "george.harrison@beatles.com"}, {"username": "rs", "fullname": "Ringo Starr", "id": 4, "email": "ringo.starr@beatles.com"}]};

    var fs = {

        urlRoot: config.urlRoot,

        init: function() {
            // don't initialize fake server if disabled in configuration
            if (!config.useFakeServer) {
                return;
            }

            var fs = sinon.fakeServer.create();
            var urlRoot = this.urlRoot;

            fs.xhr.addFilter(function(method, url, async, username, password) {
                if (!(new RegExp(urlRoot)).test(url)) {
                    return true;
                }
            });
            fs.xhr.useFilters = true;
  
            fs.respondWith("GET", this.urlRoot + "/user/",
                [200, { "Content-Type": "application/json" },
                JSON.stringify(users) ]);

            fs.respondWith("GET", this.urlRoot + "/user/1",
                [200, { "Content-Type": "application/json" },
                JSON.stringify(users.objects[0])]);

            fs.respondWith("GET", this.urlRoot + "/user/2",
                [200, { "Content-Type": "application/json" },
                JSON.stringify(users.objects[1])]);

            fs.respondWith("GET", this.urlRoot + "/user/3",
                [200, { "Content-Type": "application/json" },
                JSON.stringify(users.objects[2])]);

            fs.respondWith("GET", this.urlRoot + "/user/4",
                [200, { "Content-Type": "application/json" },
                JSON.stringify(users.objects[3])]);

            fs.autoRespond = true;

            logger.log('fake server initialized');
        }
    }

    return fs;

});
