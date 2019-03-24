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
	
	app.getRouteTypeStr = getRouteTypeStr;
	app.getChildElement = getChildElement;
	initConstants(app);
})(window.app);
