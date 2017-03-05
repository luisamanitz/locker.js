let Tracker = require('./index'),
	MyTracker = new Tracker('Luisa');


let lastItem = MyTracker.getLast();

console.log(lastItem);
lastItem.description = 'Editiert!';

let item = MyTracker.get(2);

item.description = 'neue Beschreibung';



let isSave = MyTracker.edit(item);
if (isSave) {
	MyTracker.save();
}
