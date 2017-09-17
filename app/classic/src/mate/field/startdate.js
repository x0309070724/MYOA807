Ext.define('APP.mate.field.startdate', {
  extend: 'Ext.form.field.Date',
  alias: 'widget.startdatefield',
  format: 'Y-m-d',
  vtype: 'daterange',
  name: 'startdate',
  itemId: 'startdate',
  endDateField: 'enddate'
});
