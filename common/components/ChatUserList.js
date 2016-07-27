import React, { Component, PropTypes } from 'react'
import { Menu, Badge, message } from 'antd'

class ChatUserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: '1',
    }
    this.menuHandleClick = this.menuHandleClick.bind(this);
  }

  menuHandleClick(e){
      if(e.key == this.props.user.id){
        message.info('本人本人本人');
        return;
      }else if(e.key != 1){
          var have = false;
          for (var i = 0; i < this.props.userlist.length; i++) {
              var t = this.props.userlist[i];
              if(e.key == t.id){
                  have = t;
                  break;
              }
          }
          if(have){
              this.props.changeUser({
                  name:have.name,
                  id:have.id
              });
          }
      }else{
        this.props.changeUser({
            name:'all',
            id:'1'
        });
      }

      this.setState({
        current: e.key
      });
      // 设置信息已读
      // this.infoNumChange(e.key,0);
  }

  render() {
    
    return (
      <Menu onClick={this.menuHandleClick}
        selectedKeys={[this.state.current]}
        mode="inline">
            {
                this.props.userlist.map(function(user,index){
                  if(user.id == this.state.id){
                    return (<Menu.Item key={user.id}>
                            <Badge count={user.infoNum}>
                              <a href="javascript:;" className="head-example" style={{background:user.color}}></a>
                            </Badge>
                            本人
                            </Menu.Item>)
                  }else{
                    return (<Menu.Item key={user.id}>
                            <Badge count={user.infoNum}>
                              <a href="javascript:;" className="head-example" style={{background:user.color}}></a>
                            </Badge>
                            {user.name}
                            </Menu.Item>)
                  }
                }.bind(this))
            }
        </Menu>
    )
  }
}

ChatUserList.propTypes = {
  changeUser: PropTypes.func.isRequired,
  // incrementIfOdd: PropTypes.func.isRequired,
  // incrementAsync: PropTypes.func.isRequired,
  // onSubmitFun: PropTypes.func.isRequired,
  // login: PropTypes.bool.isRequired
}

export default ChatUserList
