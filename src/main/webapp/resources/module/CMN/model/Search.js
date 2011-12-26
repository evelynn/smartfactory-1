Ext.define('CMN.model.Search', {
	extend : 'Ext.data.Model',

	fields : [ {
		name : 'kind',
		type : 'string'
	}, {
		name : 'key',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'desc',
		type : 'string'
	}, {
		name : 'handler',
		type : 'function'
	} ]
});
