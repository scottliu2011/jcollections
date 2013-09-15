(function(global, undefined) {

	"use strict";

	/**
	 *继承
	 */
	Function.prototype.inherits = function(Parent) {
		if (Parent.constructor !== Function) {
			throw new Error("parent is not a function");
		}
		this.prototype = new Parent();
		this.prototype.constructor = this;
		return this;
	};

	/**
	 *集合标识类型
	 */
	function Collection(){};

	//默认的equals函数
	Collection.prototype.__equals__ = function(elem0, elem1) {
		return elem0 === elem1;
	};

	/*
	 *有序集合标识类型
	 */
	var List = function(){}.inherits(Collection);//继承了Collection

	/**
	 *用于自定义equals函数，例如：
	 *defineEquals(function(elem0, elem1) {
	 *	return elem0.name === elem1.name;
	 *});
	 *两个元素的name属性相同则认为是同一个对象
	 */
	List.prototype.defineEquals = function(func) {
		this.__equals__ = func;
	};

	//#ArrayList
	var ArrayList = function() {
		if (!(this instanceof ArrayList)) {
			return new ArrayList();
		}
		this.__data__ = [];
	}.inherits(List);//ArrayList继承了List

	/**
	 *ArrayList.create();
	 *静态方法 用于创建一个ArrayList对象实例
	 */
	ArrayList.create = function() {
		return new ArrayList();
	};

	/**
	 *add(elem0[, elem1[, elem2[,...]]]);
	 *添加一到多个元素到list尾部
	 */
	ArrayList.prototype.add = function() {
		this.__data__ = this.__data__.concat(Array.prototype.slice.call(arguments));
	};

	/**
	 *insert(index, elem0[, elem1[, elem2[,...]]]);
	 *在指定位置插入一到多个元素
	 */
	ArrayList.prototype.insert = function() {
		var args = arguments,
			index = args[0];

		if (!index || index.constructor !== Number) {
			throw new Error('arguments error');
		}
		if (index < 0 || index > this.__data__.length) {
			throw new Error('index range error');
		}//当index等于数组长度时，追加到数组尾部

		var elems = Array.prototype.slice.call(arguments);
		elems.splice(0, 1);

		Array.prototype.splice.apply(this.__data__, [parseInt(index), 0].concat(elems));
	};

	/**
	 *set(index, elem);
	 *将指定位置的元素替换成新元素
	 */
	ArrayList.prototype.set = function(index, elem) {
		if (index < 0 || index > this.__data__.length) {
			throw new Error('index error');
		}
		this.__data__[index] = elem;
	}

	/**
	 *toArray()
	 *返回一个含有所有元素的数组对象
	 */
	ArrayList.prototype.toArray = function() {
		return this.__data__;
	};

	/**
	 *get(index);
	 *返回指定位置所对应的元素
	 */
	ArrayList.prototype.get = function(index) {
		return this.__data__[index];
	};

	/**
	 *addAll(collection);
	 *添加一个集合对象到list尾部
	 */
	ArrayList.prototype.addAll = function(collection) {
		if (!(collection instanceof Collection)) {
			throw new Error('not a Collection instance');
		}
		this.__data__.concat(collection.toArray());
	};

	/**
	 *insertAll(index, collection);
	 *在指定位置插入一个集合对象
	 */
	ArrayList.prototype.insertAll = function(index, collection) {
		if (!index || index.constructor !== Number) {
			throw new Error('index must be specified');
		}
		if (index < 0 || index > this.__size__) {
			throw new Error('index out of bounds');
		}
		if (!(collection instanceof Collection)) {
			throw new Error('not a Collection instance');
		}
		Array.prototype.splice.apply(this.__data__, [parseInt(index), 0].concat(collection.toArray()));
	};

	/**
	 *contains(elem);
	 *集合是否含有指定元素
	 */
	ArrayList.prototype.contains = function(elem) {
		var data = this.__data__;
		for (var i = 0, len = data.length; i < len; i++) {
			if (this.__equals__(data[i], elem)) {
				return true;
			}
		}
		return false;
	};

	/**
	 *size();
	 *返回集合元素个数
	 */
	ArrayList.prototype.size = function() {
		return this.__data__.length;
	};

	/**
	 *isEmpty();
	 *集合是否为空
	 */
	ArrayList.prototype.isEmpty = function() {
		return this.__data__.length === 0;
	};

	/**
	 *clear();
	 *清空集合中的元素
	 */
	ArrayList.prototype.clear = function() {
		this.__data__.length = 0;
	};

	/**
	 *remove(index);
	 *移除指定位置的元素
	 */
	ArrayList.prototype.remove = function(index) {
		if (typeof index === 'number') {
			this.__data__.splice(index, 1);
		}
	};

	/**
	 *remove(elem);
	 *移除指定元素
	 */
	ArrayList.prototype.removeElement = function(elem) {
		var data = this.__data__;
		for (var i = 0, len = data.length; i < len; i++) {
			if (this.__equals__(data[i], elem)) {
				data.splice(i, 1);
				break;
			}
		}
	};

	/**
	 *removeRange(fromIndex, toIndex);
	 *移除指定开始位置到结束位置的所有元素--包括开始位置，但不包括结束位置
	 */
	ArrayList.prototype.removeRange = function(fromIndex, toIndex) {
		this.__data__.splice(fromIndex, toIndex - fromIndex);
	};

	/**
	 *indexOf(elem);
	 *返回指定元素第一次出现的位置
	 */
	ArrayList.prototype.indexOf = function(elem) {
		var data = this.__data__;
		for (var i = 0, len = data.length; i < len; i++) {
			if (this.__equals__(data[i], elem)) {
				return i;
			}
		}
		return -1;
	};

	/**
	 *lastIndexOf(elem);
	 *返回指定元素最后一次出现的位置
	 */
	ArrayList.prototype.lastIndexOf = function(elem) {
		var data = this.__data__;
		for (var i = data.length - 1; i >= 0; i--) {
			if (this.__equals__(data[i], elem)) {
				return i;
			}
		}
		return -1;
	};
	
	/**
	 *toString();
	 *返回一个含有所有元素的字符串
	 */	
	ArrayList.prototype.toString = function() {
		return '['+ this.__data__.join(',') + ']';
	};

	/**
	 *iterator();
	 *iterator(index);从指定位置开始迭代
	 *获取一个迭代器
	 */
	ArrayList.prototype.iterator = function(index) {
		var index = index || 0;

		if (index < 0 || index > this.__size__) {
			throw new Error('index out of bounds');
		}
		
		var ArrayListIterator = function(arrayList) {
			var cursor = index,
				lastCursor = index - 1,
				data = arrayList.__data__;
			this.hasNext = function() {
				return cursor < arrayList.size();
			};
			this.next = function() {
				var next = data[cursor];
				lastCursor = cursor++;
				return next;
			};
			this.remove = function() {
				if (lastCursor === -1) {
					throw new Error('illegal state');
				}
				arrayList.remove(lastCursor);
				cursor--;
				lastCursor = -1;
			};
		};
		return new ArrayListIterator(this);
	};

	//#LinkedList
	var LinkedList = function() {
		if (!(this instanceof LinkedList)) {
			return new LinkedList();
		}
		this.__size__ = 0;
		this.__header__ = {};
		this.__header__.next = this.__header__.previous = this.__header__;
	}.inherits(List);//LinkedList继承了List

	LinkedList.create = function() {
		return new LinkedList();
	};

	//在指定节点前添加一个新的节点元素
	LinkedList.prototype.__addBefore__ = function(elem, entry) {
		var newEntry = {elem:elem, next:entry, previous:entry.previous};
		newEntry.previous.next = newEntry;
		newEntry.next.previous = newEntry;
		this.__size__++;
	};

	//获取指定位置的节点
	LinkedList.prototype.__getEntry__ = function(index) {
		if (index < 0 || index >= this.__size__) {
			throw new Error('index out of bounds');
		}
		var size = this.__size__,
			entry = this.__header__;
		if (index < (size >> 1)) {//二分法
			for (var i = 0; i <= index; i++) {//从前往后
				entry = entry.next;
			}
		} else {
			for (var i = size; i > index; i--) {//从后往前
				entry = entry.previous;
			}
		}
		return entry;
	};

	//移除指定的结点
	LinkedList.prototype.__removeEntry__ = function(entry) {
		if (entry === this.__header__) {
			throw new Error('no such element in this list');
		}

		var retVal = entry.elem;

		entry.next.previous = entry.previous;
		entry.previous.next = entry.next;

		entry.next = entry.previous = null
		entry.elem = null;

		this.__size__--;

		return retVal;
	};

	/**
	 *add(elem);
	 *添加一个指定的元素节点到链表尾部
	 */
	LinkedList.prototype.add = function(elem) {
		this.__addBefore__(elem, this.__header__);
	};

	/**
	 *insert(index, elem);
	 *在指定位置插入一个新的节点元素
	 */
	LinkedList.prototype.insert = function(index, elem) {
		this.__addBefore__(elem, (index == this.__size__ ? this.__header__ : this.__getEntry__(index)));
	};

	/**
	 *addFirst(elem);
	 *在链表头部添加一个新的节点元素
	 */
	LinkedList.prototype.addFirst = function(elem) {
		this.__addBefore__(elem, this.__header__.next);
	};

	/**
	 *addLast(elem);
	 *在链表尾部追加一个新的节点元素
	 */
	LinkedList.prototype.addLast = function(elem) {
		this.__addBefore__(elem, this.__header__);
	};

	/**
	 *toString();
	 *返回一个含有所有元素的字符串
	 */
	LinkedList.prototype.toString = function() {
		return '[' + this.toArray().join(',') + ']';
	};

	/**
	 *toArray();
	 *返回一个含有所有元素的数组
	 */
	LinkedList.prototype.toArray = function() {
		var i = 0,
			result = [],
			header = this.__header__;
		for (var entry = header.next; entry !== header; entry = entry.next) {
			result[i++] = entry.elem;
		}
		return result;
	};

	/**
	 *addAll(collection);
	 *添加一个集合对象到链表尾部
	 */
	LinkedList.prototype.addAll = function (collection) {
		if (!(collection instanceof Collection)) {
			throw new Error('not a Collection instance');
		}
		this.insertAll(this.__size__, collection);
	};

	/**
	 *insertAll(index, collection);
	 *在指定位置插入一个集合对象
	 */
	LinkedList.prototype.insertAll = function (index, collection) {
		if (!index || index.constructor !== Number) {
			throw new Error('index must be specified');
		}
		if (index < 0 || index > this.__size__) {
			throw new Error('index out of bounds');
		}
		if (!(collection instanceof Collection)) {
			throw new Error('not a Collection instance');
		}
		if (collection.size() === 0) return;

		var successor = (index == this.__size__ ? this.__header__ : this.__getEntry__(index)),
			predecessor = successor.previous,
			data = collection.toArray();

		for (var i = 0, len = data.length; i < len; i++) {
			var newEntry = {elem:data[i], next:successor, previous:predecessor};
			predecessor.next = newEntry;
			predecessor = newEntry;
		}
		successor.previous = predecessor;

		this.__size__ += data.length;
	};

	/**
	 *size();
	 *返回链表元素个数
	 */
	LinkedList.prototype.size = function() {
		return this.__size__;
	};

	/**
	 *clear();
	 *清空链表
	 */
	LinkedList.prototype.clear = function() {
		var header = this.__header__,
			entry = header.next;
		while (entry !== header) {
			var next = entry.next;
			entry.next = entry.previous = null;
			entry.elem = null;
			entry = next;
		}
		header.next = header.previous = header;
		this.__size__ = 0;
	};

	/**
	 *indexOf(elem);
	 *返回指定节点元素第一次出现的位置
	 */
	LinkedList.prototype.indexOf = function(elem) {
		var index = 0,
			header = this.__header__;
		for (var entry = header.next; entry !== header; entry = entry.next) {
			if (this.__equals__(entry.elem, elem)) {
				return index;
			}
			index++;
		}
		return -1;
	};

	/**
	 *lastIndexOf(elem);
	 *返回指定节点元素最后一次出现的位置
	 */
	LinkedList.prototype.lastIndexOf = function(elem) {
		var index = this.__size__,
			header = this.__header__;
		for (var entry = header.previous; entry !== header; entry = entry.previous) {
			if (this.__equals__(entry.elem, elem)) {
				return index;
			}
			index--;
		}
		return -1;
	};

	/**
	 *contains(elem);
	 *链表中是否含有指定结点元素
	 */
	LinkedList.prototype.contains = function(elem) {
		return this.indexOf(elem) !== -1;
	};	

	/**
	 *getFirst();
	 *获取链表中第一个结点元素
	 */
	LinkedList.prototype.getFirst = function() {
		if (this.__size__ === 0) {
			throw new Error('no element in this list');
		}
		return this.__header__.next.elem;
	};
	
	/**
	 *getLast();
	 *获取链表中最后一个结点元素
	 */
	LinkedList.prototype.getLast = function() {
		if (this.__size__ === 0) {
			throw new Error('no element in this list');
		}
		return this.__header__.previous.elem;
	};

	/**
	 *get(index);
	 *获取指定位置的结点元素
	 */
	LinkedList.prototype.get = function(index) {
		return this.__getEntry__(index).elem;
	};

	/**
	 *set(index);
	 *将指定位置的结点替换成新的结点元素
	 */
	LinkedList.prototype.set = function(index, elem) {
		this.__getEntry__(index).elem = elem;
	};

	/**
	 *removeFirst();
	 *移除链表第一个元素结点
	 */
	LinkedList.prototype.removeFirst = function() {
		return this.__removeEntry__(this.__header__.next);
	};

	/**
	 *removeLast();
	 *移除链表最后一个元素结点
	 */
	LinkedList.prototype.removeLast = function() {
		return this.__removeEntry__(this.__header__.previous);
	};

	/**
	 *remove(index);
	 *移除指定位置的元素结点
	 */
	LinkedList.prototype.remove = function(index) {
		return this.__removeEntry__(this.__getEntry__(index));
	};

	/**
	 *removeElement(elem);
	 *从链表中移除指定元素结点
	 */
	LinkedList.prototype.removeElement = function(elem) {
		var header = this.__header__;
		for (var entry = header.next; entry !== header; entry = entry.next) {
			if (this.__equals__(entry.elem, elem)) {
				this.__removeEntry__(entry);
				return true;
			}
		}
		return false;
	};

	/**
	 *removeFirstOccurrence(elem);
	 *移除指定元素第一次出现的结点
	 */
	LinkedList.prototype.removeFirstOccurrence = function(elem) {
		this.removeElement(elem);
	};

	/**
	 *removeLastOccurrence(elem);
	 *移除指定元素最后一次出现的结点
	 */
	LinkedList.prototype.removeLastOccurrence = function(elem) {
		var header = this.__header__;
		for (var entry = header.previous; entry !== header; entry = entry.previous) {
			if (this.__equals__(entry.elem, elem)) {
				this.__removeEntry__(entry);
				return true;
			}
		}
		return false;
	};

	/**
	 *iterator();
	 *iterator(index);从指定位置开始迭代
	 *获取链表迭代器
	 */
	LinkedList.prototype.iterator = function(index) {
		var index = index || 0,
			size = this.__size__,
			header = this.__header__;

		if (index < 0 || index > size) {
			throw new Error('index out of bounds');
		}

		var LinkedListIterator = function(linkedList) {
			var last = header,
				next,
				nextIndex;

			if (index < (size >> 1)) {
				next = header.next;
				for (nextIndex = 0; nextIndex < index; nextIndex++) {
					next = next.next;
				}
			} else {
				next = header;
				for (nextIndex = size; nextIndex > index; nextIndex--) {
					next = next.previous;
				}
			}

			this.hasNext = function() {
				return nextIndex < size;
			};
			this.next = function() {
				if (nextIndex === size) {
					throw new Error('no such element in this list');
				}
				last = next;
				
				next = next.next;
				nextIndex++;

				return last.elem;
			};
			this.remove = function() {
				linkedList.__removeEntry__(last);
				
				nextIndex--;
				size--;

				last = header;
			};
		};
		return new LinkedListIterator(this);
	};

	//负责对象和内部键之间的相互转换
	var KeyConvertor = {
		toInnerKey: function(outerValue) {
			return (typeof outerValue) + '@' + outerValue;
		},
		fromInnerKey: function(innerKey) {
			var first = innerKey.indexOf('@'),
				type = innerKey.substring(0, first),
				value = innerKey.substring(first + 1);
			if (type === 'string') {
				return value;
			} else if (type === 'number') {
				return Number(value);
			} else if (type === 'boolean') {
				return Boolean(value);
			} else {
				return innerKey;
			}
		}
	};

	//#HashSet
	var HashSet = function() {
		if (!(this instanceof HashSet)) {
			return new HashSet();
		}
		this.__store__  = {};
		this.__size__ = 0;
	}.inherits(Collection);//HashSet直接继承了Collection

	/**
	 *HashSet.create();
	 *静态方法 用于创建一个HashSet对象实例
	 */
	HashSet.create = function() {
		return new HashSet();
	};

	/**
	 *add(elem);
	 *添加一个元素到set中
	 */
	HashSet.prototype.add = function(elem) {
		var isNew = !this.contains(elem),
			store = this.__store__,
			key = KeyConvertor.toInnerKey(elem);
		if ((typeof elem) === 'object') {
			store[key] = elem;
		} else {
			store[key] = 1;
		}
		if (isNew) this.__size__++;
	};

	/**
	 *remove(elem);
	 *从set集合中移除一个指定元素
	 */
	HashSet.prototype.remove = function(elem) {
		if (this.contains(elem)) {
			delete this.__store__[KeyConvertor.toInnerKey(elem)];
			this.__size__--;
		}
	};

	/**
	 *toArray();
	 *返回含有set所有元素的数组
	 */
	HashSet.prototype.toArray = function() {
		var result = [];
		for (var i in this.__store__) {
			result.push(KeyConvertor.fromInnerKey(i));
		}
		return result;
	};

	/**
	 *toString();
	 *返回含有set所有元素的字符串
	 */
	HashSet.prototype.toString = function() {
		return '[' + this.toArray().join(',') + ']';
	};

	/**
	 *size();
	 *返回set元素个数
	 */
	HashSet.prototype.size = function() {
		return this.__size__;
	};

	/**
	 *isEmpty();
	 *set是否为空
	 */
	HashSet.prototype.isEmpty = function() {
		return this.__size__ === 0;
	};

	/**
	 *contains(elem);
	 *set是否含有指定元素
	 */
	HashSet.prototype.contains = function(elem) {
		return !!this.__store__[KeyConvertor.toInnerKey(elem)];
	};

	/**
	 *clear();
	 *清空set
	 */
	HashSet.prototype.clear = function() {
		this.__store__ = {};
		this.__size__ = 0;
	};

	/**
	 *iterator();
	 *获取迭代器
	 */
	HashSet.prototype.iterator = function() {
		var set = this,
			store = this.__store__,
			keys = Object.keys(store),
			cursor = 0,
			lastCursor = - 1;
		var HashSetIterator = function() {
			this.hasNext = function() {
				return cursor < set.size();
			};
			this.next = function() {
				var key = keys[cursor];

				var isObject = key.indexOf('object@') === 0;
				var elem = isObject ? store[key] : KeyConvertor.fromInnerKey(key);

				lastCursor = cursor++;
				
				return elem;
			};
			this.remove = function() {
				if (lastCursor === -1) {
					throw new Error('illegal state');
				}

				var key = keys[lastCursor];
				var isObject = key.indexOf('object@') === 0;
				var elem = isObject ? store[key] : KeyConvertor.fromInnerKey(key);

				set.remove(elem);
				keys.splice(lastCursor, 1);

				cursor--;
				lastCursor = -1;
			};
		};
		return new HashSetIterator();
	};

	/**
	 *Map标识类型
	 */
	function Map(){};

	//#HashMap
	var HashMap = function() {
		if (!(this instanceof HashMap)) {
			return new HashMap();
		}
		this.__store__ = {};
		this.__xkey__ = {};//object key mapping.
		this.__size__ = 0;
	}.inherits(Map);//HashMap继承了Map

	/**
	 *HashMap.create();
	 *静态方法 用于创建一个HashMap对象实例
	 */
	HashMap.create = function() {
		return new HashMap();
	};

	/**
	 *put(key, value);
	 *添加新的键值对
	 */
	HashMap.prototype.put = function(key, value) {
		var isNew = !this.containsKey(key),
			innerKey = KeyConvertor.toInnerKey(key);
		this.__store__[innerKey] = value;
		if (isNew) {
			this.__size__++;

			if ((typeof key) === 'object') {
				this.__xkey__[innerKey] = key;//{hash:real_key}
			}
		}
	};

	/**
	 *putAll(map);
	 *将指定map的数据合并到本实例中
	 */
	HashMap.prototype.putAll = function(map) {
		if (!(map instanceof Map)) {
			throw new Error('not a Map instance');
		}
		var keySet = map.keySet(),
			iter = keySet.iterator();
		while (iter.hasNext()) {
			var key = iter.next();
			this.put(key, map.get(key));
		}
	};

	/**
	 *get(key);
	 *根据指定的key获取对应的value
	 */
	HashMap.prototype.get = function(key) {
		return this.__store__[KeyConvertor.toInnerKey(key)];
	};

	/**
	 *remove(key);
	 *移除指定key对应的键值对
	 */
	HashMap.prototype.remove = function(key) {
		if (this.containsKey(key)) {
			var innerKey = KeyConvertor.toInnerKey(key);
			delete this.__store__[innerKey];
			this.__size__--;

			if ((typeof key) === 'object') {
				delete this.__xkey__[innerKey];
			}
		}
	};

	/**
	 *clear();
	 *清空map
	 */
	HashMap.prototype.clear = function(key) {
		this.__store__ = {};
		this.__xkey__ = {};
		this.__size__ = 0;
	};

	/**
	 *size();
	 *返回map键值对个数
	 */
	HashMap.prototype.size = function() {
		return this.__size__;
	};

	/**
	 *isEmpty();
	 *map是否为空
	 */
	HashMap.prototype.isEmpty = function() {
		return this.__size__ === 0;
	};

	/**
	 *containsKey(key);
	 *map中是否含有指定的key
	 */
	HashMap.prototype.containsKey = function(key) {
		return !!this.__store__[KeyConvertor.toInnerKey(key)];
	};

	/**
	 *containsValue(value);
	 *map中是否含有指定的value
	 */
	HashMap.prototype.containsValue = function(value) {
		var store = this.__store__;
		for (var key in store) {
			if (store[key] === value) {
				return true;
			}
		}
		return false;
	};

	/**
	 *keySet();
	 *返回所有键组成的set集合
	 */
	HashMap.prototype.keySet = function() {
		var set = new HashSet();
		for (var key in this.__store__) {
			if (key.indexOf('object@') !== 0) {
				set.add(KeyConvertor.fromInnerKey(key));
			} else {
				set.add(this.__xkey__[key]);
			}
		}
		return set;
	};

	/**
	 *entrySet();
	 *返回所有键值对组成的set集合
	 */
	HashMap.prototype.entrySet = function() {
		var map = this,
			set = new HashSet();

		var MapEntry = function(key, value) {
			this.__key__ = key;
			this.__value__ = value;

			this.getKey = function() {
				return this.__key__;
			};
			this.getValue = function() {
				return this.__value__;
			};
			this.set = function(value) {
				this.__value__ = value;
				map.put(this.__key__, value);
			};
		};

		for (var key in this.__store__) {
			var realKey;
			if (key.indexOf('object@') !== 0) {
				realKey = KeyConvertor.fromInnerKey(key);
			} else {
				realKey = this.__xkey__[key];
			}
			var entry = new MapEntry(realKey, this.__store__[key]);
			set.add(entry);
		}
		return set;
	};
	
	/**
	 *toString();
	 *返回含有map所有键值对的字符串
	 */
	HashMap.prototype.toString = function() {
		var result = [],
			store = this.__store__;
		for (var key in store) {
			if (key.indexOf('object@') !== 0) {
				result.push(KeyConvertor.fromInnerKey(key) + '=' + store[key]);
			} else {
				result.push(key + '=' + store[key]);
			}
		}
		return '{' + result.join(',') + '}';
	};

	/**
	 *values();
	 *返回含有map所有值的字符串
	 */
	HashMap.prototype.values = function() {
		var result = [],
			store = this.__store__;;
		for (var key in store) {
			result.push(store[key]);
		}
		return '[' + result.join(',') + ']';
	};

	var Collections = {
		//...
	};

	var collections = {};
	collections.ArrayList = ArrayList;
	collections.LinkedList = LinkedList;
	collections.HashSet = HashSet;
	collections.HashMap = HashMap;
	collections.Collections = Collections;

	collections.__hash__ = 1024;
	
	//重写Object的toString函数 每个对象类型都有一个hash值
	Object.prototype.toString = function() {
		if (!this.__hash__) {
			this.__hash__ = collections.__hash__++;
		}
		return this.__hash__;
	}

	//Object.keys是ECMAScript 5th Edition中新增函数
	if (!Object.keys) {//如果不是现代浏览器则实现一个Object.keys函数
		Object.keys = (function () {
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
				dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
				dontEnumsLength = dontEnums.length;

			return function (obj) {
				if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
					throw new TypeError('Object.keys called on non-object');
				}

				var result = [], prop, i;

				for (prop in obj) {
					if (hasOwnProperty.call(obj, prop)) {
						result.push(prop);
					}
				}

				if (hasDontEnumBug) {
					for (i = 0; i < dontEnumsLength; i++) {
						if (hasOwnProperty.call(obj, dontEnums[i])) {
							result.push(dontEnums[i]);
						}
					}
				}
				return result;
			};
		}());
	}

	global.imports = function(module) {
		if (!module || !/^collections\.(\*|[a-zA-Z]+)$/g.test(module)) {
			throw new Error('imports function arguments error');
		}
		module = module.replace('collections.', '');
		if (module === '*') {
			for (var elem in collections) {
				global[elem] = collections[elem];
			}
		} else {
			collections[module] && (global[module] = collections[module]);
		}
	};

})(window);