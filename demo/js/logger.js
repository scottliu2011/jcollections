(function(global) {
	if (!/Chrome/.test(global.navigator.userAgent)) return;
	var shapeStyle = 'padding:100px;border-radius:150px;background:gray;line-height:250px;',
		leftStyle = 'padding:5px;color:#fff;line-height:3em;background:gray;border:1px solid gray;border-radius:5px 0 0 5px;font-size:14px;font-family:"Microsoft YaHei";',
		rightStyle = 'padding:5px;color:#3079ed;line-height:3em;border:1px solid gray;border-radius:0 5px 5px 0;font-size:14px;font-family:"Microsoft YaHei";'
	console.log('%c ', shapeStyle);
	console.log('%c送给我和我的小伙伴们：%c一个人知道的越多，他画的圆就越大，他的圆所接触到的未知事物就越多。学无止境。', leftStyle, rightStyle);
}(window));