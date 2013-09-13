imports('collections.HashMap');

console.log('0.---------------------------------');

var map = new HashMap();

console.log('init: ' + map.toString());

console.log('is empty? ' + map.isEmpty());

console.log('size: ' + map.size());

console.log('1.---------------------------------');

map.put('one', 'hello');
map.put('two', 'world');

console.log('after put: ' + map.toString());

console.log('is empty? ' + map.isEmpty());

console.log('size: ' + map.size());

console.log('2.---------------------------------');

var map2 = new HashMap();
map2.put(1, 'black');
map2.put(2, 'white');

map.putAll(map2);

console.log(map.entrySet());

console.log('after putAll: ' + map.toString());

console.log('map values: ' + map.values());

console.log('size: ' + map.size());

console.log('3.---------------------------------');

console.log('get(1): ' + map.get(1));

console.log('contains key(1)?: ' + map.containsKey(1));

console.log('contains value(black)?: ' + map.containsValue('black'));

console.log('contains key(3)?: ' + map.containsKey(3));

console.log('contains value(red)?: ' + map.containsValue('red'));

console.log('4.---------------------------------');

map.remove(2);

console.log('after remove: ' + map.toString());

console.log('size: ' + map.size());

console.log('4.---------------------------------');

console.log('===== start to iterator =====');

var keySet = map.keySet();

console.log('key set: ' + keySet.toString());

var keyIter = keySet.iterator();
while (keyIter.hasNext()) {
	var key = keyIter.next();
	console.log(key + ':' + map.get(key));
}

console.log('===== iterator is over =====');

console.log('4.---------------------------------');

console.log('===== start to iterator =====');

var entrySet = map.entrySet();

console.log('entry set: ' + entrySet.toString());

var entryIter = entrySet.iterator();
while (entryIter.hasNext()) {
	var entry = entryIter.next();
	
	console.log(entry);

	if (entry.getKey() === 1) {
		entry.set('white');
	}
}

console.log('===== start to iterator =====');

console.log('after entry::set: ' + map.toString());