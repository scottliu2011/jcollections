(function(global, undefined) {

	/**
	 *继承
	 */
	Function.prototype.inherits = function(Parent) {
		if (Parent.constructor !== Function) {
			throw new Error("not a function");
		}
		this.prototype = new Parent();
		this.prototype.constructor = this;
		return this;
	};

	/*
	 *列表接口
	 */
	function List() {
		//...
	};

	//默认的equals函数
	List.prototype.__equals__ = function(elem0, elem1) {
		return elem0 === elem1;
	};

	//@ArrayList

	var ArrayList = function() {
		if (!(this instanceof ArrayList)) {
			return new ArrayList();
		}
		this.__data__ = [];
	}.inherits(List);//ArrayList继承了List

	/**
	 *用于自定义equals函数，例如：
	 *defineEquals(function(elem0, elem1) {
	 *	return elem0.name === elem1.name;
	 *});
	 *两个元素的name属性相同则认为是同一个对象
	 */
	ArrayList.prototype.defineEquals = function(func) {
		this.__equals__ = func;
	};

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
	 *addAll([]);
	 *addAll(arrayList);
	 *添加一个数组或ArrayList对象到list尾部
	 */
	ArrayList.prototype.addAll = function(collection) {
		if (collection instanceof ArrayList) {
			this.__data__.concat(collection.toArray());
		} else if (collection instanceof Array) {
			this.__data__.concat(collection);
		}
	};

	/**
	 *insertAll(index, []);
	 *insertAll(index, arrayList);
	 *插入一个数组或ArrayList对象到指定位置
	 */
	ArrayList.prototype.insertAll = function(index, collection) {
		if (index.constructor !== Number) {
			throw new Error('the position must be specified.');
		}
		if (collection instanceof ArrayList) {
			this.__data__.concat(collection.toArray());
		} else if (collection instanceof Array) {
			this.__data__.concat(collection);
		}
	};

	/**
	*contains(elem);
	*/
	ArrayList.prototype.contains = function(elem) {
		var data = this.__data__;
		for (var i = 0; i < data.length; i++) {
			if (this.__equals__(data[i], elem)) {
				return true;
			}
		}
		return false;
	};

	/**
	*size();
	*/
	ArrayList.prototype.size = function() {
		return this.__data__.length;
	};

	/**
	*isEmpty();
	*/
	ArrayList.prototype.isEmpty = function() {
		return this.__data__.length === 0;
	};

	/**
	*clear();
	*/
	ArrayList.prototype.clear = function() {
		this.__data__.length = 0;
	};

	/**
	*remove(index);
	*/
	ArrayList.prototype.remove = function(index) {
		if (typeof index === 'number') {
			this.__data__.splice(index, 1);
		}
	};

	/**
	*remove(elem);
	*/
	ArrayList.prototype.removeElement = function(elem) {
		var data = this.__data__;
		for (var i = 0; i < data.length; i++) {
			if (this.__equals__(data[i], elem)) {
				data.splice(i, 1);
				break;
			}
		}
	};

	/**
	*remove(fromIndex, toIndex);
	*fromIndex inclusive, toIndex exclusive.
	*/
	ArrayList.prototype.removeRange = function(fromIndex, toIndex) {
		this.__data__.splice(fromIndex, toIndex - fromIndex);
	};

	/**
	*indexOf(elem);
	*/
	ArrayList.prototype.indexOf = function(elem) {
		var data = this.__data__;
		for (var i = 0; i < data.length; i++) {
			if (this.__equals__(data[i], elem)) {
				return i;
			}
		}
		return -1;
	};

	/**
	*lastIndexOf(elem);
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
	
	ArrayList.prototype.toString = function() {
		return '['+ this.__data__.join(',') + ']';
	};

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

	LinkedList.prototype.__addBefore__ = function(entry) {
		var newEntry = {elem:elem, next:entry, previous:next.previous};
		newEntry.previous.next = newEntry;
		newEntry.next.previous = newEntry;
		this.__size__++;
	};

	/**
	 *add(elem);
	 *appends the specified element to the end of this list.
	 */
	LinkedList.prototype.add = function(elem) {
		this.__addBefore__(this.__header__);
	};

	/**
	 *insert(index, elem);
	 *inserts the specified element at the specified position in this list.
	 */
	LinkedList.prototype.insert = function(index, elem) {
		this.__addBefore__(this.__header__.next);
	};

	/**
	 *addFirst(elem);
	 *inserts the specified element at the beginning of this list.
	 */
	LinkedList.prototype.addFirst = function(elem) {
		this.__addBefore__(this.__header__.next);
	};

	/**
	*appends the specified element to the end of this list.
	*/
	LinkedList.prototype.addLast = function(elem) {
		this.__addBefore__(this.__header__);
	};

	//@HashSet

	function HashSet() {
		if (!(this instanceof HashSet)) {
			return new HashSet();
		}
		this.__data__  = {};	
	}

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
				if (elem !== 'expose') {
					global[elem] = collections[elem];
				}
			}
		} else {
			collections[module] && (global[module] = collections[module]);
		}
	};

})(window);