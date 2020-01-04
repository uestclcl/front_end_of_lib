import i18n from '../i18n/index'
const iLogin = i18n.login
const app = getApp()
const iGetUserInfo = i18n.get_user_info

Page({
  data: {
    bookUrl: '',
    usname:'用户',
    bookname: '',
    bookId:'00001',
    author: '',
    addedTime: '',
    state: '',
    avalible: "可借图书",
    lended: "已借图书",
    submit:"借书",
    hasLogin: false,
    code: tt.getStorageSync('login.code'),
    ...iLogin,
    		hasUserInfo: false,
		withCredentials: false,
		userInfo: {},
		rawData: "",
		signature: "",
		encryptedData: "",
		iv: "",
		...iGetUserInfo
  },

//借书  
onBorrowBook: function (e) {
    var that=this;
    tt.request({
      url: 'http://localhost:8080/users/book/'+this.data.bookId, // 目标服务器url
      data:{
        sessionId:tt.getStorageSync('session_id')
      },
      success: (res) => {
        that.getBook();
        tt.showModal({
          title: res.data,
        })
      },
    });
  },

  //加载
  onLoad:function(){
    var that=this;
    // 登录
    tt.login({
      success(res){
        if(res.code){
          tt.request({
            url: 'http://localhost:8080/users/login', // 目标服务器url
            data:{
              code:res.code
            },
            success: (res) => {
              if(res.data){
                tt.setStorageSync('session_id', res.data.sessionId);
                tt.setStorageSync('user_id', res.data.userId);
                tt.getUserInfo({
                  success:function(res){
                    that.setData({
                      userInfo:res.userInfo
                    })
                  }
                })
                that.getBook();
              }
            }
          });
        }
      }
    })
  },
  //获取图书信息
  getBook:function(){
    var that=this;
    tt.request({
      url: 'http://localhost:8080/users/books/'+this.data.bookId, // 目标服务器url
      success: (res) => {
        that.setData({
          bookname:res.data.bookName,
          author:res.data.author,
          addedTime:res.data.addedTime,
          state:res.data.borrowed?'已借出':'可借阅',
          bookUrl:res.data.bookUrl
        })
        if(res.data.borrowed){
          that.getBorrowerId();
        }
      }
    });
  },

  //获取借书者的ID
  getBorrowerId:function(){
    var that=this;
    tt.request({
      url: 'http://localhost:8080/users/books/borrowed/'+this.data.bookId, // 目标服务器url
      success: (res) => {
        if(res.data==tt.getStorageSync('user_id')){
          that.setData({
            submit:"还书"
          })
        }else{
          that.setData({
            submit:"不可借"
          })
        }
      }
    });
  }
})