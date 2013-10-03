require(['../jcollections'], function(collections) {
	console.log('hello RequireJS');

    //collections.imports('ArrayList');

    var arrayList = new collections.ArrayList();
    arrayList.add('hello', 'world');
    console.log(arrayList.toString());

    document.getElementById('stat').innerHTML = 'It works!';
});