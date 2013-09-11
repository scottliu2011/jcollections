imports('collections.ArrayList');
	
var list = new ArrayList();

list.defineEquals(function(elem0, elem1) {
	//return elem0.name === elem1.name;
	return elem0 === elem1;
});

list.add('hello');
list.add('world');
list.add('test iterator remove');
list.add('scott');
console.log('before remove: ' + list.toArray());//['hello', 'world', 'test iterator remove', 'scott']

console.log('contains soctt? ' + list.contains('scott'));

var iter = list.iterator();
while (iter.hasNext()) {
	//console.log(iter.next());
	var elem = iter.next();
	if (elem === 'test remove') {
		iter.remove();
	}
}

console.log('after remove: ' + list.toArray());//['hello', 'world', 'scott']

list.remove(0);
console.log(list.toArray());//['world', 'scott']

list.removeElement('world');
console.log(list.toArray());//['scott']

list.add('one', 'two', 'three');
console.log(list.toArray());//['scott', 'one', 'two', 'three']

list.removeRange(1, 3);
console.log(list.toArray());//['soctt', 'three']

list.clear();
console.log(list.toArray());//[]

list.add('123');
list.add('456');
list.add('789');
list.add('abc');
list.add('def');
var iter = list.iterator(2);
while (iter.hasNext()) {
	var elem = iter.next();
	console.log('iter:' + elem);
	if (elem === 'abc') {
		iter.remove();
	}
}
console.log(list.toArray());