var messageApi = require('../api/messageApi').fun;
var userApi = require('../api/userApi').fun;
var syslogApi = require('../api/syslogApi').fun;

export function createServer(app){
	
	userApi(app);
	messageApi(app);
	syslogApi(app);

}