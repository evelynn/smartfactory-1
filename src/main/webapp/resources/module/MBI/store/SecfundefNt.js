Ext.define('MBI.store.SecfundefNt', {
	extend: 'Ext.data.Store',

	fields: [
	     	{ name: 'func_desc_eng', type: 'string' },
	    	{ name: 'func_group_name', type: 'string' },
	    	{ name: 'func_name2', type: 'string' },
	    	{ name: 'func_name3', type: 'string' },
	    	{ name: 'ctl_name_8', type: 'string' },
	    	{ name: 'ctl_name_9', type: 'string' },
	    	{ name: 'alt_flag', type: 'string' },
	    	{ name: 'func_name1', type: 'string' },
	    	{ name: 'ctl_name_4', type: 'string' },
	    	{ name: 'ctl_name_5', type: 'string' },
	    	{ name: 'ctl_name_6', type: 'string' },
	    	{ name: 'tabtext', type: 'string' },
	    	{ name: 'ctl_name_10', type: 'string' },
	    	{ name: 'func_id', type: 'string' },
	    	{ name: 'ctl_name_7', type: 'string' },
	    	{ name: 'ctl_name_1', type: 'string' },
	    	{ name: 'assembly_file', type: 'string' },
	    	{ name: 'ctl_name_2', type: 'string' },
	    	{ name: 'ctl_name_3', type: 'string' },
	    	{ name: 'assembly_name', type: 'string' },
	    	{ name: 'func_group', type: 'string' },
	    	{ name: 'icon_index', type: 'string' },
	    	{ name: 'func_code', type: 'string' },
	    	{ name: 'ctrl_flag', type: 'string' },
	    	{ name: 'short_cut', type: 'string' },
	    	{ name: 'func_patn', type: 'string' },
	    	{ name: 'shift_flag', type: 'string' },
	    	{ name: 'func_type_flag', type: 'string' },
	    	{ name: 'help_url', type: 'string' },
	    	{ name: 'hasdsn', type: 'string' },
	    	{ name: 'fac_id', type: 'number' },
	    	{ name: 'shift_flag', type: 'string' },
	    	{ name: 'func_desc', type: 'string' },
	],

	proxy: {
		type: 'ajax',
		url : 'module/MBI/data/secfundef_nt.json',
		extraParams : {
			fac_id : 83,
			func_group : 'TEST',
			func_code : '',
			func_type : 'G'
		},
		reader: {
			type: 'json'
		}
	}
});
