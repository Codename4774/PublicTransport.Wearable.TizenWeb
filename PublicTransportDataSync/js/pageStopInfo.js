 function pageStopInfo_Init(app, stopInfo) {
	var pageID = 'stopInfo';
	var updateArriveTimeDescr = null;
	
	function loadData(data) {
		try {
			var listControl = app.getElement(pageID, 'mainDiv');
			RouteDirection
			listControl.find('#StopName').html($('<p>').html('Stop name: ' + data.stop_name));
			listControl.find('#RouteName').html($('<p>').html('Route number: ' + data.route_short_name));
			listControl.find('#RouteType').html($('<p>').html('Route type: ' + app.getRouteTypeStr(data.route_type)));
			listControl.find('#RouteDirection').html($('<p>').html('Direction: ' + data.direction));

			/*var listControlTime = listControl.find('#Times');
			
			listControlTime.empty();
			
			data.times.forEach(function (time) {
				listControlTime.append($('<p>').html(time.str));
			});
			
			if (updateArriveTimeDescr !== null) {
				clearInterval(updateArriveTimeDescr);
			}
			updateArriveTimeDescr = app.setUpdateArriveTime(data.times, function(minutes) {
				listControl.find('#NearestArrivalMinutes').html($('<p>')
						.html('Next arrive after ' + 
								minutes +
								' minutes'
							)
					);
			},
			function(time) {
				listControl.find('#NearestArrivalTime').html($('<p>')
						.html('Nearest arrive time: ' + 
								time.str)
					);
			});
			*/
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
					var tizenTime = tizen.time.getCurrentDateTime();
					
					app.convertTimes(data, tizenTime);
					
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