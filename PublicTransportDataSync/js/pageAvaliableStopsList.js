 function pageAvaliableStopsList_Init(app) {
	var pageID = 'avaliableStopsList';
	
	function loadList(data) {		
		var listControl = app.getElement(pageID, 'avaliableStops');
		
		listControl.empty();
		
		data.forEach(function (stopInfo) {
			listControl.append(
					$('<li>').attr('id', 'avaliableStopsList_' + stopInfo.user_defined_name)
						.append($('<div>').append(
									$('<p>').append(stopInfo.user_defined_name)
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