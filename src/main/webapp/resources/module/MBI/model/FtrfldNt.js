Ext.define('MBI.model.FtrfldNt', {
	extend: 'Ext.data.Model',

	fields : [ {
		name : 'field_val_index',
		type : 'string'
	}, {
		name : 'sheet_id',
		type : 'number'
	}, {
		name : 'func_template_id',
		type : 'number'
	}, {
		name : 'func_tmp_field_id',
		type : 'number'
	}, {
		name : 'fac_id',
		type : 'number'
	}]
});