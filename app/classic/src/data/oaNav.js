Ext.define('APP.data.oaNav',{
	alternateClassName:'oaNav',
	statics:{
		navigation:[
			{id:1000,text:'销售部',view:'sd.main',
				children:[
					{id:1101,iconCls:'f-mt mt-report',text:'日常管理',
						children:[
							{id:110101,text:'日常工作',expanded:true,children:[
								{leaf:true,id:11010101,iconCls:'f-mt mt-arrow',text:'日志审阅',view:'sd.mgr.work.report.worklog'}
							]},
							{id:110102,text:'工作报告',expanded:true,children:[
								{leaf:true,id:11010201,iconCls:'f-mt mt-arrow',text:'电资销售',view:'sd.mgr.work.report.res'},
								{leaf:true,id:11010202,iconCls:'f-mt mt-arrow',text:'客户维护',view:'sd.mgr.work.report.care'},
								{leaf:true,id:11010203,iconCls:'f-mt mt-arrow',text:'出金跟进',view:'sd.mgr.work.report.funds'}
							]},
							{id:110104,text:'销售分析',expanded:true,children:[
								{leaf:true,id:11010401,iconCls:'f-mt mt-arrow',text:'按对象统计',view:'sd.mgr.work.analysis.sales.objects'},
								{leaf:true,id:11010402,iconCls:'f-mt mt-arrow',text:'按时间统计',view:'sd.mgr.work.analysis.sales.time'}
							]},
							{id:110105,text:'业绩分析',expanded:true,children:[
								{leaf:true,id:11010501,iconCls:'f-mt mt-arrow',text:'按对象统计',view:'sd.mgr.work.analysis.results.objects'},
								{leaf:true,id:11010502,iconCls:'f-mt mt-arrow',text:'按时间统计',view:'sd.mgr.work.analysis.results.time'}
							]}
					   ]
					},
					{id:1102,iconCls:'f-mt mt-globe-2',text:'电话管理',
						children:[
							{id:110201,text:'号码库',expanded:true,children:[
								{leaf:true,id:11020101,iconCls:'f-mt mt-arrow',text:'号码入库',view:'sd.mgr.call.no.storage'},
								{leaf:true,id:11020102,iconCls:'f-mt mt-arrow',text:'号码查询',view:'sd.mgr.call.no.mobile'},
								{leaf:true,id:11020103,iconCls:'f-mt mt-arrow',text:'余量查询',view:'sd.mgr.call.no.package'},
								{leaf:true,id:11020104,iconCls:'f-mt mt-arrow',text:'通话记录',view:'sd.mgr.call.no.record'},
								{leaf:true,id:11020105,iconCls:'f-mt mt-arrow',text:'异常记录',view:'sd.mgr.call.no.fake'}
							]},
							{id:110202,text:'号码变动',expanded:true,children:[
								{leaf:true,id:11020201,iconCls:'f-mt mt-arrow',text:'号码分配',view:'sd.mgr.call.change.allot'},
								{leaf:true,id:11020202,iconCls:'f-mt mt-arrow',text:'号码交接',view:'sd.mgr.call.change.transfer'},
								{leaf:true,id:11020203,iconCls:'f-mt mt-arrow',text:'号码回收',view:'sd.mgr.call.change.recycling'}
							]}
					   ]
					},
					{id:1103,iconCls:'f-mt mt-batch',text:'电资管理',
						children:[
							{id:110302,text:'电资管理',expanded:true,children:[
								{leaf:true,id:11030201,iconCls:'f-mt mt-arrow',text:'电资概览',view:'sd.mgr.res.data'},
								{leaf:true,id:11030202,iconCls:'f-mt mt-arrow',text:'库存分析',view:'sd.mgr.res.storage'},
								{leaf:true,id:11030203,iconCls:'f-mt mt-arrow',text:'黑名单',view:'sd.mgr.res.filter'},
								{leaf:true,id:11030204,iconCls:'f-mt mt-arrow',text:'销售记录',view:'sd.mgr.res.history'}
							]},
							{id:110303,text:'电资分配',expanded:true,children:[
								{leaf:true,id:11030301,iconCls:'f-mt mt-arrow',text:'团队分配',view:'sd.mgr.res.allot.team'},
								{leaf:true,id:11030302,iconCls:'f-mt mt-arrow',text:'员工分配',view:'sd.mgr.res.allot.staff'},
								{leaf:true,id:11030303,iconCls:'f-mt mt-arrow',text:'分配记录',view:'sd.mgr.res.allot.record'}
							]},
							{id:110304,text:'电资回收',expanded:true,children:[
								{leaf:true,id:11030401,iconCls:'f-mt mt-arrow',text:'团队回收',view:'sd.mgr.res.recycling.team'},
								{leaf:true,id:11030402,iconCls:'f-mt mt-arrow',text:'员工回收',view:'sd.mgr.res.recycling.staff'},
								{leaf:true,id:11030403,iconCls:'f-mt mt-arrow',text:'回收记录',view:'sd.mgr.res.recycling.record'}
							]}
					   ]
					},
					{id:1104,iconCls:'f-mt mt-additve',text:'客户管理',
						children:[
							{id:110401,text:'账户查询',expanded:true,children:[
								{leaf:true,id:11040101,iconCls:'f-mt mt-arrow',text:'申请记录',view:'sd.mgr.csr.apply'},
								{leaf:true,id:11040102,iconCls:'f-mt mt-arrow',text:'账户查询',view:'sd.mgr.csr.record'}
							]},
							{id:110402,text:'交易查询',expanded:true,children:[
								{leaf:true,id:11040201,iconCls:'f-mt mt-arrow',text:'申请记录',view:'sd.mgr.funds.apply'},
								{leaf:true,id:11040202,iconCls:'f-mt mt-arrow',text:'交易查询',view:'sd.mgr.funds.record'}
							]},
							{id:110403,text:'账户统计',expanded:true,children:[
								{leaf:true,id:11040301,iconCls:'f-mt mt-arrow',text:'账户统计',view:'sd.mgr.csr.statistics'}
							]}
//							{id:120303,text:'账户统计',expanded:true,children:[
//								{leaf:true,id:12030301,iconCls:'f-mt mt-arrow',text:'IB 统计',view:'sd.account.statistics'},
//								{leaf:true,id:12030302,iconCls:'f-mt mt-arrow',text:'SH 统计',view:'sd.account.statistics'}
//							]}
					   ]
					},

					{id:1201,iconCls:'f-mt mt-report-day',text:'日常工作',
						children:[
							{id:120101,text:'日常工作',expanded:true,children:[
								{leaf:true,id:12010101,iconCls:'f-mt mt-arrow',text:'工作日志',view:'sd.worklog.index'}
							]}
					   ]
					},
					{id:1202,iconCls:'f-mt mt-access',text:'客户开发',
						children:[
							{id:120201,text:'电资销售',expanded:true,children:[
								{leaf:true,id:12020101,iconCls:'f-mt mt-arrow',text:'我的电资',view:'sd.sales.resources.data'},
								{leaf:true,id:12020102,iconCls:'f-mt mt-arrow',text:'电资开发',view:'sd.sales.resources.dev.index'},
								{leaf:true,id:12020103,iconCls:'f-mt mt-arrow',text:'分配记录',view:'sd.sales.resources.allot'},
								{leaf:true,id:12020104,iconCls:'f-mt mt-arrow',text:'销售记录',view:'sd.sales.resources.history'}
							]},
							{id:120202,text:'客户维护',expanded:true,children:[
								{leaf:true,id:12020201,iconCls:'f-mt mt-arrow',text:'我的客户',view:'sd.sales.care.data'},
								{leaf:true,id:12020202,iconCls:'f-mt mt-arrow',text:'客户维护',view:'sd.sales.care.dev.index'},
								{leaf:true,id:12020203,iconCls:'f-mt mt-arrow',text:'出金跟进',view:'sd.sales.care.funds'},
								{leaf:true,id:12020204,iconCls:'f-mt mt-arrow',text:'维护记录',view:'sd.sales.care.history'}
							]},
							{id:120205,text:'销售分析',expanded:true,children:[
								{leaf:true,id:12020501,iconCls:'f-mt mt-arrow',text:'销售报表',view:'sd.sales.track.report'},
								{leaf:true,id:12020502,iconCls:'f-mt mt-arrow',text:'销售趋势',view:'sd.sales.track.trend'}
							]},
							{id:120206,text:'业绩分析',expanded:true,children:[
								{leaf:true,id:12020601,iconCls:'f-mt mt-arrow',text:'业绩报表',view:'sd.sales.results.report'},
								{leaf:true,id:12020602,iconCls:'f-mt mt-arrow',text:'业绩趋势',view:'sd.sales.results.trend'}
							]}
					   ]
					},
					{id:1203,iconCls:'f-mt mt-additve',text:'客户查询',
						children:[
							{id:120301,text:'账户查询',expanded:true,children:[
								{leaf:true,id:12030101,iconCls:'f-mt mt-arrow',text:'申请记录',view:'sd.staff.csr.apply'},
								{leaf:true,id:12030102,iconCls:'f-mt mt-arrow',text:'账户查询',view:'sd.staff.csr.record'}
							]},
							{id:120302,text:'交易查询',expanded:true,children:[
								{leaf:true,id:12030201,iconCls:'f-mt mt-arrow',text:'申请记录',view:'sd.staff.funds.apply'},
								{leaf:true,id:12030202,iconCls:'f-mt mt-arrow',text:'交易查询',view:'sd.staff.funds.record'}
							]},
							{id:120303,text:'账户统计',expanded:true,children:[
								{leaf:true,id:12030301,iconCls:'f-mt mt-arrow',text:'账户统计',view:'sd.staff.csr.statistics'}
							]}
					   ]
					}
//					{id:1109,iconCls:'f-mt mt-chart',text:'统计分析',
//						children:[
//							{id:110903,text:'销售分析',expanded:true,children:[
//								{leaf:true,id:11090301,iconCls:'f-mt mt-arrow',text:'按对象统计',view:'sd.mgr.analysis.sales.objects'},
//								{leaf:true,id:11090302,iconCls:'f-mt mt-arrow',text:'按时间统计',view:'sd.mgr.analysis.sales.time'}
//							]},
//							{id:110902,text:'业绩分析',expanded:true,children:[
//								{leaf:true,id:11090201,iconCls:'f-mt mt-arrow',text:'按对象统计',view:'sd.mgr.analysis.results.objects'},
//								{leaf:true,id:11090202,iconCls:'f-mt mt-arrow',text:'按时间统计',view:'sd.mgr.analysis.results.time'}
//							]}
//					   ]
//					}
			   ]
			},
			{id:2000,text:'交易部',view:'rd.main',
				children:[
					{id:2001,iconCls:'f-mt mt-wholesale',text:'账户查询',
						children:[
							{id:200101,text:'账户查询',expanded:true,children:[
								{leaf:true,id:20010101,iconCls:'f-mt mt-arrow',text:'全部账户',view:'rd.account.all'},
								{leaf:true,id:20010102,iconCls:'f-mt mt-arrow',text:'在线账户',view:'rd.account.online'}
							]},
							{id:200102,text:'交易查询',expanded:true,children:[
								{leaf:true,id:20010201,iconCls:'f-mt mt-arrow',text:'全部',view:'rd.trade.history.all'},
								{leaf:true,id:20010202,iconCls:'f-mt mt-arrow',text:'市价单',view:'rd.trade.history.order'},
								{leaf:true,id:20010203,iconCls:'f-mt mt-arrow',text:'挂单记录',view:'rd.trade.history.pending'},
								{leaf:true,id:20010204,iconCls:'f-mt mt-arrow',text:'出入金记录',view:'rd.trade.history.funds'},
								{leaf:true,id:12030205,iconCls:'f-mt mt-arrow',text:'信用记录',view:'rd.trade.history.credit'}
							]},
							{id:200103,text:'其它查询',expanded:true,children:[
								{leaf:true,id:20010301,iconCls:'f-mt mt-arrow',text:'AGENT',view:'rd.trade.balance.agent'},
								{leaf:true,id:20010302,iconCls:'f-mt mt-arrow',text:'GIFT',view:'rd.trade.balance.gift'},
								{leaf:true,id:20010303,iconCls:'f-mt mt-arrow',text:'ZERO',view:'rd.trade.balance.zero'},
								{leaf:true,id:20010304,iconCls:'f-mt mt-arrow',text:'RECOVER',view:'rd.trade.balance.recover'}
							]},
							{id:200104,text:'工具',expanded:true,children:[
								{leaf:true,id:20010401,iconCls:'f-mt mt-arrow',text:'余额流水',view:'rd.analysis.tool.assets'},
								{leaf:true,id:20010402,iconCls:'f-mt mt-arrow',text:'订单盈亏重现',view:'rd.analysis.tool.profit'},
								{leaf:true,id:20010403,iconCls:'f-mt mt-arrow',text:'订单历史行情',view:'rd.analysis.tool.quotes'}
							]}
					   ]
					},
					{id:2002,iconCls:'f-mt mt-eye-on',text:'监控服务',
						children:[
							{id:200201,text:'监控设置',expanded:true,children:[
								{leaf:true,id:20020101,iconCls:'f-mt mt-arrow',text:'基础配置',view:'rd.settings.basis',type:'window'},
								{leaf:true,id:20020102,iconCls:'f-mt mt-arrow',text:'行情监控',view:'rd.settings.quoted'},
								{leaf:true,id:20020103,iconCls:'f-mt mt-arrow',text:'下单监控',view:'rd.settings.singletest',type:'window'}
								//{leaf:true,id:20020104,iconCls:'f-mt mt-arrow',text:'净值监控',view:'rd.settings.account',type:'window'},
								//{leaf:true,id:20020105,iconCls:'f-mt mt-arrow',text:'盈利监控',view:'rd.settings.trade',type:'window'}
							]},
							{id:200202,text:'监控记录',expanded:true,children:[
								{leaf:true,id:20020201,iconCls:'f-mt mt-arrow',text:'盘面资产',view:'rd.monitor.assets'},
								{leaf:true,id:20020202,iconCls:'f-mt mt-arrow',text:'净值历史',view:'rd.monitor.equity'},
								{leaf:true,id:20020203,iconCls:'f-mt mt-arrow',text:'点差历史',view:'rd.monitor.spread'},
								{leaf:true,id:20020209,iconCls:'f-mt mt-arrow',text:'报警记录',view:'rd.monitor.alarm'}
							]}
	//						{id:200103,text:'监控报表',expanded:true,children:[
	//							{leaf:true,id:20010301,iconCls:'f-mt mt-arrow',text:'警报报表',view:'rd.report.alarm'}
	//						]}
					   ]
					},
	//				{id:2003,iconCls:'f-mt mt-other',text:'风险警示',
	//					children:[
	//						{id:200301,text:'账户',expanded:true,children:[
	//							{leaf:true,id:20030101,iconCls:'f-mt mt-arrow',text:'短线账户',view:'rd.risk.account.short'},
	//							{leaf:true,id:20030102,iconCls:'f-mt mt-arrow',text:'大单账户',view:'rd.risk.account.volume'},
	//							{leaf:true,id:20030103,iconCls:'f-mt mt-arrow',text:'盈利账户',view:'rd.risk.account.profit'}
	//						]},
	//						{id:200302,text:'交易',expanded:true,children:[
	//							{leaf:true,id:20030201,iconCls:'f-mt mt-arrow',text:'短线交易',view:'rd.risk.trade.short'},
	//							{leaf:true,id:20030202,iconCls:'f-mt mt-arrow',text:'大单交易',view:'rd.risk.trade.volume'},
	//							{leaf:true,id:20030203,iconCls:'f-mt mt-arrow',text:'盈利订单',view:'rd.risk.trade.profit'}
	//						]}
	//					]
	//				},
					{id:2003,iconCls:'f-mt mt-chart-area',text:'交易分析',
						children:[
							{id:200301,text:'交易账户',expanded:true,children:[
								{leaf:true,id:20030101,iconCls:'f-mt mt-arrow',text:'持仓报表',view:'rd.analysis.account.positions'},
								{leaf:true,id:20030102,iconCls:'f-mt mt-arrow',text:'交易报表',view:'rd.analysis.account.report'},
								{leaf:true,id:20030103,iconCls:'f-mt mt-arrow',text:'交易分析',view:'rd.analysis.account.statistics'}
								//{leaf:true,id:20030104,iconCls:'f-mt mt-arrow',text:'趋势分析',view:'rd.analysis.account.trend'}
							]},

							{id:200302,text:'代理账户',expanded:true,children:[
								{leaf:true,id:20030201,iconCls:'f-mt mt-arrow',text:'持仓报表',view:'rd.analysis.agent.positions'},
								{leaf:true,id:20030202,iconCls:'f-mt mt-arrow',text:'交易报表',view:'rd.analysis.agent.report'},
								{leaf:true,id:20030203,iconCls:'f-mt mt-arrow',text:'交易分析',view:'rd.analysis.agent.statistics'}
							]},
							{id:200303,text:'商品',expanded:true,children:[
								{leaf:true,id:20030302,iconCls:'f-mt mt-arrow',text:'持仓报表',view:'rd.analysis.symbol.positions'},
								{leaf:true,id:20030301,iconCls:'f-mt mt-arrow',text:'交易报表',view:'rd.analysis.symbol.report'},
								{leaf:true,id:20030303,iconCls:'f-mt mt-arrow',text:'交易分析',view:'rd.analysis.symbol.statistics'}
							]}

					   ]
					},
					{id:2005,iconCls:'f-mt mt-friends',text:'工具',
						children:[
							{id:200501,text:'群管理',expanded:true,children:[
								{leaf:true,id:20050101,iconCls:'f-mt mt-arrow',text:'群查询',view:'rd.shouting.qun.group'},
								{leaf:true,id:20050102,iconCls:'f-mt mt-arrow',text:'成员查询',view:'rd.shouting.qun.member'}
							]},
							{id:200502,text:'喊单资讯',expanded:true,children:[
								{leaf:true,id:20050201,iconCls:'f-mt mt-arrow',text:'技术分析',view:'rd.shouting.skill.tc'},
								//{leaf:true,id:20050201,iconCls:'f-mt mt-arrow',text:'早餐见闻',view:'tool.skill.morning.record'},
								{leaf:true,id:20050202,iconCls:'f-mt mt-arrow',text:'喊单记录',view:'rd.shouting.skill.call'}
							]}
					   ]
					}
			   ]
			},


			{id:3000,text:'综审部',view:'ia.main',
				children:[
					{id:3001,iconCls:'f-mt mt-setup-4',text:'CRM·配置',
						children:[
							{id:300101,text:'系统设置',expanded:true,children:[
								{leaf:true,id:30010101,iconCls:'f-mt mt-arrow',text:'全局配置',view:'ia.system.global.basis',type:'window'},
								{leaf:true,id:30010102,iconCls:'f-mt mt-arrow',text:'业务反馈',view:'ia.system.global.feedback',type:'window'},
								{leaf:true,id:30010103,iconCls:'f-mt mt-arrow',text:'公告发布',view:'ia.system.global.notice',type:'window'}
							]},
							{id:300102,text:'账户设置',expanded:true,children:[
								{leaf:true,id:30010201,iconCls:'f-mt mt-arrow',text:'账户策略',view:'ia.system.account.basis',type:'window'},
								{leaf:true,id:30010202,iconCls:'f-mt mt-arrow',text:'账户性质',view:'ia.system.account.property'},
								{leaf:true,id:30010203,iconCls:'f-mt mt-arrow',text:'权限分配',view:'ia.system.account.role'},
								{leaf:true,id:30010204,iconCls:'f-mt mt-arrow',text:'开户协议',view:'ia.system.account.agreement'}
							]},
							{id:300103,text:'交易设置',expanded:true,children:[
								{leaf:true,id:30010301,iconCls:'f-mt mt-arrow',text:'支付接口',view:'ia.system.funds.pay'},
								{leaf:true,id:30010302,iconCls:'f-mt mt-arrow',text:'入金配置',view:'ia.system.funds.deposit',type:'window'},
								{leaf:true,id:30010303,iconCls:'f-mt mt-arrow',text:'出金配置',view:'ia.system.funds.withdrawal',type:'window'},
								{leaf:true,id:30010304,iconCls:'f-mt mt-arrow',text:'信用配置',view:'ia.system.funds.credit',type:'window'},
								{leaf:true,id:30010305,iconCls:'f-mt mt-arrow',text:'转账配置',view:'ia.system.funds.transfer',type:'window'}
							]}
					   ]
					},
					{id:3001,iconCls:'f-mt mt-additve',text:'账户管理',
						children:[
							{id:300101,text:'账户审核',expanded:true,children:[
								{leaf:true,id:30010101,iconCls:'f-mt mt-arrow',text:'账户审核',view:'ia.account.apply.audit'},
								{leaf:true,id:30010102,iconCls:'f-mt mt-arrow',text:'账户确认',view:'ia.account.apply.confirm'},
								{leaf:true,id:30010103,iconCls:'f-mt mt-arrow',text:'申请记录',view:'ia.account.apply.history'}
							]},
							{id:300102,text:'账户管理',expanded:true,children:[
								{leaf:true,id:30010201,iconCls:'f-mt mt-arrow',text:'模拟帐户',view:'ia.account.manager.demo'},
								{leaf:true,id:30010202,iconCls:'f-mt mt-arrow',text:'交易帐户',view:'ia.account.manager.real'},
								{leaf:true,id:30010203,iconCls:'f-mt mt-arrow',text:'代理帐户',view:'ia.account.manager.agent'},
								{leaf:true,id:30010204,iconCls:'f-mt mt-arrow',text:'测试帐户',view:'ia.account.manager.tested'},
								{leaf:true,id:30010205,iconCls:'f-mt mt-arrow',text:'全部帐户',view:'ia.account.manager.all'}
							]},
							{id:300103,text:'账户维护',expanded:true,defaults:{},children:[
								{leaf:true,id:30010301,iconCls:'f-mt mt-arrow',text:'账户交接',view:'ia.account.change.transfer'},
								{leaf:true,id:30010302,iconCls:'f-mt mt-arrow',text:'交接记录',view:'ia.account.change.transferRecord'},
								{leaf:true,id:30010303,iconCls:'f-mt mt-arrow',text:'账户更新',view:'ia.account.change.update'}
							]}
					   ]
					},
					{id:3002,iconCls:'f-mt mt-account-strate',text:'交易管理',
						children:[
							{id:300201,text:'交易审核',expanded:true,children:[
								{leaf:true,id:30020101,iconCls:'f-mt mt-arrow',text:'入金审核',view:'ia.funds.apply.deposit'},
								{leaf:true,id:30020102,iconCls:'f-mt mt-arrow',text:'出金审核',view:'ia.funds.apply.withdrawal'},
								{leaf:true,id:30020103,iconCls:'f-mt mt-arrow',text:'信用审核',view:'ia.funds.apply.credit'},
								{leaf:true,id:30020104,iconCls:'f-mt mt-arrow',text:'转账审核',view:'ia.funds.apply.transfer'},
								{leaf:true,id:30020105,iconCls:'f-mt mt-arrow',text:'申请记录',view:'ia.funds.apply.history'}
							]},
							{id:300202,text:'交易管理',expanded:true,children:[
								{leaf:true,id:30020201,iconCls:'f-mt mt-arrow',text:'入金管理',view:'ia.funds.manager.deposit'},
								{leaf:true,id:30020202,iconCls:'f-mt mt-arrow',text:'出金管理',view:'ia.funds.manager.withdrawal'},
								{leaf:true,id:30020203,iconCls:'f-mt mt-arrow',text:'信用管理',view:'ia.funds.manager.credit'},
								{leaf:true,id:30020204,iconCls:'f-mt mt-arrow',text:'转账管理',view:'ia.funds.manager.transfer'}
							]}
					   ]
					},
					{id:3006,iconCls:'f-mt mt-account-strate',text:'GCC 相关',
						children:[
							{id:300601,text:'账户查询',expanded:true,children:[
								{leaf:true,id:30060101,iconCls:'f-mt mt-arrow',text:'ABC & GCC',view:'ia.gcc.account'}
							]}
					   ]
					}
			   ]
			},




			{id:4000,text:'人事部',view:'hr.main',
				children:[
					{id:4001,iconCls:'f-mt mt-system',text:'企业管理',
						children:[
							{id:400101,text:'档案',expanded:true,children:[
								{leaf:true,id:40010101,iconCls:'f-mt mt-arrow',text:'文件管理',view:'hr.file.document.index'},
								{leaf:true,id:40010102,iconCls:'f-mt mt-arrow',text:'相册管理',view:'hr.file.album.index'}
							]},
							{id:400102,text:'服务',expanded:true,children:[
								{leaf:true,id:40010201,iconCls:'f-mt mt-arrow',text:'企业邮箱',view:'hr.service.mail.index'},
								{leaf:true,id:40010202,iconCls:'f-mt mt-arrow',text:'企业QQ',view:'hr.service.bqq.index'}
							]},
							{id:400103,text:'工作日志',expanded:true,children:[
								{leaf:true,id:40010301,iconCls:'f-mt mt-arrow',text:'工作日志',view:'hr.service.work.worklog'}
							]}
					   ]
					},
					{id:4002,iconCls:'f-mt mt-account-strate',text:'人事架构',
						children:[
							{id:400201,text:'组织架构',expanded:true,children:[
								{leaf:true,id:40020101,iconCls:'f-mt mt-arrow',text:'网点管理',view:'hr.company.branch'},
								{leaf:true,id:40020102,iconCls:'f-mt mt-arrow',text:'部门管理',view:'hr.company.department'},
								{leaf:true,id:40020103,iconCls:'f-mt mt-arrow',text:'团队管理',view:'hr.company.team'},
								{leaf:true,id:40020104,iconCls:'f-mt mt-arrow',text:'职务管理',view:'hr.company.post'}
							]},
							{id:400202,text:'员工管理',expanded:true,children:[
								{leaf:true,id:40020201,iconCls:'f-mt mt-arrow',text:'档案管理',view:'hr.staff.profile.info'},
								//{leaf:true,id:40020101,iconCls:'f-mt mt-arrow',text:'档案管理',view:'hr.staff.profile.infoTree'},
								{leaf:true,id:40020202,iconCls:'f-mt mt-arrow',text:'银行账户',view:'hr.staff.profile.bank'},
								{leaf:true,id:40020203,iconCls:'f-mt mt-arrow',text:'工号管理',view:'hr.staff.profile.account'}
							]},
							{id:400203,text:'人事变动',expanded:true,children:[
								{leaf:true,id:40020301,iconCls:'f-mt mt-arrow',text:'员工转正',view:'hr.staff.change.positive'},
								{leaf:true,id:40020302,iconCls:'f-mt mt-arrow',text:'岗位变更',view:'hr.staff.change.team'},
								{leaf:true,id:40020303,iconCls:'f-mt mt-arrow',text:'职位变更',view:'hr.staff.change.post'},
								{leaf:true,id:40020304,iconCls:'f-mt mt-arrow',text:'离职管理',view:'hr.staff.change.leaving'},
								{leaf:true,id:40020305,iconCls:'f-mt mt-arrow',text:'复职管理',view:'hr.staff.change.reinstatement'}
							]}
					   ]
					},
					{id:4003,iconCls:'f-mt mt-account-strate',text:'活动管理',
						children:[
							{id:400301,text:'投票活动',expanded:true,children:[
								{leaf:true,id:40030101,iconCls:'f-mt mt-arrow',text:'投票管理',view:'hr.staff.activity.vote'}
							]}
					   ]
					}
			   ]
			},

			//{id:6000,text:'MANAGER',view:'mt4.main'},


			{id:7000,text:'系统管理',view:'sys.main',
				children:[
					{id:7001,iconCls:'f-mt mt-settings',text:'OA·配置',
						children:[
							{id:700101,text:'系统设置',expanded:true,children:[
								{leaf:true,id:70010101,iconCls:'f-mt mt-arrow',text:'全局配置',view:'sys.system.settings.basis',type:'window'}
							]},
							{id:700104,text:'MT4 设置',expanded:true,children:[
								{leaf:true,id:70010401,iconCls:'f-mt mt-arrow',text:'服务器',view:'sys.mt4.server',type:'window'},
								{leaf:true,id:70010402,iconCls:'f-mt mt-arrow',text:'组管理',view:'sys.mt4.group'},
								{leaf:true,id:70010403,iconCls:'f-mt mt-arrow',text:'夏令时',view:'sys.mt4.time'}
							]},
							{id:700105,text:'商品设置',expanded:true,children:[
								{leaf:true,id:70010501,iconCls:'f-mt mt-arrow',text:'交易类型',view:'sys.mt4.symbol.type'},
								{leaf:true,id:70010502,iconCls:'f-mt mt-arrow',text:'交易品种',view:'sys.mt4.symbol.record'}
							]}
					   ]
					},
					{id:7003,iconCls:'f-mt mt-clear',text:'支付通道',
						children:[
							{id:700301,text:'通道管理',expanded:true,children:[
								{leaf:true,id:70030101,iconCls:'f-mt mt-arrow',text:'通道管理',view:'sys.pay.aisle.account'},
								{leaf:true,id:70030102,iconCls:'f-mt mt-arrow',text:'银行代码',view:'sys.pay.aisle.bank'},
								{leaf:true,id:70030103,iconCls:'f-mt mt-arrow',text:'日志查询',view:'sys.pay.aisle.log'}
							]},
							{id:700302,text:'商户管理',expanded:true,children:[
								{leaf:true,id:70030201,iconCls:'f-mt mt-arrow',text:'商户管理',view:'sys.pay.merchant.account'},
								{leaf:true,id:70030202,iconCls:'f-mt mt-arrow',text:'订单查询',view:'sys.pay.merchant.order'}
							]}
					   ]
					},

					{id:7004,iconCls:'f-mt mt-mobile',text:'短信通道',
						children:[
							{id:700401,text:'通道管理',expanded:true,children:[
								{leaf:true,id:70040101,iconCls:'f-mt mt-arrow',text:'上游通道',view:'sys.sms.aisle.account'}
							]},
							{id:700402,text:'商户管理',expanded:true,children:[
								{leaf:true,id:70040201,iconCls:'f-mt mt-arrow',text:'商户管理',view:'sys.sms.merchant.account'},
								{leaf:true,id:70040202,iconCls:'f-mt mt-arrow',text:'充值记录',view:'sys.sms.merchant.recharge'},
								{leaf:true,id:70040202,iconCls:'f-mt mt-arrow',text:'发送记录',view:'sys.sms.merchant.record'}
							]}
					   ]
					},


					{id:7007,iconCls:'f-mt mt-system',text:'系统工具',
						children:[
							{id:700701,text:'自动任务',expanded:true,children:[
								{leaf:true,id:70070101,iconCls:'f-mt mt-arrow',text:'任务管理',view:'sys.system.settings.auto'}
							]}

					   ]
					},
					{id:7008,iconCls:'f-mt mt-rent',text:'通知管理',
						children:[
							{id:700801,text:'通知查询',expanded:true,children:[
								{leaf:true,id:70080101,iconCls:'f-mt mt-arrow',text:'邮件通知',view:'sys.notice.message.mail'},
								{leaf:true,id:70080102,iconCls:'f-mt mt-arrow',text:'短信通知',view:'sys.notice.message.sms'},
								{leaf:true,id:70080103,iconCls:'f-mt mt-arrow',text:'微信通知',view:'sys.notice.message.wchat'},
								{leaf:true,id:70080104,iconCls:'f-mt mt-arrow',text:'QQ 广播',view:'sys.notice.message.bqq'}
							]}
					   ]
					},
					{id:7009,iconCls:'f-mt mt-order',text:'日志管理',
						children:[
							{id:700901,text:'日志查询',expanded:true,children:[
								{leaf:true,id:70090101,iconCls:'f-mt mt-arrow',text:'OA',view:'sys.log.oa'},
								{leaf:true,id:70090102,iconCls:'f-mt mt-arrow',text:'VMS',view:'sys.log.vms'},
								{leaf:true,id:70090103,iconCls:'f-mt mt-arrow',text:'SERVICE',view:'sys.log.service'}
							]}
					   ]
					}
			   ]
			}
		]
	}
})
