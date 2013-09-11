imports('collections.LinkedList');
	
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