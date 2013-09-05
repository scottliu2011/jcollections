(function(global, undefined) {
	var demo = {};

	var $ = function(id) {
		return document.getElementById(id);
	};
	var codePrint = $('codePrint'),
		consolePrint= $('consolePrint'),
		codeTip = $('codeTip'),
		consoleTip = $('consoleTip'),
		nextStep = $('nextStep');

	var hightLightColor = {
		'$declare':'#66D9D0',
		'$operator':'#B92722',
		'$keyword':'#B92722',
		'$class':'#A6E22E',
		'$comment':'#75715E',
		'$method':'#66BE91',
		'$number':'#AE81FF',
		'$string':'#C8DB5A'
	};

	var currStep = 0;

	var printCode = function() {
		if (currStep >= demo.codes.length) {
			return;
		}

		function highLightCode(code) {
			var regex = /\$\w*?\{.*?\}/g;//lazy pattern(*?)
			return code.replace(regex, function(s) {
				var i = s.indexOf('{');
				var type = s.substring(0, i);
				var wrap = s.substring(i);
				var color = hightLightColor[type];
				var code = wrap.replace(/\{|\}/g, '');
				return '<span style="color:'+color+'">'+code+'</span>';
			});
		}

		var step = demo.codes[currStep], stepLine = 0;

		function printStep() {
			if (currStep > 0 && stepLine == 0) {
				var p = document.createElement('p');
				p.innerHTML = '&nbsp;';
				codePrint.appendChild(p);
			}
			if (stepLine >= step.length) {//step is over.
				demo.tasks['task' + currStep] && demo.tasks['task' + currStep]();
				currStep++;
				if (currStep == demo.codes.length) {
					nextStep.innerHTML = 'restart';
				}
				return;
			}

			var p = document.createElement('p');
			p.innerHTML = highLightCode(step[stepLine++]);
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
			if (currStep == demo.codes.length) {
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
			codeTipStyle.visibility = codeTipStyle.visibility != 'hidden' ? 'hidden' : 'visible';
			consoleTipStyle.visibility = consoleTipStyle.visibility != 'hidden' ? 'hidden' : 'visible';
		}, 500);
	};

	global.Demo = demo;

})(window);