var messageApi = require('../api/messageApi').fun;
var userApi = require('../api/userApi').fun;
var syslogApi = require('../api/syslogApi').fun;
var fileApi = require('../api/fileApi').fun;
import { jsonApi } from '../api/jsonApi';
import * as reptileApi from '../api/reptileApi';

export function createServer(app){
	
	userApi(app);
	messageApi(app);
	syslogApi(app);
	fileApi(app);

	jsonApi(app);

	reptileApi.fun(app);

}