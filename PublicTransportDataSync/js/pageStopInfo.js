 function pageStopInfo_Init(app, stopInfo) {
	var pageID = 'stopInfo';
	
	function loadData(data) {
		try {
			var listControl = app.getElement(pageID, 'mainDiv');
			
			listControl.find('#StopName').html($('<p>').html('Stop name: ' + data.stop_name));
			listControl.find('#RouteName').html($('<p>').html('Route number: ' + data.route_short_name));
			listControl.find('#RouteType').html($('<p>').html('Route type: ' + app.getRouteTypeStr(data.route_type)));
	
			var listControlTime = listControl.find('#Times');
			
			listControlTime.empty();
			
			data.times.forEach(function (time) {
				listControlTime.append($('<p>').html(time.str));
			});
			
			var curTime = tizen.time.getCurrentDateTime();
			var nearestArrive = app.getNearestArriveTime(data.times, curTime);
			listControl.find('#NearestArrivalTime').html($('<p>')
					.html('Nearest arrive time: ' + 
							nearestArrive.str)
				);
			listControl.find('#NearestArrivalMinutes').html($('<p>')
					.html('Next arrive after ' + 
							app.getArriveAfterMinutes(nearestArrive, 
									curTime.getHours(),
									curTime.getMinutes(),
									curTime.getSeconds()
								) +
							' minutes'
						)
				);
			initWidgetSendResultHandler(data);
		}
		catch(e) {
			console.log(e);
		}
	}
	
	function initWidgetSendResultHandler(data) {
		try {
			if (app.appData.launchedFromWidget) {
				var buttonFooter = app.getElement(pageID, 'btnSendToWidgetFooter');
				
				var buttonSend = buttonFooter.find('#btnSendToWidget');
				
				buttonSend.click(function() {
					var dataWidgetResult = new tizen.ApplicationControlData(
							"publicTansport_Result", [JSON.stringify(data)]);
					
					app.appData.reqAppControl.replyResult([dataWidgetResult]);
					tizen.application.getCurrentApplication().exit();
				});
			}
			else {
				var buttonFooter = app.getElement(pageID, 'btnSendToWidgetFooter');
				buttonFooter.css('display', 'none');
			}
		}
		catch(e) {
			console.log(e);
		}
	}
	
	loadData(stopInfo);
};