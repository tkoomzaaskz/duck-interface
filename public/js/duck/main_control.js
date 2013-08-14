define([],
function() {

    'use strict';

    var MainControl = {
        currency: 'zł',
        getCurrency: function() {
            return this.currency;
        },
        parseListIntoTree: function(categories) {
            if (categories == null)
                return null;
    
            var itemsByID = [];
    
            categories.objects.forEach(function(item) {
                itemsByID.push({
                    data: {title: item.name},
                    attr: {id: item.id},
                    parentID: item.parent_id || null,
                    state: item.state
                });
            });
    
            itemsByID.forEach(function(item) {
                if(item.parentID !== null) {
                    if (typeof itemsByID[item.parentID].children === "undefined") {
                        itemsByID[item.parentID].children = [];
                    }
                    itemsByID[item.parentID].children.push(item);
                }
            });
    
            var roots = itemsByID.filter(function(item) {
                return item.parentID === null;
            });
    
            itemsByID.forEach(function(item) {
                delete item.parentID;
            });
    
            return roots;
        }
    };

    return MainControl;

});
