Ext.define('APP.view.hr.controller', {
  extend: 'APP.view.controller',
  alias: 'controller.hr',
  returnLogin: function (value, cell, record) {
    if (record.data.login) {
      return Ext.String.format(
        '<b>{0}</b><r openid="{1}">{2}</r>',
        record.data.login,
        record.data.wx_openid,
        Ext.util.Format.wechatFace(record.data.wx_userface)
      );
    }
  },
  returnPostQuery: function (value, cell, record) {
    switch (parseInt(value)) {
      case 100: {
        var text = '<span class="x-ui-text-red">超级</span><r>所有数据</r>';
      }
        break;
      case 1: {
        var text = '<span class="x-ui-text-green">总监</span><r>所有数据</r>';
      }
        break;
      case 2: {
        var text = '<span class="x-ui-text-blue">经理</span><r>本团队数据</r>';
      }
        break;
      case 3: {
        var text = '主管<r>本团队数据</r>';
      }
        break;
      case 4: {
        var text = '成员<r>本人数据</r>';
      }
        break;
    }
    return text
  },
  returnPostManager: function (value, cell, record) {
    var text = '',
      value = value + ',,,,,';
    arrValue = value.split(',');
    // console.log(value);
    // console.log(arrValue);
    text += arrValue[0] == 1 ? '新增 ' : '';
    text += arrValue[1] == 1 ? '更改 ' : '';
    text += arrValue[2] == 1 ? '<span class="x-ui-text-red">删除</span> ' : '';
    text += arrValue[3] == 1 ? '其它 ' : '';
    return text
  }
});
