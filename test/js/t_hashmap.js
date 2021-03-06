jcollections.exports('HashMap');

var map = new HashMap();

console.log('0.------------------------------------------------------------------');
console.log('init: ' + map);//{}
console.log('is empty? ' + map.isEmpty());//true
console.log('size: ' + map.size());//0

console.log('1.------------------------------------------------------------------');
map.put(0, 'hello');
console.log('get by 0: ' + map.get(0));//hello

var person = {
	id: '007',
	name: 'soctt',
	toString: function() {
		return '007:scott';
	}
};
map.put('person', person);
console.log('get by person: ' + map.get('person'));//007:scott

var key = {
	id: '008',
	name: 'scott',
	toString: function() {
		return "this is scott's key";
	}
};
var value = {
	langs: 'chinese english',
	addr: 'Beijing HaiDian',
	friends: ['john', 'tom', 'jack'],
	toString: function() {
		return "this is scott's details"
	}
};
map.put(key, value);
console.log('get by object key: ' + map.get(key));//this is scott's details. 

console.log('map: ' + map);
console.log("map's keys: " + map.keySet());

console.log('contains key? ' + map.containsKey(key));
console.log('contains value? ' + map.containsValue(value));

console.log('2.------------------------------------------------------------------');

console.log('___start keySet iterator');
var set = map.keySet().iterator();
while (set.hasNext()) {
	var key = set.next();
	var value = map.get(key);
	console.log(key + " = " + value);
}
console.log('___keySet iterator is over');

console.log('___start entrySet iterator');
var iter = map.entrySet().iterator();
while (iter.hasNext()) {
	console.log(iter.next() + '');
}
console.log('___entrySet iterator is over');

var map2 = new HashMap();
map2.put(1, 'one');
map2.put(2, 'two');
map2.put(3, 'three');
map.putAll(map2);
console.log('after putAll: ' + map);