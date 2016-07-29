var messageApi = require('../api/messageApi').fun;
var userApi = require('../api/userApi').fun;
var syslogApi = require('../api/syslogApi').fun;
import { jsonApi } from '../api/jsonApi';
import * as reptileApi from '../api/reptileApi';

export function createServer(app){
	
	userApi(app);
	messageApi(app);
	syslogApi(app);

	jsonApi(app);

	reptileApi.fun(app);

}