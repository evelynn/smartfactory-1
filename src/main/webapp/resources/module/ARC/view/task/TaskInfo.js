Ext.define('ARC.view.task.TaskInfo', {
	extend : 'Ext.form.Panel',
	layout : {
		align : 'stretch',
		type : 'vbox'
	},
	 
	autoScroll : true,
	
	bodyPadding : 10,
	
	initComponent : function() {
		this.callParent();
		
		var self = this;
		
		this.basicStore = this.bulidBasicStore();
		this.masterStore = this.bulidMasterStore();
		this.slaveStore = this.bulidSlaveStore();
	
		this.basicGrid = this.add(this.buildBasicGrid());
		this.MasterGrid = this.add(this.buildMasterGrid());
		this.conditionField = this.add(this.buildConditionField());
		this.SlaveGrid = this.add(this.buildSlaveGrid());
		
		//TaskInfoStore Data Change 발생시 onStoreChanged 함수호출
		this.taskInfoStore.on('datachanged',this.onStoreChanged, this);
		
		this.down('[itemId=delete]').on('click', function(){
			Ext.Ajax.request({
			    url: 'module/ARC/data/createorreplacetask.json',
			    method: 'POST',
			    params:  
		        { 
			    	txttask:self.taskId, 
			    	cbdbname:self.dbName,
			    	processtype:"D"
		        },        
			    success: function(response, opts) {
			        var obj = Ext.decode(response.responseText);
			        if(obj.success == true)
		        	{
			        	Ext.Msg.alert('Success', obj.msg);
		        	}
			        else
		        	{
			        	Ext.Msg.alert('Failed', obj.msg);
		        	}
			    },
			    failure: function(response, opts) {
			        console.log('server-side failure with status code ' + response.status);
			        Ext.Msg.alert('Failed', 'server-side failure with status code ' + response.status);
			    }
			});
		});
	},
	
	
	bulidBasicStore : function()
	{
		return Ext.create('ARC.store.BasicStore');
	},
	
	bulidMasterStore : function()
	{
		return Ext.create('ARC.store.MasterStore');
	},
	
	bulidSlaveStore : function()
	{
		return Ext.create('ARC.store.SlaveStore');
	},
	
	onStoreChanged : function() {
		this.basicStore.loadData(this.taskInfoStore.getAt(0).data['taskBasic']);
		this.masterStore.loadData(this.taskInfoStore.getAt(0).data['taskMaster']);
		this.slaveStore.loadData(this.taskInfoStore.getAt(0).data['taskSlave']);
	},

	buttons : [ {
		text : 'DELETE',
		itemId : 'delete'
		/*listeners : {
			click: function() {
				
				 
	        }
		}*/
	},{
		text : 'LIST',
		listeners : {
			click: function() {
	            alert('LIST');
	        }
		}
	}],

	buildTEST : function() {
		return {
			xtype : 'panel',
			title : 'Basic Task Option'
		};
	},

	buildBasicGrid : function() {
		return {
			xtype : 'gridpanel',
			title : 'Basic Task Option',
			margins : '0 0 5 0',
			store : this.basicStore,
			flex : 2,
			columns : [ {
				xtype: 'templatecolumn',
				header : 'Period',
				tpl:'{TERM} / {DAYS}',
				flex : 1,
				align : 'center'
			}, {
				header : 'Backup Method',
				dataIndex : 'BACKUP_METHOD',
				flex : 1,
				align : 'center'
			}, {
				header : 'Overwrite Flag',
				dataIndex : 'OVERWRITE_FLAG',
				flex : 1,
				align : 'center'
			}, {
				header : 'MasterTable Deletion',
				dataIndex : 'MASTER_DELETION',
				flex : 1,
				align : 'center'
			}, {
				header : 'SlaveTable Deletion',
				dataIndex : 'SLAVE_DELETION',
				flex : 1,
				align : 'center'
			}, {
				header : 'Log Type',
				dataIndex : 'LOG_TYPE',
				flex : 1,
				align : 'center'
			}, {
				xtype : 'actioncolumn',
				header : 'EDIT',
				align : 'center',
				flex : 1,
				items : [ {
					icon : 'image/iconEdit16.png',
					tooltip : 'EDIT',
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						alert(rec.get('taskId'));
					}
				} ]
			} ]
		};
	},

	buildMasterGrid : function() {
		return {
			xtype : 'gridpanel',
			title : 'Master Task Option',
			flex : 2,
			store : this.masterStore,

			columns : [ {
				header : 'Table Name',
				dataIndex : 'MASTER_TABLE',
				flex : 2
			}, {
				header : 'Key Field1',
				dataIndex : 'KEY_FIELD1',
				flex : 2
			}, {
				header : 'Key Field2',
				dataIndex : 'KEY_FIELD2',
				flex : 2
			}, {
				header : 'Key Field3',
				dataIndex : 'KEY_FIELD3',
				flex : 2
			}, {
				header : 'Key Field4',
				dataIndex : 'KEY_FIELD4',
				flex : 2
			}, {
				header : 'Key Field5',
				dataIndex : 'KEY_FIELD5',
				flex : 2
			}, {
				header : 'Term Field',
				dataIndex : 'TERM_FIELD',
				flex : 2
			}, {
				xtype : 'actioncolumn',
				header : 'EDIT',
				align : 'center',
				flex : 1,
				items : [ {
					icon : 'image/iconEdit16.png',
					tooltip : 'EDIT',
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						alert(rec.get('taskId'));
					}
				} ]
			}  ]
		};
	},

	buildConditionField : function() {
		return {
			xtype:'panel',
			title: 'additional conditions',
            layout: 'anchor',
            cls : 'noBorderPanel',
            defaults: {
                anchor: '100%' 
            },
            items : [ {
				xtype : 'textareafield'
			} ]
		};
	},
			
	buildSlaveGrid : function() {
		return {
			xtype : 'gridpanel',
			title : 'Slave Task Option',
			flex : 6,
			store : this.slaveStore,

			columns : [ {
				header : 'Table Name',
				dataIndex : 'SLAVE_TABLE',
				flex : 2
			}, {
				header : 'Key Field1',
				dataIndex : 'SLAVE_KEY_FIELD1',
				flex : 2
			}, {
				header : 'Key Field2',
				dataIndex : 'SLAVE_KEY_FIELD2',
				flex : 2
			}, {
				header : 'Key Field3',
				dataIndex : 'SLAVE_KEY_FIELD3',
				flex : 2
			}, {
				header : 'Key Field4',
				dataIndex : 'SLAVE_KEY_FIELD4',
				flex : 2
			}, {
				header : 'Key Field5',
				dataIndex : 'SLAVE_KEY_FIELD5',
				flex : 2
			}, {
				xtype : 'actioncolumn',
				header : 'EDIT',
				align : 'center',
				flex : 1,
				items : [ {
					icon : 'image/iconEdit16.png',
					tooltip : 'EDIT',
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						alert(rec.get('taskId'));
					}
				} ]
			}   ]
		};
	}
});
