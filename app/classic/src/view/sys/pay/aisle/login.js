// define writerform
/*Ext.define('Writer.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.writerform',

    requires: ['Ext.form.field.Text'],

    initComponent: function () {
        Ext.apply(this, {
            activeRecord: null,
            iconCls: 'icon-user',
            frame: true,
            title: 'User -- All fields are required',
            defaultType: 'textfield',
            bodyPadding: 5,
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [{
                fieldLabel: 'Email',
                name: 'email',
                allowBlank: false,
                vtype: 'email'
            }, {
                fieldLabel: 'First',
                name: 'first',
                allowBlank: false
            }, {
                fieldLabel: 'Last',
                name: 'last',
                allowBlank: false
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: 'Save',
                    disabled: true,
                    scope: this,
                    handler: this.onSave
                }, {
                    iconCls: 'icon-user-add',
                    text: 'Create',
                    scope: this,
                    handler: this.onCreate
                }, {
                    iconCls: 'icon-reset',
                    text: 'Reset',
                    scope: this,
                    handler: this.onReset
                }]
            }]
        });
        this.callParent();
    },

    setActiveRecord: function (record) {
        this.activeRecord = record;
        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        } else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    },

    onSave: function () {
        var active = this.activeRecord,
            form = this.getForm();

        if (!active) {
            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            this.onReset();
        }
    },

    onCreate: function () {
        var form = this.getForm();

        if (form.isValid()) {
            this.fireEvent('create', this, form.getValues());
            form.reset();
        }

    },

    onReset: function () {
        this.setActiveRecord(null);
        this.getForm().reset();
    }
});
// define writergrid
Ext.define('Writer.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.writergrid',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function () {

        this.editing = Ext.create('Ext.grid.plugin.CellEditing');

        Ext.apply(this, {
            iconCls: 'icon-grid',
            frame: true,
            plugins: [this.editing],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    iconCls: 'icon-add',
                    text: 'Add',
                    scope: this,
                    handler: this.onAddClick
                }, {
                    iconCls: 'icon-delete',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'delete',
                    scope: this,
                    handler: this.onDeleteClick
                }]
            }, {
                weight: 2,
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    xtype: 'tbtext',
                    text: '<b>@cfg</b>'
                }, '|', {
                    text: 'autoSync',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
                    scope: this,
                    toggleHandler: function (btn, pressed) {
                        this.store.autoSync = pressed;
                    }
                }, {
                    text: 'batch',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
                    scope: this,
                    toggleHandler: function (btn, pressed) {
                        this.store.getProxy().batchActions = pressed;
                    }
                }, {
                    text: 'writeAllFields',
                    enableToggle: true,
                    pressed: false,
                    tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
                    scope: this,
                    toggleHandler: function (btn, pressed) {
                        this.store.getProxy().getWriter().writeAllFields = pressed;
                    }
                }]
            }, {
                weight: 1,
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    text: 'Sync',
                    scope: this,
                    handler: this.onSync
                }]
            }],
            columns: [{
                text: 'ID',
                width: 40,
                sortable: true,
                resizable: false,
                draggable: false,
                hideable: false,
                menuDisabled: true,
                dataIndex: 'id',
                renderer: function (value) {
                    return Ext.isNumber(value) ? value : '&nbsp;';
                }
            }, {
                header: 'Email',
                flex: 1,
                sortable: true,
                dataIndex: 'email',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'First',
                width: 100,
                sortable: true,
                dataIndex: 'first',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Last',
                width: 100,
                sortable: true,
                dataIndex: 'last',
                field: {
                    type: 'textfield'
                }
            }]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },

    onSelectChange: function (selModel, selections) {
        this.down('#delete').setDisabled(selections.length === 0);
    },

    onSync: function () {
        this.store.sync();
    },

    onDeleteClick: function () {
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },

    onAddClick: function () {
        var rec = new Writer.Person({
            first: '',
            last: '',
            email: ''
        }), edit = this.editing;

        edit.cancelEdit();
        this.store.insert(0, rec);
        edit.startEditByPosition({
            row: rec,
            column: 1
        });
    }
});
// define Model Person
Ext.define('Writer.Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'email', 'first', 'last'],
    validators: {
        email: {
            type: 'length',
            min: 1
        },
        first: {
            type: 'length',
            min: 1
        },
        last: {
            type: 'length',
            min: 1
        }
    }
});

Ext.require([
    'Ext.data.*',
    'Ext.tip.QuickTipManager',
    'Ext.window.MessageBox'
]);*/

/*Ext.onReady(function () {
    Ext.tip.QuickTipManager.init();

    Ext.create('Ext.button.Button', {
        margin: '0 0 20 20',
        text: 'Reset sample database back to initial state',
        renderTo: document.body,
        tooltip: 'The sample database is stored in the session, including any changes you make. Click this button to reset the sample database to the initial state',
        handler: function () {
            Ext.getBody().mask('Resetting...');
            Ext.Ajax.request({
                url: 'app.php/example/reset',
                callback: function (options, success, response) {
                    Ext.getBody().unmask();

                    var didReset = true,
                        o;

                    if (success) {
                        try {
                            o = Ext.decode(response.responseText);
                            didReset = o.success === true;
                        } catch (e) {
                            didReset = false;
                        }
                    } else {
                        didReset = false;
                    }

                    if (didReset) {
                        store.load();
                        main.down('#form').setActiveRecord(null);
                        Ext.example.msg('Reset', 'Reset successful');
                    } else {
                        Ext.MessageBox.alert('Error', 'Unable to reset example database');
                    }

                }
            });
        }
    });

    var store = Ext.create('Ext.data.Store', {
        model: 'Writer.Person',
        autoLoad: true,
        autoSync: true,
        proxy: {
            type: 'ajax',
            api: {
                read: 'app.php/users/view',
                create: 'app.php/users/create',
                update: 'app.php/users/update',
                destroy: 'app.php/users/destroy'
            },
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data',
                messageProperty: 'message'
            },
            writer: {
                type: 'json',
                writeAllFields: false,
                root: 'data'
            },
            listeners: {
                exception: function (proxy, response, operation) {
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        },
        listeners: {
            write: function (proxy, operation) {
                if (operation.action == 'destroy') {
                    main.child('#form').setActiveRecord(null);
                }
                Ext.example.msg(operation.action, operation.getResultSet().message);
            }
        }
    });

    var main = Ext.create('Ext.container.Container', {
        padding: '0 0 0 20',
        width: 500,
        height: Ext.themeName === 'neptune' ? 700 : 650,
        renderTo: document.body,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            itemId: 'form',
            xtype: 'writerform',
            manageHeight: false,
            margin: '0 0 10 0',
            listeners: {
                create: function (form, data) {
                    store.insert(0, data);
                }
            }
        }, {
            itemId: 'grid',
            xtype: 'writergrid',
            title: 'User List',
            flex: 1,
            store: store,
            listeners: {
                selectionchange: function (selModel, selected) {
                    main.child('#form').setActiveRecord(selected[0] || null);
                }
            }
        }]
    });
});*/

Ext.define('APP.view.sys.pay.aisle.login', {
    extend: 'Ext.Container',
    controller: 'sys.pay',
    padding: 1,
    layout: {type: 'vbox', align: 'stretch'},
    items: [
        {
            xtype: 'writerform', title: 'login form', flex: .5,
        },{
            xtype: 'grid', title: 'my item', flex: .5,
            store: {
                type: 'cross',
                fields: [
                    {name: 'type', type: 'int'},
                    {name: 'name', type: 'string'},
                    {name: 'code', type: 'string'},
                    {name: 'namecn', type: 'string'},
                    {name: 'icon', type: 'string'},
                    {name: 'payment', type: 'string'},
                    {name: 'invalid', type: 'string'}
                ],
                autoLoad: true,
                grouper: {property: 'payment', direction: 'DESC'},
                proxy: {
                    url: Boot.appUrl('/sd/system/pay/getAisleBank.do'),
                    extraParams: {type: 0}
                }
            },
            columns: [
                {xtype: 'rownumberer'},
                {text: '通道标识', dataIndex: 'payment', width: 160},
                {text: '支付标识', dataIndex: 'code', minWidth: 80, flex: 1},
                {text: '银行名称', xtype: 'templatecolumn', dataIndex: 'namecn', width: 200, tpl: '{namecn}<r>{name}</r>'},
                {text: '图标样式', dataIndex: 'icon', width: 80, flex: 1},
                {text: '禁用', dataIndex: 'invalid', align: 'center', width: 60, renderer: 'returnYes'},
                {
                    xtype: 'actioncolumn',
                    text: '修改',
                    align: 'center',
                    width: 50,
                    tooltip: '修改',
                    iconCls: 'f-mt mt-action-update',
                    handler: 'onPayBankUpdateClick'
                }
            ]
        }
        /*{
            xtype: 'grid', title: '系统银行', flex: .5, collapsible: true, margin: '0 0 0 1',
            reference: 'gridChange',
            store: {
                type: 'cross',
                autoLoad: true,
                sorters: [{property: 'id', direction: 'DESC'}],
                //grouper:{groupFn:function(record){return Ext.Date.format(record.data.submitdate,'Y-m-d')},property:'submitdate',direction:'DESC'},
                proxy: {
                    url: Boot.appUrl('/sd/system/pay/getPayBank.do')
                }
            },
            dockedItems: [
                {
                    dock: 'top', xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'searchbar',
                            fields: [
                                {xtype: 'comboBanktype', name: 'type', width: 100, emptyText: '银行卡类型...'},
                                {xtype: 'textfield', name: 'query', width: 140, emptyText: '关键字...'}
                            ]
                        },
                        '->',
                        {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onOurBankCreatClick'}, '-',
                        //{iconCls:'f-mt mt-action-remove',text:'删除',disabled:true,selection:true,handler:'onOurBankRemoveClick'},'-',
                        {xtype: 'refreshbutton'}
                    ]
                },
                {dock: 'bottom', xtype: 'pagingbar'}
            ],
            multiSelect: false,
            columns: [
                {xtype: 'rownumberer'},
                {text: '银行卡类型', dataIndex: 'type', width: 100, renderer: 'returnBankType'},
                //{text:'通道标识',dataIndex:'payment',width:160,flex:1},
                {text: '支付标识', dataIndex: 'code', width: 120, flex: 1},
                {text: '银行中文名称', dataIndex: 'namecn', width: 160, flex: 1},
                {text: '银行英文名称', dataIndex: 'name', width: 100, flex: 1},
                {text: '图标样式', dataIndex: 'icon', width: 80, flex: 1},
                {text: '启用', dataIndex: 'invalid', align: 'center', width: 60, renderer: 'returnAccountInvalid'},
                //{xtype:'actioncolumn',text:'复制',align:'center',width:50,tooltip:'复制',iconCls:'f-mt mt-action-copy',handler:'onBankCopyClick'},
                {
                    xtype: 'actioncolumn',
                    text: '修改',
                    align: 'center',
                    width: 50,
                    tooltip: '修改',
                    iconCls: 'f-mt mt-action-update',
                    handler: 'onOurBankUpdateClick'
                }
            ],
            features: [{ftype: 'groupingsummary'}, {ftype: 'summary', dock: 'bottom'}]
        }*/
    ]
});