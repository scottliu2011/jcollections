var s = 'var i = 3';

var ary = [];

for (var i = 0; i < s.length; i++) {
	ary.push(s[i]);
}

console.log(ary);

var keywords = ['var', 'new', 'while'];
var separators = [' ', ',', '(', '{'];
var operators = ['+', '-', '++', '--', '/', '%', '=', '==', '==='];

function scan(ary) {
	var curr = 0,
		size = ary.length;
	for (var i = curr; i < size; i++) {
		var start = ary[curr];
		if (start === 'v') {
			var retVal = forward(ary, curr, 3);
			if (retVal === 'var') {
				var colorSpan = paint('blue', retVal);
				console.log(colorSpan);
			}
			curr += 3;
			continue;
		}	
		if (start === '/') {
			var retVal = forward(ary, curr, 1);
			if ([start].concat(retVal).join('') === '//') {
				var result = paint('red', ary.join(''));
				document.body.innerHTML = result;
				break;
			}
		}

		//Array.prototype.splice.apply(ary, curr, )
	}

	function forward(ary, curr, step) {
		var result = [];
		for (var i = curr; i < curr+step; i++) {
			result.push(ary[i]);
		}
		return result;
	}

	function paint(color, value) {
		return '<span style="color:' + color + '">' + value + "</span>";
	}
}

scan(ary);