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

	var hightLightColor = {
		'$d':'#66D9D0',//declare
		'$o':'#B92722',//operator
		'$k':'#B92722',//keyword
		'$C':'#A6E22E',//class
		'$c':'#75715E',//comment
		'$m':'#66BE91',//method
		'$n':'#AE81FF',//number
		'$s':'#C8DB5A'//string
	};

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
				demo.tasks['task' + currStep] && demo.tasks['task' + currStep]();
				currStep++;
				if (currStep === demo.codes.length) {
					nextStep.innerHTML = 'restart';
				}
				return;
			}

			var p = document.createElement('p');
			p.innerHTML = paintCodes(step[stepLine++]);

			codePrint.appendChild(p);

			setTimeout(printStep, 500);
		}

		printStep();
	}

	demo.log = function(obj) {
		var p = document.createElement('p');
		p.innerHTML = obj.toString();
		consolePrint.appendChild(p);
	};

	demo.run = function(codes, tasks) {
		demo.codes = codes;
		demo.tasks = tasks;

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
		}, 500);
	};

	global.Demo = demo;

})(window);