import i18n from '../i18n/index'
const swiper = i18n.swiper
const app = getApp()

Page({
  data: {
    book: '../../image/book.png',
    book1: '../../image/book1.jpg',
    book2: '../../image/book2.jpg',
    book3: '../../image/book3.jpg',
    avi: '可借阅图书',
    lended: '借出图书',
    date: '上架日期',
    state: '状态',

    background: ['demo-text-1'],
    indicatorDots: true,
    vertical: true,
    autoplay: false,
    interval: 2000,
    duration: 500,
    ...swiper
  },

  onLoad: function () {
    console.log('Welcome to Mini Code')
  },

  onTapLendBook: function (e) {
    var that = this;
    console.log("借书成功");
    tt.request({
      url: 'http://localhost:8080/user/login', // 目标服务器url
      data: {
        username: 'alice',
        password: '123456'
      },
      success: (res) => {
        console.log(res)
        that.setData({
          name: res.data.message
        })
      }
    });
  },
})
