define(function(require, exports, module) {
    console.log('hello SeaJS');

    //collections.imports('ArrayList');

    var collections = require('../jcollections');
    var arrayList = new collections.ArrayList();
    arrayList.add('hello', 'world');
    console.log(arrayList.toString());

    document.getElementById('stat').innerHTML = 'It works!';
});