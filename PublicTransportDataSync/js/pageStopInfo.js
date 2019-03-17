 function pageStopInfo_Init(app, stopInfo) {
	var pageID = 'stopInfo';
	
	function loadData(data) {		
		var listControl = app.getElement(pageID, 'ulStopInfo');
		
		listControl.find('#stopName').html(data.stop_name);
		listControl.find('#routeName').html(data.route_short_name);
		listControl.find('#routeType').html(app.getRouteTypeStr(data.route_type));
		
		var listControlTime = listControl.find('#liTimes');
		
		listControlTime.empty();
		
		/*data.times.forEach(function (time) {
			listControlTime.append($('<p>').html(time));
		});*/
	}
	
	loadData(stopInfo);
};