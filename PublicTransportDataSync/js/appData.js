window.app = window.app || {};

(function(app) {
	
	function initAppData() {
		try {
			var reqAppControl = getRequestAppControl();
			return {
				isFileSyncProcessing : false,
				lastTimeCheck : tizen.time.getCurrentDateTime().toLocaleTimeString(),
				stopsInfoData : getStopInfoTest(),
				launchedFromWidget : 
					reqAppControl.callerAppId && reqAppControl.callerAppId != "" ? 
							true : false,
				reqAppControl : reqAppControl
			};
		} catch (e) {
			return {
				isFileSyncProcessing : false,
				lastTimeCheck : "",
				stopsInfoData : getStopInfoTest()
			};
		}
	}
	
	function getRequestAppControl() {
		try {
			var reqAppControl = tizen.application
				.getCurrentApplication().getRequestedAppControl();
		
		return reqAppControl;
		}
		catch(e) {
			console.log(e);
		}
	}
	
	function getStopInfoTest() {
		try {
			var data = [{
					id : 1,
					user_defined_name : 'Stotis, bus 1, direct',
					
					route_id : 'vilnius_bus_1',
					route_short_name : '1',
					route_long_name : 'Stotis–Vikingų g.–Oro uostas',
					route_type : 3,
					stop_name : 'Stotis',
					times : [
					         '05:16:00', '06:01:00', '06:31:00', '06:49:00', '07:16:00', '07:41:00', '08:13:00', '08:39:00', '09:11:00', '10:06:00', '10:36:00', '10:51:00', '11:21:00', '11:45:00', '12:14:00',
					         '12:38:00', '13:08:00', '13:32:00', '14:02:00', '14:26:00', '14:56:00', '15:21:00', '15:51:00', '16:19:00', '16:49:00', '17:54:00', '18:23:00', '18:40:00', '19:08:00', '19:37:00',
					         '20:06:00', '20:31:00', '21:00:00', '21:24:00', '21:50:00', '22:17:00', '22:43:00'
					]
			},
			{
				id : 2,
				user_defined_name : 'Stotis, bus 1, upDirect',
				
				route_id : 'vilnius_bus_1',
				route_short_name : '1',
				route_long_name : 'Stotis–Vikingų g.–Oro uostas',
				route_type : 3,
				stop_name : 'Stotis',
				times : [
				         '05:16:00', '06:01:00', '06:31:00', '06:49:00', '07:16:00', '07:41:00', '08:13:00', '08:39:00', '09:11:00', '10:06:00', '10:36:00', '10:51:00', '11:21:00', '11:45:00', '12:14:00',
				         '12:38:00', '13:08:00', '13:32:00', '14:02:00', '14:26:00', '14:56:00', '15:21:00', '15:51:00', '16:19:00', '16:49:00', '17:54:00', '18:23:00', '18:40:00', '19:08:00', '19:37:00',
				         '20:06:00', '20:31:00', '21:00:00', '21:24:00', '21:50:00', '22:17:00', '22:43:00'
				]
			}];
			
			var curTime = tizen.time.getCurrentDateTime();
			
			app.convertTimes(data, curTime);
			
			return data;
		}
		catch(e) {
			console.log(e);
		}
	}
	
	app.appData = initAppData();
})(window.app);