window.app = window.app || {};

(function(app) {
	
	function initAppData() {
		try {
			var reqAppControl = getRequestAppControl();
			//initBluetooth();
			return {
				isFileSyncProcessing : false,
				lastTimeCheck : tizen.time.getCurrentDateTime().toLocaleTimeString(),
				stopsInfoData : getStopInfoTest(),
				launchedFromWidget : 
					reqAppControl.callerAppId && reqAppControl.callerAppId != "" ? 
							true : false,
				reqAppControl : reqAppControl
			};
		} catch (e) {
			return {
				isFileSyncProcessing : false,
				lastTimeCheck : "",
				stopsInfoData : getStopInfoTest()
			};
		}
	}
	
	function initBluetooth() {
		var adapter = initAdapter();
		
		registerService(adapter);
	}
	
	function getRequestAppControl() {
		try {
			var reqAppControl = tizen.application
				.getCurrentApplication().getRequestedAppControl();
		
		return reqAppControl;
		}
		catch(e) {
			console.log(e);
		}
	}
	
	function getStopInfoTest() {
		try {
			var data = [{
					id : 1,
					user_defined_name : 'Stotis, bus 1, direct',
					
					route_id : 'vilnius_bus_1',
					route_short_name : '1',
					route_long_name : 'Stotis–Vikingų g.–Oro uostas',
					route_type : 3,
					stop_name : 'Stotis',
					times : [
					         '05:16:00', '06:01:00', '06:31:00', '06:49:00', '07:16:00', '07:41:00', '08:13:00', '08:39:00', '09:11:00', '10:06:00', '10:36:00', '10:51:00', '11:21:00', '11:45:00', '12:14:00',
					         '12:38:00', '13:08:00', '13:32:00', '14:02:00', '14:26:00', '14:56:00', '15:21:00', '15:51:00', '16:19:00', '16:49:00', '17:54:00', '18:11:00', '18:40:00', '19:08:00', '19:37:00',
					         '20:06:00', '20:31:00', '21:00:00', '21:33:00', '21:50:00', '22:17:00', '22:43:00'
					]
			},
			{
				id : 2,
				user_defined_name : 'Stotis, bus 1, upDirect',
				
				route_id : 'vilnius_bus_1',
				route_short_name : '1',
				route_long_name : 'Stotis–Vikingų g.–Oro uostas',
				route_type : 3,
				stop_name : 'Stotis',
				times : [
				         '05:16:00', '06:01:00', '06:31:00', '06:49:00', '07:16:00', '07:41:00', '08:13:00', '08:39:00', '09:11:00', '10:06:00', '10:36:00', '10:51:00', '11:21:00', '11:45:00', '12:14:00',
				         '12:38:00', '13:08:00', '13:32:00', '14:02:00', '14:26:00', '14:56:00', '15:21:00', '15:51:00', '16:19:00', '16:49:00', '17:54:00', '18:23:00', '18:40:00', '19:08:00', '19:37:00',
				         '20:06:00', '20:31:00', '21:00:00', '21:24:00', '21:50:00', '22:17:00', '22:43:00'
				]
			}];
			
			var curTime = tizen.time.getCurrentDateTime();
			
			//app.convertTimes(data, curTime);
			
			return data;
		}
		catch(e) {
			console.log(e);
		}
	}
	
    function initAdapter() {
        try {
            var adapter = tizen.bluetooth.getDefaultAdapter();
            registerService(adapter);
        } catch (error) {
            console.error('Unable to obtain default adapter', error);
        }
    }
	
    function registerService(adapter) {
        try {
            adapter.registerRFCOMMServiceByUUID(
                app.SERVICE_UUID,
                app.SERVICE_NAME,
                onServiceRegistered,
                onServiceRegistrationError
            );
        } catch (error) {
            console.error('Unable to register service', error);
        }
    }
    
    function onServiceRegistered(handler) {
        handler.onconnect = onServiceConnection;
    }

    function onServiceRegistrationError(error) {
        console.error('Unable to register service', error);
    }
    
    function onServiceConnection(socket) {
    	app.appData.isFileSyncProcessing = true;
    	app.changeState();
        var session = {};
        session.resultString = "";
        try {
            socket.onmessage = onServerSocketMessage.bind(null, socket, session);
            socket.onclose = onServerSocketClose.bind(null, session);
        } catch (error) {
            console.error('Unable to read socket message data', error);
            closeServerConnection(socket, session);
            return;
        }
    }
    
    function onServerSocketMessage(socket, session) {
        var message = null;

        try {
        	
            message = socket.readData();
            readedData = stringFromUTF8Array(message);
            if (!(session.resultString + readedData).includes("{END}")) {
            	session.resultString += readedData;
            }
            else {
            	session.resultString += readedData;
            	session.resultString = session.resultString.replace("\{END\}", "");
            	app.appData.stopsInfoData = JSON.parse(session.resultString);
            	session.resultString = "";
            	app.appData.isFileSyncProcessing = false;
            	app.finishLoading();
            	app.changeState();
            	socket.close();
            }
        } catch (error) {
            console.error('Unable to read socket message data', error);
            closeServerConnection(socket, session);
            return;
        }
    }
    
    function onServerSocketClose(session) {
        if (!session.cleaned) {
            cleanServerConnection(session);
        }
    }
    
    function closeServerConnection(socket, session) {
        cleanServerConnection(session);

        try {
            socket.close();
        } catch (error) {
            console.error('Error during closing server connection', error);
        }
    }
    
    function cleanServerConnection(session) {
        if (session.stream) {
            session.stream.close();
            session.stream = null;
        }

        session.cleaned = true;
    }
    
    function stringFromUTF8Array(data) { 
      const extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
      var count = data.length;
      var str = "";
      
      for (var index = 0;index < count;) {
        var ch = data[index++];
        if (ch & 0x80) {
          var extra = extraByteMap[(ch >> 3) & 0x07];
          if (!(ch & 0x40) || !extra || ((index + extra) > count))
            return null;
          
          ch = ch & (0x3F >> extra);
          for (;extra > 0;extra -= 1) {
            var chx = data[index++];
            if ((chx & 0xC0) != 0x80)
              return null;
            
            ch = (ch << 6) | (chx & 0x3F);
          }
        }
        
        str += String.fromCharCode(ch);
      }
      
      return str;
    }
    
    app.initBluetooth = initBluetooth;
	app.appData = initAppData();
	initBluetooth();
})(window.app);