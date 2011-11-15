Ext.define('CMN.store.FavoriteStore', {
	extend : 'Ext.data.Store',

	storeId : 'cmn.favorite_store',

	autoLoad : false,

	model : 'CMN.model.Favorite',

	proxy : {
		type : 'ajax',
		url : 'module/CMN/data/favorites.json',
		extraParams : {
			factory : SmartFactory.factory(),
			user : SmartFactory.user()
		},
		reader : {
			type : 'json'
		}
	}
});