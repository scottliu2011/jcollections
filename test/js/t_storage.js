imports('collections.*');

Storage.turnSessionMode();//转为session storage模式

Storage.saveItem('test', 'hello');

console.log(Storage.getItem('test'));//hello

Storage.turnLocalMode();//转为local storage模式

var store = Storage.create();
store.defineToStore(function(value) {//定义外部结构到内部值的转换
	return Storage.toJSON(value);
});
store.defineFromStore(function(json) {//定义内部值到外部结构的转换
	return Storage.fromJSON(json);
});

var data = new HashMap();

data.put('title', {name:'john', age:'40'});
data.put('content', {name:'tom', age:'30'});

store.saveItems(data);//存多个键值对

var items = store.getItems(function(key, value) {//根据过滤器获取多个键值对 如遇异常 则不匹配
	return Storage.fromJSON(value).age > 30;
});
var iter = items.entrySet().iterator();
while (iter.hasNext()) {
	var entry = iter.next();
	console.log(entry.getKey());
	console.log(entry.getValue());
}

store.delItems(function(key, value) {//根据过滤器删除多个键值对 value是字符串类型
	//return key === 'test';
	if (Storage.isJSONFormat(value)) {
		return Storage.fromJSON(value).name === 'steve';
	}
	return false;
});

/*
store.delItems(function(key, value) {//删除所有
	return true;
});*/