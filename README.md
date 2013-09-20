# collections.js
### 简单高效的集合类框架
---

collections.js是一个简化数据操作、提高开发效率的集合类框架，接口简单，容易上手；在API方面，collections.js汲取了Java集合中优秀的设计思想，同时也增添了一些新的特性，最大程度上方便开发人员的使用。

该框架由两部分组成：

`collections.js`：提供了几种常用的集合类，可直接引入到页面，也可作为一个独立的模块按需加载，支持`RequireJS`、`SeaJS`及`NodeJS`环境

`collections.util.js`：工具库，提供了基于集合框架的模板操作类和本地存储类，它依赖`collections.js`

## 快速上手
### 引入函数库
	<script type="text/javascript" src="collections.js"></script>

### 编写代码
所有集合类都封装在`collections`包内，创建类实例时需要加包名：

	var list = new collections.ArrayList();
为了简化开发人员的使用，collections.js提供了imports机制，将集合类导入到全局范围：
	
	imports('collections.*');            //imports all classes
	or
	imports('collections.ArrayList');    //imports the specified class
如此一来，创建实例就变得简单多了：
	
	var list = new ArrayList();
另外，每个集合类都提供了一个静态方法，用于创建实例，所以也可以这样写：
	
	var list = ArrayList.create();
在提示功能较好的IDE中，这样会节省不少时间。
## 循序渐进
下面可以介绍一下常用的操作：
	
	list.add('hello', 'world', 'javascript');
`add`方法用于向集合添加一到多个元素。
	
	list.insert(2, 'the', 'powerful');
`insert`方法用于在指定位置插入一到多个元素。

可以使用`contains`查看集合中是否存在指定元素：
	
	list.contains('hello');
该方法返回true或false,表示元素是否存在。在调用该方法时涉及到元素的比较，默认是比较基本类型的值或对象类型的引用，也可以自定义比较函数，例如：

```javascript
list.defineEquals(function(person0, person1) {
	return person0.name === person1.name;
});
```
