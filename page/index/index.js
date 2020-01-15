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

  onShow: function () {
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

    console.log("onLoad");
    console.log(options);
    var that = this;
    // 获取页面参数
    if(options.scene){
      let scene=decodeURIComponent(options.scene);
      let paramArr=scene.split('?');
      let bookId=paramArr[1].split('=')[1];
      console.log('bookId:'+bookId);
      that.setData({
        bookId:bookId
      })
    }
    //获取globalData
  
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