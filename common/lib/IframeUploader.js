
const IFRAME_STYLE = {
  position: 'absolute',
  top: 0,
  opacity: 0,
  filter: 'alpha(opacity=0)',
  left: 0,
  zIndex: 9999,
};

function empty(){}
const defaultProp = {
  action: '',
  component: 'span',
  prefixCls: 'rc-upload',
  data: {},
  headers: {},
  file: {},
  onProgress: empty,
  onReady: empty,
  onStart: empty,
  onError: empty,
  onSuccess: empty,
  multiple: false,
  beforeUpload: null,
  withCredentials: false,
}

function IframeUploader(setting){
  console.log(setting);
  this.uploading = false;

  this.props = Object.assign({}, defaultProp, setting);

  var body = document.getElementsByTagName('body')[0];
  this.iframe = document.createElement('iframe');

  this.iframe.onload = this.onLoad.bind(this);

  this.iframe.setAttribute('id', this.uid());

  body.appendChild(this.iframe);

  this.initIframe();
}

IframeUploader.prototype = {

  uid: function(){
    var now = (new Date()).getTime();
    var random = parseInt(Math.random()*100000)
    return `rc-upload-${now}-${random}`;
  },

  onLoad: function(){
    if (!this.uploading) {
      return;
    }
    const { props, file } = this;
    let response;
    try {
      const doc = this.getIframeDocument();
      const script = doc.getElementsByTagName('script')[0];
      if (script && script.parentNode === doc.body) {
        doc.body.removeChild(script);
      }
      response = doc.body.innerHTML;
      props.onSuccess(response, file);
    } catch (err) {
      console.error(false, 'upload error');
      props.onError(err, null, file);
    }
  },

  getIframeNode: function() {
    return this.iframe;
  },

  getIframeDocument: function() {
    return this.getIframeNode().contentDocument;
  },

  getFormNode: function() {
    return this.getIframeDocument().getElementById('form');
  },

  getFormDataNode: function() {
    return this.getIframeDocument().getElementById('data');
  },

  getIframeHTML: function() {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style>
    body,html {padding:0;margin:0;border:0;overflow:hidden;}
    </style>
    </head>
    <body>
    <form method="post"
    encType="multipart/form-data"
    action="${this.props.action}" id="form"
    style="display:block;height:9999px;position:relative;overflow:hidden;">
    
     ${this.props.file}
     style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>
    <span id="data"></span>
    </form>
    </body>
    </html>
    `;
  },

  initIframe: function() {
    const iframeNode = this.getIframeNode();
    let win = iframeNode.contentWindow;
    let doc;
    
    try {
      doc = win.document;
    } catch (e) {
      win = iframeNode.contentWindow;
      doc = win.document;
    }
    doc.open('text/html', 'replace');
    doc.write(this.getIframeHTML());
    doc.close();

    this.post();
  },

  startUpload: function() {
    if (!this.uploading) {
      this.uploading = true;
    }
  },

  post: function(file) {
    const formNode = this.getFormNode();
    const dataSpan = this.getFormDataNode();
    let { data } = this.props;
    const { onStart } = this.props;

    this.startUpload();

    const inputs = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        inputs.push(`<input name="${key}" type="text" value="${data[key]}"/>`);
      }
    }

    dataSpan.innerHTML = inputs.join('');
    formNode.submit();
    // dataSpan.innerHTML = '';
    onStart(file);
  }
}

function upload(setting){
  return new IframeUploader(setting);
}

export default upload