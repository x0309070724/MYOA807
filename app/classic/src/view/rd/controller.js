Ext.define('APP.view.rd.controller',{
    extend:'APP.view.controller',
    alias:'controller.rd',
	
	onSummaryRender:function(box){
		var fieldArr=Ext.query('b[itemId]',box);
		box.updateValues=function(data){
			Ext.Array.each(fieldArr,function(el){
				var format=el.getAttribute('format'),
					field=el.getAttribute('itemId'),
					field=field.split('.'),
					value=data[field[0]][field[1]];
				if(format){value=Ext.util.Format[format](value)}
				if(el.innerText!=value){
					el.innerText=value;
				}
			});							
		}
		PushService.ready(function(){
			var buffers=PushService.getBuffer();
			var data=buffers.getSummary();
				box.updateValues(data);
			
			var task=Ext.TaskManager.start({
				run:function(){
					if(!box.updateValues){
						Ext.TaskManager.stop(task);
						return false;
					}
					var data=buffers.getSummary();
						box.updateValues(data);
				},
				interval:100
			});				
		});
	}
})
