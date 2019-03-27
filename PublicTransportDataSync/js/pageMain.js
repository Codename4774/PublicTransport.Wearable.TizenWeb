window.app = window.app || {};

(function(app) {
	var pageID = 'main';
	
	function init() {
		try {
			app.getElement(pageID, 'lLastCheckInfo')
				.html( app.appData.lastTimeCheck);	
		} catch (e) {
			console.log(e);
		}
		
		app.getElement(pageID, 'btnSync').click(function() {
			changeState('dProcessing', 'btnSync');
		});
	}

	function changeState(idProgressContainer, idButton) {
		var progressContainer = window.app.getElement(pageID, idProgressContainer);
		var button = window.app.getElement(pageID, idButton);
		
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
		
			setTimeout(function() {
				console.log('redirect');
				var tizenTime = tizen.time.getCurrentDateTime();
								
				pageAvaliableStopsList_Init(app);		
				tau.changePage('avaliableStopsList');
				stopLoading(progressElement, button);
			}, 5000);
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