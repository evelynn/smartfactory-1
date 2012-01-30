Ext.require('Ext.ux.exporter.Exporter');

Ext.define('WIP.view.common.MaterialSelector', {
	/*
	 * 부모 클래스를 정의한다.
	 */
	extend : 'Ext.panel.Panel',

	/*
	 * plugins을 설정한다.
	 */
	plugins : [ ],
	
	/*
	 * 컴포넌트의 기능 관련된 설정을 한다.
	 */
	exportable : true,

	/*
	 * common 뷰인 경우에는 Alias를 정의한다.
	 */
	alias : 'widget.wip_material_selector',

	/*
	 * 컴포넌트 Identification과 관련된 속성을 정의한다. id, title
	 */
	title : 'Find Material',

	/*
	 * 컴포턴트 스타일을 적용한다.
	 */
	cls : 'nav supplement',
	bodyStyle : 'padding:5px',

	/*
	 * 부모 레이아웃과 관련된 자신의 컴포넌트 속성을 정의한다. id, title, flex, width,
	 */
	flex : 1,
	width : 180,

	/*
	 * 컨테이너로서의 속성 : layout, defaults, tools, items 등을 정의한다. 단, 복잡한 items, docked
	 * items 등은 initComponent에서 등록을 권장한다.
	 */
	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	defaults : {
		labelAlign : 'top'
	},

	/*
	 * Init Component 메쏘드를 오버라이드 한다.
	 * 
	 * 1. items (정적인 컴포넌트)를 등록한다. 2. docked item들을 등록한다. 3. callParent()를 호출한다.
	 * 4. 동적인 컴포넌트와 리스너들을 등록한다.
	 */
	initComponent : function() {
		/*
		 * 정적인 컴포넌트들을 등록한다. Docked Item들을 등록한다.
		 */
		this.items = [ this.zfilter, this.zviewmode, this.zgrid ];
		this.bbar = [ this.zcount, this.zsearch, this.zrefresh, this.zexport ];

		/*
		 * 부모의 컴포넌트 초기화 기본 로직을 호출한다.
		 */
		this.callParent();
		
		/*
		 * Observable 관련 등록 (이벤트 등록 등)
		 */
		this.addEvents({
            "materialselected" : true
        });

		/*
		 * 부가적인 작업을 한다. - 동적인 컴포넌트 추가 - 리스너 등록
		 */
		var self = this;

		this.on('render', function() {
			self.refreshGrid(true);
		});

		this.sub('grid').store.on('datachanged', function(store) {
			self.sub('gridCount').setValue(store.count());
		});

		this.sub('searchField').on('specialkey', function(field, e) {
			if (e.getKey() == e.ENTER) {
				self.refreshGrid(false);
			}
		});

		this.sub('refresh').on('click', function() {
			self.refreshGrid(true);
		});

		this.sub('viewmode').on('change', function() {
			self.refreshGrid(false);
		});

		this.sub('include_deleted').on('change', function(check, value) {
			self.refreshGrid(true);
		});

		this.sub('include_deactive').on('change', function(check, value) {
			self.refreshGrid(true);
		});
		
		this.sub('grid').on('itemclick', function(grid, record) {
			self.fireEvent('materialselected', record);
		});
	},

	getGridLocalFilters : function() {
		var filters = [];
		var value = this.sub('searchField').getValue();
		if (value.length > 0) {
			filters.push({
				property : 'MAT_ID',
				value : new RegExp(this.sub('searchField').getValue())
			});
		}
		if (this.sub('include_deleted').getValue()) {
			filters.push({
				property : 'DELETE_FLAG',
				value : 'N'
			});
		}
		if (this.sub('include_deactive').getValue()) {
			filters.push({
				property : 'DEACTIVE_FLAG',
				value : 'N'
			});
		}
		return filters;
	},

	refreshGrid : function(reload) {
		var store = this.sub('grid').store;

		if (this.sub('viewmode').getValue().viewmode != 2) {
			store.clearGrouping();
			this.sub('grid').reconfigure(null, [ {
				text : 'MAT ID',
				flex : 1,
				dataIndex : 'MAT_ID'
			}, {
				text : 'V',
				width : 20,
				dataIndex : 'MAT_VER'
			}, {
				text : 'Desc',
				flex : 1,
				dataIndex : 'MAT_DESC'
			}, {
				text : 'D',
				width : 20,
				dataIndex : 'DELETE_FLAG'
			}, {
				text : 'A',
				width : 20,
				dataIndex : 'DEACTIVE_FLAG'
			} ]);
		} else {
			store.group('MAT_ID');
			this.sub('grid').reconfigure(null, [ {
				text : 'V',
				width : 20,
				dataIndex : 'MAT_VER'
			}, {
				text : 'Desc',
				flex : 1,
				dataIndex : 'MAT_DESC'
			}, {
				text : 'D',
				width : 20,
				dataIndex : 'DELETE_FLAG'
			}, {
				text : 'A',
				width : 20,
				dataIndex : 'DEACTIVE_FLAG'
			} ]);
		}

		store.clearFilter(true);
		store.filter(this.getGridLocalFilters());
		if (reload)
			store.load();
	},

	zfilter : {
		xtype : 'fieldset',
		itemId : 'filters',
		layout : 'anchor',
		defaults : {
			labelSeparator : '',
			anchor : '100%'
		},
		items : [ {
			xtype : 'codeview',
			labelWidth : 70,
			fieldLabel : 'Material Type',
			itemId : 'material_type',
			codeviewName : 'MaterialType',
			txtFieldFlex : [ 1 ],
			txtFieldName : [ 'GROUP_NAME' ],
			filter : [ {
				property : 'factory',
				value : SmartFactory.login.factory()
			} ]
		}, {
			xtype : 'checkboxgroup',
			vertical : true,
			columns : 1,
			items : [ {
				boxLabel : 'Include Deleted Material',
				itemId : 'include_deleted'
			}, {
				boxLabel : 'Include Deactive Material',
				itemId : 'include_deactive'
			} ]
		} ]
	},

	zviewmode : {
		xtype : 'radiogroup',
		itemId : 'viewmode',
		vertical : true,
		layout : 'anchor',
		defaults : {
			anchor : '100%'
		},
		items : [ {
			boxLabel : 'Last active version',
			name : 'viewmode',
			inputValue : 1,
			checked : true
		}, {
			boxLabel : 'Version to tree structure',
			name : 'viewmode',
			inputValue : 2
		}, {
			boxLabel : 'All version',
			name : 'viewmode',
			inputValue : 3
		} ]
	},

	zgrid : {
		xtype : 'grid',
		itemId : 'grid',
		exportTo : 'Materials',
		flex : 1,
		autoScroll : true,
		store : 'WIP.store.MaterialListStore',
		features : Ext.create('Ext.grid.feature.Grouping', {
			groupHeaderTpl : '{name} ({rows.length} Version{[values.rows.length > 1 ? "s" : ""]})'
		}),
		columns : []
	},

	zcount : {
		xtype : 'textfield',
		disabled : true,
		itemId : 'gridCount',
		cls : 'bottomTextField',
		flex : 1
	},

	zsearch : {
		xtype : 'textfield',
		itemId : 'searchField',
		cls : 'bottomTextField',
		flex : 3
	},

	zrefresh : {
		xtype : 'button',
		cls : 'supplementRefresh',
		itemId : 'refresh',
		width : 24
	},

	zexport : {
		xtype : 'exporterbutton',
		width : 24
	}
});
