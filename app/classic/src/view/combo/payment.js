Ext.define('APP.view.combo.payment', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'comboSysPayment',
    store: {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'payment', type: 'string'},
            {name: 'name', type: 'string'}
        ]
    },
    emptyText: '支付接口...',
    name: 'name',
    valueField: 'payment',
    displayField: 'name',
    editable: true,
    forceSelection: true,
    listConfig: {
        getInnerTpl: function () {
            return '<span class="x-ui-text-grey">{name}</span>'
        }
    },
    initComponent: function () {
        this.callParent();
        var combo = this,
            data = APP.app.getAppData('pay');
        combo.getStore().setData(data);
    }
});