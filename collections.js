(function(global, undefined) {

	var collections = {};

	function ArrayList() {
		if (!(this instanceof ArrayList)) {
			return new ArrayList();
		}
		this._data = [];
	}

	ArrayList.prototype.add = function() {
		var args = arguments,
			argsNum = args.length,
			arg0 = args[0],
			arg1 = args[1];
		if (argsNum == 0) {
			throw new Error('error');
		} else if (argsNum == 1) {
			this._data.push(arg0);
		} else {
			arg0.constructor == Number && this.insert.call(this, arg0, arg1);
		}
	};
	ArrayList.prototype.insert = function(index, elem) {
		if (!index || !elem) {
			throw new Error('error');
		}
		index = parseInt(index);	//only int is supported.

		var data = this._data,
			tmp = [];
		if (index < 0 || index > data.length) {
			throw new Error('index error');
		}
		for (var i = 0; i < index; i++) {
			tmp.push(data[i]);
		}
		tmp.push(elem);
		for (var i = index; i < data.length; i++) {
			tmp.push(data[i]);
		}
		this._data = tmp;
	};
	ArrayList.prototype.get = function(index) {
		return this._data[index];
	};
	ArrayList.prototype.addAll = function(ArrayList) {
		this._data.concat(ArrayList);
	};
	ArrayList.prototype.contains = function(elem) {
		var data = this._data;
		for (var i = 0; i < data.length; i++) {
			if (data[i] === elem) {
				return true;
			}
		}
		return false;
	};
	ArrayList.prototype.toString = function() {
		return this._data;
	};
	ArrayList.prototype.size = function() {
		return this._data.length;
	};
	ArrayList.prototype.isEmpty = function() {
		return this._data.length == 0;
	};
	ArrayList.prototype.clear = function() {
		this._data.length = 0;
	};
	ArrayList.prototype.remove = function(arg) {
		if (typeof arg === 'number') {
			this._data.splice(arg, 1);
		} else {
			
		}
	};
	ArrayList.prototype.indexOf = function(elem) {
		var data = this._data;
		for (var i = 0; i < data.length; i++) {
			if (data[i] === elem) {
				return i;
			}
		}
		return null;
	};
	ArrayList.prototype.toString = function() {
		return '['+ this._data.join(',') + ']';
	};
	ArrayList.prototype.iterator = function() {
		var ArrayListIterator = function(ArrayList) {
			var cursor = 0,
				modCount = ArrayList.size(),
				data = ArrayList._data,
				curr;
			this.hasNext = function() {
				return cursor != ArrayList.size();
			};
			this.next = function() {
				curr = data[cursor++];
				return curr;
			};
			this.remove = function() {
				ArrayList.remove(cursor);
			};
		};
		return new ArrayListIterator(this);
	};

	collections.ArrayList = ArrayList;

	collections.expose = function(module) {
		if (module === '*') {
			
		} else {

		}
	};

	global.Collections = collections;

})(window);