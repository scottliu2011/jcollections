require(['../jcollections'], function(jcollections) {
	console.log('hello RequireJS');

    var aryList = new jcollections.ArrayList();
    aryList.add('hello', 'world');
    console.log(aryList + '');

    jcollections.run(function() {
		var list = new this.ArrayList([1, 2, 3]);
		console.log(list + '');
	});

    jcollections.run(function(ArrayList, LinkedList) {
    	var aryList = new ArrayList();
	   	aryList.add('hello', 'world');
	   	console.log(aryList + '');

	   	var lnkList = new LinkedList(aryList);
	   	console.log(lnkList + '');
	});

    console.log('It Works!');
	document.getElementById('stat').innerHTML = 'It works!';
});