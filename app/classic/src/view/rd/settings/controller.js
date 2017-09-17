Ext.define('APP.view.rd.settings.controller',{
    extend:'APP.view.controller',
    alias:'controller.rd.settings',
	//===========================================================================================================================================组 设置
	//===========================================================================================================================================组 设置
	onGroupUpdate:function(editor,context,eOpts){
		var store=editor.grid.getStore(),
			objname=this.getView().getViewModel().getData().objname;
		Mate.waiting('<h6>正在添加'+objname+'</h6>请等待指令执行完成...');
		Mate.ajax({ 
			url:Boot.appUrl('/system/settings/updateGroup.do'),
			params:context.record.data,
			success:function(json,opts){
				Ext.MessageBox.hide();
				if(!context.record.data.id){store.reload();}
				Mate.showTask(Mate.settings.successMessage);
			},
			failure:function(json){
				store.remove(context.record);
				Mate.showTask(json.message,true);
			}
		}); 
	},
	onGroupAddRecord:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			rowEditing=grid.findPlugin('rowediting'),
			record=Ext.create('APP.model.sys.settings.group',{id:0,pid:99999999,code:this.getView().getViewModel().getData().code});
			store.insert(0,record);
			rowEditing.startEdit(0,0);
	},
	onGroupRemoveClick:function(button){	
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection(),
			objname=this.getView().getViewModel().getData().objname;
		Ext.Array.each(records,function(record){
			msgDelList+=objname+'：<b>'+record.data.name+'</b>　'
			if(record.data.pid==0){
				msgDelList+='<span class="x-ui-text-red">不可删除</span>　系统内置<br/>'
			}else{
				keys.push(record.data.id);
				msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
			}
		});
		if(!keys.length){
			Mate.warning('<h6>无法删除'+objname+'：</h6>'+msgDelList);
			return false;
		};
		var confirmText='<h6>删除'+objname+'：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(ask){
			if(ask=='yes'){
				Mate.waiting('<h6>正在删除'+objname+'</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/system/settings/deleteGroup.do'),
					params:{keys:keys},
					success:function(data,opts){
						Ext.MessageBox.hide();
						store.remove(records);
						grid.getView().refresh();
						Mate.showTask(Mate.settings.successMessage);
					},
					failure:function(data){
						Ext.MessageBox.hide();
						Mate.error(data.message);
					}
				});
			}
		});
	}
	


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
