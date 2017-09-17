Ext.define('APP.view.sys.notice.message.controller',{
    extend:'APP.view.sys.notice.controller',
	alias:'controller.sys.notice.message',

	returnNoticeObjType:function(value,cell,record){
		if(record.data.customerid>0){
			return '客户';
		}else if(record.data.staffid>0){
			return '员工';
		}else{
			return 'N/A'
		}
	},
	returnNoticeObjName:function(value,cell,record){
		if(record.data.customerid>0){
			return Ext.String.format(
				'{1} <s>{2}</s><r>#{0}</r>',
				record.data.customerid,
				record.data.customer_namecn,
				record.data.customer_name
			);
		}else if(record.data.staffid>0){
			return Ext.String.format(
				'{3} {1} <s>{2}</s><r>#{0}</r>',
				record.data.staff_login,
				record.data.staff_namecn,
				record.data.staff_name,
				Ext.util.Format.wechatFace(record.data.wx_userface)
			);
		}else{
			return 'N/A'
		}
	},
	returnNoticeCallback:function(value,cell,record){
		if(record.data.success===1){
			var value='成功通知',
				cls='x-ui-text-green'
		}else{
			var value=value,
				cls='x-ui-text-green'
		}
		return Ext.String.format(
			'<span class="{1}" data-qtip="{0}">{0}</span>',
			value,cls
		);
	},


	//===================================================================================================输入短信手机号/内容
	onEnterSms:function(field){
		var formPanel=field.up('form'),
			viewModel=formPanel.getViewModel(),
			sendnos=formPanel.form.findField('sendnos').getValue(),
			sendnoArr=sendnos.split('\n'),
			sendnoCount=0,
			content=formPanel.form.findField('content').getValue();
			Ext.Array.each(sendnos.split('\n'),function(mobile){
				if(mobile!=''){sendnoCount++}
			});
			viewModel.setData({
				sendnoCount:sendnoCount
//				charCount:Math.ceil(content.length),
//				wordCount:Math.ceil(content.length/60)*sendnoCount
			});
	},
	//===================================================================================================输入Email/
	onEnterMail:function(field){
		var formPanel=field.up('form'),
			viewModel=formPanel.getViewModel(),
			sendnos=formPanel.form.findField('sendnos').getValue(),
			// sendnoArr=sendnos.split('\n'),
			sendnoCount=0
    // console.log(viewModel);
			Ext.Array.each(sendnos.split('\n'),function(email){
				if(email!=''){sendnoCount++}
			});
			viewModel.setData({
				sendnoCount:sendnoCount
			});
			// console.log(viewModel)
	},
	onRechargeClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'充值记录',
				width:800,
				height:500,
				items:[{xtype:'toolMessageSmsRecharge',border:true}]
			});
			this.getView().add(win).show().center();
	},


	onDetailClick:function(grid,record){
		if(!Ext.isObject(record)){
			var record=grid.getStore().getAt(record);
		}
		grid.select(record);
		Mate.openWin(Boot.appUrl('/tool/mailDetail.do?keys='+record.data.id));
	},


	//===========================================================================================================================邮件重发
	onMailReSendClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid='WIN-ReSendMail-'+record.data.id;
		grid.setSelection(record);

		var msg='<strong class="x-ui-text-red">正在操作：重发发送邮件</b><br/><br/>';
			msg+='发送对象：'+record.data.sendno+'<br/>';
			msg+='邮件性质：'+record.data.groupname+'<br/>';

		Mate.confirm(msg,function(button){if(button=='yes'){
			var waiting=Mate.waiting('请等待...<br/>正在发送邮件...<br/>');
			Ext.Ajax.request({
				url:'/action/tool/result.jsp',
				params:{cmd:'reSendmail',id:record.data.id},
				success:function(response,opts){
					var response=Ext.decode(response.responseText);
					if(response.success==true){
						waiting.hide();
						Mate.showTask(Mate.settings.successMessage);
						store.remove(record).sort();
					}else{
						Mate.info(response.message);
					}
				}
			});
		}});
	},
	//===========================================================================================================================邮件删除
	onMailRemoveClick:function(e){
		var keys=[],
			msgDelList='',
			store=e.up('grid').getStore(),
			records=e.up('grid').getSelectionModel().getSelection();
		Ext.each(records,function(record){
			keys.push(record.data.id);
			msgDelList+=Ext.Date.format(record.data.sendtime,'Y-m-d H:i:s')+'：'+record.data.title+'<br/>'
		});
		if(!keys.length){return false};
		var confirmText='<h6>本次将删除以下邮件：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/tool/message/deleteMail.do'),
					params:{keys:keys},
					success:function(data,opts){
						Ext.MessageBox.hide();
						Mate.showTask(Mate.settings.successMessage);
						store.remove(records);
					},
					failure:function(data){
						Ext.MessageBox.hide();
						Mate.error(data.message);
					}
				});
			}
		});
	}
});

