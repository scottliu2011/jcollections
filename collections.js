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
	 *集合类型顶级接口
	 */
	function Collection() {};

	//默认的equals函数
	Collection.prototype.__equals__ = function(elem0, elem1) {
		return elem0 === elem1;
	};

	/*
	 *有序集合类型接口
	 */
	var List = function() {}.inherits(Collection);//继承了Collection接口

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

	//@ArrayList
	var ArrayList = function() {
		if (!(this instanceof ArrayList)) {
			return new ArrayList();
		}
		this.__data__ = [];
	}.inherits(List);//ArrayList继承了List

	/**
	 *add(elem0[, elem1, elem2,...]);
	 *添加一到多个元素到list尾部
	 */
	ArrayList.prototype.add = function() {
		this.__data__ = this.__data__.concat(Array.prototype.slice.call(arguments));
	};

	/**
	 *insert(index, elem0[, elem1, elem2,...]);
	 *在指定位置插入一到多个元素
	 */
	ArrayList.prototype.insert = function() {
		var args = arguments,
			index = args[0];

		if (!index || index.constructor !== Number) {
			throw new Error('arguments error.');
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
			throw new Error('not a Collection instance.');
		}
		this.__data__.concat(collection.toArray());
	};

	/**
	 *insertAll(index, collection);
	 *在指定位置插入一个集合对象
	 */
	ArrayList.prototype.insertAll = function(index, collection) {
		if (!index || index.constructor !== Number) {
			throw new Error('index must be specified.');
		}
		if (index < 0 || index > this.__size__) {
			throw new Error('index out of bounds.');
		}
		if (!(collection instanceof Collection)) {
			throw new Error('not a Collection instance.');
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
	 *将集合转换成字符串
	 */	
	ArrayList.prototype.toString = function() {
		return '['+ this.__data__.join(',') + ']';
	};

	/**
	 *iterator();
	 *获取一个迭代器
	 */
	ArrayList.prototype.iterator = function() {
		var ArrayListIterator = function(arrayList) {
			var cursor = 0,
				lastCursor = -1,
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

	//@LinkedList
	var LinkedList = function() {
		if (!(this instanceof LinkedList)) {
			return new LinkedList();
		}
		this.__size__ = 0;
		this.__header__ = {};
		this.__header__.next = this.__header__.previous = this.__header__;
	}.inherits(List);//LinkedList继承了List

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
			throw new Error('index out of bounds.');
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
			throw new Error('no such element in this list.');
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
	 *toArray();
	 *将链表数据转换成数组
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
			throw new Error('not a Collection instance.');
		}
		this.insertAll(this.__size__, collection);
	};

	/**
	 *insertAll(index, collection);
	 *在指定位置插入一个集合对象
	 */
	LinkedList.prototype.insertAll = function (index, collection) {
		if (!index || index.constructor !== Number) {
			throw new Error('index must be specified.');
		}
		if (index < 0 || index > this.__size__) {
			throw new Error('index out of bounds.');
		}
		if (!(collection instanceof Collection)) {
			throw new Error('not a Collection instance.');
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
			throw new Error('no element in this list.');
		}
		return this.__header__.next.elem;
	};
	
	/**
	 *getLast();
	 *获取链表中最后一个结点元素
	 */
	LinkedList.prototype.getLast = function() {
		if (this.__size__ === 0) {
			throw new Error('no element in this list.');
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

	LinkedList.prototype.removeFirst = function() {
		return this.__removeEntry__(this.__header__.next);
	};

	LinkedList.prototype.removeLast = function() {
		return this.__removeEntry__(this.__header__.previous);
	};

	LinkedList.prototype.remove = function(index) {
		return this.__removeEntry__(this.__getEntry__(index));
	};

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

	LinkedList.prototype.removeFirstOccurrence = function(elem) {
		this.removeElement(elem);
	};

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

	LinkedList.prototype.iterator = function() {
		var LinkedListIterator = function(linkedList) {
			this.hasNext = function() {
				
			};
			this.next = function() {
				
			};
			this.remove = function() {
				
			};
		};
		return new LinkedListIterator(this);
	};	


	//@HashSet
	var HashSet = function() {
		if (!(this instanceof HashSet)) {
			return new HashSet();
		}
		this.__data__  = {};
	}.inherits(Collection);//继承了Collection接口



	//@HashMap
	function HashMap() {
		if (!(this instanceof HashMap)) {
			return new HashMap();
		}
		this.__data__ = {};
	}

	HashMap.prototype.put = function(key, value) {

	};

	HashMap.prototype.get = function(key) {

	};

	HashMap.prototype.remove = function(key) {

	};

	HashMap.prototype.size = function() {

	};

	HashMap.prototype.isEmpty = function() {

	};

	HashMap.prototype.containsKey = function(key) {

	};

	HashMap.prototype.containsValue = function(value) {
		
	};

	HashMap.prototype.keySet = function() {
		
	};

	HashMap.prototype.entrySet = function() {
		
	};

	var collections = {};
	collections.ArrayList = ArrayList;
	collections.LinkedList = LinkedList;
	collections.HashSet = HashSet;
	collections.HashMap = HashMap;

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