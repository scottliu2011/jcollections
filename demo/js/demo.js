(function(global, doc, undefined) {
	var demo = {},
	
	paintCodes = global.paintCodes,

	$ = function(id) {
		return doc.getElementById(id);
	},
	codePrint = $('codePrint'),
	consolePrint= $('consolePrint'),
	codeTip = $('codeTip'),
	consoleTip = $('consoleTip'),
	nextStep = $('nextStep'),
	outputTip = $('outputTip'),

	currStep = 0,
	btnDisabled = false,

	printCode = function() {
		if (currStep >= demo.codes.length) {
			return;
		}

		var step = demo.codes[currStep],
			stepLine = 0;

		function printStep() {
			if (currStep > 0 && stepLine === 0) {
				var p = doc.createElement('p');
				p.innerHTML = '&nbsp;';
				codePrint.appendChild(p);
				outputTip.style.display = 'none';
			}
			if (stepLine >= step.length) {//step is over.
				btnDisabled = false;
				nextStep.className = '';

				var body = '';

				if (currStep > 0) {
					body = 'this.log("&nbsp;");';
				}

				for (var i = 0; i < step.length; i++) {
					var line = step[i].replace(/\/\/.+$/g, '');
					line = line.replace('console', 'this');
					body += line;
				}

				var varName = demo.varName;

				if (varName) {
					if (currStep === 0) {
						body += 'this.' + varName + '=' + varName + ';';
					} else {
						body = 'var ' + varName + '=this.' + varName + ';' + body;
					}
				}

				new Function([],body).apply(demo.tasks, []);

				outputTip.style.display = 'inline-block';

				currStep++;
				if (currStep === demo.codes.length) {
					nextStep.innerHTML = '重新开始';
				}
				return;
			}

			var p = doc.createElement('p');
			p.innerHTML = paintCodes(step[stepLine++]);

			codePrint.appendChild(p);

			setTimeout(printStep, 300);
		}

		printStep();

		btnDisabled = true;
		nextStep.className = 'disabled';
	};

	demo.log = function(obj) {
		var p = doc.createElement('p');
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

		var regex = /\t|&amp;|&gt;|&lt;/g;
		var ary = preCodes.innerHTML.split('$');//\n\n is replaced by $, for ie8-
		for (var i = 0; i < ary.length; i++) {
			var stepCodes = ary[i].split('\n');
			for (var j = 0; j < stepCodes.length; j++) {
				stepCodes[j] = stepCodes[j].replace(regex, function(value) {
					if (value === '\t') return '    ';
					if (value === '&amp;') return '&';
					if (value === '&gt;') return '>';
					if (value === '&lt;') return '<';
				});
			}
			demo.codes.push(stepCodes);
		}

		var height = (global.innerHeight || doc.documentElement.clientHeight) - 120;
		codePrint.parentNode.style.height = height * 0.7 + 'px';
		consolePrint.parentNode.style.height = height * 0.3 + 'px';

		var tplImg = $('tplImg');
		if (tplImg) {
			var width = (global.innerWidth || doc.documentElement.clientWidth) - 60;
			tplImg.style.width = width * 0.5 + 'px';
		}
		
		nextStep.onclick = function() {
			if (btnDisabled) return;

			if (currStep === 0) {
				codePrint.innerHTML = '';
			}

			if (currStep === demo.codes.length) {
				codePrint.innerHTML = '';
				consolePrint.innerHTML = '';
				if (demo.varName === 'data') {
					consolePrint.innerHTML = '<div id="view"></div>';
				}
				currStep = 0;
			}
			this.innerHTML = '下一步';
			printCode();
		};

		setInterval(function() {
			codeTip.scrollIntoView();
			consoleTip.scrollIntoView();

			codeTip.className = codeTip.className ? '' : 'hidden';
			consoleTip.className = consoleTip.className ? '' : 'hidden';
		}, 300);
	}();

})(window, document);