import url from 'url'
import request from 'request'
import cheerio from 'cheerio'
import _ from 'lodash'

export default class reptile {
    constructor(res, url, maxNum) {
        this.regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/i;
        this.res = res;

        this.back = [];
        this.linkNum = 0;
        this.isResponse = false;
        this.maxNum = maxNum||100;

        if(url&&this.isLink(url)){
            this.getData(url, 1);
        }else{
            this.responseError('请提供正确的网页地址')
        }
    }

    isLink(str){
        return this.regex.test(str)
    }

    getData(link, index){
        var that = this;
        that.linkNum++;
        request(link, function (error, response, body) {
            that.linkNum--;
            if(that.back.length > that.maxNum){
                return
            }
            var aArr = [];
            if (!error && response.statusCode == 200) {
                // console.log(body);

                var $ = cheerio.load(body);
                var arr = [];
                $('img').each(function(){
                    var img = $(this).attr('src');
                    img&&that.back.push({
                        from: link,
                        img: url.resolve(link, img),
                        index: index
                    });
                });

                $('a').each(function(){
                    var aLink = $(this).attr('href');
                    aLink&&aArr.push(url.resolve(link, aLink));
                });
            }
            if(that.back.length > that.maxNum||that.linkNum == 0&&aArr.length == 0){
                that.responseData()
            }else{
                _.each(aArr,function(link){
                    // console.log(link)
                    link&&that.isLink(link)&&that.getData(link, index + 1);
                });
            }
        })
    }

    responseData(){
        var that = this;
        if(that.isResponse){
            return
        }
        that.isResponse = true;
        if(that.back.length > 0){
            if(that.back.length > that.maxNum){
                that.back.length = that.maxNum
            }
            that.res.json({
                type: 1,
                msg: "请求成功",
                data: that.back
            });
        }else{
            that.responseError();
        }
    }

    responseError(msg){
        this.res.json({
            type: 0,
            msg: msg||"请求失败"
        });
    }
}
