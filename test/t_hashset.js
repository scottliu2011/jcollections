imports('collections.HashSet');

// var set = HashSet();
// var set = new HashSet();
var set = HashSet.create();

console.log('0.---------------------------------');

console.log('init: ' + set.toString());

console.log('isEmpty? ' + set.isEmpty());

console.log('size: ' + set.size());

console.log('1.---------------------------------');

set.add('hello');
set.add('world');

console.log('after add: ' + set.toString());

console.log('isEmpty? ' + set.isEmpty());

console.log('size: ' + set.size());

console.log('2.---------------------------------');

set.remove('hello');

console.log('after remove hello: ' + set.toString());

console.log('size: ' + set.size());

console.log('3.---------------------------------');

set.remove('world');

console.log('after remove world: ' + set.toString());

console.log('size: ' + set.size());

console.log('4.---------------------------------');

set.add('scott');
set.add('jack');

console.log('after add again: ' + set.toString());

console.log('size: ' + set.size());

console.log('5.---------------------------------');

var person = {name:'john', age:'40'};
var book = {name:'javascript', price:'99'};

set.add(person);
set.add(book);

console.log('after add objects: ' + set.toString());

console.log('contains person object? ' + set.contains(person));
console.log('contains book object? ' + set.contains(book));

console.log('size: ' + set.size());

console.log('6.---------------------------------');

set.remove(person);

console.log('after remove person object: ' + set.toString());

console.log('size: ' + set.size());

console.log('7.---------------------------------');

set.remove(book);

console.log('after remove book object: ' + set.toString());

console.log('size: ' + set.size());


console.log('8.---------------------------------');

set.add('break');
set.add('milk');

var student = {id:2013, name:'xiaoming'};

set.add(student);

var Teacher = function(id, name) {
	this.id = id;
	this.name = name;	
};
var teacher = new Teacher(2013, 'teacher wang');

set.add(teacher);

console.log('after add simple and complex object: ' + set.toString());

console.log('size: ' + set.size());

console.log('9.---------------------------------');

console.log('===== start to iterator =====');

var iter = set.iterator();
while (iter.hasNext()) {
	var elem = iter.next();
	console.log(elem);

	if (elem === student) {
		console.log('removing student object...');
		iter.remove();
	}
}

console.log('===== iterator is over =====');

console.log('after remove and student object: ' + set.toString());

console.log('size: ' + set.size());

console.log('10.---------------------------------');

set.clear();

console.log('after clear: ' + set.toString());

console.log('isEmpty? ' + set.isEmpty());

console.log('size: ' + set.size());