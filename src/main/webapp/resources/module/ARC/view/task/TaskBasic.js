Ext.define('ARC.view.task.TaskBasic', {
	extend : 'Ext.form.Panel',
	layout : {
		align : 'stretch',
		type : 'vbox'
	},

	bodyPadding : 10,

	initComponent : function() {
		
		this.callParent();

		this.basicStore = this.buildBasicStore();
		this.basicStore.setParams({
			dbName : this.dbName,
			taskId : this.taskId
		});
		
		this.add(this.buildPeriodField());
		this.add(this.buildBackupMethodField());
		this.add(this.buildLogField());
		this.add(this.buildOverWriteField());
		this.add(this.buildMdeletionField());
		this.add(this.buildSdeltionField());
	},
	
	buildBasicStore : function() {
		return Ext.create('ARC.store.BasicStore');
	},
	
	listeners : {
		activate : function(tab) {
			// store load
			this.basicStore.load();
		}
	},

	buttons : [ {
		text : 'SAVE',
		listeners : {
			click : function() {
				alert('SAVE');
			}
		}
	} ],

	buildPeriodField : function() {
		return {
			xtype : 'fieldset',
			title : 'Target Period',
			layout : {
				align : 'stretchmax',
				type : 'hbox'
			},
			items : [ {
				xtype : 'textfield',
				value : 0
			}, {
				xtype : 'label',
				text : 'Term',
				margin : '2, 10, 0, 5'
			}, {
				xtype : 'textfield',
				values : 0,
			}, {
				xtype : 'label',
				text : 'Day',
				margin : '2, 10, 0, 5'
			}, {
				xtype : 'label',
				width : 200,
				text : '20100101 ~ 20111212',
				margin : '2, 0, 0, 0'
			} ]
		};
	},

	buildBackupMethodField : function() {
		return {
			xtype : 'fieldset',
			title : 'Backup Method',
			layout : {
				align : 'stretchmax',
				type : 'hbox'
			},
			items : [ {
				xtype : 'radiofield',
				boxLabel : 'NONE',
				margin : '0, 10, 5, 0'
			}, {
				xtype : 'radiofield',
				boxLabel : 'DB',
				margin : '0, 10, 5, 0'
			}, {
				xtype : 'radiofield',
				boxLabel : 'FILE',
				margin : '0, 10, 5, 0'
			}, {
				xtype : 'radiofield',
				boxLabel : 'DB + FILE',
				margin : '0, 10, 5, 0'
			} ]
		};
	},

	buildLogField : function() {
		return {
			xtype : 'fieldset',
			title : 'Log Type',
			layout : {
				align : 'stretchmax',
				type : 'hbox'
			},
			items : [ {
				xtype : 'radiofield',
				boxLabel : 'Sample',
				margin : '0, 10, 5, 0'
			}, {
				xtype : 'radiofield',
				boxLabel : 'Detail',
				margin : '0, 10, 5, 0'
			}]
		};
	},

	buildOverWriteField : function() {
		return {
			xtype : 'fieldset',
			title : 'Overwrite Flag',
			layout : {
				align : 'stretchmax',
				type : 'hbox'
			},
			items : [ {
				xtype : 'radiofield',
				boxLabel : 'YES',
				margin : '0, 10, 5, 0'
			}, {
				xtype : 'radiofield',
				boxLabel : 'NO',
				margin : '0, 10, 5, 0'
			}]
		};
	},

	buildMdeletionField : function() {
		return {
			xtype : 'fieldset',
			title : 'Master Deletion',
			layout : {
				align : 'stretchmax',
				type : 'hbox'
			},
			items : [ {
				xtype : 'radiofield',
				boxLabel : 'YES',
				margin : '0, 10, 5, 0'
			}, {
				xtype : 'radiofield',
				boxLabel : 'NO',
				margin : '0, 10, 5, 0'
			}]
		};
	},

	buildSdeltionField : function() {
		return {
			xtype : 'fieldset',
			title : 'Slave Deletion',
			layout : {
				align : 'stretchmax',
				type : 'hbox'
			},
			items : [ {
				xtype : 'radiofield',
				boxLabel : 'YES',
				margin : '0, 10, 5, 0'
			}, {
				xtype : 'radiofield',
				boxLabel : 'NO',
				margin : '0, 10, 5, 0'
			}]
		};
	}
});