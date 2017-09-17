Ext.define('APP.view.controller',{
    extend:'APP.mate.ViewController',
	alias:'controller.baseController',
	//============================================================================权限按钮
	onShowRolesButton:function(actioncolumn,eOpts){
		var roles=APP.app.getAppData('account/roles');
		Ext.Array.each(actioncolumn.items,function(button){
			button.disabled=!roles[button.roles];
		})
	},


	//=================================================输入交易账号
	onFieldLoginEnter:function(field){
		var me=this,
			formPanel=field.up('form'),
			form=formPanel.getForm(),
			viewData=formPanel.getViewModel().getData(),
			readOnly=field.readOnly,
			nextButton=formPanel.down('button[name=nextButton]');
		if(field.getValue()!=form.login){
			form.login=field.getValue();
			field.addCls('x-ui-field-loading').setReadOnly(true);
			nextButton.setDisabled(true);

			Mate.ajax({
				url:Boot.appUrl('/sd/account/checkMt4Login.do'),
				params:{login:field.getValue(),audit:viewData.form.audit},
				success:function(json,opts){
					field.removeCls('x-ui-field-loading').setReadOnly(readOnly);
					//=======================================账户资产
					form.findField('assets_balance').setValue(json.assets.balance);
					form.findField('assets_credit').setValue(json.assets.credit);
					form.findField('assets_equity').setValue(json.assets.equity);
					form.findField('assets_margin').setValue(json.assets.margin);
					form.findField('assets_margin_free').setValue(json.assets.margin_free);
					form.findField('assets_margin_level').setValue(Ext.util.Format.number(json.assets.margin_level,'0.00')+'%');

					if(json.account){
						form.setValues(json.account);
//						//===================================银行卡COMBO
//						var bankCombo=formPanel.down('comboAccountBank')
//						if(bankCombo){
//							bankCombo.getStore().load({
//								params:{login:field.getValue()},
//								callback:function(records,operation,success){
//									if(success){
//										if(records.length>0&&(bankCombo.getValue()==''||bankCombo.getValue()==null)){
//											bankCombo.select(records[0]);
//											bankCombo.fireEvent('select',bankCombo,records[0]);
//										}
//									}
//								}
//							});
//						}
					}
					nextButton.setDisabled(false);
				},
				failure:function(json,opts){
					Mate.showTask('账户：「'+field.getValue()+'」无效.',true);
					if(!readOnly){field.setValue('')}
					return false;
				}
			});
		}
	},


	onFieldSalesmanSelect:function(combo,record){
		var formPanel=combo.up('form'),
			form=formPanel.getForm();
			console.log(record.data)
		if(combo.name=='salesman2id'){
			form.findField('salesman2_namecn').setValue(record.data.namecn);
			form.findField('salesman2_name').setValue(record.data.name);
		}else{
			form.findField('salesman_namecn').setValue(record.data.namecn);
			form.findField('salesman_name').setValue(record.data.name);
		}
	},
	//===========================================================选择系统银行账号 触发
	selectSysBank:function(combo,record){
		var formPanel=combo.up('form'),
			form=formPanel.getForm();
		form.findField('bank_icon').setValue(record.data.icon);
	},

	returnSafeMobile:function(value,cell,record){
		return value.substr(0,3)+'****'+value.substr(value.length-4,4)
	},


	returnYes:function(value,cell,record){
		return value<=0?'':'<span class="f-mt mt-yes"></span>';
	},
	returnYesNo:function(value,cell,record){
		return value<=0?'<span class="f-mt mt-no x-ui-text-red x-ui-text-i"></span>':'<span class="f-mt mt-yes"></span>';
	},
	returnNotEmpty:function(value,cell,record){
		return value!=''?'<span class="f-mt mt-yes"></span>':'';
	},

	returnUsMoney:function(value,cell,record){
		value=Ext.util.Format.numeral(value);
		if(value!=0){
			return Ext.String.format(
				'{0}',
				Ext.util.Format.usMoney(value)
			);
		}
	},
	returnCnyMoney:function(value,cell,record){
		value=Ext.util.Format.numeral(value);
		if(value!=0){
			return Ext.String.format(
				'{0}',
				Ext.util.Format.cnyMoney(value)
			);
		}
	},
	returnShowMoney:function(value,cell,record){
		value=Ext.util.Format.numeral(value);
		if(value!=0){
			return Ext.String.format(
				'{0}',
				Ext.util.Format.money(value,2)
			);
		}
	},

	returnColorMoney:function(value,cell,record){
		value=Ext.util.Format.numeral(value);
		if(value!=0){
			return Ext.String.format(
				'<span class="{1}">{0}</span>',
				Ext.util.Format.money(value,2),
				value>0?'x-ui-text-green':value<0?'x-ui-text-red':''
			);
		}
	},


	returnInt:function(value,cell,record){
		value=Ext.util.Format.integer(value);
		if(value!=0){
			return Ext.String.format(
				'{0}',
				Ext.util.Format.stringInteger(value,2)
			);
		}
	},
	returnNumber:function(value,cell,record){
		value=Ext.util.Format.numeral(value);
		if(value!=0){
			return Ext.String.format(
				'{0}',
				Ext.util.Format.stringNumeral(value,2)
			);
		}
	},
	returnSecondsToMinutes:function(value,cell,record){
		if(value!=0){
			return Ext.String.format(
				'{0}',
				Ext.util.Format.stringInteger(value/60)
			);
		}
	},
	returnSecondsToHour:function(value,cell,record){
		if(value!=0){
			return Ext.String.format(
				'{0}',
				Ext.util.Format.stringNumeral(value/3600,2)+' H'
			);
		}
	},

	returnTimeFilter:function(value,cell,record){
		if(value!=0){
			return Ext.String.format(
				'<span data-qtip="{1}<br/>{2}">{0}</span>',
				Ext.util.Format.timeFilter(value),
				Ext.util.Format.timeFilter(value,true),
				value>60?Ext.util.Format.stringInteger(value)+'秒':''
			);
		}
	},
	returnTimeFilterText:function(value,cell,record){
		//console.log(value,cell,record)
		if(value!=0){
			return Ext.util.Format.timeFilter(value);
		}
	},

	returnMinutes:function(value,cell,record){
		if(value!=0){
			return Ext.String.format(
				'{0} min',
				Ext.util.Format.stringInteger(value)
			);
		}
	},
	returnT:function(value,cell,record){
		if(value!=0){
			return Ext.String.format(
				'{0} 条',
				Ext.util.Format.stringInteger(value)
			);
		}
	},
	returnM:function(value,cell,record){
		if(value!=0){
			return Ext.String.format(
				'{0} M',
				Ext.util.Format.stringInteger(value)
			);
		}
	},




	returnItems:function(value,cell,record){
		if(value!=0){
			return Ext.String.format(
				'{0} 笔',
				Ext.util.Format.stringInteger(value)
			);
		}
	},






	returnStaffTeam:function(value,cell,record){
		return Ext.String.format(
			'{0}{1}{2}<r>{3}</r>',
			record.data.branch_name,
			record.data.t1_name!=''?' '+record.data.t1_name:'',
			record.data.t2_name!=''?' '+record.data.t2_name:'',
			record.data.post_name
		);
	},


	returnWrapDate:function(value,cell,record){
		return Ext.String.format(
			'<b>{0}</b><br/><span class="x-ui-text-mini x-ui-text-grey">{1}</span>',
			Ext.Date.format(value,'Y-m-d'),
			Ext.Date.format(value,'H:i:s')
		);
	},


	returnIsZeroNull:function(value,cell,record){
		return value!=0?value:'';
	},
	returnNA:function(value,cell,record){
		return '<span class="x-ui-text-grey">N/A</span>';
	},
	returnOpenAccountDay:function(value,cell,record){
		var min=record.data.regdate,
			max=new Date();
		return Ext.Date.diff(min,max,'d')+' 天';
	},


	returnLogin:function(value,cell,record){
		var name=Ext.util.Format.stringPriority(record.data.namecn,record.data.name),
			typeIcon=this.returnAccountType(record.data.type),
			len=name.length,
			lenCount=Ext.isChinaese(name)?1:3,
			lenStr=len>4?'**':false;

		//------------------------------区分申请与管理
		var sameCount='',
			sameName='';
		if(Ext.isNumeric(record.data.same_identity_count)){
			sameCount=record.data.same_identity_count,
			//sameCount='<s>'+record.data.same_identity_count+'</s>';
			sameName+='<br/><br/><b>同名账户</b><br/>';
			sameName+='相同证件：'+record.data.same_identity_count+' 个<br/>';
		}
		if(Ext.isNumeric(record.data.same_mobile_count)){
			sameName+='相同手机：'+record.data.same_mobile_count+' 个<br/>';
			sameName+='相同Email：'+record.data.same_email_count+' 个<br/>';
		}
		if(Ext.isNumeric(sameCount)){
			sameCount=sameCount>0?'<s>'+sameCount+'</s>':'<s class="x-ui-transparent"></s>'
		}

		return Ext.String.format(
			'<span data-qtip="<b>{4}</b><br/>姓名：{1}{6}">{3}<b>{0}</b><r>{2}{5}</r></span>',
			record.data.login>0?record.data.login:this.returnNA(),
			record.data.namecn+' '+record.data.name,
			!lenStr?name:Ext.util.Format.substr(name,0,lenCount)+lenStr+Ext.util.Format.substr(name,len-lenCount,len),
			typeIcon,
			record.data.type,
			sameCount,
			sameName
		);
	},

	returnAgentAccount:function(value,cell,record){
		if(value>0){
			var name=Ext.util.Format.stringPriority(record.data.agent_namecn,record.data.agent_name),
				len=name.length;
				lenCount=Ext.isChinaese(name)?1:3,
				lenStr=len>6?'**':false;
			return Ext.String.format(
				'<span data-qtip="<b>IB</b><br/>姓名：{1}"><b>{0}</b><r>{2}</r></span>',
				record.data.agent,
				record.data.agent_namecn+' '+record.data.agent_name,
				!lenStr?name:Ext.util.Format.substr(name,0,lenCount)+lenStr+Ext.util.Format.substr(name,len-lenCount,len)
			);
		}else{
			return '';
			//return this.returnNA();
		}
	},
	returnAgentSubordinate:function(value,cell,record){
		if(value>0){
			return Ext.String.format(
				'<span data-qtip="下级账户：{1} 个<br/>最后开户：{0}">{0}<r>{1} 个</r></span>',
				record.data.agent_lastdate,
				record.data.agent_subordinate
			);
		}
	},



	returnLeverage:function(value,cell,record){
		if(value>0){
			return Ext.String.format('1:{0}',value);
		}
	},




	returnName:function(value,cell,record){
		return Ext.String.format(
			'<span data-qtip="姓名:{1} {3}{2}<br/>生日:{4}">{0}</span>',
			Ext.util.Format.stringPriority(record.data.namecn,record.data.name),
			record.data.namecn,
			record.data.name,
			record.data.gender,
			record.data.birthday
		);
	},


	returnBank:function(value,cell,record){
		return Ext.String.format(
			'<span data-qtip="户名:{4}<br/>新账户行:{0}<br/>支行:{1}<br/>银行代码:{2}<br/>银行地址:{3}">{0}</span>',
			record.data.name,
			record.data.branches,
			record.data.swiftcode,
			record.data.address,
			record.data.username
		);
	},



	returnAuditStatus:function(value,cell,record){
		switch(parseInt(value)){
			case 1:{var icon='<span class="f-mt mt-yes"></span>';}break;
			case -1:{var icon='<span class="f-mt mt-no"></span>';}break;
			default:{var icon='<span class="f-mt mt-pause x-ui-text-grey"></span>';}break;
		}
		return icon
	},
	//==============================================================================
	returnAccountTypeName:function(value,cell,record){
		switch(parseInt(value)){
			case 1:{var str='真实账户';}break;
			case 2:{var str='代理账户';}break;
			case 100:{var str='系统账户';}break;
			default:{var str='模拟账户';}break;
		}
		return str;
	},



	returnLedgerDay:function(value,cell,record){
		switch(value.length){
			case 10:{
				var weekDays='日一二三四五六';
				return Ext.Date.format(new Date(value),'m-d')+'<r>周'+weekDays.charAt(new Date(value).getDay())+'</r>'
			}break;
			case 7:{
				return value;
			}break;
			default:{
				return value;
			}break;
		}
	},
	returnTotalDeposit:function(value,cell,record){
		if(record.data.funds_deposit_count>0){
			return Ext.String.format(
				'<span class="x-ui-text-green">{0}</span><r>{1} 笔</r>',
				Ext.util.Format.money(value),
				Ext.util.Format.stringInteger(record.data.funds_deposit_count)
			);
		}
	},
	returnTotalWithdrawal:function(value,cell,record){
		if(record.data.funds_withdrawal_count>0){
			return Ext.String.format(
				'<span class="x-ui-text-red">{0}</span><r>{1} 笔</r>',
				Ext.util.Format.money(value),
				Ext.util.Format.stringInteger(record.data.funds_withdrawal_count)
			);
		}
	},
	returnTotalTradeClear:function(value,cell,record){
		if(value!=0){
			return Ext.String.format(
				'<span data-qtip="手续费：{1}<br/>利息：{2}<br/>税金：{3}<br/>交易盈亏：{4}<br/>代理佣金：{5}<br/><br/>净盈亏：<b>{0}</b><br/>">{0}</span>',
				Ext.util.Format.money(value),
				Ext.util.Format.money(record.data.trade_commission),
				Ext.util.Format.money(record.data.trade_storage),
				Ext.util.Format.money(record.data.trade_taxes),
				Ext.util.Format.money(record.data.trade_profit),
				Ext.util.Format.money(record.data.trade_commission_agent)
			);
		}
	},






	returnBankCard:function(value,cell,record){
		return Ext.String.format(
			'<span data-qtip="<b>{2}</b><br/>支行：{3}{4}<br/>户名：{0}<br/>账号：{1}<br/>代码：{5}<br/>地址：{6}">{2}</span>',
			record.data.bank_username,
			record.data.bank_cardno,
			record.data.bank_name,
			record.data.bank_city,
			record.data.bank_branch,
			record.data.bank_swiftcode,
			record.data.bank_address
		);
	},














	returnDays:function(value,cell,record){
		return value>0?value+' 天':'';
	},
	returnCounts:function(value,cell,record){
		return value>0?Ext.util.Format.number(value,'0,0')+' 次':'';
	},


	returnA:function(value,cell,record){
		return value>0?Ext.util.Format.number(value,'0,0')+' 个':'';
	},
	returnMore:function(value,cell,record){
		return Ext.String.format(
			'<div data-qtip="{0}">{0}</div>',
			value
		);
	},

	returnQQ:function(value,cell,record){
		if(Ext.isNumeric(value)){
			return Ext.String.format(
				'<a class="f-mt mt-qq x-ui-text-blue" href="{1}" data-qtip="QQ号：{0}"></a>',
				value,
				Ext.util.Format.qqHref(value)
			);
		}
	},





	returnWebaddress:function(value,cell,record){
		if(value!=''){return '<a target="_blank" href="'+value+'" data-qtip="网址：'+value+'"><img src="/resources/icons/home.png" alt=""/></a>'}
	},



	returnSalesman:function(value,cell,record){
		var st1Name=Ext.util.Format.stringPriority(record.data.salesman_namecn,record.data.salesman_name),
			st2Name=Ext.util.Format.stringPriority(record.data.salesman2_namecn,record.data.salesman2_name)
			tip='';
		if(record.data.salesmanid){
			tip+='<b>销售A</b><br/>';
			tip+='姓名：'+record.data.salesman_namecn+' '+record.data.salesman_name+'<br/>';
			tip+='团队：'+record.data.salesman_team_name+'<br/>';
		}
		if(record.data.salesman2id){
			tip+='<br/>';
			tip+='<b>销售B</b><br/>';
			tip+='姓名：'+record.data.salesman2_namecn+' '+record.data.salesman2_name+'<br/>';
			tip+='团队：'+record.data.salesman2_team_name+'<br/>';
		}

		return Ext.String.format(
			'<span data-qtip="{0}">{1}</span>',
			tip,
			Ext.util.Format.stringMerge(st1Name,st2Name,'、')
		);
	},



	returnStaff:function(value,cell,record){
		return Ext.String.format(
			'<span data-qtip="{1} {2}">{0}</span>',
			Ext.util.Format.stringPriority(record.data.staff_contactcn,record.data.staff_contact),
			record.data.staff_contactcn,
			record.data.staff_contact
		);
	},
	returnOperator:function(value,cell,record){
		return Ext.String.format(
			'<span data-qtip="{1} {2}">{0}</span>',
			Ext.util.Format.stringPriority(record.data.operator_contactcn,record.data.operator_contact),
			record.data.operator_contactcn,
			record.data.operator_contact
		);
	},
	returnGroupname:function(value,cell,record){
		return Ext.String.format(
			'{0}',
			record.data.groupname
		);
	},

	returnTradeOrder:function(value,cell,record){
		var cls;
		switch(record.data.cmd){
			case 0:case 2:case 4:{
				cls='mt-money-manage x-ui-text-blue';
			}break;
			case 1:case 3:case 5:{
				cls='mt-entry-manage x-ui-text-red';
			}break;
			case 6:case 7:{
				cls=record.data.profit>0?'mt-outline-top x-ui-text-green':'mt-outline-bottom x-ui-text-red';
			}break;
		}
		return Ext.String.format(
			'<em class="f-mt {0}"></em> {1}',
			cls,
			value
		);
	},








	returnAccountType:function(value,cell,record){
		switch(value){
			case 'IB':{
				var accountType='<span class="f-mt mt-users x-ui-text-green"></span>';
			}break;
			case 'IBC':{
				var accountType='<span class="f-mt mt-customer x-ui-text-green"></span>';
			}break;
			case 'SH':{
				var accountType='<span class="f-mt mt-customer x-ui-text-blue"></span>';
			}break;
			default:{
				var accountType='<span class="f-mt mt-customer x-ui-text-red"></span>';
			}break;
		}
		return accountType;
	},





	returnTradeLogin:function(value,cell,record){
		if(record.data.login){
			var accountName=Ext.util.Format.stringPriority(record.data.account_namecn,record.data.account_name),
				accountType=this.returnAccountType(record.data.account_type);
			return Ext.String.format(
				'<span data-qtip="<b>{4}</b><br/>姓名：{2}">{3}<b>{0}</b><r>{1}</r></span>',
				record.data.login,
				Ext.util.Format.substr(accountName,accountName.length-9,accountName.length),
				record.data.account_namecn+' '+record.data.account_name,
				accountType,
				record.data.account_type
			);
		}
	},



	returnTradeCmd:function(value,cell,record){
		var cmdText=Ext.util.Format.tradeCmd(record.data.cmd),
			rightText=record.data.symbol;
		switch(record.data.cmd){
			case 6:
			case 7:{
				rightText=record.data.idxkey;
			}break;
		}
		return Ext.String.format(
			'<b>{0}</b><r class="x-ui-text-green">{1}</r>',
			cmdText,
			rightText
		);
	},
	returnTradeClear:function(value,cell,record){
		if(record.data.clear!=0){
			var v=record.data.clear;
				cls=v>0?'x-ui-text-green':v<0?'x-ui-text-red':''
			return Ext.String.format(
				'<span class="'+cls+'" data-qtip="手续费：{2}<br/>利息：{2}<br/>税金：{2}<br/>交易盈亏：{1}">{0}</span>',
				Ext.util.Format.money(record.data.clear,2),
				Ext.util.Format.money(record.data.profit,2),
				Ext.util.Format.money(record.data.commission,2),
				Ext.util.Format.money(record.data.storage,2),
				Ext.util.Format.money(record.data.taxes,2)
			);
		}
	},















	returnSalesVolume:function(value,cell,record){
		if(value!=0){
			return Ext.String.format(
				'{0}',
				Ext.util.Format.stringNumeral(value,3)
			);
		}
	},
	returnSalesObjects:function(value,cell,record){
		if(record.data.id==record.data.teamid){
			var invalidText,
				invalidIcon='<span class="f-mt mt-users x-ui-text-green"></span>';
			if(record.data.invalid){
				invalidText='已弃用';
				invalidIcon='<span class="f-mt mt-users x-ui-text-red"></span>';
			}
			return Ext.String.format(
				'<span data-qtip="{4}" sid="{0}">{5} {1}<r>{3}</r></span>',
				record.data.id,
				record.data.name,
				record.data.namecn,
				record.data.manager_namecn,
				invalidText,
				invalidIcon
			);
		}else{
			var invalidText,
				invalidIcon='<span class="f-mt mt-user x-ui-text-green"></span>';
			if(record.data.invalid){
				invalidText='已离职';
				invalidIcon='<span class="f-mt mt-user x-ui-text-red"></span>';
			}
			return Ext.String.format(
				'<span data-qtip="{4}" sid="{0}">{5} {1} <s>{2}</s><r>{3}</r></span>',
				record.data.id,
				record.data.namecn,
				record.data.name,
				record.data.team_name,
				invalidText,
				invalidIcon
			);
		}
	},


	returnVolumeProfit:function(value,cell,record){
		return Ext.util.Format.stringNumeral(record.data.trade_clear/record.data.trade_volume,2)
	},



	//================================================================================打开报表
	onResultsSalesReportDetail:function(value,cell,record){
	},



	//===========================================================================================================================================CHART RENDERER
	rendererAxesLabel:function(axis,label){
		switch(axis.type){
			case 'numeric':case 'numeric3d':{
				return Ext.util.Format.number(label,'0,0')
			}break;
			case 'category':case 'category3d':{
				//console.log(label)
				if(Ext.isDate(label)){
					label=label.toString();
					if(label.indexOf('-')>=0){
						return label
					}else{
						return Ext.Date.format(new Date(label),axis.dateFormat||'m-d H:i')
					}
				}else{
					return label
				}
			}break;
		}
	},
	rendererSeriesBar:function(sprite,config,rendererData,index){
		return {fillStyle:(sprite.attr.dataY[index]<0?'red':'#94ae0a')};
	},
	rendererSeriesLabel:function(value,sprite,config,rendererData,index){
		var me=this,
			chartView=this.lookup('chartView')||{},
			parameter=chartView.mateParameters||{},
			renderer=parameter.renderer;
		if(renderer){
			var html=me[renderer](value);
		}else{
			var html=parseInt(value)==parseFloat(value)?Ext.util.Format.stringInteger(value):Ext.util.Format.stringNumeral(value,2)
		}
		return html
	},
	rendererSeriesTooltip:function(tooltip,record,item){
		var me=this,
			chartView=this.lookup('chartView')||{},
			parameter=chartView.mateParameters||{},
			renderer=parameter.renderer;

		if(renderer){
			var value=record.get(item.field),
				html=me[renderer](value);
		}else{
			//console.log(tooltip,record,item)
			var value=record.get(item.field),
				value=parseInt(value)==parseFloat(value)?Ext.util.Format.stringInteger(value):Ext.util.Format.stringNumeral(value,2),
				html='';
				html+=record.get('title')?'<b>'+record.get('title')+'</b><br/>':'';
				html+=record.get('objects')+'：'+value;
		}
		tooltip.setHtml(html);
	},
  returnRefererDomain:function(value,cell,record){
		if(value!=''){
			var domain=value.replace('http://','');
				domain=domain.split('/')[0];
			return Ext.String.format(
				'<div class="relative" data-qtip="{2}">{0}<div class="x-action-tool"><a class="f-mt mt-link" href="{1}" target="_blank"></a></div></div>',
				domain,
				'http://'+domain,
				value
			);
		}
	},

	returnPayOrderSiteServerback:function(value,cell,record){
		if(record.data.serverback){
			if(record.data.success==1){
				return '<span class="f-mt mt-yes"></span>';
			}else{
				return Ext.String.format(
					'<span class="f-mt mt-no" data-qtip="回调失败 状态码：{0}"></span>',
					record.data.serverback_code
				);
			}
		}
	},

	returnAccountInvalid:function(value,cell,record){
		if(record.data.invalid==1 || record.data.enable==1){
				return '<span class="f-mt mt-yes"></span>';
			}else{
				return '<span class="f-mt mt-no"></span>';
			}
	},

	returnChannel:function(value,cell,record){
		var data=APP.app.getAppData('sms');
		if(value!=0){
			for(i=0;i<data.length;i++){
					if(data[i].id==value){
					return data[i].name;
				}
			}
		}
	},
	//=================================== 返回编号
	returnSuccessMsg:function(value,cell,record){
		return value>0?'<span class="mate-text-green">编号：'+record.data.successmsg+'</span>':'<span class="mate-text-red">'+value+'</span>';
	},
	returnSmsCounts:function(value,cell,record){
		return value>0?Ext.util.Format.number(value,'0,0')+' 条':'';
	},






	returnQuotesPrice:function(value,cell,record){
		return value.toFixed(record.data.digits);
	}













});
