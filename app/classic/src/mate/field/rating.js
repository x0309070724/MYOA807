Ext.define('APP.mate.field.rating',{
	extend:'Ext.form.FieldContainer',
	alias:'widget.ratingfield',
	userCls:'x-rating-fieldcontainer',
	layout:'hbox',
	initComponent:function(){
		var me=this;
		Ext.apply(this,{
			items:[
				{xtype:'hiddenfield',name:me.name||'rating',value:me.value||0,
					listeners:{
						change:function(rating,value){
							var me=rating.up('fieldcontainer'),
								rating=me.down('rating');
							rating.setValue(value);
						}
					}
				},
				{xtype:'rating',scale:'180%',value:0,
					minimum:0,limit:5,
//					style:{color:'red','font-size':'180%','font-family':'Arial'},
//					selectedStyle:'color:red',overStyle:'color:red',
					listeners:{
						change:function(rating,value,oldValue){
							//console.log(value,oldValue)
							var me=rating.up('fieldcontainer'),
								field=me.down('field');
							field.setValue(value);
						}
					}
				},
				{xtype:'button',text:'　　　',userCls:'x-ui-text-medium',ui:'',width:60,height:28,
					handler:function(button){
						var me=button.up('fieldcontainer'),
							field=me.down('field');
						field.setValue(0);
					}
				}
			]
		});  
		this.callParent();
	}
});