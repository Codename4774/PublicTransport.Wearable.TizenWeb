window.app = window.app || {};

(function (app) {	
	function initConstants(app) {
		app.SELECTED_DATA_TO_DISPLAY_KEY = 'SELECTED_DATA';
	}
	
	function getRouteTypeStr(routeType) {
		switch (routeType) {
			case 0 :  {
				return 'Tram';
			}
			break;
			case 1 :  {
				return 'Metro';
			}
			break;
			case 2 :  {
				return 'Rail';
			}
			break;
			case 3 :  {
				return 'Bus';
			}
			break;
			case 4 :  {
				return 'Ferry';
			}
			break;
			case 5 :  {
				return 'Cable tram';
			}
			break;
			case 6 :  {
				return 'Aerial lift';
			}
			break;
			case 7 :  {
				return 'Funicular';
			}
			break;
			default: {
				return 'Unknown'
			}
		}
	}
	
    function getChildElement(parentID, childID) {
    	var parent = document.getElementById(parentID);
    	var children = parent.children;
    	var i;

    	for (i = 0; i < c.length; i++) {
    	    if (children[i].id === elementID) {
    	    	return children[i];
    	    }
    	}
    }
	
	
	function getNextArriveTime(times, currentArriveTime) {
		var indexOfCurrentTime = times.indexOf(currentArriveTime);
		
		if (indexOfCurrentTime > 0) {
			if (indexOfCurrentTime != times.length - 1) {
				return times[indexOfCurrentTime + 1];
			}
			else {
				return times[0];
			}
		}
		else {
			return null;
		}
	}
	
	function timeDiffSec(timeFrom, timeTo) {
		//todo;
	}
	
	function getCurrentTimeStr(currentTizenTime) {
		return tizen.time.getTimeFormar("hh:mm:ss");
	}
	
	function getNearestArriveTime(times, currentTizenTime) {
		var currentTime = getCurrentTimeStr(currentTizenTime);
		
		var lastTime = times[times.length - 1];
		
		if (timeDiffSec(lastTime, currentTime) > 0) {
			return times[0];
		}
		
		var resultTime = times.findIndex(function(time) {
			return timeDiffSec(currentTime, time) <= 0;
		});
		
		return resultTime;
	}
	    
	app.getRouteTypeStr = getRouteTypeStr;
	app.getChildElement = getChildElement;
	app.getNearestArriveTime = getNearestArriveTime;
	app.getNextArriveTime = getNextArriveTime;
	
	initConstants(app);
})(window.app);
