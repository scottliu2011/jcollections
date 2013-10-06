# 在seaJS中使用jcollections

要加载**collections.js**集合库，我们需要这样定义main.js：

```javascript
define(function(require, exports, module) {
    console.log('hello SeaJS');

    var collections = require('../jcollections');
    var arrayList = new jcollections.ArrayList();
    arrayList.add('hello', 'world');
    console.log(arrayList.toString());

    document.getElementById('stat').innerHTML = 'It works!';
});
```