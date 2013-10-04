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

在Sea.js或RequireJS中作为模块按需加载，都需要`require`函数。比如在Sea.js中：

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
jcollections.exports('*');//导出所有集合类
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

## [演示地址](http://scottliu2011.github.com/collections/demo)

## API介绍

### ArrayList：

创建实例，可以创建一个空集合，或者传递一个数组，创建一个含有数组元素的集合：

```javascript
var list = new ArrayList();
or
var list = new ArrayList([...]); 
```

创建好实例后，可以使用`add`方法向集合内部添加元素，值得一提的是，`add`方法可以向集合添加一到多个元素，在某些场景霞还是挺方便的：

```javascript
list.add('hello');
list.add('JavaScript', 'world');
```

有些时候，我们还是少不了要在指定位置插入一些元素的，这时，可以调用`insert`方法，轻松完成这
项任务，`insert`方法和`add`方法一样，可以操作一到多个元素：

```javascript
list.insert(1, 'a');
list.insert(2, 'really', 'powerful');
```

当向结合中添加元素后，集合的状态就会改变，下面两个方法用于显示集合的状态：

```javascript
var isEmpty = list.isEmpty();
var size = list.size();
```

`isEmpty`方法返回true或false，表示集合是否为空；`size`方法返回集合中元素的个数。

`contains`方法也是一个比较实用的功能，用于查看集合中是否存在指定元素：

```javascript
var isContains = list.contains('hello');
```

该方法返回true或false，表示元素是否存在。

还可以调用`indexOf`及`lastIndexOf`查看元素第一次或最后一次出现在集合中的位置索引：

```javascript
var index = list.indexOf('JavaScript');
var lastIndex = list.lastIndexOf('JavaScript');
```

如果想获取某个位置的元素，可以使用`get`方法：

```javascript
var elem = list.get(0);
```

当我们不需要某些元素，要移除它们时，可以选择使用`removeAt`和`removeElement`分别用指定索引和指定元素值的方式移除集合中的元素：

```javascript
var elem = list.removeAt(0);
var isRemoved = list.removeElement('hello');
```

`removeAt`返回刚刚移除的元素，`removeElement`返回true或false，表示移除操作是否成功。

接下来是集合的迭代，获取一个集合的迭代器对象，可以调用`iterator`方法，该方法有一个可选参数，用于从指定索引位置开始迭代：

```javascript
var iter = list.iterator();
or
var iter = list.iterator(3);
```

获取到迭代器之后，就可以像下面这样对集合进行迭代了：

```javascript
while (iter.hasNext()) {
	var elem = iter.next();
	if (elem === 'world') {
		iter.remove();
	} else if (elem === 'JavaScript') {
		iter.set('JAVASCRIPT');
	}
}
```

使用迭代功能很方便，可以完成元素的输出、重置、删除等操作，相对于直接面向存储结构操作来说，简单高效，无需担心数据的误操作。

最后，介绍一些高级部分的应用：

`addAll`方法用于向集合中添加指定的集合内的数据，`insertAll`方法用于在集合指定位置插入指定的集合内的数据，参数必须是`Collection`的子类，必须是`ArrayList`、`LinkedList`、`HashSet`其中之一的对象实例：

```javascript
list.addAll(arrayList);
list.addAll(linkedList);
list.addAll(hashSet);
list.insertAll(0, arrayList);
list.insertAll(1, linkedList);
list.insertAll(2, hashSet);
```

在上面调用`contains`时，其实涉及到了元素的比较，默认是比较基本类型的值或对象类型的引用，也可以自定义比较函数，例如集合中添加的是person对象元素，如果名称相同则认为是同一个人，就可以定义：

```javascript
list.defineEquals(function(person0, person1) {
	return person0.name === person1.name;
});

list.add({name:'bill'});
list.add({name:'steve'});
list.add({name:'scott'});

list.contains({name:'scott'});
```

### LinkedList：

创建实例，可以创建一个空链表，也可以选择传递一个`Collection`类型对象（该对象可以是ArrayList实例、LinkedList实例、HashSet实例，下同），创建一个含有指定集合元素的链表。

```javascript
var list = new LinkedList();
or
var list = new LinkedList(Collection);
```

`add`方法，用于向链表添加一到多个元素：

```javascript
list.add('hello', 'world');
```

`insert`方法，用于在指定位置插入一到多个元素：

```javascript
list.insert(1, 'javascript', 'html', 'css');
```

`addFirst`方法，用于在链表头部添加一个元素：

```javascript
list.addFirst(3);
```

`addLast`方法，用于在链表尾部添加一个元素：

```javascript
list.addLast(5);
```

