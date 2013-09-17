imports('collections.*');
	
var list = new LinkedList();

list.add('hello');
list.add('world');

console.log(list.toArray());

list.insert(1, 'scott');

console.log(list.toArray());

imports('collections.ArrayList');
var list2 = new ArrayList();
list2.add('123');
list2.add('456');

list.addAll(list2);
console.log(list.toArray());

list.insertAll(2, list2);
console.log(list.toArray());

console.log(list.indexOf('456'));

console.log(list.size());

list.clear();

console.log(list.toArray());

list.add('123');
list.add('456');
list.add('789');
list.add('abc');
list.add('def');
list.add('xyz');
list.add('asd');
var iter = list.iterator();
while (iter.hasNext()) {
	var elem = iter.next();
	console.log('iter:' + elem);
	if (elem === '789') {
		iter.remove();
	}
}

console.log(list.toArray());

var iter2 = list.iterator(list.size());
while (iter2.hasPrevious()) {
	console.log(iter2.previous());
}

Collections.reverse(list);

console.log(list.toArray());