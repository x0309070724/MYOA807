Ext.define('APP.view.sd.controller',{
	extend:'APP.view.controller',
	alias:'controller.sd',
	returnCallRecordCmd:function(value,cell,record){
		switch(value){
			case 1:{return '主叫'}break;
			case 2:{return '被叫'}break;
			case 3:{return '呼转'}break;
			default:{return '其它';}break;
		}			
	},
	
	returnStorageCount:function(value,cell,record){
		return Ext.String.format(
			'<b>{0}</b><r>{1}%</r>',
			Ext.util.Format.stringInteger(value),
			Ext.util.Format.stringNumeral((value/record.data.count)*100,0)
		);
	},
	returnStorageRate:function(value,cell,record,rowIndex,colIndex,store,view){
		if(value>0){
			var column=view.headerCt.getHeaderAtIndex(colIndex),
				rate=record.data[column.rate];
			return Ext.String.format(
				'<b>{1}%</b><r>{0}</r>',
				Ext.util.Format.stringInteger(value),
				Ext.util.Format.stringNumeral((value/rate)*100,2)
			);
		}
	},
	returnStorageTrackRate:function(value,cell,record,rowIndex,colIndex,store,view){
		if(value>0){
			return Ext.String.format(
				'<b class="x-ui-text-blue">{1}%</b><r>{0}</r>',
				Ext.util.Format.stringInteger(record.data.track),
				Ext.util.Format.stringNumeral(record.data.track_rate,2)
			);
		}
	},
	returnStorageStaffAvg:function(value,cell,record,rowIndex,colIndex,store,view){
		if(value>0){
			return Ext.String.format(
				'{0}',
				Ext.util.Format.stringInteger(record.data.storage/value)
			);
		}
	},
	returnStorageStaffDays:function(value,cell,record,rowIndex,colIndex,store,view){
		var startDate=new Date(record.data.startdate),
			endDate=record.data.enddate?new Date(record.data.enddate):new Date();
		return Ext.String.format(
			'{0} 天',
			Ext.Date.diff(startDate,endDate,Ext.Date.DAY)
		);
	},
	returnAllotType:function(value,cell,record){
		if(value==1){
			return '<span class="x-ui-text-green">分配</span>'
		}else{
			return '<span class="x-ui-text-red">回收</span>'
		}
	},



	

	returnResMobile:function(value,cell,record){
		var icon='';
		if(record.data.recycling_staff_count>0){	
			icon=Ext.String.format(
				'<i class="f-mt mt-interactive x-ui-text-red" data-qtip="分配次数：{0}次<br/>分配日期：{1}<br/><br/>回收次数：{2}次<br/>回收日期：{3}"></i>',
				record.data.allot_staff_count,
				record.data.allot_staff_date,
				record.data.recycling_staff_count,
				record.data.recycling_staff_date
			);
		}
		return Ext.String.format(
			'{0:nullToNA}<r>{2}{1:safeMobile}</r>',
			record.data.name,
			record.data.mobile,
			icon
		);
	},
	returnResLevel:function(value,cell,record){
		var level='X',
			amount=record.data.amount/1000;
			amount=amount<1?1:amount,
			amount=Ext.util.Format.stringInteger(amount,0)+'K';
		return Ext.String.format(
			'<b>{0}</b><r>{1}</r>',
			record.data.level,
			amount
		);
	},

	returnResStatus:function(value,cell,record){
		switch(value){
			case -100:{
				return Ext.String.format(
					'<div data-qtip="日期：{0:date("Y-m-d")}<br/>账号：{1}<br/>销售：{2} {3}"><span class="{4}""><i class="f-mt {5}"></i> 已开户</span><r>{0:date("m-d")}</r></div>',
					record.data.regdate,
					record.data.login,
					record.data.salesman_namecn,
					record.data.salesman_name,
					record.data.salesmanid==record.data.staffid?'x-ui-text-green':'x-ui-text-red',
					record.data.salesmanid==record.data.staffid?'mt-account-audit':'mt-attention'
				);
			}break;
			case -99:{
				return Ext.String.format(
					'<div data-qtip="日期：{0:date("Y-m-d")}<br/>原因：{2}"><span class="x-ui-text-red"">黑名单</span><r>{0:date("m-d")}</r></div>',
					record.data.filter_time,
					record.data.filter_explain
				);
			}break;
			case 0:{return '<span class="x-ui-text-black">待分配</span>'}break;
			case 1:{return '<span class="x-ui-text-blue">开发中</span>'}break;
			default:{return ''}break;
		}	
	},


	returnResCall:function(value,cell,record){
		if(value>0){
			return Ext.String.format(
				'<span data-qtip="通话次数：{0} 次<br/>通话时长：{1}<br/>首次通话：{2}<br/>最后通话：{3}">{1}<r>{0} 次</r></span>',
				Ext.util.Format.stringInteger(record.data.call_count,0),
				Ext.util.Format.timeFilter(record.data.call_duration),
				Ext.Date.format(record.data.call_firsttime,'Y-m-d H:i A'),
				Ext.Date.format(record.data.call_lasttime,'Y-m-d H:i A')
			);
		}
	},
	



	
	
	//===============================================================================================================================================所有
	//=======================================================电资：所有 跟进历史
	returnResTrackHistory:function(value,cell,record){
		if(value>0){
			var teamTrack='',
				staffTrack='';
			if(record.data.teamid){
				teamTrack=Ext.String.format(
					'<br/><br/><b>团队：{0}</b><br/>分配日期：{1}<br/>累计跟进：{2}天/{3}次',
					record.data.team_name,
					record.data.teamdate,
					record.data.track_team_day,
					record.data.track_team_count
				)
			}
			if(record.data.staffid){
				staffTrack=Ext.String.format(
					'<br/><br/><b>销售员：{0}</b><br/>分配日期：{1}<br/>累计跟进：{2}天/{3}次',
					record.data.staff_namecn+' '+record.data.staff_name,
					record.data.staffdate,
					record.data.track_staff_day,
					record.data.track_staff_count
				)
			}
			return Ext.String.format(
				'<span data-qtip="入库日期：{0}<br/>累计跟进：{1}天/{2}次{3}{4}">{1}天 <r>{2}次</r></span>',
				record.data.date,
				record.data.track_day,
				record.data.track_count,
				teamTrack,
				staffTrack
			);
		}
	},
	//=======================================================电资：全部 最新跟进状态
	returnResTrackTime:function(value,cell,record){
		//if(record.data.status==1){
			var message='';
			if(record.data.track_explain){
				message+='<b>本次跟进情况：</b><br/>'+record.data.track_explain+'<br/>';
			}
			if(record.data.reserve_explain){
				message+='<b>下次计划跟进：</b><br/>'+record.data.reserve_explain+'<br/>';
			}
			return Ext.String.format(
				'<span data-qtip="<b>{1}</b><br/>跟进时间：{2:date("Y-m-d H:i A")}<br/>{3}">{0}<r>{2:date("m-d")}</r></span>',
				Ext.util.Format.strTrackStatus(record.data.track),
				record.data.track_tag,
				record.data.track_time,
				message
			);
		//}
	},


	






	//===============================================================================================================================================销售员
	//=======================================================电资号码
	returnSalesResMobile:function(value,cell,record){
		var icon='';
		if(record.data.track_count_yes>0){	//相对公司 有 待跟进 记录
			icon=Ext.String.format(
				'<i class="f-mt mt-account-update x-ui-text-green" data-qtip="<b>{0}</b> 次 被标记为 <b>待跟进</b>"></i>',
				record.data.track_count_yes
			);
		}
		return Ext.String.format(
			'{0:nullToNA}<r>{2}{1:safeMobile}</r>',
			record.data.name,
			record.data.mobile,
			icon
		);
	},
	//===============================================================================================================================================销售员
	//=======================================================电资：销售员 跟进历史
	returnSalesResTrackHistory:function(value,cell,record){
		if(value>0){
			return Ext.String.format(
				'<span data-qtip="分配日期：{0}">{1}天 <r>{2}次</r></span>',
				record.data.staffdate,
				record.data.track_staff_day,
				record.data.track_staff_count
			);
		}
	},
	//=======================================================电资： 最新跟进状态
	returnSalesResTrackTime:function(value,cell,record){
		//if(record.data.status==1){
			var message='';
			if(record.data.track_staff_explain){
				message+='<b>本次跟进情况：</b><br/>'+record.data.track_staff_explain+'<br/>';
			}
			if(record.data.reserve_staff_explain){
				message+='<b>下次计划跟进：</b><br/>'+record.data.reserve_staff_explain+'<br/>';
			}
			return Ext.String.format(
				'<span data-qtip="<b>{1}</b><br/>跟进时间：{2:date("Y-m-d H:i A")}<br/>{3}">{0}<r>{2:date("m-d")}</r></span>',
				Ext.util.Format.strTrackStatus(record.data.track_staff),
				//record.data.track_staff==1?record.data.reserve_staff_date:record.data.track_staff_time,
				record.data.track_staff_tag,
				record.data.track_staff_time,
				message
				
			);
		//}
	},
	
	
	
	//===============================================================================================================================================当次 sales_track
	//=======================================================跟进记录表 当次销售结果 sales_track
	returnTrackTime:function(value,cell,record){
		return Ext.String.format(
			'{0} <r>{1}</r>',
			Ext.util.Format.strTrackStatus(record.data.track),
			record.data.track==1?Ext.Date.format(record.data.reserve_date,'m-d'):record.data.tag
		);
	},
	returnTrackExplain:function(value,cell,record){
		var color='x-ui-text-grey',
			message='';
		if(record.data.track!=-100){
			if(record.data.track_call_duration>0){
				color='x-ui-text-green';
				message+='<b>本次通话时长：</b>'+Ext.util.Format.timeFilter(record.data.track_call_duration)+'<br/>';
			}
			if(record.data.explain){
				message+='<b>本次跟进情况：</b><br/>'+record.data.explain+'<br/>';
			}
			if(record.data.reserve_explain){
				message+='<b>下次计划跟进：</b><br/>'+record.data.reserve_explain+'<br/>';
			}
			return Ext.String.format(
				'<div data-qtip="{2}"><span class="f-mt mt-mobile {1}"></span><span>{0}</span></div>',
				value,
				color,
				message
			);
		}
	},
	
	
	
	






	//===============================================================================================================================================老客户维护
	//=======================================================电资：销售员 跟进历史
	returnSalesCareTrackHistory:function(value,cell,record){
		if(value>0){
			return Ext.String.format(
				'<span data-qtip="开户日期：{0}">{1}天 <r>{2}次</r></span>',
				record.data.regdate,
				record.data.track_day,
				record.data.track_count
			);
		}
	},
	//=======================================================电资： 最新跟进状态
	returnSalesCareTrackTime:function(value,cell,record){
		var message='';
		if(record.data.track_explain){
			message+='<b>本次跟进情况：</b><br/>'+record.data.track_explain+'<br/>';
		}
		if(record.data.reserve_staff_explain){
			message+='<b>下次计划跟进：</b><br/>'+record.data.reserve_explain+'<br/>';
		}
		return Ext.String.format(
			'<span data-qtip="<b>{1}</b><br/>跟进时间：{2:date("Y-m-d H:i A")}<br/>{3}">{0}<r>{2:date("m-d")}</r></span>',
			Ext.util.Format.strTrackStatus(record.data.track),
			record.data.track_tag,
			record.data.track_time,
			message
		);
	},












	
	
	returnFilterAction:function(value,cell,record){
		return Ext.String.format(
			'{0}',
			value==1?'<span class="x-ui-text-red">手动</span>':'<span class="x-ui-text-green">自动</span>'
		);
	},
	returnFilterOperator:function(value,cell,record){
		return Ext.String.format(
			'{0} <s>{1}</s>',
			value>0?record.data.operator_namecn:'系统',
			value>0?record.data.operator_name:'System'
		);
	},
	
	
	//======================================================================库存 Gauge
	getStorageGauge:function(record){
		var sum=function(v1,v2){
			var v=(record[v1]/record[v2])*100,
				v=Ext.util.Format.stringNumeral(v,2);
			return v;
		}
		var items=[
			{xtype:'container',flex:1,minHeight:360,layout:{type:'vbox',align:'stretch'},items:[
				{xtype:'box',userCls:'x-ui-gauge-herder',width:160,minHeight:40,flex:0,
					data:record,
					tpl:[
						'<div data-qtip="总量：<b>{storage:stringInteger}</b><br/>A类：<b>{storage_a:stringInteger}</b><br/>B类：<b>{storage_b:stringInteger}</b><br/>C类：<b>{storage_c:stringInteger}</b><br/>D类：<b>{storage_d:stringInteger}</b>">',
							'电资总量 {storage:stringInteger}',
						'</div>',
						'<div class="x-ui-block-table x-ui-mt10">',
							'<table><tbody>',
								'<tr>',
									'<tpl if="storageId==1">',
										'<td>待分配：</td><td class="x-ui-text-blue"><b>{storage_waitallot:stringInteger}</b></td>',
									'<tpl else>',
										'<td>库存：</td><td class="x-ui-text-blue"><b>{storage:stringInteger}</b></td>',
									'</tpl>',
									'<td>已开户：</td><td class="x-ui-text-green">{storage_account:stringInteger}</td>',
									'<td>黑名单：</td><td>{storage_blacklist:stringInteger}</td>',
								'</tr>',
								'<tr>',
									'<td>开发中：</td><td><b>{storage_ok:stringInteger}</b></r></td>',
									'<td>已跟进：</td><td class="x-ui-text-green">{track:stringInteger}</r></td>',
									'<td>未跟进：</td><td class="x-ui-text-red">{track_new:stringInteger}</r></td>',
								'</tr>',
							'</tbody></table>',
						'</div>'
					]
				},
				{ui:'large orange',flex:1,value:sum('track','storage_ok'),textTpl:'<s>已跟进</s><br/><b>{value}%</b><br/><s>'+Ext.util.Format.stringInteger(record.track)+'</s>'} 
			]},
			{xtype:'container',minHeight:220,items:[
				{ui:'medium blue',value:sum('track_new','storage_ok'),textTpl:'<s>未跟进</s><br/><b>{value}%</b><br/><s>'+Ext.util.Format.stringInteger(record.track_new)+'</s>'}, 
				{ui:'medium black',value:sum('track_invalid','storage_ok'),textTpl:'<s>无效</s><br/><b>{value}%</b><br/><s>'+Ext.util.Format.stringInteger(record.track_invalid)+'</s>'}
			]},
			{xtype:'container',minHeight:220,items:[
				{ui:'medium red',value:sum('track_no','storage_ok'),textTpl:'<s>无意向</s><br/><b>{value}%</b><br/><s>'+Ext.util.Format.stringInteger(record.track_no)+'</s>'}, 
				{ui:'medium green',value:sum('track_yes','storage_ok'),textTpl:'<s>待跟进</s><br/><b>{value}%</b><br/><s>'+Ext.util.Format.stringInteger(record.track_yes)+'</s>'} 
			]}
		];
		return items;
	},
	




	//============================================================================销售资源 右键菜单
	onDataShowMenu:function(gridView,record,tr,rowIndex,e,eOpts){
		var me=this;
		gridView.rightMenu=Ext.widget({
			xtype:'menu',
			items:[
				{text:'电资详情',iconCls:'f-mt mt-drive',handler:function(button){
					me.onDataShowDetail(gridView,record,tr,rowIndex,e,eOpts)
				}}
				//{xtype:'menuseparator'}
			]
		});
		e.preventDefault();  
		gridView.rightMenu.showAt(e.getXY());
	},

	//=========================================================================================================销售资源 详情 WINDOW
	onDataShowDetail:function(grid,record,tr,rowIndex,e,eOpts){
		var winid=Mate.getWinId(this,record.data.id),
			store=grid.getStore(),
			title,widget,viewModel;
		switch(record.data.idx){
			case 1:{
				title='电资： <b>'+record.data.name+' '+record.data.mobile+'</b> 跟进历史';
				widget='sdSalesResourcesDataDetail';
				viewModel={
					data:{info:record},
					stores:{
						pieStaff:{
							fields:['objects','value'],
							data:[
								{objects:'无效',value:record.data.track_team_count_invalid},
								{objects:'无意向',value:record.data.track_team_count_no},
								{objects:'待跟进',value:record.data.track_team_count_yes}
							]
						},
						pieTrack:{
							fields:['objects','value'],
							data:[
								{objects:'无效',value:record.data.track_count_invalid},
								{objects:'无意向',value:record.data.track_count_no},
								{objects:'待跟进',value:record.data.track_count_yes}
							]
						},
						gridTrack:{
							type:'sales.track',
							autoLoad:true,
							pageSize:false,
							proxy:{extraParams:{app:'resources',menu:'history',mobile:record.data.mobile}}
						},
						gridCall:{
							type:'call.record',
							autoLoad:true,
							pageSize:false,
							proxy:{extraParams:{othernum:record.data.mobile}}
						}
						
					}
				}
				
				
			}break;
			case 2:{
				return false;
				title='客户： <b>'+record.data.name+' '+record.data.mobile+'</b> 维护历史';
				widget='sdSalesCareHistory';
			}break;
		}
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:title,
			modal:false,
			width:1320,
			minHeight:600,
			items:[
				{xtype:widget,viewModel:viewModel}
			]
		});
		this.getView().add(win).show().center();
	}
	
	
	
	
	
	
	
	
	
	
});  
