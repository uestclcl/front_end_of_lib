import i18n from '../i18n/index'
const swiper = i18n.swiper
const app = getApp()

Page({
  data: {
    book: '../../image/book.png',
    book1: '../../image/book1.jpg',
    avi: '可借阅图书',
    lended: '借出图书',
    date: '上架日期',
    state: '状态',

    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    // ...swiper
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

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  changeVertical: function (e) {
    this.setData({
      vertical: !this.data.vertical
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  intervalChanging: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  durationChanging: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  currentChange: function (e) {
    console.log(e)
  }
})
