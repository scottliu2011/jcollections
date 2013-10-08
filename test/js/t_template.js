jcollections.exports('Template', 'HashMap');

/* the data-model */
var data = new HashMap();

data.put('title', 'students');

var list = new ArrayList();
list.add({id:0, name:'scott'});
list.add({id:1, name:'bill'});
list.add({id:2, name:'jobs'});

data.put('list', list);

Template.create('tpl')
		.compile(data)
		.render('view');