(function(global, undefined) {
	var demo = {},
		paintCodes = global.paintCodes;

	var $ = function(id) {
		return document.getElementById(id);
	};
	var codePrint = $('codePrint'),
		consolePrint= $('consolePrint'),
		codeTip = $('codeTip'),
		consoleTip = $('consoleTip'),
		nextStep = $('nextStep');

	var currStep = 0;

	var printCode = function() {
		if (currStep >= demo.codes.length) {
			return;
		}

		var step = demo.codes[currStep],
			stepLine = 0;

		function printStep() {
			if (currStep > 0 && stepLine === 0) {
				var p = document.createElement('p');
				p.innerHTML = '&nbsp;';
				codePrint.appendChild(p);
			}
			if (stepLine >= step.length) {//step is over.
				var body = '';

				for (var i = 0; i < step.length; i++) {
					var line = step[i].replace(/\/\/.+$/g, '');
					line = line.replace('console', 'this');
					body += line;
				}

				var varName = demo.varName;

				if (currStep === 0) {
					body += 'this.' + varName + '=' + varName + ';';
				} else {
					body = 'var ' + varName + '=this.' + varName + ';' + body;
				}

				new Function([],body).apply(demo.tasks, []);

				currStep++;
				if (currStep === demo.codes.length) {
					nextStep.innerHTML = 'restart';
				}
				return;
			}

			var p = document.createElement('p');
			p.innerHTML = paintCodes(step[stepLine++]);

			codePrint.appendChild(p);

			setTimeout(printStep, 300);
		}

		printStep();
	}

	demo.log = function(obj) {
		var p = document.createElement('p');
		p.innerHTML = obj.toString();
		consolePrint.appendChild(p);
	};

	demo.run = function() {
		demo.codes = [];
		demo.tasks = new (function() {
			this.log = function(obj) {
				demo.log(obj);
			};
		});

		var preCodes = $('preCodes');
		demo.varName = preCodes.className;

		var pres = preCodes.getElementsByTagName('pre');
		for (var i = 0; i < pres.length; i++) {
			var ary = pres[i].innerHTML.split('\n');
			demo.codes.push(ary);
		}

		nextStep.onclick = function() {
			if (currStep === demo.codes.length) {
				codePrint.innerHTML = '';
				consolePrint.innerHTML = '';
				currStep = 0;
			}
			this.innerHTML = 'next step';
			printCode();
		};

		setInterval(function() {
			codeTip.scrollIntoView();
			consoleTip.scrollIntoView();

			var codeTipStyle = codeTip.style;
			var consoleTipStyle = consoleTip.style;
			codeTipStyle.visibility = codeTipStyle.visibility !== 'hidden' ? 'hidden' : 'visible';
			consoleTipStyle.visibility = consoleTipStyle.visibility !== 'hidden' ? 'hidden' : 'visible';
		}, 300);
	}();

})(window);