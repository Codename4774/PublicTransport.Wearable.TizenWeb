window.app = window.app || {};

(function (app) {	
	function initConstants(app) {
		app.SELECTED_DATA_TO_DISPLAY_KEY = 'SELECTED_DATA';
	}
	
	function getElement(idPage, idElement) {
		var selector = '#' + idPage + ' #' + idElement;
		
		return $(selector);
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
				return 'Unknown';
			}
		}
	}
	
	function getHMSValues(time) {
		var valuesStr = time.split(":");
		
		return [parseInt(valuesStr[0]), parseInt(valuesStr[1]), 
		        parseInt(valuesStr[2])];
	}
	
	function getTimesExInfoArray(times, tizenTime) {
		var oldHours = tizenTime.getHours();
		var oldMinutes = tizenTime.getMinutes();
		var oldSeconds = tizenTime.getSeconds();
		
		var result = times.map(function(time) {
			var timeValuesArray = getHMSValues(time);
			
			tizenTime.setHours(timeValuesArray[0]);
			tizenTime.setMinutes(timeValuesArray[1]);
			tizenTime.setSeconds(timeValuesArray[2]);
			
			var timeInfo = initTimeExObj(timeValuesArray[0], timeValuesArray[1],
					timeValuesArray[2], tizenTime.toLocaleTimeString());
						
			return timeInfo;
		});
		
		tizenTime.setHours(oldHours);
		tizenTime.setMinutes(oldMinutes);
		tizenTime.setSeconds(oldSeconds);
		
		return result;
	}
	
	function getNextArriveTime(times, currentArriveTime) {
		var indexOfCurrentTime = times.indexOf(currentArriveTime);
		
		if (indexOfCurrentTime > 0) {
			if (indexOfCurrentTime !== times.length - 1) {
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
	
	function initTimeExObj(hours, minutes, seconds, strFormat) {
		return {
			seconds : hours * 3600 + minutes * 60 + seconds,
			str : strFormat
		};
	}
	
	function timeDiffSec(timeFrom, timeTo) {
		return timeFrom.seconds - timeTo.seconds;
	}
	
	function getTimeFormatFromTZDate(tizenTime) {
		var hours = tizenTime.getHours();
		var minutes = tizenTime.getMinutes();
		var seconds = tizenTime.getSeconds();
		
		return initTimeExObj(hours, minutes, seconds, tizenTime.toLocaleTimeString());
	}
	
	function getNearestArriveTime(times, currentTizenTime) {
		var currentTime = getTimeFormatFromTZDate(currentTizenTime);
		
		var lastTime = times[times.length - 1];
		var firstTime = times[0];
		
		if (timeDiffSec(currentTime, lastTime) >= 0 
				|| timeDiffSec(firstTime, currentTime >= 0)) {
			return times[0];
		}
		
		var resultTime = times.find(function(time) {
			return timeDiffSec(currentTime, time) <= 0;
		});
		
		return resultTime;
	}
	
	function getArriveAfterMinutes(time, curHours, curMinutes, curSeconds) {
		var result = time.seconds - (curHours * 3600 + curMinutes * 60 + curSeconds);
		
		var secRest = result % 60;
		
		result = Math.floor(result / 60);
		result += secRest > 0 ? 1 : 0;
		
		return result;
	}
	
	function convertTimes(dataArr, currentTime) {
		for (var i = 0; i < dataArr.length; i++) {
			dataArr[i].times = getTimesExInfoArray(dataArr[i].times, currentTime);
		}
	}
	
	app.getElement = getElement;
	app.getRouteTypeStr = getRouteTypeStr;
	app.getNearestArriveTime = getNearestArriveTime;
	app.getNextArriveTime = getNextArriveTime;
	app.getArriveAfterMinutes = getArriveAfterMinutes;
	app.getTimesExInfoArray = getTimesExInfoArray;
	app.convertTimes = convertTimes;
	
	initConstants(app);
})(window.app);
