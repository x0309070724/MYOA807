Ext.define('APP.view.ia.account.change.updateForm',{
    extend:'Ext.form.Panel',
	xtype:'iaAccountChangeUpdateForm',
    controller:'ia.account.change',
	width:480,
	viewModel:true,
	//defaults:{layout:'column',border:false,xtype:'container',flex:1,layout:'anchor'},
	items:[
		{collapsible:false,items:[
			{columnWidth:1,defaults:{labelAlign:'top'},items:[
				{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'将「账户权限」更新为',items:[
					{xtype:'comboAccountRole',name:'roleid',allowBlank:false,flex:.8,emptyText:'账户权限',bind:{disabled:'{!isRoleid.checked}'}},
					{boxLabel:'更改',xtype:'checkbox',reference:'isRoleid',flex:.2,margin:'0 0 0 20'}
				]},
				{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'将「账户性质」更新为',items:[
					{xtype:'comboAccountProperty',name:'propertyid',allowBlank:false,flex:.8,emptyText:'账户性质',bind:{disabled:'{!isPropertyid.checked}'}},
					{boxLabel:'更改',xtype:'checkbox',reference:'isPropertyid',flex:.2,margin:'0 0 0 20'}
				]},

				{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'将「组」更新为',items:[
					{xtype:'comboAccountGroup',name:'group',allowBlank:false,flex:.8,emptyText:'组',bind:{disabled:'{!isMt4Group.checked}'}},
					{boxLabel:'更改',xtype:'checkbox',reference:'isMt4Group',flex:.2,margin:'0 0 0 20'}
				]},

				{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'将「杠杆」更新为',items:[
					{xtype:'comboAccountLeverage',name:'leverage',allowBlank:false,flex:.8,emptyText:'杠杆',bind:{disabled:'{!isMt4Leverage.checked}'}},
					{boxLabel:'更改',xtype:'checkbox',reference:'isMt4Leverage',flex:.2,margin:'0 0 0 20'}
				]},

				{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'将「代理」更新为',items:[
					{xtype:'numberfield',name:'agent',allowBlank:false,flex:.8,emptyText:'代理',bind:{disabled:'{!isAgent.checked}'}},
					{boxLabel:'更改',xtype:'checkbox',reference:'isAgent',flex:.2,margin:'0 0 0 20'}
				]}
			]}
		]}
	]
});

