# 在RequireJS中使用jcollections

要加载**jcollections.js**集合库，我们需要这样定义main.js：

```javascript
require(['../jcollections'], function(jcollections) {
	console.log('hello RequireJS');

    var arrayList = new jcollections.ArrayList();
    arrayList.add('hello', 'world');
    console.log(arrayList.toString());

    document.getElementById('stat').innerHTML = 'It works!';
});
```