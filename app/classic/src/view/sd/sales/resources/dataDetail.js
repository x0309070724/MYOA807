Ext.define('APP.view.sd.sales.resources.dataDetail',{
    extend:'Ext.Container',
	xtype:'sdSalesResourcesDataDetail',
	layout:{type:'hbox',align:'stretch'},
	items:[
		{xtype:'container',layout:{type:'vbox',align:'stretch'},width:300,
			defaults:{xtype:'polar',flex:1,padding:0,innerPadding:15,series:[{type:'pie',donut:20,label:{calloutLine:{length:30}},highlight:{margin:10}}]},
			items:[
				{captions:{title:{text:'全部跟进'}},bind:{store:'{pieStaff}'}},		
				{captions:{title:{text:'当前销售跟进'}},bind:{store:'{pieTrack}'},margin:'3 0 0 0'}		
			]
		},
		{xtype:'container',layout:{type:'vbox',align:'stretch'},minWidth:800,height:600,flex:1,margin:'0 0 0 3',
			items:[
				{xtype:'box',minHeight:80,
					bind:{data:'{info}'},	
					tpl:[
						'<div class="x-ui-block-table">',
							'<table><tbody>',
								'<tr>',
									'<td>号码：</td><td>{mobile}</td>',
									'<td>姓名：</td><td>{name}</td>',
									'<td>区域：</td><td>{province} {city}</td>',
								'</tr>',
								'<tr>',
									'<td>当前销售：</td><td>{staff_namecn} <s>{staff_name}</s><r>{team_name}</r></td>',
									'<td>已跟进：</td><td>{track_staff_day}天 <r>{track_staff_count}次</td>',
									'<td>状态：</td><td>{track:strTrackStatus}<r>{track_time:date("Y-m-d H:i A")}</r></td>',
								'</tr>',
								'<tr>',
									'<td>通话时长：</td><td>{call_duration:timeFilter}<r>{call_count}次</r></td>',
									'<td>首次通话：</td><td>{call_firsttime:date("Y-m-d H:i A")}</td>',
									'<td>最后通话：</td><td>{call_lasttime:date("Y-m-d H:i A")}</td>',
								'</tr>',
							'</tbody></table>',
						'</div>'
					]
				},
				{xtype:'tabpanel',minHeight:300,flex:1,
					margin:'3 0 0 0',
					layout:'card',
					minTabWidth:140,
					items:[
						{xtype:'grid',title:'跟进记录',
							bind:{store:'{gridTrack}'},
							columns:[
								{xtype:'rownumberer'},
								{text:'日期',xtype:'datecolumn',dataIndex:'time',width:80,format:'Y-m-d'},
								//{text:'时间',xtype:'datecolumn',dataIndex:'time',width:120,format:'Y-m-d H:i A'},
								{text:'销售员',xtype:'templatecolumn',tpl:'{staff_namecn} <s>{staff_name}</s><r>{team_name}</r>',width:160},
								{text:'销售结果',dataIndex:'track',width:100,renderer:'returnTrackTime'},
								{text:'注释',dataIndex:'explain',minWidth:120,flex:1,renderer:'returnTrackExplain'}
							]
							//features:[{ftype:'summary',dock:'bottom'}]
						},
						{xtype:'grid',title:'通话记录',
							bind:{store:'{gridCall}'},
							columns:[
								{xtype:'rownumberer',docked:'bottom'},
								//{text:'日期',xtype:'datecolumn',dataIndex:'time',width:80,format:'Y-m-d'},
								{text:'时间',xtype:'datecolumn',dataIndex:'time',minWidth:120,flex:1,format:'Y-m-d H:i A'},
								{text:'销售员',xtype:'templatecolumn',tpl:'{namecn} <s>{name}</s><r>{team_name}</r>',width:160},
								{text:'号码',dataIndex:'no',width:100,summaryType:'count'},
								{text:'性质',dataIndex:'cmd',width:100,renderer:'returnCallRecordCmd'},
								{text:'通话时长',dataIndex:'duration',width:80,tdCls:'x-ui-text-green',renderer:'returnTimeFilter',summaryType:'sum',summaryRenderer:'returnTimeFilter'},
								{text:'本机通话地',dataIndex:'talkhome',width:100},
								{text:'呼叫类型',xtype:'templatecolumn',tpl:'{thtype}<r>{roma}</r>',width:150}
							],
							features:[{ftype:'summary',dock:'bottom'}]
						}
					]
				}
			]
		}
	]
});

















