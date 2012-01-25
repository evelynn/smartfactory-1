/**
 * @class MBI.store.GrpcolNt
 * @extends Ext.data.Store
 * @author Kyunghyang
 * FormDesigner group columns 설정 정보.
 */
Ext.define('MBI.store.GrpcolNt', {
	extend: 'Ext.data.Store',

	fields : [ {
		name : 'spread_id',
		type : 'number'
	}, {
		name : 'align_type',
		type : 'string'
	}, {
		name : 'table_code',
		type : 'string'
	}, {
		name : 'col_code',
		type : 'string'
	}, {
		name : 'moved_seq_no',
		type : 'number'
	}, {
		name : 'hidden_flag',
		type : 'string'
	}, {
		name : 'seq_no',
		type : 'number'
	}, {
		name : 'spread_level',
		type : 'number'
	}, {
		name : 'group_user_id',
		type : 'number'
	}, {
		name : 'col_alias',
		type : 'string'
	}, {
		name : 'dsgn_group_col_id',
		type : 'number'
	}, {
		name : 'dsgn_id',
		type : 'number'
	}, {
		name : 'col_width',
		type : 'number'
	} ]

});