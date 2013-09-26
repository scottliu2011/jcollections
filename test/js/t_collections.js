imports('collections.*');

var list = new ArrayList();
list.add({id:1, name:'soctt', toString:function() {return '1:scott';}});
list.add({id:3, name:'steve', toString:function() {return '3:steve';}});
list.add({id:4, name:'john', toString:function() {return '4:john';}});
list.add({id:2, name:'bill', toString:function() {return '2:bill';}});

var max = Collections.max(list, function(a, b) {
	if (a.id === b.id) {
		return 0;
	}
	return a.id < b.id ? -1 : 1;
});
console.log('max: ' + max);//4:john

var min = Collections.min(list, function(a, b) {
	if (a.id === b.id) {
		return 0;
	}
	return a.id < b.id ? -1 : 1;
});
console.log('min: ' + min);//1:scott

Collections.sort(list, function(a, b) {
	if (a.id === b.id) {
		return 0;
	}
	return a.id < b.id ? -1 : 1;
});
console.log('after sort: ' + list);//1:scott,2:bill,3:steve,4:john

Collections.sort(list, function(a, b) {
	if (a.id === b.id) {
		return 0;
	}
	return a.id > b.id ? -1 : 1;
});
console.log('after sort desc: ' + list);//4:john,3:steve,2:bill,1:scott

var target = {id:3, name:'steve'};

var index = Collections.binarySearch(list, target, function(a, b) {
	if (a.id === b.id) {
		return 0;
	}
	return a.id < b.id ? -1 : 1;
});
console.log('after binarySearch: index:' + index + '=>name:' + list.get(index).name);

Collections.reverse(list);
console.log('after reverse: ' + list);

list.add({id:4, name:'john', toString:function() {return '4:john';}});
console.log('after add: ' + list);

list.defineEquals(function(a, b) {
	return a.id === b.id && a.name === b.name;
});

var oldElem = {id:4, name:'john', toString:function() {return '4:john';}};
var newElem = {id:0, name:'tom', toString:function() {return '0:tom';}};

Collections.replaceAll(list, oldElem, newElem);
console.log('after replaceAll: ' + list);
