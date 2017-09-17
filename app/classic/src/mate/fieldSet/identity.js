Ext.define('APP.mate.fieldSet.identity',{
    extend:'Ext.form.FieldSet',
	alias:'widget.identityFieldSet',
	title:'证件信息',
	items:[
		{columnWidth:.4,items:[
			{xtype:'fieldcontainer',fieldLabel:'证件副本',items:[
				{xtype:'uploadimagefield',
					mateParameters:{
						name:'identity_image',
						api:'idcard',
						height:132,
						callback:function(me,json){
							if(json.api){
								var form=me.up('form'),
									data=json.api;
								form.getForm().setValues({
									namecn:data.namecn,
									name:data.name,
									gender:data.gender,
									identity_portrait:data.portrait,
									identity_cardno:data.cardno,
									identity_country:'中国',
									identity_address:data.address,
									birthday:data.birthday
								});
							}
						}
					}
				}
			]}
		]},
		{columnWidth:.6,items:[
			{xtype:'hiddenfield',name:'identity_portrait'},
			{fieldLabel:'证件类型',xtype:'radiogroup',columns:4,flex:.4,bind:{readOnly:'{form.audit}'},items:[
				{boxLabel:'大陆身份证',name:'identity_type',inputValue:'china',checked:true},
				{boxLabel:'其它身份证',name:'identity_type',inputValue:'other'},
				{boxLabel:'护照',name:'identity_type',inputValue:'passport'}
			]},
			{fieldLabel:'姓名',xtype:'fieldcontainer',layout:'hbox',items:[
				{emptyText:'中文姓名',xtype:'textfield',name:'namecn',flex:.2,margin:'0 5 0 0',bind:{readOnly:'{form.audit}'}},
				{emptyText:'英文姓名',xtype:'textfield',name:'name',flex:.4,margin:'0 10 0 0',allowBlank:false,bind:{readOnly:'{form.audit}'}},
				{xtype:'radiogroup',flex:.4,bind:{readOnly:'{form.audit}'},items:[
					{boxLabel:'先生',name:'gender',inputValue:'Mr.',checked:true},
					{boxLabel:'女士',name:'gender',inputValue:'Ms.'}
				]}
			]},
			{fieldLabel:'国籍',xtype:'fieldcontainer',layout:'hbox',items:[
				{emptyText:'国籍',xtype:'textfield',name:'identity_country',flex:.2,bind:{readOnly:'{form.audit}'}},
				{emptyText:'出生日期',xtype:'datefield',name:'birthday',flex:.4,margin:'0 0 0 5',bind:{readOnly:'{form.audit}'}},
				{xtype:'box',flex:.4,margin:'0 0 0 5'}
			]},
			{fieldLabel:'证件号',emptyText:'证件号',xtype:'textfield',name:'identity_cardno',bind:{readOnly:'{form.audit}'}}		,				
			{fieldLabel:'户籍地址',emptyText:'户籍地址',xtype:'textfield',name:'identity_address',bind:{readOnly:'{form.audit}'}}					
		]}
	]
});

