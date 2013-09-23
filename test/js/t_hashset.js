console.log('0.---------------------------------------------------------------------');
imports('collections.*');
var set = new HashSet();
console.log('init: ' + set.toString());//[]
console.log('isEmpty? ' + set.isEmpty());//true
console.log('size: ' + set.size());//0

console.log('1.---------------------------------------------------------------------');
set.add('hello', 'world');
set.add('hello');//add again
set.add('world');//add again
console.log('after add: ' + set.toString());//[hello,world]
console.log('isEmpty? ' + set.isEmpty());//false
console.log('size: ' + set.size());//2

console.log('2.---------------------------------------------------------------------');
set.remove('world');
console.log('after remove world: ' + set.toString());//[hello]
console.log('contains world? ' + set.contains('world'));//false

console.log('3.---------------------------------------------------------------------');
var set2 = new HashSet();
set2.add('bill', 'scott');
var list = new ArrayList();
list.add(1, 2);
var list2 = new LinkedList();
list2.add(3, 4);
set.addAll(set2);
set.addAll(list);
set.addAll(list2);
console.log('after addAll: ' + set.toString());//[hello,bill,scott,1,2,3,4]
set.clear();
console.log('after clear: ' + set.toString());//[]
console.log('isEmpty? ' + set.isEmpty());//true
console.log('size: ' + set.size());//0

console.log('4.---------------------------------------------------------------------');
var person = {
	name:'john', 
	age:40, 
	toString: function() {
		return person.name + '=>' + person.age;
	}
};
set.add(person);
set.add(person);//add again
console.log('after add person object: ' + set.toString());//[john=>40]
console.log('contains person object? ' + set.contains(person));//true
set.remove(person);
console.log('after remove person object: ' + set.toString());//[]

console.log('5.---------------------------------------------------------------------');
var Teacher = function(id, name) {
	this.id = id;
	this.name = name;
	this.toString = function() {
		return this.id + '=>' + this.name;
	};
};
var teacher = new Teacher('007', 'teacher wang');
set.add(teacher);
set.add(teacher);//add again
console.log('after add teacher: ' + set.toString());//[007=>teacher wang]
console.log('contains teacher object? ' + set.contains(teacher));//true
set.remove(teacher);
console.log('after remove teacher object: ' + set.toString());//[]

console.log('6.---------------------------------------------------------------------');
set.add(1, 2, 3, 4, 5, 6);
var iter = set.iterator();
while (iter.hasNext()) {
	var elem = iter.next();
	if (elem === 2) {
		iter.remove();
		console.log(elem + ' is removed.');
	}
}
console.log('after iterator: ' + set.toString());//[1,3,4,5,6]

console.log('7.---------------------------------------------------------------------');
set.clear();
set.defineEquals(function(elem0, elem1) {
	return elem0.id === elem1.id;
});
set.add({id:1, name:'hello'});
set.add({id:1, name:'world'});
console.log('after defineEquals and add: ' + set.toString());//[]


//重点测试add remove contains方法
//定义equals易出错
