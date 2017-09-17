Ext.define('APP.mate.field.checkboxarraygroup',{
	extend:'Ext.form.CheckboxGroup',
	alias:'widget.checkboxarraygroup',
	allowBlank:true,
    setValue: function(value) {
        var me    = this,
            boxes = me.getBoxes(),
            b,
            bLen  = boxes.length,
            box, name,
            cbValue,
			strArray;
		if(Ext.isArray(value)){
			strArray=value;
		}else{
			value=Ext.String.trim(value);
			strArray=value.split(',');
		}
       me.batchChanges(function() {
            Ext.suspendLayouts();
            for (b = 0; b < bLen; b++) {
                box = boxes[b];
                cbValue = strArray[b];
                box.setValue(cbValue);
            }
            Ext.resumeLayouts(true);
        });
        return me;
    }
});