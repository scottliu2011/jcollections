var getRender = (function (cache, $) {
		return function (str, data) {
		console.log(str);
		console.log(data);
			var fn = !/\s/.test(str)
				? cache[str] = cache[str] || getRender(document.getElementById(str).innerHTML)
				: function (data) {
					var i, variable = [$], value = [[]];
					for (i in data) {
						variable.push(i);
						value.push(data[i]);
					};
					return (new Function(variable, fn.$)).apply(data, value).join("");
				};
			
			fn.$ = fn.$ || $ + ".push('" 
				+ str.replace(/\\/g, "\\\\")
				 	.replace(/[\r\t\n]/g, " ")
				 	.split("<#").join("\t")
				 	.replace(/((^|#>)[^\t]*)'/g, "$1\r")
				 	.replace(/\t=(.*?)#>/g, "',$1,'")
				 	.split("\t").join("');")
				 	.split("#>").join($ + ".push('")
				 	.split("\r").join("\\'")
				+ "');return " + $;

			return data ? fn(data) : fn;

		}
	})({}, '$' + (+ new Date));

/*(function(global, undefined) {
	
	"use strict";

	var getRender = (function (cache, $) {
		return function (str, data) {
		
			var fn = !/\s/.test(str)
				? cache[str] = cache[str] || getRender(document.getElementById(str).innerHTML)
				: function (data) {
					var i, variable = [$], value = [[]];
					for (i in data) {
						variable.push(i);
						value.push(data[i]);
					};
					return (new Function(variable, fn.$)).apply(data, value).join("");
				};
			
			fn.$ = fn.$ || $ + ".push('" 
				+ str.replace(/\\/g, "\\\\")
				 	.replace(/[\r\t\n]/g, " ")
				 	.split("<#").join("\t")
				 	.replace(/((^|#>)[^\t]*)'/g, "$1\r")
				 	.replace(/\t=(.*?)#>/g, "',$1,'")
				 	.split("\t").join("');")
				 	.split("#>").join($ + ".push('")
				 	.split("\r").join("\\'")
				+ "');return " + $;

			return data ? fn(data) : fn;

		}
	})({}, '$' + (+ new Date));

})(window);*/