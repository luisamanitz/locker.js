let fs = require('fs'),

	Tracker = function (user) {// TODO use settings
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


		/**
		 * Set new item
		 * @param {Object} item
		 */
		this.set = (item) => {// TODO add id
			let now;

			if (!item || !item.value || !item.description) {
				error('Item Structure falsch.');

				return this;
			}

			now = Date.now();

			item.createTime = now;

			if (!item.time) {
				item.time = now;
			}

			cache.items.push(item);
			
			return this;
		};





		this.save = () => {
			let cacheString = JSON.stringify(cache);
			fs.writeFileSync(filePath, cacheString);
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