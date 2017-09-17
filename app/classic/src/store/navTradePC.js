Ext.define('APP.store.navTradePC',{
    extend:'Ext.data.TreeStore',
	alias:'store.navTradePC',
    root:{
        expanded:true,
        children:[
            {moduleid:1000,iconCls:'f-mt mt-chart',text:'交易',view:'trade.index',
                children:[
					{moduleid:1001,iconCls:'f-mt mt-position',text:'当前持仓',expanded:true,children:[
						{leaf:true,moduleid:100101,iconCls:'f-mt mt-position-order',text:'持仓订单',description:'当前所有持仓订单',view:'trade.record'}
					]},
					{moduleid:1002,iconCls:'f-mt mt-grid',text:'交易工具',expanded:true,children:[
						{leaf:true,moduleid:100201,iconCls:'f-mt mt-tree-2',text:'技术分析',description:'交易技术资料 实时更新',view:'tool.tc'},
						{leaf:true,moduleid:100202,iconCls:'f-mt mt-report-month',text:'财经日历',description:'市场变化 提前掌握',view:'tool.calendar'}
					]}
               ]
            },
            {moduleid:2000,iconCls:'f-mt mt-check-order',text:'历史',view:'history.index',
                children:[
					{moduleid:2001,iconCls:'f-mt mt-delivery',text:'历史交易',expanded:true,children:[
						{leaf:true,moduleid:200101,iconCls:'f-mt mt-credit',text:'全部',description:'',view:'history.record.all'},
						{leaf:true,moduleid:200102,iconCls:'f-mt mt-position',text:'市价单',description:'',view:'history.record.order'},
						{leaf:true,moduleid:200103,iconCls:'f-mt mt-pending',text:'挂单记录',description:'',view:'history.record.pending'},
						{leaf:true,moduleid:200104,iconCls:'f-mt mt-access-gold-2',text:'入金记录',description:'',view:'history.record.deposit'},
						{leaf:true,moduleid:200105,iconCls:'f-mt mt-access-gold-2',text:'出金记录',description:'',view:'history.record.withdrawal'},
						{leaf:true,moduleid:200106,iconCls:'f-mt mt-credit',text:'信用记录',description:'',view:'history.record.credit'}
					]},
					{moduleid:2002,iconCls:'f-mt mt-delivery',text:'交易报表',expanded:true,children:[
						{leaf:true,moduleid:200201,iconCls:'f-mt mt-position',text:'日报表',description:'',view:'history.report.day'},
						{leaf:true,moduleid:200202,iconCls:'f-mt mt-pending',text:'月报表',description:'',view:'history.report.month'},
						{leaf:true,moduleid:200203,iconCls:'f-mt mt-credit',text:'综合报表',description:'',view:'history.report.complex'}
					]}
               ]
            },
            {moduleid:3000,iconCls:'f-mt mt-dollar-4',text:'出入金',view:'funds.index',
                children:[
					{moduleid:3001,iconCls:'f-mt mt-out-audit',text:'入金相关',expanded:true,children:[
						{leaf:true,moduleid:300101,iconCls:'f-mt mt-action-creat',text:'账户入金',description:'为您的交易账户注资',view:'funds.apply.deposit'},
						{leaf:true,moduleid:300102,iconCls:'f-mt mt-sidebar-on',text:'入金记录',description:'查询您的历史入金记录',view:'funds.record.deposit'},
						{leaf:true,moduleid:300103,iconCls:'f-mt mt-chart',text:'入金统计',description:'入金记录 统计报表',view:'funds.report.deposit'}
					]},
					{moduleid:3002,iconCls:'f-mt mt-entry-audit',text:'出金相关',expanded:true,children:[
						{leaf:true,moduleid:300201,iconCls:'f-mt mt-action-cancel',text:'账户出金',description:'提取账户余款至银行卡',view:'funds.apply.withdrawal'},
						{leaf:true,moduleid:300202,iconCls:'f-mt mt-sidebar-off',text:'出金记录',description:'查询您的历史出金记录',view:'funds.record.withdrawal'},
						{leaf:true,moduleid:300203,iconCls:'f-mt mt-statistics',text:'出金统计',description:'出金记录 统计报表',view:'funds.report.withdrawal'}
					]},
					{moduleid:3003,iconCls:'f-mt mt-entry-audit',text:'信用相关',expanded:true,children:[
						{leaf:true,moduleid:300301,iconCls:'f-mt mt-action-cancel',text:'借信还信',description:'依据信用额度申请信用入金',view:'funds.apply.credit'},
						{leaf:true,moduleid:300303,iconCls:'f-mt mt-statistics',text:'信用记录',description:'查询信用记历史数据',view:'funds.record.credit'},
						{leaf:true,moduleid:300304,iconCls:'f-mt mt-statistics',text:'信用统计',description:'信用记录 统计报表',view:'funds.report.credit'}
					]},
 					{moduleid:3004,iconCls:'f-mt mt-entry-audit',text:'转账相关',expanded:true,children:[
						{leaf:true,moduleid:300401,iconCls:'f-mt mt-action-cancel',text:'账户转账',description:'转出余额至其它账户',view:'funds.apply.transfer'},
						{leaf:true,moduleid:300402,iconCls:'f-mt mt-sidebar-off',text:'转账记录',description:'查询转账往来记录',view:'funds.record.transfer'}
					]}
              ]
            },
            {moduleid:4000,iconCls:'f-mt mt-users',text:'代理',view:'agent.index',
                children:[
					{moduleid:4001,iconCls:'f-mt mt-grid',text:'账户相关',expanded:true,children:[
						{leaf:true,moduleid:400101,iconCls:'f-mt mt-tree-2',text:'下线账户',description:'查看名下所有账户',view:'agent.lower.login'},
						{leaf:true,moduleid:400102,iconCls:'f-mt mt-report-month',text:'申请记录',description:'市场变化 提前掌握',view:'agent.lower.applyRecord'},
						{leaf:true,moduleid:400103,iconCls:'f-mt mt-report-month',text:'仓位总结',description:'市场变化 提前掌握',view:'agent.lower.loginReport'}
					]},
					{moduleid:4002,iconCls:'f-mt mt-entry-audit',text:'账户佣金',expanded:true,children:[
						{leaf:true,moduleid:400201,iconCls:'f-mt mt-chart',text:'佣金转户',description:'',view:'agent.apply.rebate',parameter:{menu:'app'}},
						{leaf:true,moduleid:400202,iconCls:'f-mt mt-statistics',text:'转户记录',description:'',view:'agent.record.rebateApply'},
						{leaf:true,moduleid:400203,iconCls:'f-mt mt-classified',text:'佣金统计',description:'',view:'agent.report.rebate'},
						{leaf:true,moduleid:400204,iconCls:'f-mt mt-tree-diagram-2',text:'佣金明细',description:'',view:'agent.record.rebate'}
					]}
               ]
            },
            {moduleid:5000,iconCls:'f-mt mt-account-setup',text:'账户',view:'account.index',
                children:[
					{moduleid:5001,iconCls:'f-mt mt-user-3',text:'我的',expanded:true,children:[
						{leaf:true,moduleid:500101,iconCls:'f-mt mt-bank-card',text:'银行卡',description:'',view:'account.bank.record'},
						{leaf:true,moduleid:500102,iconCls:'f-mt mt-summary',text:'交易汇总',description:'',view:'account.total'}
					]},
					{moduleid:5002,iconCls:'f-mt mt-complaint',text:'资料更改',expanded:true,children:[
						{leaf:true,moduleid:500201,iconCls:'f-mt mt-lever',text:'杠杆',description:'',view:'account.update.leverage'},
						{leaf:true,moduleid:500202,iconCls:'f-mt mt-iphone',text:'手机',description:'',view:'account.update.mobile'},
						{leaf:true,moduleid:500203,iconCls:'f-mt mt-email',text:'Email',description:'',view:'account.update.email'}
					]},
					{moduleid:5003,iconCls:'f-mt mt-password-safe',text:'账户安全',expanded:true,children:[
						{leaf:true,moduleid:500301,iconCls:'f-mt mt-password',text:'主密码',description:'',view:'account.update.password'},
						{leaf:true,moduleid:500302,iconCls:'f-mt mt-password',text:'投资人密码',description:'',view:'account.update.passwordInvestor'},
						{leaf:true,moduleid:500303,iconCls:'f-mt mt-password',text:'安全密码',description:'',view:'account.update.passwordSafe'}
					]}
               ]
            }
       ]
    }
});













