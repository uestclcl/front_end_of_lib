import i18n from '../i18n/index'
const iLogin = i18n.login
const app = getApp()

Page({
  data: {
    book: '../../image/book.png',
    book1: '../../image/book1.jpg',
    book2: '../../image/book2.jpg',
    book3: '../../image/book3.jpg',
    bookId:"123",
    name:"书名",
    author: '作者',
    date: '上架日期',
    state: '状态',
    avalible: "可借图书",
    lended: "已借图书",
    hasLogin: false,
    code: tt.getStorageSync('login.code'),
    ...iLogin
  },

  onLoad: function () {
    console.log('Welcome to Mini Code')

    var that = this;
    tt.checkSession({
      success: function () {
        console.log('session not expired.');
        that.setData({
          hasLogin: true
        });
      },
      fail: function () {
        console.log('session expired');
        that.setData({
          hasLogin: false
        });
        that.login();
      }
    })
  },

  onTapLendBook: function (e) {
    var that = this;
    console.log(tt.getStorageSync('session_id'));

    tt.request({
      url: 'http://localhost:8080/users/book/'+that.data.bookId, // 目标服务器url
      data:{
        sessionId:tt.getStorageSync('session_id')
      },
      success: (res) => {
        console.log(res)
        that.setData({
          name: res.data.message
        })
      }
    });
  },


  login: function () {
    var that = this
    
    tt.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code);
          tt.request({
            url: 'http://localhost:8080/users/login', // 目标服务器url
            data: {
              code:res.code
            },
            success: (response) => {
              that.setData({
                  name: response.data,
                  hasLogin: true
                });
              tt.setStorageSync('session_id', response.data);
            }
          });

        } else {
          tt.showModal({
            title: 'function call success, but login failed.'
          });
        }
      },
      fail: function (err) {
        console.log(err);
        tt.showModal({
          title: 'login failed.'
        });
      }
    })
  }
})
