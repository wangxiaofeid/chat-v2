import url from 'url'
import reptile from '../common/reptile'

export function fun(app){
    app.get('/reptileApi',function(req,res){
        var params = url.parse(req.url, true).query;
        if(params.file){
            new reptile(res, params.file, params.num||30);
        }
    });

}

