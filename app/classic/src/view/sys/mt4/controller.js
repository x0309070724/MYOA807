Ext.define('APP.view.sys.mt4.controller',{
    extend:'APP.view.sys.controller',
    alias:'controller.sys.mt4',

	returnSymbolExemode:function(value,cell,record){
		switch(value){
			case 0:{return '要价成交';};break;
			case 1:{return '现价成交';};break;
			case 2:{return '市价成交';};break;
		}
	},
	returnSymbolTrade:function(value,cell,record){
		switch(value){
			case 0:{return '否';};break;
			case 1:{return '仅关闭';};break;
			case 2:{return '全部访问';};break;
		}
	},

	returnArrayLenght:function(value,cell,record){
		if(value!=''){
			return Ext.String.format(
				'<span data-qtip="{0}">{1}</span>',
				value.split(',').join('<br/>'),
				value.split(',').length+' 项'
			);
		}
	},



	onMt4HostTestClick:function(button){
		var formPanel=button.up('form')
			params=formPanel.getForm().getValues();
		if(!formPanel.getForm().isValid()){return false};
		formPanel.mask('测试中...');
		Ext.apply(params,{type:button.mateParameters.type});
		Mate.ajax({
			url:Boot.appUrl('/system/mt4/testHost.do'),
			params:params,
			success:function(json){
				formPanel.unmask();
				var hostText='',roleText='';
				hostText+='<h6>联机速度</h6>'
				Ext.each(json.host,function(item){
					if(item[2]=='true'){
						hostText+='<b>'+item[0]+'</b>　<s class="x-ui-text-green">'+item[1]+'</s><br/>'
					}else{
						hostText+='<b>'+item[0]+'</b>　<s class="x-ui-text-red">Fail</s><br/>'
					}
				});

				if(json.role){
					function checkRole(v){return v==1?'mt-yes':'mt-no';}
					roleText='<br/><h6>访问权限</h6>';
					roleText+='<ul class="two">';
						roleText+='<li><em class="f-mt '+checkRole(json.role.manager)+'"></em>管理员（增加/编辑/删除帐户）</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.seeTrades)+'"></em>监督交易</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.admin)+'"></em>超级管理员（对服务器设置可以完全访问）</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.money)+'"></em>会计（入金/信用/出金）</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.reports)+'"></em>报告</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.riskman)+'"></em>风险管理</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.email)+'"></em>内部Email系统</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.logs)+'"></em>日志（访问服务器日志目录）</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.news)+'"></em>发送新闻</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.marketWatch)+'"></em>报价信息（实时变更报价）</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.online)+'"></em>查看在线（显示在线客户）</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.userDetails)+'"></em>个人资料</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.plugins)+'"></em>配置服务器插件</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.serverReports)+'"></em>自动服务器报告</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.techsupport)+'"></em>访问技术支持页面</li>'					
					roleText+='</ul>'
					
					roleText+='<h6>交易权限</h6>';
					roleText+='<ul class="two">';
						roleText+='<li><em class="f-mt '+checkRole(json.role.broker)+'"></em>报价权限</li>'
						roleText+='<li><em class="f-mt '+checkRole(json.role.trades)+'"></em>编辑/删除 交易</li>'					
					roleText+='</ul>'
				}
				Mate.alert(hostText+roleText)
			},
			failure:function(json){
				formPanel.unmask();
				Mate.error(json.message)
			}
		});	
	}
	
	
	

	
	
	
})
