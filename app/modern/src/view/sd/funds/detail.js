Ext.define('APP.view.sd.funds.detail',{
	extend:'Ext.Container',
	xtype:'sdFundsDetail',
	controller:'sd.funds',
	//userCls:'x-ui-container',
	padding:5,
	scrollable:true,
	tpl:[
		'<div class="x-ui-part">',
			'<div class="x-ui-shadow">',
				'<h2 class="x-ui-propertygrid-title">申请信息</h2>',
				'<table class="x-ui-propertygrid"><tbody>',
					'<tr><td>账号：</td><td><b>{login}</b><r>{account_type}</r></td></tr>',
					'<tr><td>姓名：</td><td>{account_namecn}<r>{account_name}</r></td></tr>',
					'<tpl if="agent&&agent!=login">',
						'<tr><td>代理：</td><td><b>{agent}</b><r>{agent_name}</r></td></tr>',
					'</tpl>',

					'<tr><td>销售：</td><td>',
						'<tpl if="salesmanid">',
							'{salesman_namecn} <s>{salesman_name}</s> <r>{salesman_team_name}</r>',
							'<tpl if="salesman2id">',
								'<br/>',
								'{salesman2_namecn} <s>{salesman2_name}</s> <r>{salesman2_team_name}</r>',
							'</tpl>',
						'<tpl else>',	
							'<b class="x-ui-text-red">N/A</b>',
						'</tpl>',
					'</td></tr>',
					
					'<tpl if="transfer">',
						'<tr><td>对方：</td><td><b>{transfer}</b></td></tr>',
					'</tpl>',

					'<tr><td>金额：</td><td>',
						'<tpl if="direction==1">',
							'<b class="x-ui-text-green">{money:usMoney}</b>',
						'<tpl else>',	
							'<b class="x-ui-text-red">{money:usMoney}</b>',
						'</tpl>',
					'</td></tr>',

					'<tr><td>时间：</td><td>',
						'<span class="x-ui-text-green">北京：{time:date("Y-m-d H:i A")}</span><br/>',
						'<span class="x-ui-text-blue">伦敦：{time:utcDate("Y-m-d H:i A")}</span>',
					'</td></tr>',
				'</tbody></table>',
			'</div>',
		'</div>',
		'<div class="x-ui-part">',
			'<div class="x-ui-shadow">',
				'<h2 class="x-ui-propertygrid-title">处理结果</h2>',
				'<table class="x-ui-propertygrid"><tbody>',
					'<tr><td>状态：</td><td>{audit:strAudit}</td></tr>',
					'<tpl if="audit_explain">',
						'<tr><td>说明：</td><td>',
							'<tpl if="audit==-1">',
								'<span class="x-ui-text-red">{audit_explain}</span>',
							'<tpl else>',	
								'{audit_explain}',
							'</tpl>',
						'</td></tr>',
					'</tpl>',
					'<tpl if="audit!=0">',
						'<tr><td>时间：</td><td>',
							'<span class="x-ui-text-green">北京：{audit_time:date("Y-m-d H:i A")}</span><br/>',
							'<span class="x-ui-text-blue">伦敦：{audit_time:utcDate("Y-m-d H:i A")}</span>',
						'</td></tr>',
					'</tpl>',
				'</tbody></table>',
			'</div>',
		'</div>',
		'<tpl if="audit==0">',
			'<div class="x-ui-part">',
				'<div class="x-ui-shadow">',
					'<h2 class="x-ui-propertygrid-title">账户资产</h2>',
					'<table class="x-ui-propertygrid"><tbody>',
						'<tr><td>余额：</td><td><b class="x-ui-text-green">{assets.balance:usMoney}</b></td></tr>',
						'<tr><td>信用：</td><td><b class="x-ui-text-black">{assets.credit:usMoney}</b></td></tr>',
						'<tr><td>净值：</td><td><b class="x-ui-text-blue">{assets.equity:usMoney}</b></td></tr>',
						'<tr><td>已用：</td><td><b class="x-ui-text-black">{assets.margin:usMoney}</b></td></tr>',
						'<tr><td>可用：</td><td>',
							'<b class="x-ui-text-red">{assets.margin_free:usMoney}</b>',
							'<tpl if="assets.margin_level">',
								'<r>{assets.margin_level:stringNumeral(2)} %</r>',
							'</tpl>',
						'</td></tr>',
					'</tbody></table>',
				'</div>',
			'</div>',
		'</tpl>'
	]
});











