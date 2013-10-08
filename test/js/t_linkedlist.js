jcollections.exports('LinkedList', 'ArrayList', 'HashSet');

var list = new LinkedList();

console.log('0.---------------------------------------------------------------------');

console.log('init: ' + list);//[]
console.log('isEmpty? ' + list.isEmpty());//true
console.log('size: ' + list.size());//0

console.log('1.---------------------------------------------------------------------');

list.add('hello');
list.add('world');
list.add('scott');
list.add(1, 2, 3);

console.log('after add: ' + list);//[hello, world, scott, 1, 2, 3]
console.log('get 1: ' + list.get(1));//world
console.log('getFirst: ' + list.getFirst());//hello
console.log('getLast: ' + list.getLast());//3
console.log('contains world? ' + list.contains('world'));//true
console.log('indexOf soctt? ' + list.indexOf('scott'));//2
console.log('lastIndexOf soctt? ' + list.lastIndexOf('scott'));//2

console.log('2.---------------------------------------------------------------------');

list.insert(1, 'bill');//insert 'bill' at the specified position: index:1
list.insert(4, -1, 0);//insert -1 and 0 at the position index:4
console.log('after insert: ' + list);//[hello, bill, world, scott, -1, 0, 1, 2, 3]

list.removeAt(2);//remove element at the position index:2
console.log('after removeAt: ' + list);//[hello, bill, scott, -1, 0, 1, 2, 3]
list.removeElement('hello');
console.log('after removeElement: ' + list);//[bill, scott, -1, 0, 1, 2, 3]
list.addFirst('first');
list.addLast('last');
console.log('after addFirst and addLast: ' + list);//[first, bill, scott, -1, 0, 1, 2, 3, last]
list.removeFirst();
list.removeLast();
console.log('after removeFirst and removeLast: ' + list);//[bill, scott, -1, 0, 1, 2, 3]

console.log('3.---------------------------------------------------------------------');

list.clear();
console.log('after clear: ' + list);//[]
console.log('isEmpty? ' + list.isEmpty());//true
console.log('size: ' + list.size());//0

console.log('4.---------------------------------------------------------------------');

var list2 = new ArrayList(['a', 'b', 'c']);
var list3 = new LinkedList();
list3.add('x', 'y', 'z');
list.addAll(list2);
list.addAll(list3);
console.log('after addAll: ' + list);//[a, b, c, x, y, z]
var set = new HashSet();
set.add(7, 8, 9);
list.insertAll(1, set);
console.log('after insertAll: ' + list);//[a, 7, 8, 9, b, c, x, y, z]

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

console.log('after iterator: ' + list);//[a, 8, 9, b, c, x, y, 0]

console.log('___iterator from the specified positon: index:2');
var iter2 = list.iterator(2);
while (iter2.hasNext()) {
	console.log(iter2.next());
}
console.log('___iterator is over');

list.set(1, 'y');
list.removeFirstOccurrence('y');
list.removeLastOccurrence('y');
console.log('after remove first and last occurrence: ' + list);//[a, 9, b, c, x, 0]

console.log('6.---------------------------------------------------------------------');

list.clear();

list.defineEquals(function(elem0, elem1) {
	return elem0.id === elem1.id && elem0.name === elem1.name;
});

var Student = function(id, name) {
	this.id = id;
	this.name = name;
	this.toString = function() {
		return this.id + ' => ' + this.name;
	};
};
var student0 = new Student('001', 'john');
var student1 = new Student('002', 'tom');
list.add(student0, student1);
console.log(list.get(0) + ' & ' + list.get(0));

var student2 = new Student('001', 'john');
console.log('contains 001? ' + list.contains(student2));//true
console.log('indexOf 001: ' + list.indexOf(student2));//0

list.clear();

list.add(1,2,3,4,5,6,7,8,9);
var iter = list.iterator(9);
while (iter.hasPrevious()) {
	var elem = iter.previous();
	console.log('p: ' + elem);
	if (elem === 3) {
		iter.remove();
	}
}

console.log(list + '');