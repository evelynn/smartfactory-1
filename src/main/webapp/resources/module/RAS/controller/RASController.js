Ext.define('RAS.controller.RASController', {
	extend : 'Ext.app.Controller',

	stores : [ 'RAS.store.ResourceListStore', 'RAS.store.ResourceStore' ],
	models : [ 'RAS.model.Resource' ],
	views : [ 'RAS.view.resource.Resource' ],

	init : function() {
		this.control({
			'viewport' : {
				afterrender : this.onViewportRendered
			}
		});
	},

	onViewportRendered : function() {
		SmartFactory.addDockingNav('RAS.view.NavResource', {
			iconCls : 'iconsetDockResource'
		});
	}
});