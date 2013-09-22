imports('collections.*');
	
var list = new LinkedList();

console.log('0.---------------------------------------------------------------------');

console.log('init: ' + list.toString());//[]
console.log('isEmpty? ' + list.isEmpty());//true
console.log('size: ' + list.size());//0

console.log('1.---------------------------------------------------------------------');

list.add('hello');
list.add('world');
list.add('scott');
list.add(1, 2, 3);

console.log('after add: ' + list.toString());//[hello, world, scott, 1, 2, 3]
console.log('get 1: ' + list.get(1));//world
console.log('getFirst: ' + list.getFirst());//hello
console.log('getLast: ' + list.getLast());//3
console.log('contains world? ' + list.contains('world'));//true
console.log('indexOf soctt? ' + list.indexOf('scott'));//2
console.log('lastIndexOf soctt? ' + list.lastIndexOf('scott'));//2

console.log('2.---------------------------------------------------------------------');

list.insert(1, 'bill');
list.insert(4, -1, 0);
console.log('after insert: ' + list.toString());//[hello, bill, world, scott, -1, 0, 1, 2, 3]

list.removeAt(2);
console.log('after removeAt: ' + list.toString());//[hello, bill, scott, -1, 0, 1, 2, 3]

list.removeElement('hello');
console.log('after removeElement: ' + list.toString());//[bill, scott, -1, 0, 1, 2, 3]

list.addFirst('first');
list.addLast('last');
console.log('after addFirst and addLast: ' + list.toString());//[first, bill, scott, -1, 0, 1, 2, 3, last]

list.removeFirst();
list.removeLast();
console.log('after removeFirst and removeLast: ' + list.toString());//[bill, scott, -1, 0, 1, 2, 3]

console.log('3.---------------------------------------------------------------------');

list.clear();
console.log('after clear: ' + list.toString());//[]
console.log('isEmpty? ' + list.isEmpty());//true
console.log('size: ' + list.size());//0

console.log('4.---------------------------------------------------------------------');

var list2 = new ArrayList();
list2.add('a', 'b', 'c');

var list3 = new LinkedList();
list3.add('x', 'y', 'z');

var set = new HashSet();
set.add(7, 8, 9);

list.addAll(list2);
list.addAll(list3);
console.log('after addAll: ' + list.toString());//[a, b, c, x, y, z]

list.insertAll(1, set);
console.log('after insertAll: ' + list.toString());//[a, 7, 8, 9, b, c, x, y, z]

console.log('5.---------------------------------------------------------------------');

var iter = list.iterator();
while (iter.hasNext()) {
	var elem = iter.next();
	if (elem === 7) {
		iter.remove();
	}
	if (elem === 'z') {
		iter.set(0);
	}
}

console.log('after iterator: ' + list.toString());//[a, 8, 9, b, c, x, y, 0]

console.log('___iterator from the specified positon: index:2');
var iter2 = list.iterator(2);
while (iter2.hasNext()) {
	var elem = iter2.next();
	console.log(elem);
}
console.log('___iterator is over');

console.log('6.---------------------------------------------------------------------');

list.clear();

list.defineEquals(function(elem0, elem1) {
	return elem0.name === elem1.name;
});

var person0 = {name:'bill', company:'Microsoft'};
var person1 = {name:'steve', company:'Apple'};

list.add(person0, person1);

console.log(list.get(0));
console.log(list.get(1));

console.log('contains bill? ' + list.contains({name:'bill'}));
console.log('indexOf steve: ' + list.indexOf({name:'steve'}));
