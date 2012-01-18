Ext.define('MBI.view.form.builder.ControlBuilder',{
	/*부모 클래스를 정의한다.*/
	/**
	 * @cfg {String} 부모 클래스를 정의한다.
	 */
	extend : 'Ext.toolbar.Toolbar',
	
	/* 부모 레이아웃과 관련된 자신의 컴포넌트 속성을 정의한다. */
	/**
	 * @cfg {Object[]} dock toolbar의 위치를 정의한다.
	 * @cfg {Object[]} height toolbar의 높이를 정의한다.
	 */
	dock : 'bottom',
	cls : 'x-toolbar-footer-docked-bottom',

	/* 컨테이너로서의 속성 : layout, defaults, tools, items 등을 정의한다. 단, 복잡한 items, docked
	 items 등은 initComponent에서 등록을 권장한다. */
	/**
	 * @cfg {String/Object} layout 컴포턴트 layout을 적용한다.
	 * @cfg {Object[]} defaults 컴포넌트에 적용되는 기본 속성을 정의한다.
	 */
	layout : {
		type : 'hbox'
	},
	
	defaults : {

	},
	
	/**
	 * Init Component 메쏘드를 오버라이드 한다.
	 * 
	 * 1. items (정적인 컴포넌트)를 등록한다. 2. docked item들을 등록한다. 3. callParent()를 호출한다.
	 * 4. 동적인 컴포넌트와 리스너들을 등록한다.
	 */
	initComponent : function() {
		/**
		 * 정적인 컴포넌트들을 등록한다. Docked Item들을 등록한다.
		 */
		this.items = [this.zexport,{xtype : 'tbfill'},this.zupdate, this.zdelete, this.zclose];
		
		/***
		 * 부모의 컴포넌트 초기화 기본 로직을 호출한다.
		 */
		this.callParent();
		
		//var self = this;
		
		/***
		 * 부가적인 작업을 한다.
		 * - 동적인 컴포넌트 추가
		 * - 리스너 등록
		 */
		// TODO : 기능 추가
	},
	
	zexport : {
		xtype : 'exporterbutton',
		itemId : 'export',
		floating:false
	},
	zupdate : {
		xtype : 'button',
		width : 80,
		text : 'Update',
		itemId : 'update'
	},
	zdelete : {
		xtype : 'button',
		width : 80,
		text : 'Delete',
		itemId : 'delete'
	}, 
	zclose : {
		xtype : 'button',
		width : 80,
		text : 'Close',
		itemId : 'close'
	}
});

