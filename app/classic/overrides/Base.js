Ext.define('Override.form.field.VTypes',{
    override:'Ext.form.field.VTypes',
	login:function(_v){return /^\d{4,10}$/.test(_v)},
	loginText:'账号格式错误，如：8888',
	password:function(_v){return /^(?=.*[0-9].*)(?=.*\W.*).{8,}|(?=.*[a-zA-Z].*)(?=.*\W.*).{8,}|(?=.*[a-zA-Z].*)(?=.*[0-9].*).{8,}$/.test(_v)},
	passwordText:'密码强度不够，如：Abcd-1234',
	passwordRepeat:function(val,field){if(field.initialPassField){var pwd=Ext.getCmp(field.initialPassField);return(val==pwd.getValue());}return true;},
	passwordRepeatText:'2次输入的密码不一致,请检查！',
	domain:function(_v){return /^[0-9a-zA-Z]+[0-9a-zA-Z\.-]*\.[a-zA-Z]{2,10}$/.test(_v)},
	domainText:'域名格式错误，如：www.domain.com',
	phone:function(_v){return /^$|^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test(_v)},
	phoneText:'电话号码格式错误，如：0755-66668888',
	mobile:function(_v){return /^0{0,1}(1[0-9])[0-9]{9}$/.test(_v)||/^(00852)\d{8}$/.test(_v)},
	mobileText:'手机号码格式错误，如：18666668888',
	qq:function(_v){return /^\d{5,11}$/.test(_v)},
	qqText:'QQ号码格式错误，如：666888',
	no:function(_v){return /^\d{6}$/.test(_v)},
	noText:'请输入6位数字，如：000121',
	image:function(_v){return /\.jpg$|\.jpeg$|\.gif$|\.png$|&/i.test(_v)},
	imageText:'限上传 .jpg|.jpeg|.gif|.png 格式的图片',
	file:function(_v){/\.pdf$|\.doc$|\.docx$|\.xls$|\.xlsx$|\.txt$|\.rar$|\.zip$|\.jpg$|\.jpeg$|\.gif$|\.png$|&/i.test(_v)},
	fileText:'限上传 .exe|.pdf|.doc|.docx|.xls|.xlsx|.ppt|.pptx|.txt|.rar|.zip|.jpg|.jpeg|.gif|.png 格式文件',

	daterange:function(val,field){
		var date=field.parseDate(val);
		if(!date){return false}
		//console.log(field.startDateField)
		if(field.startDateField){
			var start=field.up('form').down('#'+field.startDateField);
			start.setMaxValue(date);
			field.dateRangeMax=date
		}else if(field.endDateField){
			var end=field.up('form').down('#'+field.endDateField);
			end.setMinValue(date);
			field.dateRangeMin=date
		}
		return true
//		window.setTimeout(function(){
//			var toolbar=field.up('toolbar'),
//				startField=toolbar.down('#'+field.startDateField),
//				endField=toolbar.down('#'+field.startDateField);
//			if(field.startDateField){
//				startField.setMaxValue(date);
//				field.dateRangeMax=date
//			}else if(field.startDateField){
//				endDateField.setMinValue(date);
//				field.dateRangeMin=date
//			}
//		},1000)
	},
	daterangeText:'开始时间必须小于结束时间'

});




Ext.define('Override.tab.Tab',{
    override:'Ext.tab.Tab',
	config:{
		iconAlign:'left',
		textAlign:'left'
	}
});

Ext.define('Override.view.AbstractView',{
    override:'Ext.view.AbstractView',
	config:{
		loadingText:'Loading...'
	}
});


Ext.define('Override.form.FieldSet',{
    override:'Ext.form.FieldSet',
	config:{
		collapsible:true,
		defaultType:'textfield',
		checkboxToggle:false,
		margin:'0 0 10 0',
		padding:'3 10',
		defaults:{border:false,xtype:'container',flex:1,layout:'anchor'}
	}
});


Ext.define('Override.form.Panel',{
    override:'Ext.form.Panel',
	config:{
		border:false,
		frame:true,
		waitMsgTarget:true,
		bodyCls:'x-ui-form-body',
		fieldDefaults:{labelAlign:'right',labelWidth:70,labelSeparator:':',anchor:'100%',xtype:'textfield',allowBlank:true,msgTarget:'qtip'},
		defaults:{xtype:'fieldset',layout:'column'}
	}
});
//Ext.define('Override.form.field.Text',{
//    override:'Ext.form.field.Text',
//	listeners:{
////		blur:function(field){
////			var val=field.getValue()||'',
////				val=Ext.util.Format.trim(val);
////			field.setValue(val);
////		}
//		beforerender:function(field){
//			field.addListener('blur',function(field){
//				var val=field.getValue()||'',
//					val=Ext.util.Format.trim(val);
//				field.setValue(val);
//			});
//		}
//	}
//});
Ext.define('Override.form.field.Date',{
    override:'Ext.form.field.Date',
	config:{
		format:'Y-m-d',
		width:100
	}
});
Ext.define('Override.form.field.ComboBox',{
    override:'Ext.form.field.ComboBox',
	config:{
		minChars:0,
		anchor:'100%',
		width:160,
		multiSelect:false,
		autoSelect:false,
		forceSelection:true,
		queryMode:'local',
		editable:false
	}
});

Ext.define('Override.form.field.Number',{
    override:'Ext.form.field.Number',
	config:{
		hideTrigger:true
	}
});


Ext.define('Override.form.field.Checkbox',{
    override:'Ext.form.field.Checkbox',
	config:{
		inputValue:1,
		uncheckedValue:0
	}
});


Ext.define('Override.form.field.HtmlEditor',{
    override:'Ext.form.field.HtmlEditor',
	config:{
		fontFamilies:['微软雅黑','黑体','宋体','Arial','Courier New','Tahoma','Times New Roman','Verdana']
	}
});



Ext.define('Override.panel.Panel',{
    override:'Ext.panel.Panel',
	config:{
		closeToolText:''
	}
});

Ext.define('Override.tree.Panel',{
    override:'Ext.tree.Panel',
	border:false,
//	shadow:true,
//	shadowOffset:1,
    useArrows:true,
	rootVisible:false
});



Ext.define('Override.window.MessageBox',{
    override:'Ext.window.MessageBox',
	config:{
		scrollable:false,
		shadow:true,
		collapsible:false,
		maximizable:false,
		minWidth:480,
		closable:true,
		closeAction:'hide'
	}
});


Ext.define('Override.window.Window',{
    override:'Ext.window.Window',
	config:{
		scrollable:false,
		layout:'fit',
		iconCls:'f-mt mt-window',
		border:false,
		maximizable:false,
		closable:true,
		closeAction:'destroy',
		resizable:false,
		listeners:{
			resize:function(win,width,height){
				win.center();
			}
		}
	}
});




Ext.define('Override.grid.Panel',{
    override:'Ext.grid.Panel',
	columnLines:true,
	emptyText:'No Records',
	layout:'fit',
	//reserveScrollbar:true,
	//multiSelect:true,
	//disableSelection:true,
	//reserveScrollbar:true,
	//scrollDelta:3000,
	//syncRowHeight:false,
	//manageHeight:false,
	viewConfig:{
		stripeRows:true,
		enableTextSelection:true
	}
});

Ext.define('Override.grid.RowEditor',{
    override:'Ext.grid.RowEditor',
	config:{
		saveBtnText:'保存',
		cancelBtnText:'取消',
		errorsText:'错误信息',
		dirtyText:'已修改,你需要提交或取消变更',
		frame:false,
		bodyPadding:'4 0',
		bodyCls:'x-ui-form-body'
	}
});

		

		
Ext.define('Override.grid.column.RowNumberer',{
    override:'Ext.grid.column.RowNumberer',
	config:{
		width:30,
		minWidth:30,
		maxWidth:50,
		resizable:true
	}
});



Ext.define('Override.grid.column.Column',{
    override:'Ext.grid.column.Column',
	config:{
		align:'left'
	}
});
Ext.define('Override.grid.column.Date',{
    override:'Ext.grid.column.Date',
	config:{
		format:'Y-m-d'
	}
});

		
Ext.define('Override.grid.feature.Grouping',{
    override:'Ext.grid.feature.Grouping',
	//groupHeaderTpl:'{columnName}：{name}<r class="x-ui-text-i">共 <b class="x-ui-text-red">{rows.length}</b> 条记录<r>',
	groupHeaderTpl:'{columnName}：{name}　<i>{rows.length} Items<i>',
	hideGroupedHeader:true,
	enableGroupingMenu:true,
	emptyGroupText:'',
	expandTip:'',
	collapseTip:'',
	groupByText:'使用当前字段分组',
	showGroupsText:'表格分组'
});
		

Ext.define('Override.grid.plugin.CellEditing',{
    override:'Ext.grid.plugin.CellEditing',
	config:{
		clicksToEdit:1
	}
});

Ext.define('Override.grid.plugin.RowEditing',{
    override:'Ext.grid.plugin.RowEditing',
	config:{
		errorSummary:false,
		anchor:'100%'
	}
});
//Ext.define('Override.grid.plugin.RowEditing',{
//    override:'Ext.grid.plugin.RowEditing',
//	listeners: {
//		cancelEdit: function(rowEditing, context) {
//			if (context.record.data.id === 0) {
//				context.grid.getStore().remove(context.record)
//			}
//		},
//		beforeedit: function(editor, context, eOpts) {
//			editor.cancelEdit();
//			if (context.record.data.is_sys === 1 || context.record.data.pid === 0) {
//				return false
//			}
//		}
//	}
//});

Ext.define('Override.ux.Gauge',{
    override:'Ext.ux.Gauge',
	config:{
		trackStyle:{
			outerRadius:'100%',
			innerRadius:'100%-20',
			round:true
		},
		valueStyle:{
			outerRadius:'100%-2',
			innerRadius:'100%-18',
			round:true
		}
	}
});


Ext.define('Override.ux.rating.Picker',{
    override:'Ext.ux.rating.Picker',
	config:{
		style:{color:'red','font-family':'Arial'},
		selectedStyle:'color:red',
		overStyle:'color:red',
		trackOver:false,
		minimum:0
	}
});






























