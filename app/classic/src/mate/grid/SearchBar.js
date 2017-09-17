Ext.define('APP.mate.grid.SearchBar',{
	extend:'Ext.form.Panel',
	xtype:'searchbar',
	//alias:'widget.searchbar',
	frame:false,
	border:false,
	autoScroll:false,
	padding:0,
	margin:0,
	bodyPadding:0,
	layout:'hbox',
	defaults:{hideLabel:false,margin:'0 3 0 0'},
	//defaults:{xtype:'fieldset',layout:'column'},
	fieldDefaults:{msgTarget:'qtip',minWidth:30},
	bodyCls:'x-ui-transparent',
	initComponent:function(){
		var me=this,
			fields=this.fields;
		Ext.apply(this,{
			items:fields,
			listeners:{
				boxready:function(formPanel,options){
					var map=new Ext.util.KeyMap({
						target:this.el,
						key:[10,13],
						handler:function(){
							formPanel.down('button[name=search]').click();
						},
						scope:this
					})					
				}
			 }
		});  
        this.callParent();
		if(!me.hideSearch){
			me.add([
				{xtype:'button',iconCls:'f-mt mt-search',name:'search',text:'查询',handler:this.onSearchClick},
				{xtype:'button',iconCls:'f-mt mt-reset',tooltip:'重置查询条件',handler:this.onRestClick}
			])
		}
	},
//	doFindGrid:function(){
//		var view=this.up('panel');
//		if(!grid.isXType('grid')){
//			grid=grid.down('grid');
//		}
//		console.log(grid)
//		return grid||false;
//	},
	findStore:function(){
		var view=this.up('grid')||this.up('treepanel');
		if(!view){
			var panel=this.up('panel'),
				view=panel.down('grid')||panel.down('treepanel');
		}
		var store=view.getStore();
		return store||false;
	},
	onSearchClick:function(button){
		var formPanel=button.up('form'),
			segmenteds=formPanel.query('segmentedbutton'),
			params=formPanel.getForm().getValues(),
			store=formPanel.findStore();
		if(store){
			if(formPanel.getForm().isValid()){
				if(segmenteds){
					Ext.Array.each(segmenteds,function(segmented){
						//console.log(segmented.name,segmented.value)
						params[segmented.name]=segmented.value;
					});
				}
				Ext.apply(store.proxy.extraParams,params);
				store.loadPage(1);
			}			
		}else{
			console.log('Can not find store!')
		}
	},
	onRestClick:function(button){
		var formPanel=button.up('form'),
			store=formPanel.findStore();
		if(store){
			formPanel.reset();
			Ext.apply(store.proxy.extraParams,formPanel.getForm().getValues());
			if(store.getPageSize()){
				store.loadPage(1);
			}else{
				store.load();
			}
		}else{
			console.log('can not find store!')
		}
	}
})
