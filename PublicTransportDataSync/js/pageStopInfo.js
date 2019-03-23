 function pageStopInfo_Init(app, stopInfo) {
	var pageID = 'stopInfo';
	
	function loadData(data) {		
		var listControl = app.getElement(pageID, 'mainDiv');
		
		listControl.find('#StopName').html($('<p>').html('Stop name: ' + data.stop_name));
		listControl.find('#RouteName').html($('<p>').html('Route number: ' + data.route_short_name));
		listControl.find('#RouteType').html($('<p>').html('Route type: ' + app.getRouteTypeStr(data.route_type)));

		var listControlTime = listControl.find('#Times');
		
		listControlTime.empty();
		
		data.times.forEach(function (time) {
			listControlTime.append($('<p>').html(time));
		});
	}
	
	loadData(stopInfo);
};