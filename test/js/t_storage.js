jcollections.exports('Storage', 'HashMap');

console.log('is Storage supported? ' + Storage.isSupported);

Storage.turnSessionMode();// turn sessionStorage mode
Storage.saveItem('test', 'hello');
console.log('sessionStorage: test=>' + Storage.getItem('test'));//hello

Storage.turnLocalMode();// turn localStorage mode
Storage.saveItem('test', 'hello');
console.log('localStorage: test=>' + Storage.getItem('test'));//hello

var store = new Storage();

store.defineToStore(function(value) {//define in rule
	return Storage.toJSON(value);
});
store.defineFromStore(function(json) {//define out rule
	return Storage.fromJSON(json);
});

var data = new HashMap();
data.put('coder', {name:'jack', age:'30', salary:300});
data.put('guarder', {name:'tom', age:'40', salary:200});
data.put('cleaner', {name:'john', age:'45', salary:100});
store.saveItems(data);//save a data map
console.log('test exists? ' + Storage.hasItem('test'));
console.log('coder exists? ' + Storage.hasItem('coder'));
console.log('guarder exists? ' + Storage.hasItem('guarder'));
console.log('cleaner exists? ' + Storage.hasItem('cleaner'));

var resultMap = store.getItems(function(key, value) {
	return Storage.fromJSON(value).age > 30;//the{test=hello} item will be ignored
});
var iter = resultMap.entrySet().iterator();//raise salary
while (iter.hasNext()) {
	var entry = iter.next();
	var record = entry.getValue();
	record.salary += 50;
	console.log('age: ' + record.age + ', current salary: ' + record.salary);
}
store.saveItems(resultMap);//save current salary

Storage.delItems(function(key, value) {
	//return key === 'coder';[delete the item that key equals 'coder']
	return Storage.fromJSON(value).name === 'jack';
	//return true;[if return true, delete all items. But call 'clear' method is better.^_^]
});
console.log('coder(jack) exists? ' + Storage.hasItem('coder'));

Storage.clear();//delete all items
console.log('test exists? ' + Storage.hasItem('test'));
console.log('guarder exists? ' + Storage.hasItem('guarder'));
console.log('cleaner exists? ' + Storage.hasItem('cleaner'));
