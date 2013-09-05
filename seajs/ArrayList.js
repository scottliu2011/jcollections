define(function(require, exports, module) {

	function ArrayList() {
		if (!(this instanceof ArrayList)) {
			return new ArrayList();
		}
		this._data = [];
	}

	/**
	 *add(elem);
	 *add(index, elem);
	 *add(elem0, elem1, elem2,...);
	 */
	ArrayList.prototype.add = function() {
		var args = arguments,
			argsNum = args.length,
			arg0 = args[0],
			arg1 = args[1];
		if (argsNum === 0) {
			throw new Error('arguments required.');
		} else if (argsNum === 1) {
			this._data.push(arg0);
		} else {
			(arg0.constructor === Number && this.insert.call(this, arg0, arg1))
			|| (this._data.concat(Array.prototype.slice.call(args)));
		}
	};

	/**
	 *insert(index, elem);
	 */
	ArrayList.prototype.insert = function(index, elem) {
		if (!index || !elem) {
			throw new Error('arguments error.');
		}
		index = parseInt(index);	//only int is supported.

		var data = this._data,
			temp = [];
		if (index < 0 || index > data.length) {
			throw new Error('index error');
		}
		for (var i = 0; i < index; i++) {
			temp.push(data[i]);
		}
		temp.push(elem);
		for (var i = index; i < data.length; i++) {
			temp.push(data[i]);
		}
		this._data = temp;
	};

	/**
	*set(index, elem);
	*/
	ArrayList.prototype.set = function(index, elem) {
		if (index < 0 || index >= this._data.length) {
			throw new Error('index error');
		}
		this._data[index] = elem;
	}

	/**
	*toArray()
	*/
	ArrayList.prototype.toArray = function() {
		return this._data.slice(0);
	};

	/**
	*get(index);
	*/
	ArrayList.prototype.get = function(index) {
		return this._data[index];
	};

	/**
	*addAll([]);
	*addAll(arrayList);
	*addAll(index, []|arrayList);
	*/
	ArrayList.prototype.addAll = function(collection) {
		if (collection instanceof ArrayList) {
			this._data.concat(collection._data);
		} else if (collection instanceof Array) {
			this._data.concat(collection);
		}
	};

	/**
	*contains(elem);
	*/
	ArrayList.prototype.contains = function(elem) {
		var data = this._data;
		for (var i = 0; i < data.length; i++) {
			if (data[i] === elem) {
				return true;
			}
		}
		return false;
	};

	/**
	*size();
	*/
	ArrayList.prototype.size = function() {
		return this._data.length;
	};

	/**
	*isEmpty();
	*/
	ArrayList.prototype.isEmpty = function() {
		return this._data.length === 0;
	};

	/**
	*clear();
	*/
	ArrayList.prototype.clear = function() {
		this._data.length = 0;
	};

	/**
	*remove(index);
	*/
	ArrayList.prototype.remove = function(index) {
		if (typeof index === 'number') {
			this._data.splice(index, 1);
		}
	};

	/**
	*remove(fromIndex, toIndex);
	*fromIndex inclusive, toIndex exclusive.
	*/
	ArrayList.prototype.removeRange = function(fromIndex, toIndex) {
		this_data.splice(fromIndex, toIndex - fromIndex);
	};

	/**
	*remove(elem);
	*/
	ArrayList.prototype.removeElement = function(elem) {
		var data = this._data;
		for (var i = 0; i < data.length; i++) {
			if (data[i] === elem) {
				data.slice(splice, 1);
				break;
			}
		}
	};	

	/**
	*indexOf(elem);
	*/
	ArrayList.prototype.indexOf = function(elem) {
		var data = this._data;
		for (var i = 0; i < data.length; i++) {
			if (data[i] === elem) {
				return i;
			}
		}
		return -1;
	};

	/**
	*lastIndexOf(elem);
	*/
	ArrayList.prototype.lastIndexOf = function(elem) {
		var data = this._data;
		for (var i = data.length - 1; i >= 0; i--) {
			if (data[i] === elem) {
				return i;
			}
		}
		return -1;
	};
	
	ArrayList.prototype.toString = function() {
		return '['+ this._data.join(',') + ']';
	};

	ArrayList.prototype.iterator = function() {
		var ArrayListIterator = function(arrayList) {
			var cursor = 0,
				modCount = arrayList.size(),
				data = arrayList._data,
				curr;
			this.hasNext = function() {
				return cursor !== arrayList.size();
			};
			this.next = function() {
				curr = data[cursor++];
				return curr;
			};
			this.remove = function() {
				arrayList.remove(cursor);
			};
		};
		return new ArrayListIterator(this);
	};

    return ArrayList;
});
