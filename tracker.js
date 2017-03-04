let fs = require('fs'),

	Tracker = function (user) {
		let cache,
			error = function (msg) {
				console.log(msg)
			},
			filePath,
			initState;


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

		console.log(cache);

		/**
		 * Set new item
		 * @param {Object} item
		 */
		this.set = (item) => {
			if (item && item.value && item.description) {
				cache.items.push(item);

				return this;
			}

			error('falscher Item Typ');
			
			return this;
		};





		this.save = () => {

			return this;
		};






		this.get = () => {}

		this.edit = () => {
			return this;
		}

		this.getUser = () => {
			return this;
		}
	};


module.exports = Tracker;