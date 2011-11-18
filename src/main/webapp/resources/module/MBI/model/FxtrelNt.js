Ext.define('MBI.model.FxtrelNt', {
	extend: 'Ext.data.Model',

	fields : [ {
		name : 'template_name',
		type : 'string'
	}, {
		name : 'report_seq',
		type : 'number'
	}, {
		name : 'report_name',
		type : 'string'
	}, {
		name : 'template_id',
		type : 'number'
	}, {
		name : 'func_template_id',
		type : 'number'
	}, {
		name : 'func_id',
		type : 'number'
	}, {
		name : 'template_filename',
		type : 'string'
	}, {
		name : 'fac_id',
		type : 'number'
	}]
});