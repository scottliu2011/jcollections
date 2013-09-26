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

	var currStep = 0,
		btnDisabled = false;

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
				btnDisabled = false;
				nextStep.className = '';

				var body = '';

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

		btnDisabled = true;
		nextStep.className = 'disabled';
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

		var regex = /\t|&amp;|&gt;|&lt;/g;
		var ary = preCodes.innerHTML.split('\n\n');
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

		var height = window.innerHeight - 120;
		codePrint.parentNode.style.height = height * 0.7 + 'px';
		consolePrint.parentNode.style.height = height * 0.3 + 'px';
		
		nextStep.onclick = function() {
			if (btnDisabled) return;

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