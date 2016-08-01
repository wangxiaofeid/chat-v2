import React, { Component, PropTypes } from 'react'
import { Table, Icon } from 'antd';

class ImageList extends Component {
  constructor(props) {
      super(props)
      this.state = {
          show: 'none',
          img: ""
      }
    this.showPic = this.showPic.bind(this);
    this.hidePic = this.hidePic.bind(this);
  }

  showPic(img){
    this.setState({
      show: 'block',
      img
    });
  }

  hidePic(){
    this.setState({
      show: 'none'
    });
  }

  render() {
    const { imgList } = this.props;
    const columns = [{
      title: '几层查找',
      dataIndex: 'index',
      key: 'index',
    },{
      title: '来自网址',
      dataIndex: 'from',
      key: 'from',
      // render: (link) => <a href={ link }>{link}</a>,
    },{
      title: '图片',
      dataIndex: 'img',
      key: 'img',
      // render: (img) => <a href="#"><img src={ img }/></a>,
    },{
      title: '缩略图',
      dataIndex: 'img',
      key: 'imgM',
      render: (img) => <img style={{ width:"40px",height:'40px'}} src={ img } onClick={this.showPic.bind(this,img)}/>,
    },{
      title: '操作',
      key: 'operation',
      render: (text,record) => (
        <span>
          <a href="javascript:;" onClick={this.showPic.bind(this,record.img)}>查看大图</a>
        </span>
      ),
    }];
    return (
      <div>
        <Table columns={columns} dataSource={imgList} />
        <div className="showPic" style={{display: this.state.show}}>
          <div className="cover" onClick={this.hidePic}></div>
          <img src={this.state.img} alt=""/>
        </div>
      </div>
    )
  }
}

// { "_id" : ObjectId("5756874df92420a87cc6999f"), "time" : 1465288525389, "color" : "pink", "name" : "王小飞", "id" : 9201, "type" : "disconnect" }

ImageList.propTypes = {
  imgList: PropTypes.array.isRequired,
  // onDelete: PropTypes.func.isRequired
}

export default ImageList
