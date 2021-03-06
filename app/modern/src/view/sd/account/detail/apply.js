Ext.define('APP.view.sd.account.detail.apply', {
  extend: 'Ext.Container',
  xtype: 'sdAccountDetailApply',
  controller: 'sd.account',
  //userCls:'x-ui-container',
  padding: 5,
  scrollable: true,
  tpl: [
    '<div class="x-ui-part">',
    	'<div class="x-ui-shadow">',
    		'<h2 class="x-ui-propertygrid-title">账户信息</h2>',
    		'<table class="x-ui-propertygrid" border="0" cellpadding="0" cellspacing="0">',
          '<tbody>',
            '<tr><td class="lefttd">类型：</td><td><b>{type}</b></td></tr>',
            '<tr><td class="lefttd">杠杆：</td><td><b>1:{leverage}</b></td></tr>',
            '<tr>',
              '<td class="lefttd">销售：</td>',
              '<td>',
                '<tpl if="salesmanid">',
                  '{salesman_namecn} <s>{salesman_name}</s> <r>{salesman_team_name}</r>',
                  '<tpl if="salesman2id">',
                    '<br/>',
                    '{salesman2_namecn} <s>{salesman2_name}</s> <r>{salesman2_team_name}</r>',
                  '</tpl>',
                '<tpl else>',
                  '<b class="x-ui-text-red">N/A</b>',
                '</tpl>',
              '</td>',
            '</tr>',
            '<tpl if="same_identity_count">',
              '<tr><td>同名账户：</td><td><b class="x-ui-text-red">{same_identity_count} 个</b></td></tr>',
            '</tpl>',
            '<tr>',
              '<td class="lefttd">申请时间：</td>',
              '<td>',
                '<span class="x-ui-text-green">北京：{time:date("Y-m-d H:i A")}</span><br/>',
                '<span class="x-ui-text-blue">伦敦：{time:utcDate("Y-m-d H:i A")}</span>',
              '</td>',
            '</tr>',
          '</tbody>',
        '</table>',
    	'</div>',
    '</div>',

    '<div class="x-ui-part">',
    	'<div class="x-ui-shadow">',
    		'<h2 class="x-ui-propertygrid-title">申请人档案</h2>',
    		'<table class="x-ui-propertygrid">',
          '<tbody>',
            '<tr><td>姓名：</td><td>{namecn}<r>{name}</r></td></tr>',
            '<tr><td>手机：</td><td>{mobile}		<r class="x-ui-icon"><a href="tel:{mobile}" class="f-mt mt-mobile"></a></r></td></tr>',
            '<tr><td>Email：</td><td>{email}		<r class="x-ui-icon"><a href="mailto:{email}" class="f-mt mt-email"></a></r></td></tr>',
            '<tr><td>QQ：</td><td>{qq}			<r class="x-ui-icon"><a href="{qq:qqHref}" class="f-mt mt-qq"></a></r></td></tr>',
            '<tr><td>证件：</td><td>{identity_cardno}<r>{identity_country}</r></td></tr>',
    		  '</tbody>',
        '</table>',
    	'</div>',
    '</div>',

    '<tpl if="audit==0">',
    	'<div class="x-ui-part">',
    		'<div class="x-ui-shadow">',
    			'<h2 class="x-ui-propertygrid-title">银行卡</h2>',
    			'<table class="x-ui-propertygrid">',
            '<tbody>',
              '<tr><td>币种：</td><td><b>{bank_currency}</b></td></tr>',
              '<tr><td>开户行：</td><td><span class="icon-bank {bank_icon}">{bank_name}</span></td></tr>',
              '<tr><td>分行：</td><td>{bank_branch}<r>{bank_city}</r></td></tr>',
              '<tr><td>卡号：</td><td>{bank_cardno}</td></tr>',
    			  '</tbody>',
          '</table>',
    		'</div>',
    	'</div>',
    '</tpl>',

    '<div class="x-ui-part">',
    	'<div class="x-ui-shadow">',
    		'<h2 class="x-ui-propertygrid-title">处理结果</h2>',
    		'<table class="x-ui-propertygrid">',
          '<tbody>',
            '<tr><td>状态：</td><td>{audit:strAudit}</td></tr>',
            '<tr>',
              '<td>说明：</td>',
              '<td>',
                '<tpl if="audit==-1">',
                  '<span class="x-ui-text-red">{audit_explain}</span>',
                '<tpl else>',
                  '{audit_explain}',
                '</tpl>',
              '</td>',
            '</tr>',
            '<tpl if="audit!=0">',
              '<tr>',
                '<td>时间：</td>',
                '<td>',
                  '<span class="x-ui-text-green">北京：{audit_time:date("Y-m-d H:i A")}</span><br/>',
                  '<span class="x-ui-text-blue">伦敦：{audit_time:utcDate("Y-m-d H:i A")}</span>',
                '</td>',
              '</tr>',
            '</tpl>',
    		  '</tbody>',
        '</table>',
    	'</div>',
    '</div>'
//		'<tpl if="audit==1">',
//			'<div class="x-ui-part">',
//				'<div class="x-ui-shadow">',
//					'<h2 class="x-ui-propertygrid-title">账户资产</h2>',
//					'<table class="x-ui-propertygrid"><tbody>',
//						'<tr><td>余额：</td><td><b class="x-ui-text-green">{assets.balance:usMoney}</b></td></tr>',
//						'<tr><td>信用：</td><td><b class="x-ui-text-black">{assets.credit:usMoney}</b></td></tr>',
//						'<tr><td>净值：</td><td><b class="x-ui-text-blue">{assets.equity:usMoney}</b></td></tr>',
//						'<tr><td>已用：</td><td><b class="x-ui-text-black">{assets.margin:usMoney}</b></td></tr>',
//						'<tr><td>可用：</td><td>',
//							'<b class="x-ui-text-red">{assets.margin_free:usMoney}</b>',
//							'<tpl if="assets.margin_level">',
//								'<r>{assets.margin_level:stringNumeral(2)} %</r>',
//							'</tpl>',
//						'</td></tr>',
//					'</tbody></table>',
//				'</div>',
//			'</div>',
//		'</tpl>',
  ]
});
