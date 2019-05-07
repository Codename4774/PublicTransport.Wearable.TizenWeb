 function pageAvaliableStopsList_Init(app) {
	var pageID = 'avaliableStopsList';
	
	function loadList(data) {		
		var listControl = app.getElement(pageID, 'avaliableStops');
		
		listControl.empty();
		
		data.forEach(function (stopInfo) {
			listControl.append(
					$('<li>')
						.append($('<div>').append(
									$('<p>').append(stopInfo.stop_name)
								).append(
									$('<p>').append(stopInfo.route_short_name)
								).append(
									$('<p>').append(stopInfo.direction)
								)
							)
							.click(function() {
								loadStopInfo(stopInfo);
							})
						);
		});
	}
	
	function loadStopInfo(stopInfo) {
		pageStopInfo_Init(app, stopInfo);
		tau.changePage('stopInfo');
	}
	
	loadList(app.appData.stopsInfoData);
};