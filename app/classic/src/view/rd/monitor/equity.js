Ext.define('APP.view.rd.monitor.equity',{
    extend:'Ext.grid.Panel',
    controller:'rd.monitor',
	store:{
		type:'cross',
		autoLoad:true,
		pageSize:false,
		//model:'APP.model.hr.staff.account',
		//sorters:[{property:'departmentid',direction:'ASC'},{property:'branchid',direction:'ASC'},{property:'t1id',direction:'ASC'},{property:'t2id',direction:'ASC'},{property:'id',direction:'ASC'}],
		//groupField:'departmentid',
		//model:Ext.create('Ext.data.Model',{idProperty:'login',fields:[{name:'login',type:'int'}]}),
		proxy:{
			url:Boot.appUrl('/rd/monitor/getEquity.do'),
			extraParams:{
				menu:'day',
				count:4,
				//date:'2016-09-14',
				//time:'12'
				date:Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.HOUR,-34),'Y-m-d')
			},
			reader:{type:'json',rootProperty:'plant',totalProperty:'totalProperty'}
		}	
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'segmentedbutton',name:'menu',defaults:{width:50},items:[
						{text:'1H',value:'hour'},
						{text:'1D',value:'day',pressed:true}
					]},
					{xtype:'datefield',name:'date',width:100,value:Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.HOUR,-34),'Y-m-d'),allowBlank:false},
					{emptyText:'账号',xtype:'textfield',name:'login',width:140}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	],
	columns:[],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	getFields:function(){
		var grid=this,
			store=grid.getStore(),
			params=store.proxy.extraParams,
			count=params.count,
			date=new Date(params.date),
			servetTime=Ext.Date.add(new Date(),Ext.Date.HOUR,-7),
			date=date>servetTime?servetTime:date;

		var fields=[];
		switch(params.menu.toUpperCase()){
			case 'DAY':{
				var endDate=date,
					startDate=Ext.Date.add(date,Ext.Date.DAY,0-count)
				for(var i=1;i<=count;i++){
					var curr=Ext.Date.add(startDate,Ext.Date.DAY,i),
						field=Ext.Date.format(curr,'Y-m-d');
					fields.push(field)
				}
			}break;
			case 'HOUR':{
				var endDate=Ext.Date.format(date,'Y-m-d')+' 22:00:00',
					startDate=Ext.Date.format(Ext.Date.add(new Date(endDate),Ext.Date.DAY,-2),'Y-m-d H:i:s')
				for(var i=1;i<=12;i++){
					var curr=Ext.Date.add(new Date(startDate),Ext.Date.HOUR,i*4),
						field=Ext.Date.format(curr,'Y-m-d H');
					if(curr<=servetTime){
						fields.push(field)
					}
					fields=Ext.Array.removeAt(fields,0,fields.length-1-count)
				}
			}break;
		}	
		//console.log(fields,startDate,endDate,Ext.Date.format(servetTime,'Y-m-d H:i:s'))
		return fields	
		
//		var grid=this,
//			store=grid.getStore(),
//			params=store.proxy.extraParams,
//			count=params.count,
//			endDate=new Date(params.date),
//			startDate=Ext.Date.add(endDate,Ext.Date.DAY,0-count);
//		
//		var fields=[]
//		for(var i=0;i<=count;i++){
//			var curr=Ext.Date.add(startDate,Ext.Date.DAY,i),
//				field=Ext.Date.format(curr,'Y-m-d');
//			fields.push(field)
//		}
//		return fields
	},
	getConfig:function(){
		var modelField=[{name:'login',type:'int'}];
		var columns=[
			{xtype:'rownumberer'},
			{text:'账号',dataIndex:'login',minWidth:140,flex:1,renderer:'returnLogin',summaryType:'count'}
		];

		var fields=this.getFields();
		for(var i in fields){
			var field=fields[i],
				fieldTime=field.length>10?field.toString()+':00:00':field
				fieldFormat=fieldTime.length>10?'m-d H:i':'m-d　D',
				fieldText=Ext.Date.format(new Date(fieldTime),fieldFormat);
			modelField.push({name:'D'+field,type:'number'})
			modelField.push({name:'W'+field,type:'number'})
			modelField.push({name:'N'+field,type:'number'})
			modelField.push({name:'E'+field,type:'number'})
			modelField.push({name:'P'+field,type:'number'})
			modelField.push({name:'Q'+field,type:'number'})
			if(i>0){
				columns.push({text:fieldText,defaults:{sortable:true,align:'right',width:100,renderer:'returnNumber',summaryType:'sum',summaryRenderer:'returnNumber'},columns:[
					{text:'入金',dataIndex:'D'+field,hidden:true},
					{text:'出金',dataIndex:'W'+field,hidden:true},
					{text:'净入金',dataIndex:'N'+field},
					{text:'净值',dataIndex:'E'+field,tdCls:'x-ui-text-blue',width:120},
					{text:'涨跌',dataIndex:'P'+field,align:'left',tdCls:'x-ui-active',renderer:'returnEquityVal'},
					{text:'涨跌幅',dataIndex:'Q'+field,align:'left',renderer:'returnEquityEQ',summaryType:'average'}
				]})
			}else{
				columns.push({text:'期初',defaults:{sortable:true,align:'right',renderer:'returnNumber',summaryType:'sum',summaryRenderer:'returnNumber'},columns:[
					{text:'净入金',dataIndex:'N'+field,width:100},
					{text:'净值',dataIndex:'E'+field,width:120,tdCls:'x-ui-active x-ui-text-green'}
				]})
			}
		}
		return {modelField:modelField,columns:columns};		
		
	},
	
	initComponent:function(){
//		this.getFields()
//		return false

       this.callParent();
		var grid=this,
			store=this.getStore(),
			config=grid.getConfig();
		store.setFields(config.modelField)
		grid.reconfigure(config.columns);
		store.addListener('beforeload',function(store){
			var fields=grid.getFields(),
				config=grid.getConfig(),
				store=grid.getStore(),
				params=store.proxy.extraParams;

			store.setFields(config.modelField)
			grid.reconfigure(config.columns);
			
			store.removeAll();
			grid.getView().setLoading(true);
			Mate.ajax({
				url:store.proxy.url,
				params:store.proxy.extraParams,
				success:function(json){
					grid.getView().setLoading(false);
					var records=json.plant,
						data=[];
					for(var i in records){
						var record=records[i];
						var checkVal=0;
						for(var curr in fields){
							switch(params.menu.toUpperCase()){
								case 'DAY':{
									var prev=Ext.Date.add(new Date(fields[curr]),Ext.Date.DAY,-1);
										prevField=Ext.Date.format(prev,'Y-m-d'),
										currField=fields[curr];
								}break;
								case 'HOUR':{
									//console.log(fields[curr],new Date(fields[curr]+':00:00'))
									var prev=Ext.Date.add(new Date(fields[curr]+':00:00'),Ext.Date.HOUR,-4);
										prevField=Ext.Date.format(prev,'Y-m-d H'),
										currField=fields[curr];
								}break;
							}	
													
		
							var prevEquity=Ext.util.Format.numeral(record['E'+prevField]),
								currEquity=Ext.util.Format.numeral(record['E'+currField]),
								currDeposit=Ext.util.Format.numeral(record['D'+currField]),
								currWithdrawal=Ext.util.Format.numeral(record['W'+currField]),
								currNet=Ext.util.Format.numeral(currDeposit-currWithdrawal);
								
							var eqEquity=currEquity-currNet,
								eqProfit=prevEquity?eqEquity-prevEquity:0,
								eq=prevEquity?Ext.util.Format.numeral(((eqEquity-prevEquity)/prevEquity)*100):0;
			
							record['N'+fields[curr]]=currNet
							record['P'+fields[curr]]=eqProfit
							record['Q'+fields[curr]]=eq

							checkVal=checkVal+record['E'+currField];
						}
						if(checkVal){
							data.push(record)
						}
					}
					//console.log(data,json)
					store.setData(data);
					store.sort('P'+currField,'DESC')
				},
				failure:function(data){
					grid.getView().setLoading(false);
				}
			});	
			return false;
		});	
//		store.addListener('load',function(store,records,successful,operation,eOpts){
//		});	
		
		
	}
});





























