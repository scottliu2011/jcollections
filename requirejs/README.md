# 在RequireJS中使用collections-js

要加载`collections.js`集合库，我们需要这样定义main.js：

```javascript
require(['../collections'], function(collections) {
	console.log('hello RequireJS');

    var arrayList = new collections.ArrayList();
    arrayList.add('hello', 'world');
    console.log(arrayList.toString());

    document.getElementById('stat').innerHTML = 'It works!';
});
```