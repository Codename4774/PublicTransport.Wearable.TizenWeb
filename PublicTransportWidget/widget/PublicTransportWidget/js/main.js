window.app = window.app || {};

(function(app) {
	var pageID = 'main';
	var updateArriveTimeDescr = null;
	
	var appControlReplyCallback = {
		onsuccess: function(data) {
		    console.log('Reply callback');
		    console.log(data);
		    for (var i = 0; i < data.length; i++) {
		    	if (data[i].key == "publicTansport_Result") {
		    		app.appData.selectedStopInfo = JSON.parse(data[i].value[0]);
		            console.log('Public transport widget. Selected transport is ' + data[i].value[0]);
		            displayStopInfo(app.appData.selectedStopInfo);
		        }
		     }
		 },
		 onfailure: function() {
			 console.log('Public transport widget. The launch application control failed');
		 }
	};
	 
	function displayStopInfo(data) {
		 var pageInit = document.getElementById('pageInit');
		 
		 pageInit.style.display = 'none';
		 
		 initStopInfoDisplay(data);		 
	 }
	 
	function initStopInfoDisplay(data) {
		var pageAvaliableStopsList = document
			.getElementById('pageAvaliableStopsList');
		 
		pageAvaliableStopsList.style.display = 'block';
		 
		document.getElementById('divStopName')
			.textContent = data.stop_name;
		document.getElementById('divRouteName')
			.textContent = data.route_short_name + ' ' + app.getRouteTypeStr(data.route_type);
		
		document.getElementById('divDirection')
		.textContent = data.direction;
		
		if (updateArriveTimeDescr !== null) {
			clearInterval(updateArriveTimeDescr);
		}
		
		//var tizenTime = tizen.time.getCurrentDateTime();
		
		//app.convertTimes(data, tizenTime);
		
		updateArriveTimeDescr = app.setUpdateArriveTime(data.times[0], 
			function(minutes) {
				document.getElementById('divMinToArrive')
					.textContent = minutes;
			},
			function(time) {
				document.getElementById('divTimeArrive')
				.textContent = "Next arrive time: " + time.str;
			});
	}
	 
	function launchApp(title) {
		console.log('Public transport widget. app launch');
		var app = window.tizen.application.getCurrentApplication();
		var appControl = new window.tizen.ApplicationControl("http://tizen.org/appcontrol/operation/default",
				null, null, null, null, null);
		window.tizen.application.launchAppControl(appControl, title,
				function() {
	            	console.log("Public transport widget. launch application control succeed");
	        	},
	        	function(e) {
	        		console.log("Public transport widget. launch application control failed. reason: " + e.message);
	        	},
	        	appControlReplyCallback);
	 }

    
	function init() {
		console.log('Public transport widget. Init launch');
		var btnInitStop = document.getElementById('btnInitStop');
		console.log('Public transport widget. btnInitStop element ' + btnInitStop);
		btnInitStop.addEventListener('click', function(e) {
			launchApp('pLmC89hPPl.PublicTransportDataSync');
		});
	}
	
	window.onload = function() {
		init();
	}

})(window.app);