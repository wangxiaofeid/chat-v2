import React, { Component, PropTypes } from 'react'
import QueueAnim from 'rc-queue-anim';

class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: '1',
    }
    this.timeFormat = this.timeFormat.bind(this);
  }

  timeFormat(a,b){
      var c = b
        , d = new Date(a)
        , e = {
          "M+": d.getMonth() + 1,
          "d+": d.getDate(),
          "h+": d.getHours(),
          "m+": d.getMinutes(),
          "s+": d.getSeconds(),
          "q+": Math.floor((d.getMonth() + 3) / 3),
          S: d.getMilliseconds()
      };
      /(y+)/.test(c) && (c = c.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (var f in e)
          new RegExp("(" + f + ")").test(c) && (c = c.replace(RegExp.$1, 1 == RegExp.$1.length ? e[f] : ("00" + e[f]).substr(("" + e[f]).length)));
      return c
  }

  render() {
    return (
      <div className="oh">
        <QueueAnim component="div" type={['right', 'left']}>
            {
                this.props.messages.map(function (message,index) {
                    if(this.props.toId == 1||message.toId == this.props.myId&&message.fromId == this.props.toId){
                        return (<div className="p" key={index}>
                                    <span className="icon" style={{background:message.color}}></span>
                                    <div className="r">
                                        <div className="name">{ message.fromName } --to-- {message.toName}</div>
                                        <div className="msg">
                                            <span className="arrow"></span>
                                            <p>{ message.text }</p>
                                            <p className="c-9">{this.timeFormat(message.time,'yyyy-MM-dd hh:mm:ss')}</p>
                                        </div>
                                    </div>
                                </div>)
                    }else if(message.fromId == this.props.myId&&message.toId == this.props.toId){
                        return (<div className="p self" key={index}>
                                    <div className="r">
                                        <div className="name">{ message.fromName } --to-- {message.toName}</div>
                                        <div className="msg">
                                            <span className="arrow"></span>
                                            <p>{ message.text }</p>
                                            <p className="c-9">{this.timeFormat(message.time,'yyyy-MM-dd hh:mm:ss')}</p>
                                        </div>
                                    </div>
                                    <span className="icon" style={{background:message.color}}></span>
                                </div>)
                    }
                }.bind(this))
            }
        </QueueAnim>
    </div>
    )
  }
}

MessageList.propTypes = {
  // changeUser: PropTypes.func.isRequired,
  // incrementIfOdd: PropTypes.func.isRequired,
  // incrementAsync: PropTypes.func.isRequired,
  // onSubmitFun: PropTypes.func.isRequired,
  // login: PropTypes.bool.isRequired
}

export default MessageList
