let Tracker = require('./tracker'),

	MyTracker = new Tracker('Luisa');


MyTracker
	.set({
		value: -70,
		description: 'test2'
	})
	.set({
		value: -70,
		description: 'test2'
	})
	.save();