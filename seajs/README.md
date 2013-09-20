# 在seaJS中使用collections.js

首先使用``require``命令导入集合模块：
	
	var collections = require('../collections');

然后就可以创建新的集合类实例了：
	
	var list = new collections.ArrayList();

或者

	var list = collections.ArrayList.create();

collections.js为seaJS提供了imports函数，可以将所需集合类导入到全局范围：

	collections.imports('*');//将所有集合模块导入全局范围

如果只希望按需导入，只需指定类名即可：
	
	collections.imports('ArrayList');

导入之后，编写代码就变得轻松了许多：
	
	var list = new ArrayList();

或者

	var list = ArrayList.create();	