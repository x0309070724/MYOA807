Ext.define('APP.view.sd.index', {
  extend: 'Ext.Container',
  xtype: 'sdIndex',
  controller: 'sd',
  layout: {type: 'hbox', align: 'stretch'},
  margin: 1,
  items: [
    {
      xtype: 'panel', minWidth: 400, flex: .42, scrollable: 'y',
      bodyPadding: '10',
      layout: {type: 'vbox', align: 'stretch'},
      viewModel: true,
//			listeners:{
//				afterrender:function(box){
//					var data={
//						me:APP.app.getAppData('account'),
//						resultsPK:{
//							beijing:{funds_deposit:0,funds_withdrawal:0,beijing:0},
//							shenzhen:{funds_deposit:0,funds_withdrawal:0,beijing:0}
//						}
//					}
//					box.getViewModel().set(data);
//				}
//			},
      items: [
        {
          xtype: 'box', minHeight: 200,
          // me?
          bind: {data: '{me}'},
          tpl: [
            '<div class="x-ui-account">',
            '<div class="x-ui-account-title">我的业绩</div>',
            '<div class="x-ui-account-body">',
            '<div class="x-ui-account-image">',
            '<img src="{wx_userface:image}" alt="{wx_nickname}" />',
            '<p>{namecn} {name}</p>',
            '</div>',
            '<div class="x-ui-account-info">',
            '<p><label>账号：</label><b>{login}</b></p>',
            '<p><label>团队：</label>{team_name}</p>',
            '<p><label>职位：</label>{department_name} {post_name}</p>',//直属上级：{manager_namecn}
            '<p><label>入职：</label>{startdate}</p>',
            '<p><label>手机：</label>{mobile}</p>',
            '<p><label>Email：</label>{email}</p>',
            '</div>' +
            '</div>',
            '<tpl if="results">',
            '<div class="x-ui-account-no"><b>NO. {results.ranking}</b></div>',
            '</tpl>',
            '</div>',
            '<tpl if="results">',
            '<div class="x-ui-block-box">',
            '<ul>',
            '<li>开户量<br/><b>{results.account_new_count:stringInteger}</b></li>',
            '<li>交易量<br/><b>{results.trade_volume:stringNumeral(3)}</b></li>',
            '<li class="x-ui-text-red">净入金<br/><b>{results.funds_net_deposit:money}</b></li>',
            '</ul>',
            '</div>',
            '</tpl>',
          ]
        },
        {
          xtype: 'box', minHeight: 400, flex: 1, margin: '20 0 0 0',
          // resultsPK?
          bind: {data: '{resultsPK}'},
          tpl: [
            '<div class="x-ui-pk">',
            '<div class="x-ui-pk-title">',
            '<div class="x-ui-pk-item">',
            '<div>深圳</div>',
            '<div><label>VS</label></div>',
            '<div>北京</div>',
            '</div>',
            '</div>',
            '<div class="x-ui-pk-body">',
            '<div class="x-ui-pk-item">',
            '<div><b class="x-ui-text-green">{shenzhen.funds_deposit:money}</b></div>',
            '<div><label>入金</label></div>',
            '<div><b class="x-ui-text-green">{beijing.funds_deposit:money}</b></div>',
            '</div>',
            '<div class="x-ui-pk-item">',
            '<div><b class="x-ui-text-red">{shenzhen.funds_withdrawal:money}</b></div>',
            '<div><label>出金</label></div>',
            '<div><b class="x-ui-text-red">{beijing.funds_withdrawal:money}</b></div>',
            '</div>',
            '<div class="x-ui-pk-item">',
            '<div><b class="x-ui-text-blue">{shenzhen.funds_net_deposit:money}</b></div>',
            '<div><label>净入金</label></div>',
            '<div><b class="x-ui-text-blue">{beijing.funds_net_deposit:money}</b></div>',
            '</div>',
            '</div>',
            '</div>',
          ]
        }
      ]
    },
    {xtype: 'sdSalesIndex', minWidth: 400, flex: .58, margin: '0 1'}
  ]
});
















