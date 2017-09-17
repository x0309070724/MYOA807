Ext.define('APP.mate.button.reconfigure',{
	extend:'Ext.button.Segmented',
	alias:[
		'widget.reconfigure',
		'widget.reconfigurebutton'
	],
	defaults:{xtype:'button',name:'field',minWidth:100,scale:'medium'},
	items:[],
	listeners:{
		change:'onMateGridReconfigure'
	}
});



