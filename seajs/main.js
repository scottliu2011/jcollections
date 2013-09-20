define(function(require, exports, module) {
    var collections = require('../collections');
    collections.imports('ArrayList');
    var arrayList = new ArrayList();
    arrayList.add('hello');
    console.log(arrayList.toArray());
});