jcollections.exports('Arrays');

//asList
var list = Arrays.asList(1,2,3);
console.log('asList result: ' + list);//[1,2,3]

var ary = [1,2,3,4,5,6,7,8,9,10];
//binarySearch
console.log('binarySearch result: ' + Arrays.binarySearch(ary, 7));//6
//binarySearchRange
console.log('binarySearchRange result: ' + Arrays.binarySearchRange(ary, 4, 8, 6));//5

var objAry = [
	{id:1, name:'bill'},
	{id:2, name:'steve'},
	{id:3, name:'scott'},
	{id:4, name:'john'},
	{id:5, name:'tom'}
];

var position = Arrays.binarySearch(objAry, {id:4, name:'john'}, function(a, b) {
	return a.id - b.id;
});

console.log('complex binarySearch result: ' + position);//3

//copyOf
console.log('after copyOf: ' + Arrays.copyOf(ary, 3));//[1,2,3]
//copyOfRange
console.log('after copyOfRange: ' + Arrays.copyOfRange(ary, 3, 6));//[4,5,6]

var ary0 = [1,2,3];
var ary1 = [1,2,3];
console.log('is equals? ' + Arrays.equals(ary0, ary1));//true

var objAry0 = [
	{id:1, name:'bill'},
	{id:2, name:'steve'},
	{id:3, name:'scott'}
];
var objAry1 = [
	{id:1, name:'bill'},
	{id:2, name:'steve'},
	{id:3, name:'scott'}
];
console.log('is equals(complex condition)? ' + Arrays.equals(objAry0, objAry1, function(a, b) {
	return a.id === b.id && a.name === b.name;
}));//true

var ary2 = [1,5,2,3,6,9,8];
//sort
console.log('after sort: ' + Arrays.sort(ary2));//1,2,3,5,6,8,9

var objAry2 = [
	{id:1, name:'bill', toString: function() {return '1:bill';}},
	{id:4, name:'john', toString: function() {return '4:john';}},
	{id:2, name:'steve', toString: function() {return '2:steve';}},
	{id:5, name:'tom', toString: function() {return '5:tom';}},
	{id:3, name:'scott', toString: function() {return '3:scott';}}
];

var sortedAry = Arrays.sort(objAry2, function(a, b) {
	return a.id - b.id;
});
console.log('after sort asc(complex condition)? ' + sortedAry);

var sortedAry = Arrays.sort(objAry2, function(a, b) {
	return  b.id - a.id;
});
console.log('after sort desc(complex condition)? ' + sortedAry);