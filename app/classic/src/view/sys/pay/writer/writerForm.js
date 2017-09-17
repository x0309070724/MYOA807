Ext.define('writer.form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.writerform',

    items: [
        {
            title: '银行代码信息', fieldDefaults: {allowBlank: false}, items: [
            {
                columnWidth: .45, items: [
                {fieldLabel: '银行类型', xtype: 'comboBanktype', name: 'type'},
                {fieldLabel: '中文名称', xtype: 'textfield', name: 'namecn'},
                //{fieldLabel:'支付标识',xtype:'textfield',name:'payment'},
                {fieldLabel: '支付标识', xtype: 'textfield', name: 'code'}
            ]
            },
            {
                columnWidth: .45, items: [
                {fieldLabel: '简称', xtype: 'textfield', name: 'name'},
                //{fieldLabel:'支付代码',xtype:'textfield',name:'paycode'},
                {fieldLabel: '图标样式', xtype: 'textfield', name: 'icon'}
            ]
            },
            {
                columnWidth: 1, items: [
                {fieldLabel: '启用', xtype: 'checkbox', name: 'invalid', checked: true}
            ]
            }
        ]
        },
        {title:'商户信息',items:[
            {columnWidth:.4,items:[
                {fieldLabel:'名字',xtype:'textfield',name:'name',allowBlank:false},
                {fieldLabel:'商户号',xtype:'textfield',name:'merchantno',allowBlank:false,bind:{readOnly:'{isUpdate}'}},
                {fieldLabel:'证书密码',xtype:'textfield',name:'cer_pass',allowBlank:false},
                {fieldLabel:'最小入金',xtype:'textfield',name:'min_amount',allowBlank:false}
            ]},
            /*{columnWidth:.4,items:[
            {fieldLabel:'商户号',xtype:'textfield',name:'merchantno',allowBlank:false,bind:{readOnly:'{isUpdate}'}}
            ]},*/
            {columnWidth:.4,items:[
                {fieldLabel:'支付标识',xtype:'textfield',name:'payment',allowBlank:false},
                {fieldLabel:'绑定域名',xtype:'textfield',name:'domain',allowBlank:false},
                {fieldLabel:'费率',xtype:'textfield',name:'cost_rate',allowBlank:false},
                {fieldLabel:'最大入金',xtype:'textfield',name:'max_amount',allowBlank:false}
            ]},
            {columnWidth:1,items:[
                {fieldLabel:'秘钥',xtype:'textfield',name:'merchantkey',allowBlank:false,bind:{disabled:'{isUpdate}',hidden:'{isUpdate}'}},
                {fieldLabel:'注释',xtype:'textarea',name:'explain',height:60},
                {xtype:'fieldcontainer',fieldLabel:'控制项',items:[
                    {xtype:'checkbox',boxLabel:'锁定',name:'invalid'}
                ]}
            ]}
        ]}
    ]
});