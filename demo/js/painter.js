(function(global, undefined){
	var keywords = [
		'break', 'case', 'catch', 'continue', 'default', 'delete',
		'do', 'else', 'false', 'finally', 'for', 'function',
		'if', 'in', 'instanceof', 'new', 'null', 'return',
		'switch', 'this', 'throw', 'true', 'try', 
		'typeof', 'var', 'void', 'while', 'with'
	],
	separators = [' ', '.', ':', ',', ';', '(', ')', '{', '}', '[', ']'],
	operators = [
		'+', '++', '-', '--', '=', '==', '===', '*', '/', '%',
		'>', '<', '>=', '<=', '&', '&&', '|', '||', '>>', '>>>',
		'<<', '^', '~', '!', '!=', '!==', '+=', '-=', '*=', '/=',
		'%=', '&=', '|=', '^=', '>>=', '>>>=', '<<='
	],
	aryFn = Array.prototype,
	strFn = String.prototype;

	aryFn.contains = function(elem) {
		if (this.indexOf) {
			return this.indexOf(elem) > -1;
		}
		for (var i in this) {
			if (this[i] === elem) {
				return true;
			}
		}
		return false;
	};

	strFn.toArray = function() {
		var ary = [];
		for (var i = 0; i < this.length; i++) {
			ary.push(this.charAt(i));
		}
		return ary;
	};

	global.paintCodes = function(line) {

		var ary = line.toArray(),
			index = 0;

		line.replace(/^\s+/, function(value) {
			index += value.length;
		});

		while (index < ary.length) {
			
			var curr = ary[index];

			if (separators.contains(curr)) {
				index++;
				continue;
			}

			if (curr === '/' && (ary[index + 1] === '/')) {
				var comment = ary.splice(index).join('');
				aryFn.splice.apply(ary, [index, ary.length - index].concat(wrap('comment', comment)));
				break;
			}

			if (curr === '\'' || curr === '"') {
				var content = lookFor(curr),
					len = content.length;
				update(wrap('string', content));
				continue;
			}

			var str = forward(index),
				len = str.length;

			if (ary[index - 1] === ' ' && ary[index + len] === '(') {
				update(wrap('class', str));
				continue;
			}
			
			if (ary[index - 1] === '.') {
				if (ary[index + len] === '(') {
					update(wrap('method', str));	
				} else {
					update(wrap('property', str));
				}
				continue;
			}

			if (keywords.contains(str)) {
				update(wrap('keyword', str));
				continue;
			}

			if (operators.contains(str)) {
				update(wrap('operator', str));
				continue;
			}

			if (/^-?\d+$/.test(str)) {
				if (ary[index + len] === '.') {
					str = str + '.' + forward(index + len + 1);
					len = str.length;
				}
				update(wrap('number', str));
				continue;
			}

			index += str.length;
		}

		function update(replaceAry) {
			aryFn.splice.apply(ary, [index, len].concat(replaceAry));
			index += replaceAry.length;
		}

		function lookFor(str) {
			var result = [curr];
			for (var i = index + 1; i < ary.length; i++) {
				result.push(ary[i]);
				if (ary[i] === str && ary[i - 1] !== '\\') {
					break;
				}
			}
			return result.join('');
		}

		function forward(curr) {
			var result = [];
			for (var i = curr; i < ary.length; i++) {
				if (separators.contains(ary[i])) {
					break;
				}
				result.push(ary[i]);
			}
			return result.join('');
		}

		function wrap(className, value) {
			var span = '<span class="' + className + '">' + value + '</span>';
			return span.toArray();
		}
		
		return ary.join('');
	};
})(window);