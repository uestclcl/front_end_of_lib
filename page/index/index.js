const app = getApp()


Page({
  data: {
    bookUrl: '',
    usname: '用户',
    bookname: '',
    bookId: '12383',
    author: '',
    addedTime: '',
    state: '',
    submit: "",
    hasLogin: false,
    code: tt.getStorageSync('login.code'),
    userInfo: {},
    imgUrlPrefix:app.globalData.imgUrlPrefix
  },

  //借书  
  onBorrowBook: function (e) {
    var that = this;
    tt.request({
      url: 'http://120.26.91.143:8080/users/book/' + this.data.bookId, // 目标服务器url
      data: {
        sessionId: tt.getStorageSync('session_id')
      },
      success: (res) => {
        tt.setStorageSync('updated', true);
        that.getBook();
        // tt.showToast({
        //   title: res.data, // 内容
        //   duration: 2500
        // });
        tt.showModal({
          title: res.data,
          showCancel: false
        })
      },
    });
  },

  onShow: function (options) {
    console.log('onShow:');
    console.log(options);

    let that = this;
    //设置bookId
    let bookId = tt.getStorageSync('book_id');
    if (bookId != "" && bookId != null) {
      that.setData({
        bookId: bookId
      })
    }
    that.getBook();
  },

  //加载页面
  onLoad: function (options) {
    console.log("onLoad:");
    console.log(options);
    var that = this;
    if (options.scene != undefined) {   //飞书直接扫码
      var scan_url = decodeURIComponent(options.scene);
      console.log(scan_url);
      that.setData({
        // goods_id: this.getQueryString(scan_url, 'id'),
        bookId: this.getQueryString(scan_url, 'bookId')
      })
    }

    //登录
    tt.login({
      success(res) {
        if (res.code) {
          that.login(res.code);
        }
      }
    })
  },

  //登录
  login: function (code) {
    let that = this;
    tt.request({
      url: 'http://120.26.91.143:8080/users/login', // 目标服务器url
      data: {
        code: code
      },
      success: (res) => {
        if (res.data) {
          tt.setStorageSync('session_id', res.data.sessionId);
          //tt.setStorageSync('user_id', res.data.userId);
          //加载用户信息
          tt.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo
              })
            }
          });
        }
      }
    });
  },

  //获取查询参数
  getQueryString: function (url, name) {
    // console.log("url = " + url);
    // console.log("name = " + name);
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
    var r = url.substr(1).match(reg);
    if (r != null) {
      // console.log("r = " + r)
      // console.log("r[2] = " + r[2])
      return r[2];
    }
    return null;
  },

  //获取图书信息
  getBook: function () {
    var that = this;
    tt.request({
      url: 'http://120.26.91.143:8080/users/books/' + this.data.bookId, // 目标服务器url
      success: (res) => {
        that.setData({
          bookname: res.data.bookName,
          author: res.data.author,
          addedTime: res.data.addedTime,
          state: res.data.borrowed ? '已借出' : '可借阅',
          submit: res.data.borrowed ? '不可借' : '借书',
          bookUrl: that.data.imgUrlPrefix+res.data.bookUrl
        })
      }
    });
  },

  // //获取借书者的ID
  // getBorrowerId:function(){
  //   var that=this;
  //   tt.request({
  //     url: 'http://120.26.91.143:8080/users/books/borrowed/'+this.data.bookId, // 目标服务器url
  //     success: (res) => {
  //       if(res.data==tt.getStorageSync('user_id')){
  //         that.setData({
  //           submit:"还书"
  //         })
  //       }else{
  //         that.setData({
  //           submit:"不可借"
  //         })
  //       }
  //     }
  //   });
  // }
})