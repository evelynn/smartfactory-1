/**
 * @class CMN.view.form.CodeViewField
 * 
 *     @example
 *     // 특정 테이블 코드팝업기능 필드
 *     	SmartFactory.codeview.register('MaterialType', {
 *			viewType : 'gcm', 
 *			title : 'Select Material Type',//override
 *			selects : [ 'FACTORY', 'GROUP_NAME', 'MODEL_DESC_S' ]
 *			table : 'MATERIAL_GRP_2',
 *			columns : [ {
 *				header : 'Material Type',
 *				dataIndex : 'GROUP_NAME',
 *				flex : 2
 *			}, {
 *				header : 'Description',
 *				dataIndex : 'MODEL_DESC_S',
 *				flex : 3
 *			} ],
 *		});
 *	
 *      {
 *      	xtype : 'codeview',
 *      	codeviewName : 'MaterialType',
 *      	filter : [{
 *      		property : 'factory',
 *      		value : SmartFactory.login.factory()
 *      	}],
 *      	txtFieldName : ['MAT_ID','MAT_VER'],
 *      	txtFieldFlex : [2,1],
 *      	bInitFilter : true,
 *      	fieldLabel : 'Product ID'
 *      }
 *
 *     //상세 설정
 *     {
 *			xtype : 'codeview',
 *			codeviewName : 'GcmCodeView',
 *			title : 'TEST CODE',
 *			fieldLabel : 'TEST ID',
 *			table : 'MWIP',
 *			txtFieldName : ['TEST_ID','TEST_NAME'], //displayField와 동일하게 사용
 *			columns : [],
 *			selects : [],
 *			name : 'TEST_ID',
 *			refGcmCol : 'TEST_OWNER', //option
 *			refField : 'TEST_OWNER' //option
 *     } 
 * 
 */
Ext.define('CMN.view.form.CodeViewField', {
	/**
	 * 
	 */
	extend : 'Ext.form.FieldContainer',
	/**
	 * 
	 */
	alias: 'widget.codeview',
	/**
	 * 
	 */
	cls :'hboxLine',
	/**
	 * 
	 */
	layout: {
        type: 'hbox',
        align:'top'
    },
    /**
     * 
     */
    defaults:{margins:'0 3 0 0'},
    
    /**
     * 
     * @param config
     */
    constructor : function(config) {
    	Ext.applyIf(this,{
    		filter : [],
    		txtFieldFlex : [ 1 ],
    		bInitFilter: true
    	});
    	CMN.view.form.CodeViewField.superclass.constructor.apply(this, arguments);
	},
	
	/**
	 * 
	 */
	initComponent : function() {
		this.callParent();
	
		this.add(this.buildTxtfield());
		this.add(this.buildSerach());
	},

	/**
	 * 
	 * @returns {Array}
	 */
	buildTxtfield : function()
	{
		var items = [];
		var txtField = this.txtFieldName;
		var txtWidth = this.txtFieldFlex;
		
		if(txtField instanceof Array) {
			for(var i in txtField) {
				var fieldName = txtField[i];
				if(this.name instanceof Array)
					fieldName = this.name[i];
				else if(this.name && i<1)
					fieldName = this.name;
				
				items.push({
					listeners : {
						specialkey : function(textfield, e) {
		                    if (e.getKey() != e.ENTER)
		                    	return;
		                    var fieldset = this.up('fieldcontainer');
		                    SmartFactory.codeview.show(fieldset.codeviewName, fieldset.filter, fieldset.selectedCallback, fieldset);
						}
					},
					xtype: 'textfield',
					//name: txtField[i],
					name : fieldName,
					itemId: txtField[i],
					flex: txtWidth[i]
				});
			}
		} else {
			var fieldName = txtField;
			if (this.name) fieldName = this.name;
			items.push({
				listeners : {
					specialkey : function(textfield, e) {
	                    if (e.getKey() != e.ENTER)
	                    	return;
	                    var fieldset = this.up('fieldcontainer');
	                    SmartFactory.codeview.show(fieldset.codeviewName, fieldset.filter, fieldset.selectedCallback, fieldset);
	            	}
				},
				xtype: 'textfield',
				name: fieldName,
				itemId: txtField,
				flex: txtWidth
			});
		}
		
		return items;
	},
	
	/**
	 * 
	 * @returns {___anonymous3037_3332}
	 */
	buildSerach : function()
	{
		return {
			xtype: 'button',
			iconCls:'btnCodeView',
			handler: function(){
				var fieldset = this.up('fieldcontainer');
            	//var refVal = fieldset.up('form').getValues();
				SmartFactory.codeview.show(fieldset.codeviewName, fieldset.filter, fieldset.selectedCallback, fieldset);
			}
		};
	},
	
	/**
	 * 
	 * @param fieldset
	 * @param record
	 */
	selectedCallback : function(fieldset, record) {
		var codeview = SmartFactory.codeview.get(fieldset.codeviewName);
		var txtField = codeview.client.txtFieldName;
		
		if(txtField instanceof Array) {
			for(var i in txtField) 
			{	
				var field = fieldset.getComponent(txtField[i]);
				
				if(field && field.itemId == txtField[i])
				{
					field.setRawValue(record.get(txtField[i]));
				}
			}
		} else {
			var field = fieldset.getComponent(txtField);

			if(field && field.itemId == txtField)
			{
				field.setRawValue(record.get(txtField));
			}
		}
	}
});

