;(function(global, undefined) {

	"use strict";

	var store = global.localStorage;

	function Storage() {

	}
	/**
	 *是否支持本地存储
	 */
	Store.isSupported = store !== undefined;
	Store.startSession = function() {
		store = global.sessionStorage;
	};
	Store.startLocal = function() {
		store = global.localStorage;
	};

	// var storage = {
	// 	/**
	// 	 *存储一个键值对 value为字符串类型
	// 	 */
	// 	saveItem: function(key, value) {
	// 		store.setItem(key, value);
	// 	},
	// 	/**
	// 	 *根据指定key获取对应的存储值
	// 	 */
	// 	getItem: function(key) {
	// 		return store.getItem(key);
	// 	},
	// 	/**
	// 	 *删除指定key所对应的存储项
	// 	 */
	// 	delItem: function(key) {
	// 		store.removeItem(key);
	// 	},
	// 	/**
	// 	 *存储以map的形式组成的多个键值对
	// 	 */
	// 	saveItems: function(map, convertor) {
	// 		if (!(map instanceof HashMap)) {
	// 			throw new TypeError('not a HashMap instance');
	// 		}
	// 		var iter = map.entrySet().iterator();
	// 		while (iter.hasNext()) {
	// 			var entry = iter.next();
	// 			var key = entry.getKey();
	// 			var value = entry.getValue();

	// 			if (convertor && typeof convertor === 'function') {
	// 				value = convertor(value);
	// 			}
	// 			store.setItem(key, value);
	// 		}
	// 	},
	// 	/**
	// 	 *获取多个存储项
	// 	 */
	// 	getItems: function(filter, valueConvertor) {
	// 		var map = new HashMap();
	// 		for (var key in store) {
	// 			if (filter(key, value)) {
	// 				map.put(key, valueConvertor ? valueConvertor(store[key]) : store[key]);
	// 			}
	// 		}
	// 		return map;
	// 	},
	// 	/**
	// 	 *删除多个存储项
	// 	 */
	// 	delItems: function(filter) {
	// 		for (var key in store) {
				
	// 		}
	// 	},
	// 	/**
	// 	 *将对象转换成JSON字符串
	// 	 */
	// 	toJSON: function(value) {
	// 		global.stringify(value);
	// 	},
	// 	/**
	// 	 *将JSON字符串转换成对象
	// 	 */
	// 	fromJSON: function(json) {
	// 		return global.parseJSON(json);
	// 	}
	// };

	/**
	 *获取模板对应的操作函数
	 */
	var getFn = function(source) {
		var $ = '$' + (+ new Date);
		var fn = function (data) {
			var keys = [$], values = [[]];
			var iter = data.entrySet().iterator();
			while (iter.hasNext()) {
				var entry = iter.next();
				keys.push(entry.getKey());
				values.push(entry.getValue());
			};
			return (new Function(keys, fn.$)).apply(data, values).join("");
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
	Template.prototype.compile = function(data) {
		if (!(data instanceof HashMap)) {
			throw new TypeError('not a HashMap instance');
		}
		this.__html__ = this.__fn__(data);
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
	global.Storage = storage;

})(window);