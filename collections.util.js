(function(global, undefined) {

	"use strict";

	var colletions = global.collections,
		mapLiberaryDefined = collections && collections.Map && collections.HashMap;

	if (!mapLiberaryDefined) {
		throw new Error('Map liberary is required');
	}

	var Map = colletions.Map,
		HashMap = colletions.HashMap,
		store = global.localStorage;

	function Storage() {
		if (!(this instanceof Storage)) {
			return new Storage();
		}

		this.__toStore__ = function(value){return value;};
		this.__fromStore__ = function(json){return json;};
	}
	
	/**
	 *是否支持本地存储
	 */
	Storage.isSupported = store !== undefined;

	/**
	 *启动session storage操作
	 */
	Storage.turnSessionMode = function() {
		store = global.sessionStorage;
	};
	
	/**
	 *启动local storage操作
	 */
	Storage.turnLocalMode = function() {
		store = global.localStorage;
	};

	/**
	 *存储一个键值对 value为字符串类型
	 */
	Storage.saveItem = function(key, value) {
		store.setItem(key, value);
	};

	/**
	 *根据指定key获取对应的存储值
	 */
	Storage.getItem = function(key) {
		return store.getItem(key);
	};

	/**
	 *是否含有指定项
	 */
	Storage.hasItem = function(key) {
		return !!store.getItem(key);
	}

	/**
	 *删除指定key所对应的存储项
	 */
	Storage.delItem = function(key) {
		store.removeItem(key);
	};

	/**
	 *删除多个存储项
	 */
	Storage.delItems = function(filter) {
		var match = false;
		for (var key in store) {
			try {
				match = filter(key, store[key]);
			} catch (e) {
				match = false;
			}
			
			if (match) {
				store.removeItem(key);
			}
		}
	};

	/**
	 *删除所有存储项
	 */
	Storage.clear = function() {
		store.clear();
	};

	/**
	 *将对象转换成JSON字符串
	 */
	Storage.toJSON = function(value) {
		return global.JSON.stringify(value);
	};

	/**
	 *将JSON字符串转换成对象
	 */
	Storage.fromJSON = function(json) {
		return global.JSON.parse(json);
	};

	/**
	 *是否是JSON格式
	 */
	Storage.isJSONFormat = function(str) {
		try {
			global.JSON.parse(str);
			return true;
		} catch (e) {
			return false;
		}
	};

	/**
	 *静态方法 用于创建一个Storage实例
	 */
	Storage.create = function() {
		return new Storage();
	};

	/**
	 *定义外部结构到内部值的转换函数
	 */
	Storage.prototype.defineToStore = function(toStoreFn) {
		this.__toStore__ = toStoreFn;
	};

	/**
	 *定义内部值到外部结构的转换函数
	 */
	Storage.prototype.defineFromStore = function(fromStoreFn) {
		this.__fromStore__ = fromStoreFn;
	};

	/**
	 *存储以map的形式组成的多个键值对
	 */
	Storage.prototype.saveItems = function(map) {
		if (!(map instanceof Map)) {
			throw new TypeError('not a Map instance');
		}
		var iter = map.entrySet().iterator(),
			entry,
			key,
			value;
		while (iter.hasNext()) {
			entry = iter.next();
			key = entry.getKey();
			value = this.__toStore__(entry.getValue());
			
			store.setItem(key, value);
		}
	};

	/**
	 *获取多个存储项
	 */
	Storage.prototype.getItems = function(filter) {
		var map = new HashMap(),
			match = false;
		for (var key in store) {
			if (!filter) {
				map.put(key, store[key]);
				continue;
			}

			try {
				match = filter(key, store[key]);
			} catch (e) {
				match = false;
			}
			
			if (match) {
				map.put(key, this.__fromStore__(store[key]));
			}
		}
		return map;
	};

	/**
	 *获取模板对应的操作函数
	 */
	var getFn = function(source) {
		var $ = '$' + (+ new Date),
			fn = function (dataMap) {
				var keys = [$],
					values = [[]],
					iter = dataMap.entrySet().iterator(),
					entry;
				while (iter.hasNext()) {
					entry = iter.next();
					keys.push(entry.getKey());
					values.push(entry.getValue());
				};
				return (new Function(keys, fn.$)).apply(dataMap, values).join("");
			};
		fn.$ = $ + ".push('"
				+ source.replace(/\\/g, "\\\\")
			 		.replace(/[\r\t\n]/g, " ")
			 		.split("<#").join("\t")
			 		.replace(/((^|#>)[^\t]*)'/g, "$1\r")
			 		.replace(/\t=(.*?)#>/g, "',$1,'")
			 		.split("\t").join("');")
			 		.split("#>").join($ + ".push('")
			 		.split("\r").join("\\'")
				+ "');return " + $;
		return fn;
	},
	$ = function(id) {
		return document.getElementById(id);
	},
	Template = function() {
		if (!(this instanceof Template)) {
			return new Template();
		}
	};

	Template.__cache__ = {};

	/**
	 *静态方法 用于创建一个Template实例
	 */
	Template.create = function() {
		return new Template();
	};

	/**
	 *读取模板 参数可以是模板id或模板字符串
	 */
	Template.prototype.read = function(str) {
		var isId = !/\s/.test(str),
			cache = Template.__cache__;
		if (isId) {
			this.__fn__ = cache[str] || (cache[str] = getFn($(str).innerHTML));
		} else {
			this.__fn__ = getFn(str);
		}
		return this;
	};

	/**
	 *编译模板
	 */
	Template.prototype.compile = function(dataMap) {
		if (!(dataMap instanceof Map)) {
			throw new TypeError('not a Map instance');
		}
		this.__html__ = this.__fn__(dataMap);
		return this;
	};

	/**
	 *获取编译后的html
	 */
	Template.prototype.getHtml = function() {
		return this.__html__;
	};

	/**
	 *将编译后的html渲染到视图中
	 */
	Template.prototype.render = function(targetId) {
		$(targetId).innerHTML = this.__html__;
	};

	global.Template = Template;
	global.Storage = Storage;

})(window);