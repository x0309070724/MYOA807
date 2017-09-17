Ext.define('APP.view.hr.staff.controller',{
    extend:'APP.view.hr.controller',
    alias:'controller.hr.staff',
//	returnWorkDay:function(value,cell,record){
//		var startDate=record.data.startdate?new Date(record.data.startdate):new Date(),
//			endDate=record.data.enddate?new Date(record.data.enddate):new Date();
//		return Ext.String.format(
//			'{0} 天',
//			Ext.Date.diff(startDate,endDate,Ext.Date.DAY)
//		);
//	},
//
	//============================================================================选择团队时 切换职位
	onCompanyTeamChange:function(combo,record){
      // console.log(record);
		var value=record.data.id,
			formPanel=combo.up('form'),
			postCombo=formPanel.down('comboCompanyPost');
		//console.log(value.toString().substr(0,3))
		if(postCombo){
			var postStore=postCombo.getStore();
			// Reverts to a view of the Record cache with no filtering applied.
			postStore.clearFilter();
			postStore.filterBy(function(record){
				return record.get('departmentid')==value.toString().substr(0,3);
			});
			window.setTimeout(function(){
				postCombo.setReadOnly(!postStore.getCount());
			})
		}
	},

	//============================================================================选择部门 切换职务数据
	onCompanyDepartmentChange:function(combo,value){
		var formPanel=combo.up('form');
		//===============================================一个表单存在 多个同类COMBO时
		if(formPanel.change){
			var container=combo.up('fieldcontainer'),
				teamCombo=container.down('comboCompanyTeam'),
				postCombo=container.down('comboCompanyPost');
		}else{
			var teamCombo=formPanel.down('comboCompanyTeam'),
				postCombo=formPanel.down('comboCompanyPost');
		}

		if(postCombo){
			var postStore=postCombo.getStore();
			postStore.clearFilter();
			postStore.filterBy(function(record){
				return record.get('departmentid')==value;
			});
			window.setTimeout(function(){
				postCombo.setReadOnly(!postStore.getCount());
			})
		}
		if(teamCombo){
			var teamStore=teamCombo.getStore();
			teamStore.clearFilter();
			teamStore.filterBy(function(record){
				return record.get('id').toString().substr(0,3)==value;
			});
			window.setTimeout(function(){
				teamCombo.setReadOnly(!teamStore.getCount());
			})
		}
	}



//	//============================================================================调动、变更
//	onChangeStaffClick:function(grid,selected){
//		var record=selected[0],
//			gridChange=this.lookup('gridChange'),
//			storeChange=gridChange.getStore();
//		if(!record){
//			storeChange.removeAll();
//			return false;
//		}
//		grid.select(record);
//
//		Ext.apply(storeChange.proxy.extraParams,{staffid:record.data.id});
//		storeChange.load();
//	}




})
