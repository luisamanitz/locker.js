let fs = require('fs'),

    Tracker = function (user) {// TODO use settings
        'use strict';

        let cache,
            error = function (msg) {
                console.log(msg)
            },
            filePath,
            initState,
            isValid = (item) => {
                if (!item || !item.value || !item.description) {
                    error('Item Structure falsch.');

                    return false;
                }

                return true;
            };


        // User is required
        if (!user) {
            return false;
        }

        // Create Dir
        try {
            fs.mkdirSync('./data');// TODO dir exist?
        } catch(err) {

        }

        filePath = "./data/" + user + ".json";

        initState = {
            username: user,
            idIndex: -1,
            items: []
        };

        try {
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, JSON.stringify(initState));
            }
            
        } catch(err) {
            error('Problem beim Annlegen!')
        }
        

        cache = fs.readFileSync(filePath, 'utf8');
        if (typeof cache === 'string' && cache !== '') {
            cache = JSON.parse(cache);
        }


        /**
         * Set new item
         * @param {Object} item
         */
        this.set = (item) => {// TODO add id
            let now;

            if (!isValid(item)) {
                return this;
            }

            now = Date.now();

            item.createTime = now;

            if (!item.time) {
                item.time = now;
            }

            // increment id
            item.id = cache.idIndex += 1;

            cache.items.push(item);
            
            return this;
        };

        /**
         * Save item
         * @return {self}
         */
        this.save = () => {
            let cacheString = JSON.stringify(cache);
            fs.writeFileSync(filePath, cacheString);
            return this;
        };

        /**
         * Get all items via filter
         * @param  {Object} filter
         * @return {array}
         */
        this.getAll = (filter = {id:'*'}) => {
            return cache.items;
        }

        this.getLast = (filter = {id:'*'}) => {
            let last = cache.items[cache.items.length - 1];

            //console.log(last)
            return last || false;
        }
        

        this.get = (id = -1, index = false) => {
            let check = false;

            cache.items.some((item, i) => {
                
                if (item.id === id) {

                    if (!index) {
                        check = item;
                    } else {
                        check = {
                            item: item,
                            index: i
                        }
                    }

                    return true;
                }
                
                return false;
            });

            return check;
        };


        this.edit = (item) => {
            if (!isValid(item)) {
                return false;
            }

            let originItemObj = this.get(item.id, true);

            item.editTime = Date.now();

            cache.items[originItemObj.index] = item;

            console.log(3);

            return true;
        }

        this.delete = () => {};

        this.getUser = () => {
            return this;
        }
    };

module.exports = Tracker;
