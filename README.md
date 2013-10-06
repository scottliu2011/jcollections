# jcollections

**jcollections**是一个可以简化数据操作、提高开发效率的集合类框架，接口简单，容易上手；在API方面，它汲取了Java集合中优秀的设计思想，同时也增添了一些新的特性，最大程度上方便开发人员的使用。

该框架由两部分组成：

**jcollections.js**：集合类，提供了几种常用的集合类，这个库文件可直接引入到页面，也可作为一个独立的模块按需加载，
支持**RequireJS**、**Sea.js**及**Node.js**环境。

**jcollections.util.js**：工具库，提供了基于集合框架的模板操作类和本地存储类，
**它依赖于jcollections.js**。

## 引入集合函数库

### 1.页面单独引入：

```html
<script type="text/javascript" src="jcollections.js"></script>
```

### 2.作为模块引入：

在Sea.js或RequireJS中作为模块按需加载，都需要**require**函数。

在**Sea.js**中：

```javascript
define(function(require, exports, module) {
	var jcollections = require('./jcollections');
	//todo
});
```

在**RequireJS**中略有不同：

```javascript
require(['./jcollections'], function(jcollections) {
	//todo
});
```

### 3.在Node.js中引入：

首先使用**npm**命令在线安装**jcollections**模块：

```
npm install jcollections
```

然后使用**require**指令，把模块包含进来：

```javascript
var jcollections = require('jcollections');
//todo
```

## 创建实例

所有集合类都封装在**jcollections**包内，创建类实例时需要加包名：

```javascript
var list = new jcollections.ArrayList();
```

为了简化开发人员的工作，避免每次都输入多余的包名，jcollections提供了exports机制，将集合类引出到全局范围：

```javascript
jcollections.exports('*');								//导出所有集合类
//or
jcollections.exports('ArrayList'[, 'LinkedList'[, ...]]);//导出一到多个集合类
```

然后可以直接创建实例：

```javascript
var list = new ArrayList();
```

这种方式在简单的应用中比较实用，如果是大型项目不推荐使用，这会污染全局变量，
更好的方式是调用**run**方法，这里推荐使用下面两种方式：

第一种方式，使用**this**代替包名：

```javascript
jcollections.run(function() {
	var aryList = new this.ArrayList([1, 2, 3]);
	console.log(aryList + '');
	var lnkList = new this.LinkedList(aryList);
	console.log(lnkList + '');
});
```

第二种方式，类型前面不用加任何前缀，不同的是，需要在函数参数列表中事先声明类型：

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

**create**方法可以完成和构造函数相同的功能，在提示功能较好的IDE中，这样也许会很方便。

## API介绍

### ArrayList：

ArrayList是一种具有数组存储结构的集合，它是一种**List**类型，它的最上层是**Collection**类。

构造函数，可以创建一个空集合，或者传递一个数组，创建一个含有指定数组元素的集合，也可以传递一个**Collection**类型的集合对象，创建一个含有指定集合元素的新实例
（这里的**Collection**类型对象指的是**ArrayList**、**LinkedList**、**HashSet**类型实例，下同）：

```javascript
var list = new ArrayList();
//or
var list = new ArrayList([...]); 
//or
var list = new ArrayList(Collection);
```

**add**方法，向集合中添加一到多个元素：

```javascript
list.add('hello');
list.add('JavaScript', 'world');
```

**addAll**方法，添加指定集合对象中的所有元素：

```javascript
list.addAll(Collection);
```

**clear**方法，移除集合中所有元素：

```javascript
list.clear();
```

**contains**方法，返回一个布尔值，表示集合中是否存在指定元素：

```javascript
var isContains = list.contains('hello');
```

**get**方法，返回指定位置的元素：

```javascript
var elem = list.get(0);
```

**indexOf**，返回指定元素第一次出现在集合中的位置索引，如果元素不存在则返回-1：

```javascript
var index = list.indexOf('JavaScript');
```

**insert**方法，向集合中指定位置插入一到多个元素：

```javascript
list.insert(1, 'a');
list.insert(2, 'really', 'powerful');
```

**insertAll**方法，向集合中指定位置插入指定集合对象中的所有元素：

```javascript
list.insertAll(3, Collection);
```

**isEmpty**方法，返回一个布尔值，表示集合是否为空：

```javascript
var isEmpty = list.isEmpty();
```

**iterator**方法，返回一个迭代器对象，可以选择性地传递一个索引值，表示从指定位置开始迭代：

```javascript
var iter = list.iterator();
//or
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

**lastIndexOf**方法，返回指定元素最后一次出现在集合中的位置索引，如果元素不存在则返回-1：

```javascript
var lastIndex = list.lastIndexOf('JavaScript');
```

**removeAt**方法，移除指定位置的元素并返回这个元素：

```javascript
var elem = list.removeAt(0);
```

**removeElement**方法，移除集合中第一次出现的指定元素，返回一个布尔值，表示是否移除成功：

```javascript
var success = list.removeElement('hello');
```

**removeRange**方法，移除指定的开始位置到指定的结束位置的所有元素，包括开始位置，但不包括结束位置，该方法返回移除元素组成的数组：

```javascript
var ary = list.removeRange(1, 3);
```

**set**方法，重新设置指定位置的元素，并返回替换前的旧值：

```javascript
var old = list.set(3, 'js');
```

**size**方法，返回集合元素的个数：

```javascript
var size = list.size();
```

**toArray**方法，返回含有集合数据的数组：

```javascript
var ary = list.toArray();
```

**toString**方法，返回含有集合数据的字符串：
```javascript
var str = list.toString();
```

最后，一个特殊的**defineEquals**方法：

在上面介绍**contains**时，其实涉及到了元素的比较，默认是比较基本类型的值或对象类型的引用，也可以自定义比较函数，例如集合中添加的是person对象元素，如果名称相同则认为是同一个人，就可以定义：

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

LinkedList是一种具有双向链表存储结构的集合，它也是一种**List**类型，它的最上层是**Collection**类。

构造函数，可以创建一个空链表，也可以选择传递一个**Collection**类型对象，
创建一个含有指定集合元素的链表。

```javascript
var list = new LinkedList();
//or
var list = new LinkedList(Collection);
```

一些与ArrayList功能相同的方法：

**add**、**addAll**、**clear**，**contains**，**get**，
**indexOf**，**insert**、**insertAll**，**isEmpty**，**lastIndexOf**，
**removeAt**，**removeElement**，**set**，**size**，**toArray**，**toString**

对于这些方法，将不再介绍，这里主要介绍LinkedList独特的方法。

**addFirst**方法，在链表头部添加一个指定元素：

```javascript
list.addFirst(3);
```

**addLast**方法，在链表尾部添加一个指定元素：

```javascript
list.addLast(5);
```

**getFirst**方法，返回链表头部元素：

```javascript
var elem = list.getFirst();
```

**getLast**方法，返回链表尾部元素：

```javascript
var elem = list.getLast();
```

**removeFirst**方法，移除链表头部元素并返回已移除的元素：

```javascript
var elem = list.removeFirst();
```

**removeLast**方法，移除链表尾部元素并返回已移除的元素：

```javascript
var elem = list.removeLast();
```

**removeFirstOccurrence**方法，移除链表中第一次出现的指定元素：

```javascript
var success = list.removeFirstOccurrence('hello');
```

**removeLastOccurrence**方法，移除链表中最后一次出现的指定元素：

```javascript
var success = list.removeLastOccurrence('hello');
```

LinkedList中的**iterator**方法比较特殊，它还可以倒序迭代：

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

HashSet是一种无重复元素的无序集合，它是一种**Set**类型，它的最上层是**Collection**类。

构造函数，可以创建一个空的无序集合,也可以选择传递一个**Collection**类型对象，
创建一个含有指定集合元素的无序集合。

```javascript
var set = new HashSet();
//or
var set = new HashSet(Collection);
```

一些与ArrayList功能相同的方法：

**add**、**addAll**、**clear**，**contains**，
**isEmpty**，**size**，**toArray**，**toString**，**iterator**

对于这些方法，这里也不再介绍了。

**remove**方法，移除指定元素：

```javascript
var success = set.remove('hello');
```

在HashSet中，**defineEquals**方法比较重要，
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

### HashMap：

HashMap是一种具有键值对映射关系的映射表，它是一种**Map**类型。

构造函数，可以创建一个空的映射表，也可以传递一个**Map**类型的对象，创建一个含有指定映射表元素的新实例：

```javascript
var map = new HashMap();
//or
var map = new HashMap(Map);
```

**clear**，**isEmpty**，**size**，**toString**，这几个方法也不再介绍。

**containsKey**方法，返回一个布尔值，表示映射表中是否包含指定键：

```javascript
var isContainsKey = map.containsKey('hello');
```

**containsValue**方法，返回一个布尔值，表示映射表中是否包含指定值：

```javascript
var isContainsValue = map.containsValue('world');
```

**entrySet**方法，返回映射表键值对组成的无序集合：

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

**get**方法，返回指定键对应的值：

```javascript
var value = map.get('hello');
```

**keySet**方法，返回映射表键组成的无序集合：

```javascript
var set = map.keySet();

var iter = set.iterator();
while (iter.hasNext()) {
	var key = iter.next();
	console.log(map.get(key));
}
```

**put**方法，向映射表中添加一个键值对：

```javascript
map.put('hello', 'world');
```

**putAll**方法，将指定映射表中的元素合并进当前表中：

```javascript
map.putAll(Map);
```

**remove**方法，移除指定键所对应的键值对：

```javascript
map.remove('hello');
```

### Arrays：

Arrays是一个操作数组的工具类，包含以下几个方法：

**asList**方法，将指定的数组或一到多个值转变为ArrayList实例：

```javascript
var aryList = Arrays.asList(['hello', 'world']);
//or
var aryList = Arrays.asList('hello', 'world');
```

**binarySearch**方法，对指定有序数组进行二分查找，调用时需传入数组及查找目标，
如果数组中是复杂对象，还需要传入对象比较函数：

```javascript
var objAry = [
	{id:1, name:'bill'},
	{id:2, name:'steve'},
	{id:3, name:'scott'},
	{id:4, name:'john'},
	{id:5, name:'tom'}
];
var position = Arrays.binarySearch(objAry, {id:4, name:'john'}, function(a, b) {
	return a.id - b.id;
});
```

**binarySearchRange**方法，对指定有序数组指定范围进行二分查找，需传入起始位置和结束位置，
包括起始位置，不包括结束位置：

```javascript
var position = Arrays.binarySearch(objAry, 1, 4, {id:4, name:'john'}, function(a, b) {
	return a.id - b.id;
});
```

**copyOf**方法，从指定数组起始位置开始，复制指定长度的元素：

```javascript
var subAry = Arrays.copyOf(ary, 3);
```

**copyOfRange**方法，复制指定数组内指定范围的元素，需要指定起始位置和结束位置，
返回的结果集中包括起始位置元素，但不包括结束位置元素：

```javascript
var subAry = Arrays.copyOfRange(ary, 1, 3);
```

**equals**方法，比较两个指定数组是否相等，需要指定两个数组，如果数组内是复杂对象，
还需要传入对象equals函数：

```javascript
var objAry0 = [
	{id:1, name:'bill'},
	{id:2, name:'steve'},
	{id:3, name:'scott'}
];
var objAry1 = [
	{id:1, name:'bill'},
	{id:2, name:'steve'},
	{id:3, name:'scott'}
];
var isEquals = Arrays.equals(objAry0, objAry1, function(a, b) {
	return a.id === b.id && a.name === b.name;
});
```

**fill**方法，用指定元素填充指定数组：

```javascript
Arrays.fill(ary, 'hello');
```

**fillRange**方法，用指定元素填充指定数组的指定范围，包括起始位置，不包括结束位置：

```javascript
Arrays.fillRange(ary, 1, 3, 'hello');
```

**sort**方法，对指定数组排序，如果数组内是复杂对象，需要传入对象比较函数：

```javascript
var objAry = [
	{id:1, name:'bill', toString: function() {return '1:bill';}},
	{id:4, name:'john', toString: function() {return '4:john';}},
	{id:2, name:'steve', toString: function() {return '2:steve';}},
	{id:5, name:'tom', toString: function() {return '5:tom';}},
	{id:3, name:'scott', toString: function() {return '3:scott';}}
];
var sortedAry = Arrays.sort(objAry, function(a, b) {
	return a.id - b.id;
});
```

**sortRange**方法，对指定数组指定范围排序，包括起始位置，不包括结束位置：

```javascript
var sortedAry = Arrays.sort(objAry, 1, 4, function(a, b) {
	return a.id - b.id;
});
```

### Collections：

Collections是一个操作集合对象的工具类，包含以下几个方法：

**max**方法，返回指定集合中最大的元素，如果集合中是复杂对象，还需要传入对象比较函数：

```javascript
var list = new ArrayList();
list.add({id:1, name:'soctt', toString:function() {return '1:scott';}});
list.add({id:3, name:'steve', toString:function() {return '3:steve';}});
list.add({id:4, name:'john', toString:function() {return '4:john';}});
list.add({id:2, name:'bill', toString:function() {return '2:bill';}});

var max = Collections.max(list, function(a, b) {
	return a.id - b.id;
});//4:john
```

**min**方法，返回指定集合中最小的元素，如果集合中是复杂对象，还需要传入对象比较函数：

```javascript
var min = Collections.min(list, function(a, b) {
	return a.id - b.id;
});//1:scott
```

**sort**方法，对List进行排序，如果List中是复杂对象，还需要传入对象比较函数：

```javascript
Collections.sort(list, function(a, b) {
	return a.id - b.id;
});
```

**binarySearch**方法，对有序List进行二分查找，如果List中是复杂对象，还需要传入对象比较函数：

```javascript
var index = Collections.binarySearch(list, {id:3, name:'steve'}, function(a, b) {
	return a.id - b.id;
});
```

**replaceAll**方法，将List中的指定元素全部替换为新元素：

```javascript
list.defineEquals(function(a, b) {
	return a.id === b.id && a.name === b.name;
});
var oldElem = {id:4, name:'john', toString:function() {return '4:john';}};
var newElem = {id:0, name:'tom', toString:function() {return '0:tom';}};

Collections.replaceAll(list, oldElem, newElem);
```

**reverse**方法，将List元素反转：

```javascript
Collections.reverse(list);
```

### Template：

Template是一个集合模板类，包含在jcollections.util.js中，依赖于jcollections.js。

创建实例，可选择传入模板组件id或模板字符串内容：

```javascript
var tpl = new Template();
//or
var tpl = new Template('tpl');
//or
var tpl = Template.create();
//or
var tpl = Template.create('tpl');
```

**read**方法，如果创建实例时没有指定组件id或模板字符串内容，调用此方法可读取指定模板：

```javascript
var tpl = tpl.read('tpl');
//or
var tpl = tpl.read('<div><#= title #></div>');
```

一个模板组件一般包含在一个script标签内：

```
<script id="tpl" type="text/template">
	<#= title #>:
	<ol>
		<# for (var i = 0; i < list.size(); i++) { #>
				<# var person = list.get(i); #>
				<li>
					<#= person.name + ' : ' + person.age + ' years old' #>
				</li>
		<# } #>
	</ol>
</script>
```

**compile**方法，将指定数据集和模板集合，转译成HTML组件：

```javascript
var data = new HashMap();
data.put('title', 'students');//put title
var list = new ArrayList();
list.add({id:0, name:'scott', age:15});
list.add({id:1, name:'bill', age:16});
list.add({id:2, name:'jobs', age:17});
data.put('list', list);//put list

var tpl = tpl.compile(data);
```

**getHtml**方法，返回转译后的HTML内容：

```javascript
var html = tpl.getHtml();
```

**render**方法，将HTML内容渲染到指定的视图中：

```javascript
tpl.render('viewId');
```

Template支持链式调用，所以可以像下面这样使用：

```javascript
var html = Template.create('tpl')
				.compile(data)
				.getHtml();
//or
Template.create('tpl')
		.compile(data)
		.render('viewId');
```

### Storage：

Storage是一个本地存储类，包含在jcollections.util.js中，依赖于jcollections.js。

首先是几个静态属性或方法：

**isSupported**属性，一个布尔值，表示是否支持本地存储：

```javascript
var isSupported = Storage.isSupported;
```

**turnSessionMode**方法，转换为sessionStorage存储模式（默认是localStorage模式）：

```javascript
Storage.turnSessionMode();
```

**turnLocalMode**方法，转换为localStorage存储模式：

```javascript
Storage.turnLocalMode();
```

**saveItem**方法，存储一个键值对：

```javascript
Storage.saveItem('hello', 'world');
```

**getItem**方法，根据指定键获取其值：

```javascript
var value = Storage.getItem('hello');
```

**hasItem**方法，返回一个布尔值，表示是否存在指定键所对应的值：

```javascript
var has = Storage.hasItem('hello');
```

**delItem**方法，移除指定键对应的值：

```javascript
Storage.delItem('hello');
```

**delItems**方法，根据过滤函数移除多个键值对
（该方法内部有容错机制，过滤函数只需针对指定结构进行逻辑处理，无需考虑无关的数据结构）：

```javascript
Storage.delItems(function(key, value) {
	return Storage.fromJSON(value).name === 'jack';
});
```

**clear**方法，清空本地存储：

```javascript
Storage.clear();
```

**toJSON**方法，将对象转为JSON字符串：

```javascript
var json = Storage.toJSON({id:1, name:'jack'});
```

**fromJSON**方法，将JSON字符串转为对象：

```javascript
var obj = Storage.fromJSON('{"id":1, "name":"jack"}');
```

**isJSONFormat**方法，传入一个字符串，返回一个布尔值，表示该字符串是否为JSON格式：

```javascript
var isJSON = Storage.isJSONFormat('{"id":1, "name":"jack"}');
```

下面是实例方法：

首先是创建实例：

```javascript
var store = new Storage();
//or
var store = Storage.create();
```

**defineToStore**方法，定义存储数据时的转换规则：

```javascript
store.defineToStore(function(value) {
	return Storage.toJSON(value);
});
```

**defineFromStore**方法，定义获取数据时的转换规则：

```javascript
store.defineFromStore(function(json) {
	return Storage.fromJSON(json);
});
```

**saveItems**方法，保存多项数据：

```javascript
var data = new HashMap();
data.put('coder', {name:'jack', age:'30', salary:300});
data.put('guarder', {name:'tom', age:'40', salary:200});
data.put('cleaner', {name:'john', age:'45', salary:100});
store.saveItems(data);
```

**getItems**方法，根据过滤函数获取多条数据
（同样的，这里只需关心要获取的数据特定的数据结构，无关的数据结构都会被过滤掉）：

```javascript
var resultMap = store.getItems(function(key, value) {
	return Storage.fromJSON(value).age > 30;
});

//修改数据然后存储
var iter = resultMap.entrySet().iterator();
while (iter.hasNext()) {
	var entry = iter.next();
	var record = entry.getValue();
	record.salary += 50;
	console.log('age: ' + record.age + ', current salary: ' + record.salary);
}
store.saveItems(resultMap);
```

### <a href="http://scottliu2011.github.com/collections/demo" target="_blank">演示地址</a>

