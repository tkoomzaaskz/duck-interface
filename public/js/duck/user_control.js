var UsersControl = {
    data: null,
    fetchData: function() {
        $.ajax({
            type: "GET",
            dataType: "json",
            context: this,
            async: false,
            url: url + "user/"
        }).done(function(response) {
            this.data = response.objects;
            this.setAll(true);
        });
    },
    getData: function() {
        if (this.data == null) {
            this.fetchData();
        }
        return this.data;
    },
    setAll: function(chosen) {
        for (var index = 0; index < this.data.length; ++index) {
            this.data[index].chosen = chosen;
        }
    },
    setChosen: function(username_list) {
        for (var index = 0; index < this.data.length; ++index) {
            this.data[index].chosen = ($.inArray(this.data[index].first_name, username_list) > -1);
        }
    },
    getChosen: function() {
        return $(this.getData()).map(function() {
            return (this.chosen) ? this.first_name : null;
        });
    }
};
