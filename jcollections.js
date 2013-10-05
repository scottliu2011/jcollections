(function(global, undefined) {

	"use strict";

	/**
	 *继承
	 */
	Function.prototype.inherits = function(Parent) {
		if (typeof Parent !== 'function') {
			throw TypeError("Parent incorrect");
		}
		this.prototype = new Parent();
		this.prototype.constructor = this;
		return this;
	};

	/**
	 *集合标识类型
	 */
	function Collection(){};

	/**
	 *size();
	 *返回集合元素个数
	 */
	Collection.prototype.size = function() {
		return this.__mSize__();
	}

	/**
	 *isEmpty();
	 *集合是否为空
	 */
	Collection.prototype.isEmpty = function() {
		return this.size() === 0;
	}

	/**
	 *用于自定义equals函数，例如：
	 *defineEquals(function(elem0, elem1) {
	 *	return elem0.name === elem1.name;
	 *});两个元素的name属性相同则认为是同一个对象
	 */
	Collection.prototype.defineEquals = function(equalsFn) {
		this.__equals__ = equalsFn;
	};

	//默认的equals函数
	Collection.prototype.__equals__ = function(elem0, elem1) {
		return elem0 === elem1;
	};

	/*
	 *有序集合标识类型
	 */
	var List = function(){}.inherits(Collection);//继承了Collection

	//检查索引值的范围
	List.prototype.__rangeCheck__ = function(index, canBeSize) {
		if (typeof index !== 'number') {
			throw Error('index incorrect');
		}

		if (index === 0 && this.size() === 0) return;
		
		if (index < 0 || (canBeSize ? index > this.size() : index >= this.size())) {
			throw Error('index out of bounds: index:' + index + ', size:' + this.size());
		}
	};

	/**
	 *new ArrayList(); || new ArrayList([]); || new Array(Collection);
	 *构造一个新的ArrayList实例
	 */
	var ArrayList = function(arg) {
		if (!(this instanceof ArrayList)) {
			return new ArrayList(arg);
		}

		var data = [];
		
		if (arg instanceof Array) {
			data = arg.slice(0);
		} else if (arg instanceof Collection) {
			data = arg.toArray();
		}

		this.__data__ = data;
	}.inherits(List);//ArrayList继承了List

	/**
	 *ArrayList.create(); || new ArrayList([]); || new Array(Collection);
	 *静态方法，创建一个ArrayList实例
	 */
	ArrayList.create = function(arg) {
		return new ArrayList(arg);
	};

	//返回list元素个数
	ArrayList.prototype.__mSize__ = function() {
		return this.__data__.length;
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
			index = args[0],
			elems;

		this.__rangeCheck__(index, true);

		elems = Array.prototype.slice.call(arguments);
		elems.splice(0, 1);

		Array.prototype.splice.apply(this.__data__, [parseInt(index), 0].concat(elems));
	};

	/**
	 *set(index, elem);
	 *将指定位置的元素替换成新元素
	 */
	ArrayList.prototype.set = function(index, elem) {
		this.__rangeCheck__(index);

		var data = this.__data__,
			oldElem = data[index];

		data[index] = elem;

		return oldElem;
	};

	/**
	 *toArray()
	 *返回一个含有所有元素的数组对象
	 */
	ArrayList.prototype.toArray = function() {
		return this.__data__.slice(0);
	};

	/**
	 *get(index);
	 *返回指定位置所对应的元素
	 */
	ArrayList.prototype.get = function(index) {
		this.__rangeCheck__(index);
		return this.__data__[index];
	};

	/**
	 *addAll(collection);
	 *添加一个集合对象到list尾部
	 */
	ArrayList.prototype.addAll = function(collection) {
		if (!(collection instanceof Collection)) {
			throw Error('not a Collection instance');
		}
		if (!collection.isEmpty()) {
			this.__data__ = this.__data__.concat(collection.toArray());
		}
	};

	/**
	 *insertAll(index, collection);
	 *在指定位置插入一个集合对象
	 */
	ArrayList.prototype.insertAll = function(index, collection) {
		this.__rangeCheck__(index, true);
		if (!(collection instanceof Collection)) {
			throw Error('not a Collection instance');
		}
		if (!collection.isEmpty()) {
			Array.prototype.splice.apply(this.__data__, [parseInt(index), 0].concat(collection.toArray()));
		}
	};

	/**
	 *clear();
	 *清空集合中的元素
	 */
	ArrayList.prototype.clear = function() {
		this.__data__.length = 0;
	};

	/**
	 *removeAt(index);
	 *移除指定位置的元素
	 */
	ArrayList.prototype.removeAt = function(index) {
		this.__rangeCheck__(index);
		return this.__data__.splice(index, 1)[0];
	};

	/**
	 *removeElement(elem);
	 *移除指定元素
	 */
	ArrayList.prototype.removeElement = function(elem) {
		var data = this.__data__;
		for (var i = 0, len = data.length; i < len; i++) {
			if (this.__equals__(data[i], elem)) {
				data.splice(i, 1);
				return true;
			}
		}
		return false;
	};

	/**
	 *removeRange(fromIndex, toIndex);
	 *移除指定的开始位置到指定的结束位置的所有元素--包括开始位置，但不包括结束位置
	 */
	ArrayList.prototype.removeRange = function(fromIndex, toIndex) {
		this.__rangeCheck__(fromIndex);
		this.__rangeCheck__(toIndex);
		if (fromIndex > toIndex) {
			throw Error('fromIndex > toIndex');
		}
		return this.__data__.splice(fromIndex, toIndex - fromIndex);
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
	 *contains(elem);
	 *集合是否含有指定元素
	 */
	ArrayList.prototype.contains = function(elem) {
		return this.indexOf(elem) !== -1;
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
		if ((index = index || 0) !== 0) {
			this.__rangeCheck__(index);
		}
		
		var ArrayListIterator = function(arrayList) {
			var cursor = index,
				lastCursor = index - 1,
				data = arrayList.__data__,
				next;
			this.hasNext = function() {
				return cursor < arrayList.size();
			};
			this.next = function() {
				next = data[cursor];
				lastCursor = cursor++;
				return next;
			};
			this.set = function(elem) {
				if (lastCursor === -1) {
					throw Error('illegal state');
				}
				arrayList.set(lastCursor, elem);
			};
			this.remove = function() {
				if (lastCursor === -1) {
					throw Error('illegal state');
				}
				arrayList.removeAt(lastCursor);
				cursor--;
				lastCursor = -1;
			};
		};
		return new ArrayListIterator(this);
	};

	/**
	 *new LinkedList(); || new LinkedList(Collection);
	 *构造一个新的LinkedList实例
	 */
	var LinkedList = function(collection) {
		if (!(this instanceof LinkedList)) {
			return new LinkedList(collection);
		}
		this.__size__ = 0;
		this.__header__ = {};
		this.__header__.next = this.__header__.previous = this.__header__;

		if (collection instanceof Collection) {
			this.addAll(collection);
		}
	}.inherits(List);//LinkedList继承了List

	/**
	 *LinkedList.create(); || LinkedList.create(Collection);
	 *静态方法，创建一个LinkedList实例
	 */
	LinkedList.create = function(collection) {
		return new LinkedList(collection);
	};

	//返回链表个数
	LinkedList.prototype.__mSize__ = function() {
		return this.__size__;
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
			throw Error('no such element in this list');
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
	 *add(elem0[, elem1[, elem2[,...]]]);
	 *添加一个到多个元素节点到链表尾部
	 */
	LinkedList.prototype.add = function() {
		var args = arguments;
		for (var i = 0, len = args.length; i < len; i++) {
			this.__addBefore__(args[i], this.__header__);	
		}
	};

	/**
	 *insert(index, elem0[, elem1[, elem2[,...]]]);
	 *在指定位置插入一个到多个新的节点元素
	 */
	LinkedList.prototype.insert = function() {
		var args = arguments,
			index = args[0],
			elems;

		this.__rangeCheck__(index, true);

		elems = Array.prototype.slice.call(arguments);
		elems.splice(0, 1);

		for (var i = 0, len = elems.length; i < len; i++) {
			this.__addBefore__(elems[i], (index === this.__size__ ? this.__header__ : this.__getEntry__(index)));
			index++;
		}
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
		var result = [],
			header = this.__header__;
		for (var entry = header.next; entry !== header; entry = entry.next) {
			result.push(entry.elem);
		}
		return result;
	};

	/**
	 *addAll(collection);
	 *添加一个集合对象到链表尾部
	 */
	LinkedList.prototype.addAll = function (collection) {
		if (!(collection instanceof Collection)) {
			throw Error('not a Collection instance');
		}
		if (!collection.isEmpty()) {
			this.insertAll(this.__size__, collection);
		}
	};

	/**
	 *insertAll(index, collection);
	 *在指定位置插入一个集合对象
	 */
	LinkedList.prototype.insertAll = function (index, collection) {
		this.__rangeCheck__(index, true);

		if (!(collection instanceof Collection)) {
			throw Error('not a Collection instance');
		}
		if (collection.isEmpty()) return;

		var successor = (index === this.__size__ ? this.__header__ : this.__getEntry__(index)),
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
	 *clear();
	 *清空链表
	 */
	LinkedList.prototype.clear = function() {
		var header = this.__header__,
			entry = header.next,
			next;
		while (entry !== header) {
			next = entry.next;
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
			index--;
			if (this.__equals__(entry.elem, elem)) {
				return index;
			}
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
			throw Error('no element in this list');
		}
		return this.__header__.next.elem;
	};
	
	/**
	 *getLast();
	 *获取链表中最后一个结点元素
	 */
	LinkedList.prototype.getLast = function() {
		if (this.__size__ === 0) {
			throw Error('no element in this list');
		}
		return this.__header__.previous.elem;
	};

	/**
	 *get(index);
	 *获取指定位置的结点元素
	 */
	LinkedList.prototype.get = function(index) {
		this.__rangeCheck__(index);
		return this.__getEntry__(index).elem;
	};

	/**
	 *set(index);
	 *将指定位置的结点替换成新的结点元素
	 */
	LinkedList.prototype.set = function(index, elem) {
		this.__rangeCheck__(index);

		var entry = this.__getEntry__(index),
			oldElem = entry.elem;
		
		entry.elem = elem;

		return oldElem;
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
	 *removeAt(index);
	 *移除指定位置的元素结点
	 */
	LinkedList.prototype.removeAt = function(index) {
		this.__rangeCheck__(index);
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

		this.__rangeCheck__(index, true);

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
					throw Error('no such element in this list');
				}
				last = next;
				
				next = next.next;
				nextIndex++;

				return last.elem;
			};
			this.hasPrevious = function() {
				return nextIndex !== 0;
			};
			this.previous = function() {
				if (nextIndex === 0) {
					throw Error('no such element in this list');
				}
				
				last = next = next.previous;
				nextIndex--;

				return last.elem;
			};
			this.set = function(elem) {
				if (last === header) {
					throw Error('illegal state');
				}
				last.elem = elem;
			};
			this.remove = function() {
				var lastNext = last.next;

				linkedList.__removeEntry__(last);
				
				if (next === last) {
					next = lastNext;
				} else {
					nextIndex--;
				}

				size--;

				last = header;
			};
		};
		return new LinkedListIterator(this);
	};

	//负责对象和内部键之间的相互转换
	var KeyConvertor = {
		toInnerKey: function(outerValue) {
			if (typeof outerValue === 'object' && !outerValue.__hash__) {
				outerValue.__hash__ = this.__hash__++;
			}
			return (typeof outerValue) + '@' + (outerValue.__hash__ || outerValue);
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
		},
		__hash__: 1024
	};

	/*
	 *无序集合标识类型
	 */
	var Set = function(){}.inherits(Collection);//继承了Collection

	/**
	 *new HashSet(); || new HashSet(Collection);
	 *构造一个新的HashSet实例
	 */
	var HashSet = function(collection) {
		if (!(this instanceof HashSet)) {
			return new HashSet(collection);
		}
		this.__store__  = {};
		this.__size__ = 0;

		if (collection instanceof Collection) {
			this.addAll(collection);
		}
	}.inherits(Set);//HashSet继承了Set

	/**
	 *HashSet.create(); || HashSet.create(Collection);
	 *静态方法，创建一个HashSet实例
	 */
	HashSet.create = function(collection) {
		return new HashSet(collection);
	};

	//返回set元素个数
	HashSet.prototype.__mSize__ = function() {
		return this.__size__;
	};

	//重写Collection的defineEquals函数
	HashSet.prototype.defineEquals = function(equalsFn) {
		Collection.prototype.defineEquals.call(this, equalsFn);
		this.__overwriteEquals__ = true;
	};

	/**
	 *add(elem);
	 *添加一到多个元素到set中
	 */
	HashSet.prototype.add = function() {
		var args = arguments,
			store = this.__store__;
		for (var i = 0, len = args.length; i < len; i++) {
			var elem = args[i],
				isNew = !this.contains(elem);
			if (isNew) {
				var key = KeyConvertor.toInnerKey(elem);
				if (typeof elem === 'object') {
					store[key] = elem;
				} else {
					store[key] = 1;
				}
				this.__size__++;
			}
		}
	};

	/**
	 *addAll(collection);
	 *添加一个集合对象到set中
	 */
	HashSet.prototype.addAll = function(collection) {
		if (!(collection instanceof Collection)) {
			throw Error('not a Collection instance');
		}
		if (collection.isEmpty()) return;

		var iter = collection.iterator();
		while (iter.hasNext()) {
			this.add(iter.next());
		}
	};

	/**
	 *remove(elem);
	 *从set集合中移除一个指定元素
	 */
	HashSet.prototype.remove = function(elem) {
		if (!this.contains(elem)) return false;

		var store = this.__store__;
		if (typeof elem === 'object' && this.__overwriteEquals__) {
			for (var key in store) {
				if (this.__equals__(store[key], elem)) {
					delete store[key];
					this.__size__--;
					return true;
				}
			}
		} else {
			delete store[KeyConvertor.toInnerKey(elem)];
			this.__size__--;
			return true;
		}

		return false;
	};

	/**
	 *toArray();
	 *返回含有set所有元素的数组
	 */
	HashSet.prototype.toArray = function() {
		var result = [],
			store = this.__store__;
		for (var key in store) {
			if (key.indexOf('object@') === 0) {
				result.push(store[key]);
			} else {
				result.push(KeyConvertor.fromInnerKey(key));
			}
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
	 *contains(elem);
	 *set是否含有指定元素
	 */
	HashSet.prototype.contains = function(elem) {
		var store = this.__store__;
		if (typeof elem === 'object' && this.__overwriteEquals__) {
			for (var key in store) {
				if (this.__equals__(store[key], elem)) {
					return true;
				}
			}
			return false;
		}
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
				var key = keys[cursor],
					isObject = key.indexOf('object@') === 0,
					elem = isObject ? store[key] : KeyConvertor.fromInnerKey(key);
				lastCursor = cursor++;
				return elem;
			};
			this.remove = function() {
				if (lastCursor === -1) {
					throw Error('illegal state');
				}

				var key = keys[lastCursor],
					isObject = key.indexOf('object@') === 0,
					elem = isObject ? store[key] : KeyConvertor.fromInnerKey(key);
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

	/**
	 *size();
	 *返回map键值对个数
	 */
	Map.prototype.size = function() {
		return this.__mSize__();
	};

	/**
	 *isEmpty();
	 *map是否为空
	 */
	Map.prototype.isEmpty = function() {
		return this.size() === 0;
	};

	/**
	 *new HashMap(); || new HashMap(Map);
	 *构造一个新的HashMap实例
	 */
	var HashMap = function(map) {
		if (!(this instanceof HashMap)) {
			return new HashMap(map);
		}
		this.__store__ = {};
		this.__xkey__ = {};//object key mapping.
		this.__size__ = 0;

		if (map instanceof Map) {
			this.putAll(map);
		}
	}.inherits(Map);//HashMap继承了Map

	/**
	 *HashMap.create(); || HashMap.create(Map);
	 *静态方法，创建一个HashMap实例
	 */
	HashMap.create = function(map) {
		return new HashMap(map);
	};

	//返回键值对个数
	HashMap.prototype.__mSize__ = function() {
		return this.__size__;
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

			if (typeof key === 'object') {
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
			throw Error('not a Map instance');
		}
		if (map.isEmpty()) return;

		var keySet = map.keySet(),
			iter = keySet.iterator(),
			key;
		while (iter.hasNext()) {
			key = iter.next();
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
			var innerKey = KeyConvertor.toInnerKey(key),
				store = this.__store__,
				value = store[innerKey];

			delete store[innerKey];
			this.__size__--;

			if (typeof key === 'object') {
				delete this.__xkey__[innerKey];
			}
			return value;
		}
		return null;
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
			this.setValue = function(value) {
				this.__value__ = value;
				map.put(this.__key__, value);
			};
			this.toString = function() {
				return this.__key__ + '=' + this.__value__;
			};
		};

		for (var key in this.__store__) {
			var realKey;
			if (key.indexOf('object@') !== 0) {
				realKey = KeyConvertor.fromInnerKey(key);
			} else {
				realKey = this.__xkey__[key];
			}
			set.add(new MapEntry(realKey, this.__store__[key]));
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
				result.push(this.__xkey__[key] + '=' + store[key]);
			}
		}
		return '{' + result.join(',') + '}';
	};

	/**
	 *数组工具类
	 */
	var Arrays = {
		/**
		 *asList([...]); || asList(elem0[, elem1[, elem2[,...]]]);
		 *将指定数组或一到多个元素转化成ArrayList
		 */
		asList: function() {
			var args = arguments,
				arg0 = args[0];
			if (arg0 instanceof Array && args.length === 1) {
				return new ArrayList(arg0);
			}
			return new ArrayList(Array.prototype.slice.call(args));
		},
		/**
		 *binarySearch(ary, target, compareFn);
		 *对有序数组进行二分查找
		 */
		binarySearch: function(ary, target, compareFn) {
			this.__aryCheck__(ary);
			if (target === undefined) throw Error('target must be specified');
			return this.binarySearchRange(ary, 0, ary.length, target, compareFn);
		},
		/**
		 *binarySearchRange(ary, fromIndex, toIndex, target, compareFn);
		 *对有序数组指定范围进行二分查找
		 */
		binarySearchRange: function(ary, fromIndex, toIndex, target, compareFn) {
			this.__aryCheck__(ary);
			this.__rangeCheck__(ary, fromIndex, toIndex);

			var low = fromIndex,
				high = toIndex - 1,
				mid,
				compareFnDefined = compareFn && typeof compareFn === 'function',
				compareResult;
			while (low <= high) {
				mid = Math.floor((low + high) >> 1);
				if (compareFnDefined) {
					compareResult = compareFn(ary[mid], target);
				} else {
					compareResult = ary[mid] - target;
				}
				if (compareResult < 0) {
					low = mid + 1;
				} else if (compareResult > 0) {
					high = mid - 1;
				} else {
					return mid;
				}
			}
			return -1;
		},
		/**
		 *复制指定数组内指定长度的元素
		 */
		copyOf: function(ary, length) {
			this.__aryCheck__(ary);
			if (length === undefined) {
				return ary.slice(0, ary.length);
			}
			if (typeof length !== 'number') {
				throw TypeError('length is not a number');
			}
			return this.copyOfRange(ary, 0, length);
		},
		/**
		 *复制指定数组内指定范围的元素
		 */
		copyOfRange: function(ary, fromIndex, toIndex) {
			this.__rangeCheck__(ary, fromIndex, toIndex);
			return ary.slice(fromIndex, toIndex);
		},
		/**
		 *比较两个指定数组是否相等
		 */
		equals: function(ary0, ary1, equalsFn) {
			if (ary0 === ary1) return true;
			if (ary0.length !== ary1.length) return false;

			var equalsFnDefined = equalsFn && typeof equalsFn === 'function',
				isEquals;
			for (var i = 0, len = ary0.length; i < len; i++) {
				if (equalsFnDefined) {
					isEquals = equalsFn(ary0[i], ary1[i]);
				} else {
					isEquals = ary0[i] === ary1[i];
				}
				if (isEquals) return true;
			}
			return false;
		},
		/**
		 *用指定元素填充指定数组
		 */
		fill: function(ary, elem) {
			this.fillRange(ary, 0, ary.length, elem);
		},
		/**
		 *用指定元素填充指定数组的指定范围
		 */
		fillRange: function(ary, fromIndex, toIndex, elem) {
			this.__rangeCheck__(ary, fromIndex, toIndex);
			for (var i = fromIndex; i < toIndex; i++) {
				ary[i] = elem;
			}
		},
		/**
		 *对指定数组排序
		 */
		sort: function(ary, compareFn) {
			return this.sortRange(ary, 0, ary.length, compareFn);
		},
		/**
		 *对指定数组指定范围排序
		 */
		sortRange: function(ary, fromIndex, toIndex, compareFn) {
			this.__rangeCheck__(ary, fromIndex, toIndex);

			var quickSort = function(ary) {
				if (ary.length <= 1) return ary;
				var pivotIndex = Math.floor(ary.length >> 1),
					pivot = ary.splice(pivotIndex, 1)[0],
					left = [],
					right = [],
					compareFnDefined = compareFn && typeof compareFn === 'function',
					compareResult;
				for (var i = 0, len = ary.length; i < len; i++) {
					if (compareFnDefined) {
						compareResult = compareFn(ary[i], pivot);
					} else {
						compareResult = ary[i] - pivot;
					}
					if (compareResult < 0) {
						left.push(ary[i]);
					} else {
						right.push(ary[i]);
					}
				}
				return quickSort(left).concat([pivot], quickSort(right));
			};

			return quickSort(fromIndex === 0 && toIndex === 0 ? ary : ary.slice(fromIndex, toIndex));
		},
		__aryCheck__: function(ary) {
			if (!(ary instanceof Array)) {
				throw TypeError('not an Array');
			}
		},
		__rangeCheck__: function(ary, fromIndex, toIndex) {
			if (typeof fromIndex !== 'number' || typeof toIndex !== 'number') {
				throw TypeError('fromIndex or toIndex must be a number');
			} else if (fromIndex < 0 || fromIndex > ary.length) {
				throw Error('fromIndex out of bounds');
			} else if (toIndex < 0 || toIndex > ary.length) {
				throw Error('toIndex out of bounds');
			} else if (fromIndex > toIndex) {
				throw Error('fromIndex > toIndex');
			}
		}
	};

	/**
	 *集合工具类
	 */
	var Collections = {
		/**
		 *返回集合中最大的元素
		 */
		max: function(collection, compareFn) {
			this.__collectionCheck__(collection);
			if (collection.isEmpty()) throw Error('collection is empty');

			var iter = collection.iterator(),
				result = iter.next(),
				current,
				compareFnDefined = compareFn && typeof compareFn === 'function',
				compareResult;
			while (iter.hasNext()) {
				current = iter.next();
				if (compareFnDefined) {
					compareResult = compareFn(current, result);
				} else {
					compareResult = current - result;
				}
				if (compareResult > 0) {
					result = current;
				}
			}
			return result;
		},
		/**
		 *返回集合中最小的元素
		 */
		min: function(collection, compareFn) {
			this.__collectionCheck__(collection);
			if (collection.isEmpty()) throw Error('collection is empty');

			var iter = collection.iterator(),
				result = iter.next(),
				current,
				compareFnDefined = compareFn && typeof compareFn === 'function',
				compareResult;
			while (iter.hasNext()) {
				current = iter.next();
				if (compareFnDefined) {
					compareResult = compareFn(current, result);
				} else {
					compareResult = current - result;
				}
				if (compareResult < 0) {
					result = current;
				}
			}
			return result;
		},
		/**
		 *对List进行排序
		 */
		sort: function(list, compareFn) {
			this.__listCheck__(list);

			if (list.isEmpty()) return;

			var ary = Arrays.sort(list.toArray(), compareFn);

			for (var i = 0, len = ary.length; i < len; i++) {
				list.set(i, ary[i]);				
			}
		},
		/**
		 *对有序List进行二分查找 返回索引值
		 */
		binarySearch: function(list, target, compareFn) {
			this.__listCheck__(list);
			
			return Arrays.binarySearch(list.toArray(), target, compareFn);
		},
		/**
		 *将List中的指定元素全部替换为新元素
		 */
		replaceAll: function(list, oldElem, newElem) {
			this.__listCheck__(list);
			var replaced = false,
				iter = list.iterator();
			while (iter.hasNext()) {
				if (list.__equals__(oldElem, iter.next())) {
					iter.set(newElem);
					replaced = true;
				}
			}
			return replaced;
		},
		/**
		 *将List元素反转
		 */
		reverse: function(list) {
			this.__listCheck__(list);

			var size = list.size();
			if (list instanceof ArrayList) {
				for (var i = 0, mid = size >> 1, j = size - 1; i < mid; i++, j--) {
					list.set(i, list.set(j, list.get(i)));
				}
			} else if (list instanceof LinkedList) {
				var forward = list.iterator(),
					backward = list.iterator(list.size()),
					temp;
				for (var i = 0, mid = size >> 1; i < mid; i++) {
					temp = forward.next();
					forward.set(backward.previous());
					backward.set(temp);
				}
			}
		},
		__listCheck__: function(list) {
			if (!(list instanceof List)) throw TypeError('not a List');
		},
		__collectionCheck__: function(collection) {
			if (!(collection instanceof Collection)) throw TypeError('not a Collection');
		}
	};

	
	//Object.keys是ECMAScript 5th Edition中新增函数
	if (!Object.keys) {//如果不是现代浏览器则实现一个Object.keys函数
		Object.keys = (function () {
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
				dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
				dontEnumsLength = dontEnums.length;

			return function (obj) {
				if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
					throw TypeError('Object.keys called on non-object');
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
	};

	var jcollections = {};//jcollections包

	jcollections.Collection = Collection;//Collection接口
	jcollections.List = List;//List接口
	jcollections.Set = Set;//Set接口
	jcollections.Map = Map;//Map接口

	jcollections.ArrayList = ArrayList;
	jcollections.LinkedList = LinkedList;
	jcollections.HashSet = HashSet;
	jcollections.HashMap = HashMap;
	jcollections.Arrays = Arrays;
	jcollections.Collections = Collections;

	//将一到多个模块导入到全局范围 例如jcollections.exports('ArrayList', 'LinkedList');
	jcollections.exports = function() {
		var args = Array.prototype.slice.call(arguments);
		if (args[0] === '*') {
			for (var module in this) {
				if (module === 'exports' || module === 'run') continue;
				global[module] = this[module];
			}
		} else {
			for (var module in this) {
				if (module === 'exports' || module === 'run') continue;
				this[module] && (global[module] = this[module]);
			}
		}
	};

	//沙箱模式
	jcollections.run = function() {
		var callback = Array.prototype.slice.call(arguments).pop(),
			params = /\(.*?\)/.exec(callback + '')[0].replace(/\(|\s+|\)/g, '').split(','),
			applyParams = [];
		
		if (params[0]) {
			for (var i = 0, len = params.length; i < len; i++) {
				var type = params[i],
					legal = this[type] && type !== 'exports' && type !== 'run';
				if (!legal) throw TypeError('no such type: ' + type);
				applyParams.push(this[type]);
			}
		}

		callback.apply(this, applyParams);
	};

	global.jcollections = jcollections;//将jcollections包放置在全局区

	if (typeof define === 'function') {// RequireJS || SeaJS
	    define(function(require, exports, module) {
	        module.exports = jcollections;
	    });
	} else if (typeof exports !== 'undefined') {// NodeJS
	    module.exports = jcollections;
	}

})(this);