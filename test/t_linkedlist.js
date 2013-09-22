imports('collections.*');
	
var list = new LinkedList();

console.log('0.---------------------------------');

console.log('init: ' + list.toString());//[]
console.log('isEmpty? ' + list.isEmpty());//true
console.log('size: ' + list.size());//0

console.log('1.---------------------------------');

list.add('hello');
list.add('world');
list.add('scott');

console.log('after add: ' + list.toString());//[hello, world, scott]
console.log('get 0: ' + list.get(0));//hello
console.log('contains world? ' + list.contains('world'));//true
console.log('indexOf soctt? ' + list.indexOf('scott'));//2

console.log('2.---------------------------------');

list.insert(1, 'bill');
console.log('after insert: ' + list.toString());//[hello, bill, world, scott]

list.removeAt(2);
console.log('after removeAt: ' + list.toString());//[hello, bill, scott]

list.removeElement(hello);
console.log('after removeElement: ' + list.toString());//[bill, scott]

/*
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

imports('collections.Collections');

Collections.reverse(list);

console.log(list.toArray());

list.add('abc');

Collections.replaceAll(list, 'abc', 100);

console.log(list.toArray());*/
