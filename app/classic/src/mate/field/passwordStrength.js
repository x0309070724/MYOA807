Ext.define('APP.mate.field.passwordStrength',{
	extend: 'Ext.form.field.Text',
	alias:[
		'widget.passwordstrength',
		'widget.passwordstrengthfield'
	],
	inputType:'password',
	userCls:'x-ui-password-field',
	reset: function() {
		this.callParent();
		this.updateMeter(this)
	},
	fieldSubTpl: ['<input id="{id}" data-ref="inputEl" type="{type}" role="{role}" {inputAttrTpl}', ' size="1"', '<tpl if="name"> name="{name}"</tpl>', '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>', '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>', '{%if(values.maxLength !== undefined){%} maxlength="{maxLength}"{%}%}', '<tpl if="readOnly"> readonly="readonly"</tpl>', '<tpl if="disabled"> disabled="disabled"</tpl>', '<tpl if="tabIdx"> tabIndex="{tabIdx}"</tpl>', '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>', ' class="{fieldCls} {typeCls} {typeCls}-{ui} {editableCls} {inputCls}" autocomplete="off"/>', '<div class="strengthmeter">', '<div class="scorebar">&nbsp;</div>', '</div>',
	{
		compiled: true,
		disableFormats: true
	}],
	onChange: function(newValue, oldValue) {
		this.updateMeter(newValue)
	},
	updateMeter: function(val) {
		var me = this,
			maxWidth, score, scoreWidth, objMeter = me.el.down('.strengthmeter'),
			scoreBar = me.el.down('.scorebar');
		maxWidth = objMeter.getWidth();
		score = me.calcStrength(val);
		scoreWidth = maxWidth - (maxWidth / 100) * score;
		scoreBar.setWidth(scoreWidth, true)
	},
	calcStrength: function(p) {
		var intScore = 0;
		intScore += p.length;
		if (p.length > 0 && p.length <= 4) {
			intScore += p.length
		} else if (p.length >= 5 && p.length <= 7) {
			intScore += 6
		} else if (p.length >= 8 && p.length <= 15) {
			intScore += 12
		} else if (p.length >= 16) {
			intScore += 18
		}
		if (p.match(/[a-z]/)) {
			intScore += 1
		}
		if (p.match(/[A-Z]/)) {
			intScore += 5
		}
		if (p.match(/\d/)) {
			intScore += 5
		}
		if (p.match(/(?:.*?\d){3}/)) {
			intScore += 5
		}
		if (p.match(/[\!,@,#,$,%,\^,&,\*,\?,_,~]/)) {
			intScore += 5
		}
		if (p.match(/(?:.*?[\!,@,#,$,%,\^,&,\*,\?,_,~]){2}/)) {
			intScore += 5
		}
		if (p.match(/(?=.*[a-z])(?=.*[A-Z])/)) {
			intScore += 2
		}
		if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)) {
			intScore += 2
		}
		if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\!,@,#,$,%,\^,&,\*,\?,_,~])/)) {
			intScore += 2
		}
		var nRound = Math.round(intScore * 2);
		if (nRound > 100) {
			nRound = 100
		}
		return nRound
	}
});