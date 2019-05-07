window.app = window.app || {};

(function(app) {
	var pageID = 'main';
	
	function init() {
		try {
			app.finishLoading = finishLoading;
			app.changeState = changeState;
			app.getElement(pageID, 'lLastCheckInfo')
				.html( app.appData.lastTimeCheck);	
		} catch (e) {
			console.log(e);
		}
		
		/*app.getElement(pageID, 'btnSync').click(function() {
			changeState();
		});*/
	}

	function changeState() {
		var progressContainer = window.app.getElement(pageID, 'dProcessing');
		var button = window.app.getElement(pageID, 'btnSync');
		
		if (app.appData.isFileSyncProcessing) {
			stopLoading(progressContainer, button);
			app.appData.isFileSyncProcessing = false;
		}
		else {
			showLoading(progressContainer, button);
			app.appData.isFileSyncProcessing = true;
		}
	}
	
	function showLoading(progressElement, button) {
		try {
			progressElement.css('display', 'block');
			button.html('Stop');
		}
		catch(e) {
			console.log(e);
		}
	}
	
	function finishLoading() {
		try {
			console.log('redirect');
			var tizenTime = tizen.time.getCurrentDateTime();
			
			//app.convertTimes(app.appData.stopsInfoData, tizenTime);
			
			pageAvaliableStopsList_Init(app);		
			tau.changePage('avaliableStopsList');
			stopLoading(progressElement, button);
		}
		catch(e) {
			console.log(e);
		}
	}
	
	function stopLoading(progressElement, button) {
		progressElement.css('display', 'none');
		button.html('Sync');
	}
	
	init();
})(window.app);