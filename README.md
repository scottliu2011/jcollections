# jcollections

jcollections是一个可以简化数据操作、提高开发效率的集合类框架。它接口简单，容易上手；在API方面，jcollections汲取了Java集合中优秀的设计思想，同时也增添了一些新的特性，最大程度上方便开发人员的使用。

该框架由两部分组成：

`jcollections.js`：集合类，提供了几种常用的集合类，这个库文件可直接引入到页面，也可作为一个独立的模块按需加载，支持RequireJS、Sea.js及Node.js环境。

`jcollections.util.js`：工具库，提供了基于集合框架的模板操作类和本地存储类，它依赖于jcollections.js这个集合函数库。

## 引入集合函数库

### 1.页面单独引入：

```html
<script type="text/javascript" src="jcollections.js"></script>
```

### 2.作为模块引入：

在Sea.js或RequireJS中作为模块按需加载，都需要`require`函数。

在Sea.js中：

```javascript
var jcollections = require('./jcollections');
```

在RequireJS中略有不同：

```javascript
require(['./jcollections'], function(jcollections) {
	//todo
});
```

### 3.在Node.js中引入：

首先使用`npm`命令在线安装`jcollections`模块：

```
npm install jcollections
```

然后使用`require`指令，把模块包含进来：

```javascript
var jcollections = require('jcollections');
```

## 创建实例

所有集合类都封装在`jcollections`包内，创建类实例时需要加包名：

```javascript
var list = new jcollections.ArrayList();
```

为了简化开发人员的工作，避免每次都输入多余的包名，jcollections提供了exports机制，将集合类引出到全局范围：

```javascript
jcollections.exports('*');								//导出所有集合类
or
jcollections.exports('ArrayList'[, 'LinkedList'[, ...]]);//导出一到多个集合类
```

然后可以直接创建实例：

```javascript
var list = new ArrayList();
```

这种方式在简单的应用中比较实用，如果是大型项目就不太好了，因为这样会污染全局变量，难以协作开发，所以推荐使用下面两种方式，有效地避免对全局变量的污染：

第一种方式，使用`this`代替包名：

```javascript
jcollections.run(function() {
	var aryList = new this.ArrayList([1, 2, 3]);
	console.log(aryList + '');
	var lnkList = new this.LinkedList(aryList);
	console.log(lnkList + '');
});
```

第二种方式，不用任何前缀，不同的是，需要在函数参数列表中事先声明类型：

```javascript
jcollections.run(function(ArrayList, LinkedList) {
	var aryList = new ArrayList(['hello', 'world']);
   	console.log(aryList + '');

   	var lnkList = new LinkedList(aryList);
   	console.log(lnkList + '');
});
```

使用第二种方式时，可在参数列表里随意声明一到多个类型，也不用考虑声明顺序，只要声明的类型存在于jcollections包内，就可以正确运行。

另外，每个集合类都提供了一个静态方法，用于创建实例，所以也可以这样写：

```javascript
var aryList = ArrayList.create();//or ArrayList.create([1, 2, 3]);
var lnkList = LinkedList.create();//or LinkedList.create(aryList);
```

`create`方法可以完成和构造函数相同的功能，在提示功能较好的IDE中，这样也许会很方便。

## API介绍

### ArrayList：

ArrayList是一种具有数组存储结构的集合，它是一种`List`类型，隶属于`Collection`。

构造函数，可以创建一个空集合，或者传递一个数组，创建一个含有指定数组元素的集合，也可以传递一个`Collections`类型的集合对象，创建一个含有指定集合元素的新实例
（这里的`Collection`类型对象指的是ArrayList、LinkedList、HashSet类型实例，下同）：

```javascript
var list = new ArrayList();
or
var list = new ArrayList([...]); 
or
var list = new ArrayList(Collection);
```

`add`方法，向集合中添加一到多个元素：

```javascript
list.add('hello');
list.add('JavaScript', 'world');
```

`addAll`方法，添加指定集合对象中的所有元素：

```javascript
list.addAll(Collection);
```

`clear`方法，移除集合中所有元素：

```javascript
list.clear();
```

`contains`方法，返回一个布尔值，表示集合中是否存在指定元素：

```javascript
var isContains = list.contains('hello');
```

`get`方法，返回指定位置的元素：

```javascript
var elem = list.get(0);
```

`indexOf`，返回指定元素第一次出现在集合中的位置索引，如果元素不存在则返回-1：

```javascript
var index = list.indexOf('JavaScript');
```

`insert`方法，向集合中指定位置插入一到多个元素：

```javascript
list.insert(1, 'a');
list.insert(2, 'really', 'powerful');
```

`insertAll`方法，向集合中指定位置插入指定集合对象中的所有元素：

```javascript
list.insertAll(3, Collection);
```

`isEmpty`方法，返回一个布尔值，表示集合是否为空：

```javascript
var isEmpty = list.isEmpty();
```

`iterator`方法，返回一个迭代器对象，可以选择性地传递一个索引值，表示从指定位置开始迭代：

```javascript
var iter = list.iterator();
or
var iter = list.iterator(3);			//从索引为3的位置开始迭代

while (iter.hasNext()) {
	var elem = iter.next();				//获取当前元素
	if (elem === 'world') {
		iter.remove();					//移除当前元素
	} else if (elem === 'JavaScript') {
		iter.set('JAVASCRIPT');			//重置当前元素
	}
}
```

`lastIndexOf`方法，返回指定元素最后一次出现在集合中的位置索引，如果元素不存在则返回-1：

```javascript
var lastIndex = list.lastIndexOf('JavaScript');
```

`removeAt`方法，移除指定位置的元素并返回这个元素：

```javascript
var elem = list.removeAt(0);
```

`removeElement`方法，移除集合中第一次出现的指定元素，返回一个布尔值，表示是否移除成功：

```javascript
var success = list.removeElement('hello');
```

`removeRange`方法，移除指定的开始位置到指定的结束位置的所有元素，包括开始位置，但不包括结束位置，该方法返回移除元素组成的数组：

```javascript
var ary = list.removeRange(1, 3);
```

`set`方法，重新设置指定位置的元素，并返回替换前的旧值：

```javascript
var old = list.set(3, 'js');
```

`size`方法，返回集合元素的个数：

```javascript
var size = list.size();
```

`toArray`方法，返回含有集合数据的数组：

```javascript
var ary = list.toArray();
```

`toString`方法，返回含有集合数据的字符串：
```javascript
var str = list.toString();
```

最后，一个特殊的`defineEquals`方法：

在上面介绍`contains`时，其实涉及到了元素的比较，默认是比较基本类型的值或对象类型的引用，也可以自定义比较函数，例如集合中添加的是person对象元素，如果名称相同则认为是同一个人，就可以定义：

```javascript
list.defineEquals(function(person0, person1) {
	return person0.name === person1.name;
});

list.add({name:'bill'});
list.add({name:'steve'});
list.add({name:'scott'});

var isContains = list.contains({name:'scott'});
```

### LinkedList：

LinkedList是一种具有双向链表存储结构的集合，它也是一种`List`类型，隶属于`Collection`。

构造函数，可以创建一个空链表，也可以选择传递一个`Collection`类型对象，创建一个含有指定集合元素的链表。

```javascript
var list = new LinkedList();
or
var list = new LinkedList(Collection);
```

一些与ArrayList功能相同的方法：

`add`、`addAll`、`clear`，`contains`，`get`，

`indexOf`，`insert`、`insertAll`，`isEmpty`，`lastIndexOf`，

`removeAt`，`removeElement`，`set`，`size`，`toArray`，`toString`

对于这些方法，将不再介绍，这里主要介绍LinkedList独特的方法。

`addFirst`方法，在链表头部添加一个指定元素：

```javascript
list.addFirst(3);
```

`addLast`方法，在链表尾部添加一个指定元素：

```javascript
list.addLast(5);
```

`getFirst`方法，返回链表头部元素：

```javascript
var elem = list.getFirst();
```

`getLast`方法，返回链表尾部元素：

```javascript
var elem = list.getLast();
```

`removeFirst`方法，移除链表头部元素并返回已移除的元素：

```javascript
var elem = list.removeFirst();
```

`removeLast`方法，移除链表尾部元素并返回已移除的元素：

```javascript
var elem = list.removeLast();
```

`removeFirstOccurrence`方法，移除链表中第一次出现的指定元素：

```javascript
var success = list.removeFirstOccurrence('hello');
```

`removeLastOccurrence`方法，移除链表中最后一次出现的指定元素：

```javascript
var success = list.removeLastOccurrence('hello');
```

LinkedList中的`iterator`方法比较特殊，它还可以倒序迭代：

```javascript
var iter = list.iterator(list.size());
while (iter.hasPrevious()) {
	var elem = iter.previous();
	if (elem === 'hello') {
		iter.set('world');
	}
	if (elem === 'js') {
		iter.remove();
	}
}
```

### HashSet：

HashSet是一种无重复元素的无序集合，它是一种`Set`类型，隶属于`Collection`

构造函数，可以创建一个空的无序集合,也可以选择传递一个`Collection`类型对象，
创建一个含有指定集合元素的无序集合。

```javascript
var set = new HashSet();
or
var set = new HashSet(Collection);
```

一些与ArrayList功能相同的方法：

`add`、`addAll`、`clear`，`contains`，

`isEmpty`，`size`，`toArray`，`toString`，`iterator`

对于这些方法，这里也不再介绍了。

`remove`方法，移除指定元素：

```javascript
var success = set.remove('hello');
```

HashSet中，`defineEquals`方法比较重要，
如果定义了比较规则，在向集合中添加元素时，集合会根据这个规则判定是否重复：

```javascript
list.defineEquals(function(person0, person1) {
	return person0.name === person1.name;
});

list.add({name:'bill'});
list.add({name:'steve'});
list.add({name:'scott'});

list.add({name:'scott'});//元素重复，添加失败
```

### HashMap

HashMap是一种具有键值对映射关系的映射表，它是一种`Map`类型。

构造函数，可以创建一个空的映射表，也可以传递一个`Map`类型的对象，创建一个含有指定映射表元素的新实例：

```javascript
var map = new HashMap();
or
var map = new HashMap(Map);
```

`clear`，`isEmpty`，`size`，`toString`，这几个方法也不再介绍。

`containsKey`方法，返回一个布尔值，表示映射表中是否包含指定键：

```javascript
var isContainsKey = map.containsKey('hello');
```

`containsValue`方法，返回一个布尔值，表示映射表中是否包含指定值：

```javascript
var isContainsValue = map.containsValue('world');
```

`entrySet`方法，返回映射表键值对组成的无序集合：

```javascript
var set = map.entrySet();

var iter = set.iterator();
while (iter.hasNext()) {
	var entry = iter.next(),
		key = entry.getKey(),
		value = entry.getValue();
	if (key === 'hello') {
		entry.setValue('WORLD');
	}
}
```

`get`方法，返回指定键对应的值：

```javascript
var value = map.get('hello');
```

`keySet`方法，返回映射表键组成的无序集合：

```javascript
var set = map.keySet();

var iter = set.iterator();
while (iter.hasNext()) {
	var key = iter.next();
	console.log(map.get(key));
}
```

`put`方法，向映射表中添加一个键值对：

```javascript
map.put('hello', 'world');
``

`putAll`方法，将指定映射表中的元素合并进当前表中：

```javascript
map.putAll(Map);
```

`remove`方法，移除指定键所对应的键值对：

```javascript
map.remove('hello');
```

### Arrays

### Collections

### Template

### Storage

### <a href="http://scottliu2011.github.com/collections/demo" target="_blank">演示地址</a>

