imports('collections.*');

var list = new ArrayList();

console.log('0.---------------------------------');

console.log('init: ' + list.toString());//[]
console.log('isEmpty? ' + list.isEmpty());//true
console.log('size: ' + list.size());//0

console.log('1.---------------------------------');

list.add('hello');
list.add('world');
list.add('scott');
list.add(1, 2, 3);//add three elements.

console.log('after add: ' + list.toString());//[hello, world, scott, 1, 2, 3]
console.log('get 0: ' + list.get(0));//hello
console.log('contains soctt? ' + list.contains('scott'));//true
console.log('indexOf soctt? ' + list.indexOf('scott'));//2

console.log('2.---------------------------------');

list.insert(3, -1, 0);//insert two elements at the specified positon that index is 3.
console.log('after insert: ' + list.toString());//[hello, world, scott, -1, 0, 1, 2, 3]

list.removeAt(2);
console.log('after removeAt: ' + list.toString());//[hello, world, -1, 0, 1, 2, 3]

list.removeElement('world');
console.log('after removeElement: ' + list.toString());//[hello, -1, 0, 1, 2, 3]

list.set(1, 1);
console.log('after set: ' + list.toString());//[hello, 1, 0, 1, 2, 3]
console.log('indexOf 1? ' + list.indexOf(1));//1
console.log('lastIndexOf 1? ' + list.lastIndexOf(1));//3

console.log('3.---------------------------------');

list.removeRange(0, 2);
console.log('after removeRange: ' + list.toString());//[0, 1, 2, 3]

list.clear();
console.log('after clear: ' + list.toString());//[]
console.log('isEmpty? ' + list.isEmpty());//true
console.log('size: ' + list.size());//0

console.log('4.---------------------------------');

var list2 = new ArrayList();
list2.add(1, 2, 3);

var list3 = new LinkedList();
list3.add(4);
list3.add(5);
list3.add(6);

var set = new HashSet();
set.add('hello');

list.addAll(list2);
list.addAll(list3);
console.log('after addAll: ' + list.toString());//[1, 2, 3, 4, 5, 6]

list.insertAll(0, set);
console.log('after insertAll: ' + list.toString());//[hello, 1, 2, 3, 4, 5, 6]

console.log('5.---------------------------------');

var iter = list.iterator();
while (iter.hasNext()) {
	var elem = iter.next();
	if (elem === 6) {
		iter.remove();
	}
	if (elem === 'hello') {
		iter.set(0);
	}
}

console.log('after iterator: ' + list.toString());//[0, 1, 2, 3, 4, 5]

console.log('___iterator from the specified positon: index:2');
var iter2 = list.iterator(2);
while (iter2.hasNext()) {
	var elem = iter2.next();
	console.log(elem);
}
console.log('___iterator is over');

console.log('6.---------------------------------');

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