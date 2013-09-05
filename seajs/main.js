define(function(require, exports, module) {
    var ArrayList = require('ArrayList');
    var arrayList = new ArrayList();
    arrayList.add('hello');
    console.log(arrayList.toArray());
});