;(function(global) {
	if (!/webkit/i.test(global.navigator.userAgent)) return;
	var shapeStyle = 'padding:100px;border-radius:150px;background:gray;line-height:250px;',
		textStyle = 'padding:10px 20px;font-size:16px;color:#fff;background:#008287;line-height:50px;font-family:"Microsoft YaHei";',
		textContent = '一个人知道的越多，他的圆就越大，圆周所接触到的未知就越多。路漫漫其修远兮，吾将上下而求索。';
	console.log('%c ', shapeStyle);
	console.log('%c' + textContent, textStyle);
}(this));